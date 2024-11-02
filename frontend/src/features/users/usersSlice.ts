import { forgotPassword, login, register, updateUserInfo } from '@/features/users/usersThunks';
import type { GlobalError, User, ValidationError } from '@/types/userTypes';
import { createSlice } from '@reduxjs/toolkit';

interface UsersState {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
  forgotPasswordLoading: boolean;
  forgotPasswordError: GlobalError | null;
  resetPasswordLoading: boolean;
  resetPasswordError: GlobalError | null;
  usersUpdating: boolean;
  usersUpdatingError: GlobalError | null;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  forgotPasswordLoading: false,
  forgotPasswordError: null,
  resetPasswordError: null,
  resetPasswordLoading: false,
  usersUpdating: false,
  usersUpdatingError: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(register.fulfilled, (state, { payload: user }) => {
        state.registerLoading = false;
        state.user = user;
      })
      .addCase(register.rejected, (state, { payload: error }) => {
        state.registerError = error || null;
        state.registerLoading = false;
      });

    builder
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, { payload: user }) => {
        state.loginLoading = false;
        state.user = user;
      })
      .addCase(login.rejected, (state, { payload: error }) => {
        state.loginError = error || null;
        state.loginLoading = false;
      });

    builder
      .addCase(forgotPassword.pending, (state) => {
        state.forgotPasswordError = null;
        state.forgotPasswordLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.forgotPasswordLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, { payload: error }) => {
        state.forgotPasswordError = error || null;
        state.forgotPasswordLoading = false;
      });

    builder
      .addCase(updateUserInfo.pending, (state) => {
        state.usersUpdating = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, { payload: user }) => {
        state.usersUpdating = false;
        state.user = user;
      })
      .addCase(updateUserInfo.rejected, (state) => {
        state.usersUpdating = false;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectRegisterLoading: (state) => state.registerLoading,
    selectRegisterError: (state) => state.registerError,
    selectLoginLoading: (state) => state.loginLoading,
    selectLoginError: (state) => state.loginError,
    selectForgotPasswordLoading: (state) => state.forgotPasswordLoading,
    selectForgotPasswordError: (state) => state.forgotPasswordError,
    selectResetPasswordLoading: (state) => state.resetPasswordLoading,
    selectResetPasswordError: (state) => state.resetPasswordError,
    selectUpdating: (state) => state.usersUpdating,
    selectUpdatingError: (state) => state.usersUpdatingError,
  },
});

export const { unsetUser } = usersSlice.actions;

export const {
  selectUser,
  selectRegisterLoading,
  selectRegisterError,
  selectLoginLoading,
  selectLoginError,
  selectForgotPasswordLoading,
  selectForgotPasswordError,
  selectResetPasswordLoading,
  selectResetPasswordError,
  selectUpdating,
  selectUpdatingError,
} = usersSlice.selectors;
