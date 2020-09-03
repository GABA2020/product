import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './slice';
import { RootState } from 'types';

const selectState = (state: RootState) => state.chat || initialState;

export const ChatSelector = createSelector(
  [selectState],
  ({
    loading_listLastMessage,
    loading_listMessage,
    loading_connectUser,
    listLastMessage,
    listMessages,
    messages_length,
    last_query,
    currentUserKey,
  }) => ({
    loading_connectUser,
    loading_listLastMessage,
    loading_listMessage,
    listLastMessage,
    listMessages,
    messages_length,
    last_query,
    currentUserKey,
  }),
);
