import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.auth || initialState;

export const authSelector = createSelector(
  [selectDomain],
  ({ isAuth, email, username, loading }) => ({
    isAuth,
    email,
    username,
    loading,
  }),
);
