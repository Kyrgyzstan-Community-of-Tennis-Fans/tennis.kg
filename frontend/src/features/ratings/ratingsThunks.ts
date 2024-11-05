import { axiosApi } from '@/axiosApi';
import type { Rating } from '@/types/ratingTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRatings = createAsyncThunk('ratings/fetchRatings', async () => {
  const { data: ratings } = await axiosApi.get<Rating[]>('/ratings');

  return ratings;
});
