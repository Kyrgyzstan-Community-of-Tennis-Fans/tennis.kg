import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '@/axiosApi';
import { Partner } from '@/types/partnerTypes';
import { GlobalError } from '@/types/userTypes';
import { RootState } from '@/app/store';
import { isAxiosError } from 'axios';

export const fetchPartner = createAsyncThunk<Partner[], void>('partners/fetchRanks', async () => {
  const { data: partners } = await axiosApi.get<Partner[]>('/partners');
  return partners;
});

export const createPartner = createAsyncThunk<
  void,
  Partner,
  {
    rejectValue: GlobalError;
    state: RootState;
  }
>('album/create', async (partner, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    const keys = Object.keys(partner) as (keyof Partner)[];
    keys.forEach((key) => {
      const value = partner[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });
    await axiosApi.post('/artists', formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const deletePartner = createAsyncThunk<
  void,
  string,
  {
    rejectValue: GlobalError;
    state: RootState;
  }
>('artist/delete', async (partnerID, { rejectWithValue, dispatch }) => {
  try {
    await axiosApi.delete(`/partners/${partnerID}`);
    dispatch(fetchPartner());
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});
