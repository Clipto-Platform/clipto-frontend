import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import { createClient } from 'urql';
import config from '../../config/config';
import { getFollowNftContract, getLensHub } from './contract';
import { getAddressFromSigner, signedTypeData, splitSignature } from './ethers-service';
import {
  mutationFollow,
  mutationProfile,
  mutationUnfollow,
  queryAuth,
  queryChallenge,
  queryDoesFollow,
  queryFollowing,
  queryProfile,
  queryTxWait,
  queryVerify,
} from './query';
import { CreateProfileRequest } from './types';

declare var window: any; //this removes window.ethereum type error

export const graphInstance = createClient({
  // for performance reasons
  url: config.lensUrl,
  requestPolicy: 'cache-and-network',
});

export const graphInstanceDisabledCache = createClient({
  url: config.lensUrl,
  requestPolicy: 'network-only', //defaults to no-cache option: https://formidable.com/open-source/urql/docs/basics/document-caching/
});

export const generateChallenge = (address: any) => {
  return graphInstance.query(queryChallenge, { address }).toPromise();
};

export const authenticate = (address: string, signature: string) => {
  return graphInstance
    .mutation(queryAuth, {
      address,
      signature,
    })
    .toPromise();
};

export const createProfile = async (createProfileRequest: CreateProfileRequest, accessToken: string) => {
  return graphInstance
    .mutation(
      mutationProfile,
      { request: createProfileRequest },
      {
        fetchOptions: {
          headers: {
            'x-access-token': accessToken,
          },
        },
      },
    )
    .toPromise();
};

export const getProfile = async (address: string) => {
  return graphInstance.query(queryProfile, { address }).toPromise();
};

// This code will assume you are using MetaMask.
// It will also assume that you have already done all the connecting to metamask
// this is purely here to show you how the public API hooks together
// todo - figure out how to use the context provider
export const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);

export const signText = (text: string) => {
  const signer = ethersProvider.getSigner();

  return signer.signMessage(text);
};

//gets access and request tokens
export const getAccess = async (address: string) => {
  let localAccess = localStorage.getItem('lensAccessToken'); // Note - this should be refactored to be in the state and in a hook inside
  //This is a major security flaw! ^^ Vulnerable to XSS
  if (localAccess) {
    const isAccessValid = await verify(localAccess);
    if (isAccessValid && isAccessValid.data.verify) {
      return {
        data: {
          authenticate: {
            accessToken: localAccess,
            refreshToken: localAccess,
          },
        },
      };
    }
  }
  const challengeResponse = await generateChallenge(address);
  console.log(challengeResponse);
  // sign the text with the wallet
  const signature = challengeResponse && (await signText(challengeResponse.data.challenge.text));
  console.log(signature);
  const authResponse = signature && (await authenticate(address, signature));
  console.log(authResponse);
  !authResponse && console.error('Unable to login in');
  if (authResponse && authResponse.data) {
    localStorage.setItem('lensAccessToken', authResponse.data.authenticate.accessToken);
  }
  return authResponse;
};

//sign the address to a new lens account if address has zero lens accounts
export const signUp = async (address: string) => {
  const profileResponse = await getProfile(address);
  if (profileResponse && profileResponse.data.profiles.items.length === 0) {
    console.log('should create account');
    try {
      const accessResponse = await getAccess(address);
      if (accessResponse && accessResponse.data) {
        const { accessToken, refreshToken } = accessResponse.data.authenticate;
        return createProfile({ handle: 'a' }, accessToken);
      }
    } catch (e) {
      console.error(e);
    }
    return;
  }
  console.log('shouldnt create account');
};

//Need to check what type of follow module - (don't want to have to pay for a fee)
export const follow = async (handle: string, accessToken: string, library: Web3Provider) => {
  const result = await graphInstance
    .mutation(
      mutationFollow,
      {
        profile: handle,
      },
      {
        fetchOptions: {
          headers: {
            'x-access-token': accessToken,
          },
        },
      },
    )
    .toPromise();
  if (!result) throw 'result is undefined';
  try {
    const typedData = result.data.createFollowTypedData.typedData;
    console.log(result.data.createFollowTypedData);
    const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value, library);
    console.log('signature:', signature);
    const { v, r, s } = splitSignature(signature);
    console.log({ v, r, s });
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
    console.log(tx);
    return tx.hash;
    // you can look at how to know when its been indexed here:
    //   - https://docs.lens.dev/docs/has-transaction-been-indexed
  } catch (e) {
    console.error(e);
    console.error('Make sure you are on the correct network or may ');
  }
};

export const unfollow = async (handle: string, accessToken: string, library: Web3Provider) => {
  const result = await graphInstance
    .mutation(
      mutationUnfollow,
      {
        profile: handle,
      },
      {
        fetchOptions: {
          headers: {
            'x-access-token': accessToken,
          },
        },
      },
    )
    .toPromise();
  if (!result) return;
  console.log(result);
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

  const tx = await followNftContract.burnWithSig(typedData.value.tokenId, sig);
  console.log(tx.hash);
  return tx.hash;
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
export const txWait = async (txHash: string, accessToken: string) => {
  return graphInstanceDisabledCache
    .query(
      queryTxWait,
      {
        txHash: txHash,
      },
      {
        fetchOptions: {
          headers: {
            'x-access-token': accessToken,
          },
        },
      },
    )
    .toPromise();
};
export const pollUntilIndexed = async (txHash: string, accessToken: string) => {
  while (true) {
    const result = await txWait(txHash, accessToken);
    console.log(result);
    const response = result.data.hasTxHashBeenIndexed;
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
