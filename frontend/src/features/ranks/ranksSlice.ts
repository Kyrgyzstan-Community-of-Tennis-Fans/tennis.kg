import { fetchRanks } from '@/features/ranks/ranksThunks';
import type { Rank } from '@/types/rankTypes';
import { createSlice } from '@reduxjs/toolkit';

interface RanksState {
  ranks: Rank[];
  ranksFetching: boolean;
}

const initialState: RanksState = {
  ranks: [],
  ranksFetching: false,
};

export const ranksSlice = createSlice({
  name: 'ranks',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRanks.pending, (state) => {
        state.ranksFetching = true;
      })
      .addCase(fetchRanks.fulfilled, (state, { payload: ranks }) => {
        state.ranks = ranks;
        state.ranksFetching = false;
      })
      .addCase(fetchRanks.rejected, (state) => {
        state.ranksFetching = false;
      });
  },
  selectors: {
    selectRanks: (state) => state.ranks,
    selectRanksFetching: (state) => state.ranksFetching,
  },
});

export const { selectRanks, selectRanksFetching } = ranksSlice.selectors;
