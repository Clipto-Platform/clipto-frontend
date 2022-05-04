import axios from 'axios';
import { createClient, OperationResult } from 'urql';
import { API_URL, DEFAULT_CHAIN_ID, GRAPH_APIS } from '../config/config';
import { convertToInt } from '../utils/format';
import {
  queryCreatorRequests,
  queryGetCreatorById,
  queryGetCreators,
  queryGetRequest,
  queryUserRequests,
  queryGetFeaturedCreators,
  queryGetCreatorUserName,
} from './query';

import { EntityCreator, EntityRequest, FinalizeFileUpload, MetaData, TweetData, UploadFileLinkRequest } from './types';

// Axios config
const axiosInstance = axios.create({
  baseURL: API_URL,
});

const graphInstance = createClient({
  url: GRAPH_APIS[DEFAULT_CHAIN_ID],
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

export const tweetVerify = (data: TweetData) => {
  return axiosInstance.post('/user/verify', data);
};

export const getTwitterData = (data: string[]) => {
  return axiosInstance.post('/usersData', data);
};

export const uploadToIpfs = (data: MetaData) => {
  return axiosInstance.post('ipfs/pin', data);
};

export const userRequests = (
  account: string,
  page: number,
  limit: number,
): Promise<OperationResult<{ requests: EntityRequest[] }>> => {
  return graphInstance
    .query(queryUserRequests, {
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
): Promise<OperationResult<{ requests: EntityRequest[] }>> => {
  return graphInstance
    .query(queryCreatorRequests, {
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
): Promise<OperationResult<{ requests: EntityRequest[] }>> => {
  return graphInstance
    .query(queryGetRequest, {
      requestId,
      creator,
    })
    .toPromise();
};

export const creators = async (
  page: number,
  limit: number,
): Promise<OperationResult<{ creators: EntityCreator[] }>> => {
  return graphInstance
    .query(queryGetCreators, {
      first: limit,
      skip: (convertToInt(page) - 1) * convertToInt(limit),
    })
    .toPromise();
};
export const getAllCreatorsUserName = async (): Promise<OperationResult<{ creators: [{ twitterHandle: string }] }>> => {
  return graphInstance.query(queryGetCreatorUserName).toPromise();
};
export const creatorById = async (id: string): Promise<OperationResult<{ creator: EntityCreator }>> => {
  return graphInstance
    .query(queryGetCreatorById, {
      id: id.toLowerCase(),
    })
    .toPromise();
};

export const getUploadFileLink = (data: UploadFileLinkRequest) => {
  return axiosInstance.post('/upload', data);
};

export const getUploadFileStatus = (uploadUuid: string) => {
  return axiosInstance.get(`/upload/status/${uploadUuid}`);
};

export const finalizeFileUpload = (data: FinalizeFileUpload) => {
  return axiosInstance.post('/upload/finalize', data);
};

export const getArweaveMetadata = (arweaveToken: string) => {
  return axios.get(`https://arweave.net/${arweaveToken}`);
};
export const featuredCreators = async (address: string[]): Promise<OperationResult<{ creators: EntityCreator[] }>> => {
  return graphInstance
    .query(queryGetFeaturedCreators, {
      address,
    })
    .toPromise();
};
