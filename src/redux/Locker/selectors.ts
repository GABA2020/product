import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './slice';
import { RootState } from 'types';

const selectState = (state: RootState) => state.locker || initialState;

export const lockerSelector = createSelector(
  [selectState],
  ({
    reviews,
    resources,
    arrayLength,
    lastQuery,
    loading,
    listResourceCache,
  }) => ({
    reviews,
    arrayLength,
    lastQuery,
    resources,
    loading,
    listResourceCache,
  }),
);
