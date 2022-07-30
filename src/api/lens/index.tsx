import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { MdOutlineDirectionsBoatFilled } from 'react-icons/md';
import { cacheExchange, createClient, dedupExchange, fetchExchange, makeOperation, OperationResult } from 'urql';
import config, { RELAY_ON } from '../../config/config';
import { AuthenticationResult, CreatePublicPostRequest } from '../../generated/graphql';
import { getFollowNftContract, getLensHub } from './contract';
import { getAddressFromSigner, signedTypeData, splitSignature } from './ethers-service';
import {
  mutationBroadcast,
  mutationCreatePostTypedData,
  mutationFollow,
  mutationProfile,
  mutationUnfollow,
  queryAuth,
  queryChallenge,
  queryDoesFollow,
  queryFollowing,
  queryProfile,
  queryProfileByHandle,
  queryRefresh,
  queryTxWait,
  queryVerify,
} from './query';
import { CreateProfileRequest } from './types';
import { authExchange } from '@urql/exchange-auth';
import * as jose from 'jose'
import axios from 'axios'
import store from '@/redux/store'
import { logout, logoutLens } from '@/redux/reducer';
declare var window: any; //this removes window.ethereum type error

export const verifyJwt = (address: string, token: string) => {
  if (token == '') {
    return false
  }
  try {
    const claims = jose.decodeJwt(token);
    if ((claims.id as string).toLowerCase() == address.toLowerCase() && //if user address of token is the same as the state
    claims.exp && claims.exp * 1000 > Date.now()) { //if token is not expired
      return true
    }
  } catch (e) {
    console.error(e)
  }
  return false
}

//Note: This is only lens auth
const getAuth = async ({ authState } : any) => {
  if (!authState) {
    const address = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    if (token && refreshToken && token && address && verifyJwt(address, token)) {
      const {data: res} = await axios(config.lens.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({
          operationName: 'Refresh',
          query: queryRefresh,
          variables: {
            refreshToken: refreshToken
          }
        })
      })
      if (res.errors && res.errors.length > 0) {
        console.error(res.errors)
        store.dispatch(logoutLens())
        return null;
      }
      const {refreshToken: newRefreshToken, accessToken: newAccessToken} = res?.data?.refresh
      return { token: newAccessToken, refreshToken: newRefreshToken };
    }

    store.dispatch(logoutLens());
    return null;
  }

  store.dispatch(logoutLens());
  return null;
}

const didAuthError = ({error} : any) => {
  return error.message.includes('User not authenticated')
};
const addAuthToOperation = ({ authState, operation } : any) => {
  if (!authState || !authState.token) {
    return operation;
  }

  const fetchOptions =
    typeof operation.context.fetchOptions === 'function'
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {};

  return makeOperation(operation.kind, operation, {
    ...operation.context,
    fetchOptions: {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        Authorization: authState.token,
      },
    },
  });
};

export const graphInstance = createClient({
  // for performance reasons
  url: config.lens.url,
  requestPolicy: 'cache-and-network',//defaults to no-cache option: https://formidable.com/open-source/urql/docs/basics/document-caching/,
  exchanges: [
    dedupExchange,
    cacheExchange,
    authExchange({
      getAuth,
      addAuthToOperation,
      didAuthError
    }),
    fetchExchange,
  ]
});


export const generateChallenge = (address: any) => {
  return graphInstance.query(queryChallenge, { address }).toPromise();
};

export const authenticate = (address: string, signature: string) : Promise<OperationResult<{authenticate: AuthenticationResult}>> => {
  return graphInstance
    .mutation(queryAuth, {
      address,
      signature,
    })
    .toPromise();
};

export const createProfile = async (createProfileRequest: CreateProfileRequest) => {
  return graphInstance
    .mutation(
      mutationProfile,
      { request: createProfileRequest }
    )
    .toPromise();
};

export const getProfile = async (address: string) => {
  return graphInstance.query(queryProfile, { address }).toPromise();
};
/**
 *
 * @param handle If you don't have ".test" or ".lens" appended to the end of `handle`, pass `handle` as `config.lens.getHandleToSearch(handle)`
 */
export const getProfileByHandle = async (handle: string) => {
  return graphInstance.query(queryProfileByHandle, { handle: handle }).toPromise();
};

// This code will assume you are using MetaMask.
// It will also assume that you have already done all the connecting to metamask
// this is purely here to show you how the public API hooks together
// todo - figure out how to use the context provider

