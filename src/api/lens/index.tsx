import { ethers } from 'ethers';
import { createClient } from "urql";
import { LENS_URI } from "../../config/config";
import { mutationFollow, mutationProfile, mutationUnfollow, queryAuth, queryChallenge, queryFollowerNFTs, queryProfile } from './query';
import { CreateProfileRequest } from './types';

declare var window: any //this removes window.ethereum type error

const graphInstance = LENS_URI && createClient({
  url: LENS_URI,
});

export const generateChallenge = (address : any) => {
  return graphInstance && graphInstance.query(queryChallenge, {address}).toPromise()
}

export const authenticate = (address: string, signature: string) => {
  return graphInstance && graphInstance.mutation(queryAuth, {
    address,
    signature
  }).toPromise()
}

export const createProfile = async (createProfileRequest: CreateProfileRequest, accessToken : string) => {
  return graphInstance && graphInstance.mutation(mutationProfile, {request: createProfileRequest}, {
    fetchOptions: {
      headers: {
        "x-access-token": accessToken
      }
    }
  }).toPromise()
}


export const getProfile = async (address : string) => {
  return graphInstance && graphInstance.query(queryProfile, {address}).toPromise()
}

// This code will assume you are using MetaMask.
// It will also assume that you have already done all the connecting to metamask
// this is purely here to show you how the public API hooks together
// todo - figure out how to use the context provider
export const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);

export const signText = (text : string) => {
  const signer = ethersProvider.getSigner()
  
  return signer.signMessage(text)
}

//gets access and request tokens
export const getAccess = async (address : string) => {
  const challengeResponse = await generateChallenge(address);
  console.log(challengeResponse)
  // sign the text with the wallet
  const signature = challengeResponse && await signText(challengeResponse.data.challenge.text)
  console.log(signature)
  const authResponse = signature && await authenticate(address, signature)
  console.log(authResponse)
  !authResponse && console.error('Unable to login in')
  return authResponse
}

//sign the address to a new lens account if address has zero lens accounts
export const signUp = async (address : string) => {
  const profileResponse = await getProfile(address)
  if (profileResponse && profileResponse.data.profiles.items.length === 0) {
    console.log('should create account')
    try {
      const accessResponse = await getAccess(address)
      if (accessResponse && accessResponse.data) {
        const {accessToken, refreshToken} = accessResponse.data.authenticate;
        return createProfile({handle:'a'}, accessToken)
      }
    } catch (e) {
      console.error(e)
    }
    return;
  }
  console.log('shouldnt create account')
}


//Need to check what type of follow module - (don't want to have to pay for a fee)
// todo - untested
export const follow = async (address : string, addressToFollow : string, accessToken : string) => {
  return graphInstance && graphInstance.mutation(mutationFollow, {
    request: [
      {
        profile: addressToFollow
      }
    ]
  }, {
    fetchOptions: {
      headers: {
        "x-access-token": accessToken
      }
    }
  }).toPromise()
}

// todo - untested
export const unfollow = async (address : string, addressToFollow : string, accessToken : string) => {
  return graphInstance && graphInstance.mutation(mutationUnfollow, {
    request: [
      {
        profile: addressToFollow
      }
    ]
  }, {
    fetchOptions: {
      headers: {
        "x-access-token": accessToken
      }
    }
  }).toPromise()
}

// todo - untested
export const getFollowNFTs = async (address : string, profileId: string) => {
  return graphInstance && graphInstance.query(queryFollowerNFTs, {
    request: {
      address,
      profileId
    }
  }).toPromise()
}