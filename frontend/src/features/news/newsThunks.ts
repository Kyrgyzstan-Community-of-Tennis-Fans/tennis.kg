import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '@/axiosApi';
import { News, NewsResponse } from '@/types/news';

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
