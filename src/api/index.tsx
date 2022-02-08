import axios from 'axios';
import { API_URL } from '../config/config';
import { CreateRequest } from './types';

// Axios config
const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const createBooking = (data: CreateRequest) => {
    return axiosInstance.post('/request/create', data);
}
