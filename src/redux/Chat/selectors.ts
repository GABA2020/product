import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './slice';
import { RootState } from 'types';

const selectState = (state: RootState) => state.chat || initialState;

export const ChatSelector = createSelector(
  [selectState],
  ({
    loading_listLastMessage,
    loading_listMessage,
    listLastMessage,
    listMessages,
  }) => ({
    loading_listLastMessage,
    loading_listMessage,
    listLastMessage,
    listMessages,
  }),
);
