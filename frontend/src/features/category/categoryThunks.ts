import { axiosApi } from '@/axiosApi';
import type { Category } from '@/types/categoryTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk<Category[], void>('category/fetchCategories', async () => {
  const { data: ranks } = await axiosApi.get<Category[]>('/categories');

  return ranks;
});

export const deleteCategory = createAsyncThunk<void, string>('category/deleteCategory', async (id) => {
  await axiosApi.delete(`/categories/${id}`);
});

export const createCategory = createAsyncThunk<Category, string>('category/createCategory', async (name) => {
  const { data: category } = await axiosApi.post<Category>('/categories', { name });

  return category;
});

export const updateCategory = createAsyncThunk<Category, { id: string; name: string }>(
  'category/updateCategory',
  async ({ id, name }) => {
    const { data: category } = await axiosApi.put<Category>(`/categories/${id}`, { name });

    return category;
  },
);

export const fetchCategory = createAsyncThunk<Category, string>('category/fetchCategory', async (id) => {
  const { data: category } = await axiosApi.get<Category>(`/categories/${id}`);

  return category;
});
