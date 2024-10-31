import { createSlice } from '@reduxjs/toolkit';
import { RatingMember } from '@/types/ratingMemberTypes';
import { createRatingMember, fetchRatingMembers } from '@/features/mainRatingMembers/ratingMembersThunks';
import { ValidationError } from '@/types/userTypes';

export interface RatingMembersSlice {
  items: RatingMember[];
  itemsFetching: boolean;
  isCreating: boolean;
  creatingError: ValidationError | null;
}

const initialState: RatingMembersSlice = {
  items: [],
  itemsFetching: false,
  isCreating: false,
  creatingError: null,
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
        state.creatingError = null;
      })
      .addCase(createRatingMember.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createRatingMember.rejected, (state, { payload: error }) => {
        state.isCreating = false;
        state.creatingError = error || null;
      });
  },
  selectors: {
    selectRatingMembers: (state) => state.items,
    selectRatingMembersFetching: (state) => state.itemsFetching,
    selectRatingMemberCreating: (state) => state.isCreating,
  },
});

export const ratingMembersReducer = ratingMembersSlice.reducer;

export const { selectRatingMembers, selectRatingMembersFetching, selectRatingMemberCreating } =
  ratingMembersSlice.selectors;
