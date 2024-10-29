import { fetchCategories } from '@/features/category/categoryThunks';
import type { Category } from '@/types/categoryTypes';
import { createSlice } from '@reduxjs/toolkit';

interface RanksState {
  ranks: Category[];
  ranksFetching: boolean;
}

const initialState: RanksState = {
  ranks: [],
  ranksFetching: false,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.ranksFetching = true;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload: ranks }) => {
        state.ranks = ranks;
        state.ranksFetching = false;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.ranksFetching = false;
      });
  },
  selectors: {
    selectCategories: (state) => state.ranks,
    selectCategoriesFetching: (state) => state.ranksFetching,
  },
});

export const { selectCategories, selectCategoriesFetching } = categorySlice.selectors;
