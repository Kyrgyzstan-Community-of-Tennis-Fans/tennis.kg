import {
  addUser,
  fetchOneUser,
  fetchUsers,
  forgotPassword,
  getPermissionForUser,
  login,
  register,
  updateCurrentUserInfo,
  updateIsActive,
  updateUserInfo,
} from '@/features/users/usersThunks';
import type { GlobalError, User, ValidationError } from '@/types/user';
import { createSlice } from '@reduxjs/toolkit';

interface UsersState {
  user: User | null;
  currentUser: User | null;
  users: User[];
  usersPages: number;
  usersFetching: boolean;
  userPermission: number;
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
  updatingActive: boolean;
}

const initialState: UsersState = {
  user: null,
  currentUser: null,
  users: [],
  usersPages: 0,
  usersFetching: false,
  userPermission: 0,
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
  updatingActive: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
      state.userPermission = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.usersFetching = true;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload: users }) => {
        state.usersFetching = false;

        state.users = users.data;
        state.usersPages = users.pages;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.usersFetching = false;
      });

    builder.addCase(getPermissionForUser.fulfilled, (state, { payload: permission }) => {
      state.userPermission = permission;
    });

    builder
      .addCase(fetchOneUser.pending, (state) => {
        state.currentUser = null;
        state.usersFetching = true;
      })
      .addCase(fetchOneUser.fulfilled, (state, { payload: user }) => {
        state.usersFetching = false;
        state.currentUser = user;
      })
      .addCase(fetchOneUser.rejected, (state) => {
        state.usersFetching = false;
      });

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
        if (user.role === 'user') {
          if (user.isActive) {
            state.userPermission = 1;
          } else {
            state.userPermission = 0;
          }
        } else if (user.role === 'moderator') {
          state.userPermission = 2;
        } else {
          state.userPermission = 3;
        }
      })
      .addCase(login.rejected, (state, { payload: error }) => {
        state.loginError = error || null;
        state.loginLoading = false;
      });

    builder
      .addCase(addUser.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(addUser.fulfilled, (state) => {
        state.registerLoading = false;
      })
      .addCase(addUser.rejected, (state, { payload: error }) => {
        state.registerError = error || null;
        state.registerLoading = false;
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
        state.currentUser = user;
      })
      .addCase(updateUserInfo.rejected, (state, { payload }) => {
        state.usersUpdatingError = payload || null;
        state.usersUpdating = false;
      });

    builder
      .addCase(updateCurrentUserInfo.pending, (state) => {
        state.usersUpdating = true;
      })
      .addCase(updateCurrentUserInfo.fulfilled, (state, { payload: user }) => {
        state.usersUpdating = false;
        state.currentUser = user;
      })
      .addCase(updateCurrentUserInfo.rejected, (state, { payload }) => {
        state.usersUpdatingError = payload || null;
        state.usersUpdating = false;
      });

    builder
      .addCase(updateIsActive.pending, (state) => {
        state.updatingActive = true;
      })
      .addCase(updateIsActive.fulfilled, (state) => {
        state.updatingActive = false;
      })
      .addCase(updateIsActive.rejected, (state) => {
        state.updatingActive = false;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectCurrentUser: (state) => state.currentUser,
    selectUsersList: (state) => state.users,
    selectUsersListPages: (state) => state.usersPages,
    selectUserPermission: (state) => state.userPermission,
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
  selectCurrentUser,
  selectUsersList,
  selectUsersListPages,
  selectUserPermission,
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
