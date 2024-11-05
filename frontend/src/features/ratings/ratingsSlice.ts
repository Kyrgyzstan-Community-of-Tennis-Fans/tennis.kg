import { fetchRatings } from '@/features/ratings/ratingsThunks';
import type { Rating } from '@/types/ratingTypes';
import { createSlice } from '@reduxjs/toolkit';

interface RatingsState {
  ratings: Rating[];
  ratingsFetching: boolean;
}

const initialState: RatingsState = {
  ratings: [],
  ratingsFetching: false,
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
  },
  selectors: {
    selectRatings: (state) => state.ratings,
    selectRatingsFetching: (state) => state.ratingsFetching,
  },
});

export const { selectRatings, selectRatingsFetching } = ratingsSlice.selectors;
