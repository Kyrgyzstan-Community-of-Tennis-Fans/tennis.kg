import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '@/axiosApi';
import { News, NewsResponse } from '@/types/news';

export const fetchNews = createAsyncThunk<NewsResponse, { page: number; limit: number }>(
  'news/fetchNews',
  async ({ page, limit }): Promise<NewsResponse> => {
    const response = await axiosApi.get<NewsResponse>(`/news?page=${page}&limit=${limit}`);
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
