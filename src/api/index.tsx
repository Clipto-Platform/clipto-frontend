import axios from 'axios';
import { createClient, OperationResult } from 'urql';
import config from '../config/config';
import { convertToInt } from '../utils/format';
import * as query from './query';
import * as types from './types';

// Axios config
const axiosInstance = axios.create({
  baseURL: config.apiUrl,
});

const graphInstance = createClient({
  url: config.graphApi,
});

export const exchnageRates = async (token: string, price: number) => {
  if (token == 'WMATIC') {
    token = 'MATIC';
  } else if (token == 'WETH') {
    token = 'ETH';
  }
  const rates = await axios.get('https://api.coinbase.com/v2/exchange-rates', {
    params: {
      currency: token,
    },
  });
  const convertedPrice = (price / parseFloat(rates.data.data.rates['MATIC'])).toFixed(7);
  return convertedPrice;
};

export const tweetVerify = (data: types.TweetData) => {
  return axiosInstance.post('/user/verify', data);
};

export const getTwitterData = (data: string[]) => {
  return axiosInstance.post('/usersData', data);
};

export const userRequests = (
  account: string,
  page: number,
  limit: number,
): Promise<OperationResult<{ requests: types.EntityRequest[] }>> => {
  return graphInstance
    .query(query.queryUserRequests, {
      requester: account.toLowerCase(),
      first: limit,
      skip: (convertToInt(page) - 1) * convertToInt(limit),
    })
    .toPromise();
};

export const creatorRequests = (
  account: string,
  page: number,
  limit: number,
): Promise<OperationResult<{ requests: types.EntityRequest[] }>> => {
  return graphInstance
    .query(query.queryCreatorRequests, {
      creator: account.toLowerCase(),
      first: limit,
      skip: (convertToInt(page) - 1) * convertToInt(limit),
    })
    .toPromise();
};

export const extractResumeableUrl = async (url: string): Promise<string | null> => {
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors',
    headers: {
      'x-goog-resumable': 'start',
    },
  });
  return response.headers.get('location');
};

export const requestById = async (
  requestId: string | number,
  creator: string,
  version: string,
): Promise<OperationResult<{ requests: types.EntityRequest[] }>> => {
  return graphInstance
    .query(query.queryGetRequest, {
      requestId,
      creator,
      version,
    })
    .toPromise();
};

export const creators = async (
  page: number,
  limit: number,
): Promise<OperationResult<{ creators: types.EntityCreator[] }>> => {
  return graphInstance
    .query(query.queryGetCreators, {
      first: limit,
      skip: (convertToInt(page) - 1) * convertToInt(limit),
    })
    .toPromise();
};

export const creatorsByLens = async (
  lensHandles: Array<string>,
): Promise<OperationResult<{ creators: types.EntityCreator[] }>> => {
  return graphInstance
    .query(query.queryGetCreatorsByLensHandle, {
      lensHandles,
    })
    .toPromise();
};

export const getAllCreatorsUserName = async (): Promise<OperationResult<{ creators: [{ twitterHandle: string }] }>> => {
  return graphInstance.query(query.queryGetCreatorUserName).toPromise();
};
export const creatorById = async (id: string): Promise<OperationResult<{ creator: types.EntityCreator }>> => {
  return graphInstance
    .query(query.queryGetCreatorById, {
      id: id.toLowerCase(),
    })
    .toPromise();
};

export const getUploadFileLink = (data: types.UploadFileLinkRequest) => {
  return axiosInstance.post('/upload', data);
};

export const getUploadFileStatus = (uploadUuid: string) => {
  return axiosInstance.get(`/upload/status/${uploadUuid}`);
};

export const finalizeFileUpload = (data: types.FinalizeFileUpload) => {
  return axiosInstance.post('/upload/finalize', data);
};

export const getArweaveMetadata = (arweaveToken: string) => {
  return axios.get(`https://arweave.net/${arweaveToken}`);
};

export const featuredCreators = async (
  address: string[],
): Promise<OperationResult<{ creators: types.EntityCreator[] }>> => {
  return graphInstance
    .query(query.queryGetFeaturedCreators, {
      address,
    })
    .toPromise();
};

export const getNFTHistory = async (
  nftContract: string,
  tokenId: number,
): Promise<OperationResult<{ transfers: types.Transfer[] }>> => {
  return graphInstance
    .query(query.queryGetNFTHistory, {
      nftContract: nftContract.toLowerCase(),
      tokenId: parseInt(tokenId.toString()),
    })
    .toPromise();
};
