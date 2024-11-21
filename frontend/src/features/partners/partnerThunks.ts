import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '@/axiosApi';
import { Partner } from '@/types/partner';
import { GlobalError } from '@/types/user';
import { RootState } from '@/app/store';
import { isAxiosError } from 'axios';

export const fetchPartner = createAsyncThunk<Partner[], void>('partners/fetchPartner', async () => {
  const { data: partners } = await axiosApi.get<Partner[]>('/partners');
  return partners;
});

export const fetchOnePartner = createAsyncThunk<Partner, string>('partner/fetchOnePartner', async (id) => {
  const { data: partner } = await axiosApi.get<Partner>(`/partners/${id}`);
  return partner;
});

export const createPartner = createAsyncThunk<
  void,
  Partner,
  {
    rejectValue: GlobalError;
    state: RootState;
  }
>('partner/create', async (partner, { rejectWithValue, dispatch }) => {
  try {
    const formData = new FormData();

    const keys = Object.keys(partner) as (keyof Partner)[];
    keys.forEach((key) => {
      const value = partner[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });
    await axiosApi.post('/partners', formData);
    dispatch(fetchPartner());
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

export const updatePartner = createAsyncThunk<
  void,
  { id: string; partnerData: Partial<Partner> },
  {
    rejectValue: GlobalError;
    state: RootState;
  }
>('partners/update', async ({ id, partnerData }, { rejectWithValue, dispatch }) => {
  try {
    const formData = new FormData();
    Object.keys(partnerData).forEach((key) => {
      const value = partnerData[key as keyof Partner];
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    await axiosApi.put(`/partners/${id}`, formData);

    dispatch(fetchPartner());
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});
