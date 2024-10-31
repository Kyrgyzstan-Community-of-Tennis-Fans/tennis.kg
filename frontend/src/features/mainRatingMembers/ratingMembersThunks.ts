import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '@/axiosApi';
import { RatingMember, RatingMemberMutation } from '@/types/ratingMemberTypes';
import { ValidationError } from '@/types/userTypes';
import { isAxiosError } from 'axios';

export const fetchRatingMembers = createAsyncThunk<RatingMember[]>('ratingMembers/fetchAll', async () => {
  const { data: ratingMembers } = await axiosApi.get<RatingMember[]>('/ratingMembers');

  return ratingMembers;
});

export const createRatingMember = createAsyncThunk<void, RatingMemberMutation, { rejectValue: ValidationError }>(
  'ratingMembers/create',
  async (ratingMemberMutation, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      const keys = Object.keys(ratingMemberMutation) as (keyof RatingMemberMutation)[];
      keys.forEach((key) => {
        const value = ratingMemberMutation[key];
        if (value !== null) {
          formData.append(key, value);
        }
      });

      await axiosApi.post('/ratingMembers', formData);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);

export const deleteRatingMember = createAsyncThunk<void, string>('ratingMembers/delete', async (id) => {
  await axiosApi.delete(`/ratingMembers/${id}`);
});
