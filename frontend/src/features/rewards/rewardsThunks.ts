import { axiosApi } from '@/axiosApi';
import type { RewardMutation } from '@/types/rewardTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRewards = createAsyncThunk('rewards/fetchRewards', async () => {
  const { data: rewards } = await axiosApi.get('/rewards');

  return rewards;
});

export const deleteReward = createAsyncThunk('rewards/deleteReward', async (rewardId: string) => {
  await axiosApi.delete(`/rewards/${rewardId}`);

  return rewardId;
});

export const createReward = createAsyncThunk('rewards/createReward', async (reward: RewardMutation) => {
  const { data: newReward } = await axiosApi.post('/rewards', reward);

  return newReward;
});
