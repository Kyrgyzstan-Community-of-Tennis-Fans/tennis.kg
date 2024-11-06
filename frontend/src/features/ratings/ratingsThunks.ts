import { axiosApi } from '@/axiosApi';
import type { Rating, RatingMutation } from '@/types/ratingTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

export const fetchRatings = createAsyncThunk('ratings/fetchRatings', async () => {
  const { data: ratings } = await axiosApi.get<Rating[]>('/ratings');

  return ratings;
});

export const createRating = createAsyncThunk('ratings/createRating', async (rating: RatingMutation) => {
  try {
    const { data } = await axiosApi.post<Rating>('/ratings', rating);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response && error.response.data.code === 409) {
      toast.error(error.response.data.error);
    } else {
      toast.error('Произошла ошибка при создании рейтинга');
    }
    throw error;
  }
});
