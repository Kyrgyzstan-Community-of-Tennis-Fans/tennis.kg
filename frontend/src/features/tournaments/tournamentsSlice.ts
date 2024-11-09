import { createSlice } from '@reduxjs/toolkit';
import { fetchRatingMembers } from '@/features/mainRatingMembers/ratingMembersThunks';
import { Tournaments } from '@/types/tournamentTypes';
import {
  createTournament,
  deleteTournament,
  fetchTournaments,
  updateTournament,
} from '@/features/tournaments/tournamentsThunks';

export interface tournamentSlice {
  items: Tournaments;
  itemsFetching: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean | string;
}

const initialState: tournamentSlice = {
  items: {},
  itemsFetching: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
};

export const tournamentsSlice = createSlice({
  name: 'tournaments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTournaments.pending, (state) => {
        state.itemsFetching = true;
      })
      .addCase(fetchTournaments.fulfilled, (state, { payload: tournaments }) => {
        state.itemsFetching = false;
        state.items = tournaments;
      })
      .addCase(fetchRatingMembers.rejected, (state) => {
        state.itemsFetching = false;
      });

    builder
      .addCase(createTournament.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createTournament.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createTournament.rejected, (state) => {
        state.isCreating = false;
      });

    builder
      .addCase(updateTournament.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateTournament.fulfilled, (state) => {
        state.isUpdating = false;
      })
      .addCase(updateTournament.rejected, (state) => {
        state.isUpdating = false;
      });

    builder
      .addCase(deleteTournament.pending, (state, { meta }) => {
        state.isDeleting = meta.arg;
      })
      .addCase(deleteTournament.fulfilled, (state) => {
        state.isDeleting = false;
      })
      .addCase(deleteTournament.rejected, (state) => {
        state.isDeleting = false;
      });
  },
  selectors: {
    selectTournaments: (state) => state.items,
    selectTournamentsFetching: (state) => state.itemsFetching,
    selectTournamentCreating: (state) => state.isCreating,
    selectTournamentUpdating: (state) => state.isUpdating,
    selectTournamentDeleting: (state) => state.isDeleting,
  },
});

export const tournamentsReducer = tournamentsSlice.reducer;

export const {
  selectTournaments,
  selectTournamentsFetching,
  selectTournamentCreating,
  selectTournamentUpdating,
  selectTournamentDeleting,
} = tournamentsSlice.selectors;
