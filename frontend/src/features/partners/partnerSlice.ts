import { createSlice } from '@reduxjs/toolkit';
import { Partner } from '@/types/partnerTypes';
import {
  createPartner,
  deletePartner,
  fetchOnePartner,
  fetchPartner,
  updatePartner,
} from '@/features/partners/partnerThunks';

interface PartnerState {
  partners: Partner[];
  partner: Partner | null;
  partnersFetching: boolean;
  partnersCreating: boolean;
  partnersUpdating: boolean;
}

const initialState: PartnerState = {
  partners: [],
  partner: null,
  partnersFetching: false,
  partnersCreating: false,
  partnersUpdating: false,
};

export const partnerSlice = createSlice({
  name: 'partners',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartner.pending, (state) => {
        state.partnersFetching = true;
      })
      .addCase(fetchPartner.fulfilled, (state, { payload: partners }) => {
        state.partnersFetching = false;
        state.partners = partners;
      })
      .addCase(fetchPartner.rejected, (state) => {
        state.partnersFetching = false;
      });

    builder
      .addCase(createPartner.pending, (state) => {
        state.partnersCreating = true;
      })
      .addCase(createPartner.fulfilled, (state) => {
        state.partnersCreating = false;
      })
      .addCase(createPartner.rejected, (state) => {
        state.partnersCreating = false;
      });

    builder.addCase(deletePartner.rejected, (state, { meta }) => {
      state.partners = state.partners.filter((partner) => partner._id !== meta.arg);
    });

    builder
      .addCase(updatePartner.pending, (state) => {
        state.partnersUpdating = true;
      })
      .addCase(updatePartner.fulfilled, (state) => {
        state.partnersUpdating = false;
      })
      .addCase(updatePartner.rejected, (state) => {
        state.partnersUpdating = false;
      });

    builder
      .addCase(fetchOnePartner.pending, (state) => {
        state.partner = null;
      })
      .addCase(fetchOnePartner.fulfilled, (state, { payload: partner }) => {
        state.partner = partner;
      })
  },
  selectors: {
    selectPartners: (state) => state.partners,
    selectPartner: (state) => state.partner,
    selectPartnersFetching: (state) => state.partnersFetching,
    selectPartnersCreating: (state) => state.partnersCreating,
    selectPartnersUpdating: (state) => state.partnersUpdating,
  },
});

export const partnerReducer = partnerSlice.reducer;
export const { selectPartners, selectPartner, selectPartnersFetching, selectPartnersCreating, selectPartnersUpdating } =
  partnerSlice.selectors;
