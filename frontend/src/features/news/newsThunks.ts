import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '@/axiosApi';
import { News } from '@/types/news';

export const fetchNews = createAsyncThunk<News[]>('news/fetchNews', async (): Promise<News[]> => {
  const { data: news } = await axiosApi.get<News[]>('/news');
  return news;
});
