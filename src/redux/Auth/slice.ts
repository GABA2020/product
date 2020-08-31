/*
 * GithubRepoForm Slice
 *
 * Here we define:
 * - The shape of our container's slice of Redux store,
 * - All the actions which can be triggered for this slice, including their effects on the store.
 *
 * Note that, while we are using dot notation in our reducer, we are not actually mutating the state
 * manually. Under the hood, we use immer to apply these updates to a new copy of the state.
 * Please see https://immerjs.github.io/immer/docs/introduction for more information.
 *
 */

import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { DTO } from 'types/DTO';
import { STATES } from 'types/STATE';

// The initial state of the GithubRepoForm container
export const initialState: STATES.Auth = {
  loading: true,
  isAuth: false,
  email: '',
  username: '',
};

const AuthSliceState = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutAction(state) {
      state.loading = true;
    },
    logoutActionSuccess(state) {
      state.loading = false;
      state.isAuth = false;
    },
    loginAction(state, action: PayloadAction<DTO.Auth.LoginRequest>) {
      state.loading = true;
      state.isAuth = false;
      state.email = action.payload.email;
    },
    loginActionSuccess(state, action: PayloadAction<DTO.Auth.LoginResponse>) {
      state.loading = false;
      state.isAuth = true;
      state.username = action.payload.username;
    },
    loginActionFailed(state) {
      state.loading = false;
      state.isAuth = false;
    },
  },
});

export const { actions, reducer, name: sliceKey } = AuthSliceState;
