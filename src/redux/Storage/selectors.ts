import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from './slice';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.storage || initialState;

export const storageSelector = createSelector(selectDomain, ({ fileUrls }) => {
  return {
    fileUrls,
  };
});
