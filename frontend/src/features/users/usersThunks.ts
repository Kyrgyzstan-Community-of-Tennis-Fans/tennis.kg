import type { RootState } from '@/app/store';
import { axiosApi } from '@/axiosApi';
import { unsetUser } from '@/features/users/usersSlice';
import type {
  GlobalError,
  LoginMutation,
  RegisterMutation,
  RegisterMutationWithoutCoupleFields,
  User,
  ValidationError,
} from '@/types/userTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

export const register = createAsyncThunk<User, RegisterMutation, { rejectValue: ValidationError }>(
  'users/register',
  async (registerMutation, { rejectWithValue }) => {
    try {
      const { data: user } = await axiosApi.post<User>('/users', registerMutation);

      return user;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);

export const login = createAsyncThunk<User, LoginMutation, { rejectValue: GlobalError }>(
  'users/login',
  async (loginMutation, { rejectWithValue }) => {
    try {
      const { data: user } = await axiosApi.post<User>('/users/sessions', loginMutation);

      return user;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);

export const logout = createAsyncThunk<void, void, { state: RootState }>(
  'users/logout',
  async (_arg, { getState, dispatch }) => {
    const token = getState().users.user?.token;
    await axiosApi.delete('/users/sessions', { headers: { Authorization: `Bearer ${token}` } });
    dispatch(unsetUser());
  },
);

export const forgotPassword = createAsyncThunk<void, string, { rejectValue: GlobalError }>(
  'users/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      await axiosApi.post('/users/forgot-password', { email });
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);

export const resetPassword = createAsyncThunk<void, { password: string; token: string }, { rejectValue: GlobalError }>(
  'users/resetPassword',
  async ({ password, token }, { rejectWithValue }) => {
    try {
      await axiosApi.post(`/users/reset-password/${token}`, { password });
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);

export const updateUserInfo = createAsyncThunk<User, RegisterMutationWithoutCoupleFields, { rejectValue: GlobalError }>(
  'users/updateUserInfo',
  async (userInfo) => {
    try {
      const { data: user } = await axiosApi.put<User>('/users/update-info', userInfo);

      return user;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        if (error.response.data.error) {
          toast.error(error.response.data.error);
        }
      }

      throw error;
    }
  },
);
