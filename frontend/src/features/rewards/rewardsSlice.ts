import { createReward, deleteReward, fetchRewards } from '@/features/rewards/rewardsThunks';
import type { RewardTypes } from '@/types/rewardTypes';
import { createSlice } from '@reduxjs/toolkit';

interface RewardsSlice {
  rewards: RewardTypes[];
  rewardsFetching: boolean;
  rewardsDeleting: string | null;
  rewardsCreating: boolean;
}

const initialState: RewardsSlice = {
  rewards: [],
  rewardsFetching: false,
  rewardsDeleting: null,
  rewardsCreating: false,
};

export const rewardsSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRewards.pending, (state) => {
        state.rewardsFetching = true;
      })
      .addCase(fetchRewards.fulfilled, (state, { payload: rewards }) => {
        state.rewards = rewards;
        state.rewardsFetching = false;
      })
      .addCase(fetchRewards.rejected, (state) => {
        state.rewardsFetching = false;
      });

    builder
      .addCase(deleteReward.pending, (state, { meta: { arg: rewardId } }) => {
        state.rewardsDeleting = rewardId;
      })
      .addCase(deleteReward.fulfilled, (state, { meta: { arg: rewardId } }) => {
        state.rewards = state.rewards.filter((reward) => reward._id !== rewardId);
        state.rewardsDeleting = null;
      })
      .addCase(deleteReward.rejected, (state) => {
        state.rewardsDeleting = null;
      });

    builder
      .addCase(createReward.pending, (state) => {
        state.rewardsCreating = true;
      })
      .addCase(createReward.fulfilled, (state, { payload: reward }) => {
        state.rewards.push(reward);
        state.rewardsCreating = false;
      })
      .addCase(createReward.rejected, (state) => {
        state.rewardsCreating = false;
      });
  },
  selectors: {
    selectRewards: (state) => state.rewards,
    selectRewardsFetching: (state) => state.rewardsFetching,
    selectRewardsDeleting: (state) => state.rewardsDeleting,
    selectRewardsCreating: (state) => state.rewardsCreating,
  },
});

export const { selectRewards, selectRewardsFetching, selectRewardsDeleting, selectRewardsCreating } =
  rewardsSlice.selectors;