export const signText = (text: string, library: Web3Provider) => {
  const signer = library!.getSigner();

  return signer.signMessage(text);
};


export const checkAccess = async (address: string, accessToken: string | undefined) : Promise<{ accessToken: any; refreshToken: any; } | null> => {
  if (!accessToken) {
    return null;
  }
  const isAccessValid = await verify(accessToken);
  if (isAccessValid && isAccessValid.data.verify) {
    return {
      accessToken: accessToken,
      refreshToken: accessToken,
    };
  }
  return null;
}
//gets access and request tokens
/**
 * 
 * @param address 
 * @param library 
 * @returns a string if error and null if successful
 */
export const getAccess = async (address: string, library: Web3Provider) : Promise<string | null> => {
  const challengeResponse = await generateChallenge(address);
  if (!challengeResponse) return "Unable to get challenge response"
  const signature = await signText(challengeResponse.data.challenge.text, library);
  if (!signature) return 'Unable to get signature'
  const authResponse = await authenticate(address, signature);
  if (!authResponse || authResponse && authResponse.error) return 'unable to authenticate';
  if (authResponse.data && authResponse.data.authenticate.accessToken && authResponse.data.authenticate.refreshToken) {
    localStorage.setItem('token', authResponse.data.authenticate.accessToken); 
    localStorage.setItem('refreshToken', authResponse.data.authenticate.refreshToken);
    return null; 
  }
  return 'something is very wrong';
};

//refreshs tokens
export const refreshAccess = async (refreshToken: string, library: Web3Provider) => {
  return graphInstance.mutation(queryRefresh, { refreshToken }).toPromise()
}

//sign the address to a new lens account if address has zero lens accounts
export const signUp = async (address: string, library: Web3Provider) => {
  throw 'Not supported'
  const profileResponse = await getProfile(address);
  if (profileResponse && profileResponse.data.profiles.items.length === 0) {
    try {
      return createProfile({ handle: 'a' });
    } catch (e) {
      console.error(e);
    }
    return;
  }
};

//Need to check what type of follow module - (don't want to have to pay for a fee)
export const follow = async (profileId: string, library: Web3Provider) => {
  const result = await graphInstance
    .mutation(
      mutationFollow,
      {
        profile: profileId,
      }
    )
    .toPromise();
  if (!result) throw 'result is undefined';
  try {
    const typedData = result.data.createFollowTypedData.typedData;
    const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value, library);
    const { v, r, s } = splitSignature(signature);
    async function writeTx() {
      const tx = await getLensHub(library).followWithSig({
        follower: await getAddressFromSigner(library),
        profileIds: typedData.value.profileIds,
        datas: typedData.value.datas,
        sig: {
          v,
          r,
          s,
          deadline: typedData.value.deadline,
        },
      });
      return tx.hash;
    }
    if (RELAY_ON) {
      const broadcastRes = await broadcast(
        {
          id: result.data.createFollowTypedData.id,
          signature: signature,
        }
      );
      if (broadcastRes.error  || broadcastRes.data?.broadcast?.reason === 'NOT_ALLOWED') {
        return await writeTx()
      }
      return broadcastRes.data.broadcast.txHash
    } else {
      return await writeTx()
    }
    // you can look at how to know when its been indexed here:
    //   - https://docs.lens.dev/docs/has-transaction-been-indexed
  } catch (e) {
    console.error(e);
    console.error('Make sure you are on the correct network or may ');
    throw e
  }
};
// check for edge cases in the docs
export const unfollow = async (handle: string, library: Web3Provider) => {
  const result = await graphInstance
    .mutation(
      mutationUnfollow,
      {
        profile: handle,
      }
    )
    .toPromise();
  if (!result) return;
  const typedData = result.data.createUnfollowTypedData.typedData;
  const followNftContract = getFollowNftContract(typedData, library);
  const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value, library);
  const { v, r, s } = splitSignature(signature);
  const sig = {
    v,
    r,
    s,
    deadline: typedData.value.deadline,
  };
  async function writeTx() {
    return (await followNftContract.burnWithSig(typedData.value.tokenId, sig)).hash;
  }
  try {
    if (RELAY_ON) {
      const broadcastRes = await broadcast(
        {
          id: result.data.createUnfollowTypedData.id,
          signature: signature,
        }
      );
      if (broadcastRes.error  || broadcastRes.data?.broadcast?.reason === 'NOT_ALLOWED') {
        return await writeTx();
      }
      return broadcastRes.data.broadcast.txHash
    } else {
      return await writeTx();
    }
  } catch (e) {
    console.error(e);
    console.error('Make sure you are on the correct network or may ');
    throw e
  }
  // you can look at how to know when its been indexed here:
  //   - https://docs.lens.dev/docs/has-transaction-been-indexed
};

