import type { RootState } from '@/app/store';
import { API_URl } from '@/consts';
import type { Store } from '@reduxjs/toolkit';
import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: API_URl,
});

export const addTokenInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((request) => {
    const token = store.getState().users.user?.token;
    request.headers.set('Authorization', `Bearer ${token}`);
    return request;
  });
};
