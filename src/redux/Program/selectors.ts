import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from './slice';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.program || initialState;

export const programSelector = createSelector(
  [selectDomain],
  ({ program, loading }) => ({
    program,
    loading,
  }),
);
