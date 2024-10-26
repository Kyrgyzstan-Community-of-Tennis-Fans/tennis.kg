import { API_URl } from '@/consts';
import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: API_URl,
});
