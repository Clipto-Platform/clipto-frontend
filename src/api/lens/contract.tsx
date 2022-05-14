import config from '../../config/config';
import { getSigner } from './ethers-service';
import LENS_HUB_ABI from '../../abis/lens/LensHubProxy.json';
import LENS_FOLLOW_NFT_ABI from '../../abis/lens/FollowNFT.json';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';

export const getLensHub = (library: Web3Provider) => {
  return new ethers.Contract(config.lensContract, LENS_HUB_ABI, getSigner(library));
};

export const getFollowNftContract = (typedData: any, library: Web3Provider) =>
  new ethers.Contract(typedData.domain.verifyingContract, LENS_FOLLOW_NFT_ABI, getSigner(library));