// todo - untested
// todo - get list of your current follows
export const getFollowNFTs = async (address: string) => {
  return graphInstance
    .query(queryFollowing, {
      request: {
        address,
      },
    })
    .toPromise();
};

// todo - add access tokens to either the state or the localstorage
//      - modify api to use localstorage or state for access token
const verify = async (accessToken: string) => {
  return graphInstance
    .query(queryVerify, {
      accessToken: accessToken,
    })
    .toPromise();
};

// todo - given one address, return if you are following or not
//address of creator on booking page
/**
 *
 * @param address the address that wants to know if they follow the handle
 * @param id
 * @returns
 */
export const isFollowing = async (address: string, id: string) => {
  return graphInstance
    .query(queryDoesFollow, {
      address: address,
      profileId: id,
    })
    .toPromise();
};

/**
 * Note: Do not use tx.wait() because it is not the single source of truth, read more here: https://docs.lens.dev/docs/has-transaction-been-indexed
 * @param txHash
 */
export const txWait = async (txHash: string) => {
  return graphInstance
    .query(
      queryTxWait,
      {
        txHash: txHash,
      }
    )
    .toPromise();
};
export const pollUntilIndexed = async (txHash: string) => {
  while (true) {
    const result = await txWait(txHash);
    const response = result.data.hasTxHashBeenIndexed;
    if (response.reason == 'REVERTED') {
      throw new Error(response.reason)
    }
    if (response.__typename === 'TransactionIndexedResult') {
      if (response.metadataStatus) {
        if (response.metadataStatus.status === 'SUCCESS') {
          return response;
        }
        if (response.metadataStatus.status === 'METADATA_VALIDATION_FAILED') {
          throw new Error(response.metadataStatus.reason);
        }
      } else {
        if (response.indexed) {
          return response;
        }
      }

      // sleep for a second before trying again
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    try {
      throw new Error(response.reason);
    } catch (e) {
      //console.warn(e)
    }
    // it got reverted and failed!
  }
};
// todo - sharing to lens as a publication

// todo - get publications

// todo - create publication
export const postRequest = async (request: CreatePublicPostRequest, library: Web3Provider) => {
  const result = await graphInstance.mutation(mutationCreatePostTypedData, {
    // options: {
    //   "overrideSigNonce": 25
    // },
    request,
  }).toPromise();
  if (!result) throw 'result is undefined';
  console.log(result)
  try {
    const typedData = result.data.createPostTypedData.typedData;
    const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value, library);
    const { v, r, s } = splitSignature(signature);
    async function writeTx() {
      const tx = await getLensHub(library).postWithSig({
        profileId: typedData.value.profileId,
        contentURI:typedData.value.contentURI,
        collectModule: typedData.value.collectModule,
        collectModuleInitData: typedData.value.collectModuleInitData,
        referenceModule: typedData.value.referenceModule,
        referenceModuleInitData: typedData.value.referenceModuleInitData,
        sig: {
          v,
          r,
          s,
          deadline: typedData.value.deadline,
        },
      });
      return tx.hash;
    }
    if (RELAY_ON) {
      const broadcastRes = await broadcast(
        {
          id: result.data.createPostTypedData.id,
          signature: signature,
        }
      );
      if (broadcastRes.error  || broadcastRes.data?.broadcast?.reason === 'NOT_ALLOWED') {
        return await writeTx()
      }
      return broadcastRes.data.broadcast.txHash
    } else {
      return await writeTx()
    }
    // you can look at how to know when its been indexed here:
    //   - https://docs.lens.dev/docs/has-transaction-been-indexed
  } catch (e) {
    console.error(e);
    console.error('Make sure you are on the correct network or may ');
  }
};

//gasless!
export const broadcast = (request: { id: string; signature: string }) => {
  return graphInstance
    .mutation(
      mutationBroadcast,
      {
        request,
      }
    )
    .toPromise();
};
