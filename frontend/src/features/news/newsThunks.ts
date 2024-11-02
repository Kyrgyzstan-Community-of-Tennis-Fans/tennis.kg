import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '@/axiosApi';
import { News, NewsMutation, NewsResponse } from '@/types/news';

export const createNews = createAsyncThunk<void, NewsMutation>('news/createNews', async (newsMutation) => {
  const formData = new FormData();

  const keys = Object.keys(newsMutation) as (keyof NewsMutation)[];
  keys.forEach((key) => {
    const value = newsMutation[key];

    if (Array.isArray(value)) {
      value.forEach((item) => {
        formData.append(key, item);
      });
    } else if (value !== null) {
      formData.append(key, value);
    }
  });

  return await axiosApi.post('/news', formData);
});

export const fetchNews = createAsyncThunk<NewsResponse, { page: number; startDate?: string; endDate?: string }>(
  'news/fetchNews',
  async ({ page, startDate, endDate }): Promise<NewsResponse> => {
    let requestQuery = `/news?page=${page}`;
    if (startDate && endDate) requestQuery = `/news?page=${page}&startDate=${startDate}&endDate=${endDate}`;

    const response = await axiosApi.get<NewsResponse>(requestQuery);
    return response.data;
  },
);

export const fetchOneNews = createAsyncThunk<News, string>('news/fetchOneNews', async (id) => {
  const { data: oneNews } = await axiosApi.get<News>(`/news/${id}`);
  return oneNews;
});

export const fetchNewsByLimit = createAsyncThunk<NewsResponse, number>('news/fetchNewsByLimit', async (limit) => {
  const response = await axiosApi.get<NewsResponse>(`/news?limit=${limit}`);
  return response.data;
});
