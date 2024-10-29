import { createSlice } from '@reduxjs/toolkit';
import { Partner } from '@/types/partnerTypes';
import { fetchPartner } from '@/features/partners/partnerThunks';

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
    builder.addCase(fetchPartner.pending, (state) => {
      state.partnersFetching = true;
    });
    builder.addCase(fetchPartner.fulfilled, (state, { payload: partner }) => {
      state.partnersFetching = false;
      state.partners = partner;
    });
    builder.addCase(fetchPartner.rejected, (state) => {
      state.partnersFetching = false;
    });
  },
  selectors: {
    selectPartners: (state) => state.partners,
    selectPartnersFetching: (state) => state.partnersFetching,
  },
});

export const partnerReducer = partnerSlice.reducer;
export const { selectPartners, selectPartnersFetching } = partnerSlice.selectors;
