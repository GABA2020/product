import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './slice';
import { RootState } from 'types';

const selectState = (state: RootState) => state.locker || initialState;

export const lockerSelector = createSelector(
  [selectState],
  ({
    reviews,
    userResources,
    lastQuery,
    loading,
    listResourceCache,
    reviewLength,
    userResourceLength,
  }) => ({
    reviews,
    lastQuery,
    userResources,
    loading,
    listResourceCache,
    reviewLength,
    userResourceLength,
  }),
);
