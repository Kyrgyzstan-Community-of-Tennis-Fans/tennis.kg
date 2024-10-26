import { axiosApi } from '@/axiosApi';
import type { Rank } from '@/types/rankTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRanks = createAsyncThunk<Rank[], void>('ranks/fetchRanks', async () => {
  const { data: ranks } = await axiosApi.get<Rank[]>('/ranks');

  return ranks;
});
