import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '@/app/store';
import { axiosApi } from '@/axiosApi';
import { News, NewsMutation, NewsResponse } from '@/types/news';

const createFormData = (newsMutation: NewsMutation): FormData => {
  const formData = new FormData();
  const keys = Object.keys(newsMutation) as (keyof NewsMutation)[];

  keys.forEach((key) => {
    const value = newsMutation[key];

    switch (true) {
      case Array.isArray(value): {
        if (key === 'images') {
          if (value as File[]) {
            value.forEach((file) => {
              formData.append(key, file);
            });
          } else if (value as string[]) {
            value.forEach((image) => {
              formData.append(key, image);
            });
          }
        }
        break;
      }
      case key === 'images' && Array.isArray(value) && value.length === 0: {
        formData.append(key, JSON.stringify([]));
        break;
      }
      case key === 'newsCover' && value instanceof File: {
        formData.append(key, value);
        break;
      }
      default: {
        formData.append(key, value as string);
      }
    }
  });

  return formData;
};

export const createNews = createAsyncThunk<void, NewsMutation, { dispatch: AppDispatch }>(
  'news/createNews',
  async (newsMutation, thunkAPI) => {
    const formData = createFormData(newsMutation);
    const response = await axiosApi.post('/news', formData);
    await thunkAPI.dispatch(fetchNews({ page: 1 }));
    return response.data;
  },
);

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

export const updateNews = createAsyncThunk<
  News | null,
  { newsId: string; newsMutation: NewsMutation },
  { dispatch: AppDispatch }
>('news/updateNews', async ({ newsId, newsMutation }, thunkAPI) => {
  const formData = createFormData(newsMutation);
  const { data: response } = await axiosApi.put<News>(`/news/${newsId}`, formData);
  await thunkAPI.dispatch(fetchNews({ page: 1 }));
  return response;
});

export const removeNews = createAsyncThunk<void, string, { dispatch: AppDispatch }>(
  'news/remove',
  async (newsId, thunkAPI) => {
    await axiosApi.delete(`/news/${newsId}`);
    await thunkAPI.dispatch(fetchNews({ page: 1 }));
  },
);
