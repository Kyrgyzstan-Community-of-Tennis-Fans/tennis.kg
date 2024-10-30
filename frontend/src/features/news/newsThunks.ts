import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '@/axiosApi';
import { News } from '@/types/news';

export const fetchNews = createAsyncThunk<News[]>('news/fetchNews', async (): Promise<News[]> => {
  const { data: news } = await axiosApi.get<News[]>('/news');
  return news;
});

export const fetchOneNews = createAsyncThunk<News, string>('news/fetchOneNews', async (id) => {
  const { data: oneNews } = await axiosApi.get<News>(`/news/${id}`);
  return oneNews;
});

export const fetchNewsByLimit = createAsyncThunk<News[], number>('news/fetchNewsByLimit', async (limit) => {
  const { data: news } = await axiosApi.get<News[]>(`/news?limit=${limit}`);
  return news;
});