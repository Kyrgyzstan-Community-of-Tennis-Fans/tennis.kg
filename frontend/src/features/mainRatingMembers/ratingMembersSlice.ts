import { createSlice } from '@reduxjs/toolkit';
import { RatingMember } from '@/types/ratingMember';
import {
  createRatingMember,
  fetchRatingMembers,
  updateRatingCategories,
  updateRatingMember,
} from '@/features/mainRatingMembers/ratingMembersThunks';

export interface RatingMembersSlice {
  items: RatingMember[];
  itemsFetching: boolean;
  isCreating: boolean;
  updateLoading: boolean;
  categoriesUpdateLoading: boolean;
}

const initialState: RatingMembersSlice = {
  items: [],
  itemsFetching: false,
  isCreating: false,
  updateLoading: false,
  categoriesUpdateLoading: false,
};

export const ratingMembersSlice = createSlice({
  name: 'ratingMembers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRatingMembers.pending, (state) => {
        state.itemsFetching = true;
      })
      .addCase(fetchRatingMembers.fulfilled, (state, { payload: ratingMembers }) => {
        state.itemsFetching = false;
        state.items = ratingMembers;
      })
      .addCase(fetchRatingMembers.rejected, (state) => {
        state.itemsFetching = false;
      });

    builder
      .addCase(createRatingMember.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createRatingMember.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createRatingMember.rejected, (state) => {
        state.isCreating = false;
      });

    builder
      .addCase(updateRatingMember.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateRatingMember.fulfilled, (state) => {
        state.updateLoading = false;
      })
      .addCase(updateRatingMember.rejected, (state) => {
        state.updateLoading = false;
      });

    builder
      .addCase(updateRatingCategories.pending, (state) => {
        state.categoriesUpdateLoading = true;
      })
      .addCase(updateRatingCategories.fulfilled, (state) => {
        state.categoriesUpdateLoading = false;
      })
      .addCase(updateRatingCategories.rejected, (state) => {
        state.categoriesUpdateLoading = false;
      });
  },
  selectors: {
    selectRatingMembers: (state) => state.items,
    selectRatingMembersFetching: (state) => state.itemsFetching,
    selectRatingMemberCreating: (state) => state.isCreating,
    selectRatingMemberUpdating: (state) => state.updateLoading,
    selectRatingMembersCategoriesUpdating: (state) => state.categoriesUpdateLoading,
  },
});

export const ratingMembersReducer = ratingMembersSlice.reducer;

export const {
  selectRatingMembers,
  selectRatingMembersFetching,
  selectRatingMemberCreating,
  selectRatingMemberUpdating,
  selectRatingMembersCategoriesUpdating,
} = ratingMembersSlice.selectors;
