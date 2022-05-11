import { LENS_HUB_CONTRACT_ADDRESS } from '../../config/config';
import { getSigner } from './ethers-service';
import LENS_HUB_ABI from '../../abis/lens/LensHubProxy.json';
import LENS_FOLLOW_NFT_ABI from '../../abis/lens/FollowNFT.json';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';

// lens contract info can all be found on the deployed
// contract address on polygon.
// not defining here as it will bloat the code example
// const lensHub = new ethers.Contract(
//   LENS_HUB_CONTRACT_ADDRESS || "0x4BF0c7AD32Fd2d32089790a54485e23f5C7736C0",
//   LENS_HUB_ABI,
//   getSigner()
// )

export const getLensHub = (library : Web3Provider) => {
  return new ethers.Contract(
    LENS_HUB_CONTRACT_ADDRESS || "0x4BF0c7AD32Fd2d32089790a54485e23f5C7736C0",
    LENS_HUB_ABI,
    getSigner(library)
  )
}

export const getFollowNftContract = (typedData : any, library : Web3Provider) => new ethers.Contract(
  typedData.domain.verifyingContract,
  LENS_FOLLOW_NFT_ABI,
  getSigner(library)
);