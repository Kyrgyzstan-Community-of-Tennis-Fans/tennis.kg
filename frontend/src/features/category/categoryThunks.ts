import { axiosApi } from '@/axiosApi';
import type { Category } from '@/types/categoryTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk<Category[], void>('category/fetchCategories', async () => {
  const { data: ranks } = await axiosApi.get<Category[]>('/categories');

  return ranks;
});
