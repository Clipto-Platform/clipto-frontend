import axios from 'axios';
import { API_URL } from '../config/config';
import { CreateRequest, FinalizeFileUpload, UploadFileLinkRequest } from './types';

// Axios config
const axiosInstance = axios.create({
    baseURL: API_URL,
});

export const createBooking = (data: CreateRequest) => {
    return axiosInstance.post('/request/create', data);
}

export const completeBooking = (data: any) => {
    return axiosInstance.post('/request/finish', data);
}

export const getRequestById = (creator: string, requestId: string) => {
    return axiosInstance.get(`/request/creator/${creator}/${requestId}`);
}

export const getUploadFileLink = (data: UploadFileLinkRequest) => {
    return axiosInstance.post('/upload', data);
}

export const getUploadFileStatus = (uploadUuid: string) => {
    return axiosInstance.get(`/upload/status/${uploadUuid}`);
}

export const finalizeFileUpload = (data: FinalizeFileUpload) => {
    return axiosInstance.post('/upload/finalize', data);
}

export const getArweaveMetadata = (arweaveToken: string) => {
    return axios.get(`https://arweave.net/${arweaveToken}`);
}

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
