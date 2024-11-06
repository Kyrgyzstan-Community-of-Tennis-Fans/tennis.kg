import { createRating, fetchRatings } from '@/features/ratings/ratingsThunks';
import type { Rating } from '@/types/ratingTypes';
import { createSlice } from '@reduxjs/toolkit';

interface RatingsState {
  ratings: Rating[];
  ratingsFetching: boolean;
  ratingsCreating: boolean;
}

const initialState: RatingsState = {
  ratings: [],
  ratingsFetching: false,
  ratingsCreating: false,
};

export const ratingsSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRatings.pending, (state) => {
        state.ratingsFetching = true;
      })
      .addCase(fetchRatings.fulfilled, (state, { payload: ratings }) => {
        state.ratings = ratings;
        state.ratingsFetching = false;
      })
      .addCase(fetchRatings.rejected, (state) => {
        state.ratingsFetching = false;
      });

    builder
      .addCase(createRating.pending, (state) => {
        state.ratingsCreating = true;
      })
      .addCase(createRating.fulfilled, (state, { payload: rating }) => {
        state.ratings.push(rating);
        state.ratingsCreating = false;
      })
      .addCase(createRating.rejected, (state) => {
        state.ratingsCreating = false;
      });
  },
  selectors: {
    selectRatings: (state) => state.ratings,
    selectRatingsFetching: (state) => state.ratingsFetching,
    selectRatingsCreating: (state) => state.ratingsCreating,
  },
});

export const { selectRatings, selectRatingsFetching, selectRatingsCreating } = ratingsSlice.selectors;
