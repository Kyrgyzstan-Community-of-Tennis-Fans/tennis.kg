import { createRating, deleteEvent, fetchRatings, getEvent } from '@/features/ratings/ratingsThunks';
import type { Rating } from '@/types/ratingTypes';
import { createSlice } from '@reduxjs/toolkit';
import type { Event } from '@/types/eventTypes';

interface RatingsState {
  ratings: Rating[];
  event: Event | null;
  eventFetching: boolean;
  ratingsFetching: boolean;
  ratingsCreating: boolean;
  eventsDeleting: string | null;
}

const initialState: RatingsState = {
  ratings: [],
  event: null,
  eventFetching: false,
  ratingsFetching: false,
  ratingsCreating: false,
  eventsDeleting: null,
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

    builder
      .addCase(deleteEvent.pending, (state, { meta }) => {
        state.eventsDeleting = meta.arg;
      })
      .addCase(deleteEvent.fulfilled, (state) => {
        state.eventsDeleting = null;
      })
      .addCase(deleteEvent.rejected, (state) => {
        state.eventsDeleting = null;
      });

    builder
      .addCase(getEvent.pending, (state) => {
        state.eventFetching = true;
      })
      .addCase(getEvent.fulfilled, (state, { payload: event }) => {
        state.event = event;
        state.eventFetching = false;
      })
      .addCase(getEvent.rejected, (state) => {
        state.eventFetching = false;
      });
  },
  selectors: {
    selectRatings: (state) => state.ratings,
    selectRatingsFetching: (state) => state.ratingsFetching,
    selectRatingsCreating: (state) => state.ratingsCreating,
    selectEvent: (state) => state.event,
    selectEventFetching: (state) => state.eventFetching,
  },
});

export const { selectRatings, selectRatingsFetching, selectRatingsCreating, selectEventFetching, selectEvent } =
  ratingsSlice.selectors;
