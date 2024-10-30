import { createSlice } from '@reduxjs/toolkit';
import { Partner } from '@/types/partnerTypes';
import { createPartner, deletePartner, fetchPartner } from '@/features/partners/partnerThunks';

interface PartnerState {
  partners: Partner[];
  partnersFetching: boolean;
}

const initialState: PartnerState = {
  partners: [],
  partnersFetching: false,
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
      .addCase(fetchPartner.fulfilled, (state, { payload: partner }) => {
        state.partnersFetching = false;
        state.partners = partner;
      })
      .addCase(fetchPartner.rejected, (state) => {
        state.partnersFetching = false;
      });
    builder
      .addCase(createPartner.pending, (state) => {
        state.partnersFetching = true;
      })
      .addCase(createPartner.fulfilled, (state) => {
        state.partnersFetching = false;
      })
      .addCase(createPartner.rejected, (state) => {
        state.partnersFetching = false;
      });
    builder.addCase(deletePartner.rejected, (state, { meta }) => {
      state.partners = state.partners.filter((partner) => partner._id !== meta.arg);
    });
  },
  selectors: {
    selectPartners: (state) => state.partners,
    selectPartnersFetching: (state) => state.partnersFetching,
  },
});

export const partnerReducer = partnerSlice.reducer;
export const { selectPartners, selectPartnersFetching } = partnerSlice.selectors;
