import axios from 'axios';
import { createClient, OperationResult } from 'urql';
import { API_URL, DEFAULT_CHAIN_ID, GRAPH_APIS } from '../config/config';
import { CreateUserDtoSignable } from '../hooks/useProfile';
import { convertToInt } from '../utils/format';
import { queryCreatorRequests, queryGetCreatorById, queryGetCreators, queryGetRequest, queryUserRequests } from './query';
import {
  CompleteBooking,
  CreateRequest,
  EntityCreator,
  EntityRequest,
  FinalizeFileUpload,
  RefundRequest,
  TweetData,
  UploadFileLinkRequest,
} from './types';

// Axios config
const axiosInstance = axios.create({
  baseURL: API_URL,
});

const graphInstance = createClient({
  url: GRAPH_APIS[DEFAULT_CHAIN_ID],
});

export const creatorOnboard = (data: CreateUserDtoSignable, token: string) => {
  return axiosInstance.post('/user/create', data, {
    headers: {
      recaptcha: token,
    },
  });
};

export const updateProfile = (data: CreateUserDtoSignable, token: string) => {
  return axiosInstance.put(`/user/${data.address}`, data, {
    headers: {
      recaptcha: token,
    },
  });
};

export const createBooking = (data: CreateRequest, token: string) => {
  return axiosInstance.post('/request/create', data, {
    headers: {
      recaptcha: token,
    },
  });
};

export const completeBooking = (data: CompleteBooking, token: string) => {
  return axiosInstance.post('/request/finish', data, {
    headers: {
      recaptcha: token,
    },
  });
};

export const refund = (data: RefundRequest, token: string) => {
  return axiosInstance.post('/request/refund', data, {
    headers: {
      recaptcha: token,
    },
  });
};

export const tweetVerify = (data: TweetData) => {
  return axiosInstance.post('/user/verify', data);
};

export const userRequests = (
  account: string,
  page: number,
  limit: number,
): Promise<OperationResult<{ requests: EntityRequest[] }>> => {
  return graphInstance
    .query(queryUserRequests, {
      requester: "0x8b2a6a22ec055225c4c4b5815e7d9f566b8be68f",
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
      creator: "0x8b2a6a22ec055225c4c4b5815e7d9f566b8be68f",
      first: limit,
      skip: (convertToInt(page) - 1) * convertToInt(limit),
    })
    .toPromise();
};

export const getRequestById = (creator: string, requestId: string) => {
  return axiosInstance.get(`/request/creator/${creator}/${requestId}`);
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

export const graphGetRequest = async (requestId: string | number, creator: string, requester: string) => {
  return graphInstance
    .query(queryGetRequest, {
      requestId,
      creator,
      requester,
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

export const creatorById = async (id: string): Promise<OperationResult<{ creator: EntityCreator }>> => {
  return graphInstance
    .query(queryGetCreatorById, {
      id: id,
    })
    .toPromise();
};
