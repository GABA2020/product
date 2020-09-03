import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { DTO } from 'types/DTO';
import { STATES } from 'types/STATE';

// The initial state of the GithubRepoForm container
export const initialState: STATES.Chat = {
  loading_listLastMessage: true,
  loading_listMessage: true,
  listLastMessage: [],
  listMessages: [],
};

const ChatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    getListLastMessageAction(
      state,
      action: PayloadAction<DTO.Chat.GetListLastMessageRequest>,
    ) {
      state.listLastMessage = [];
    },
    getListLastMessageActionSuccess(
      state,
      action: PayloadAction<DTO.Chat.GetListLastMessageResponse>,
    ) {
      state.loading_listLastMessage = false;
      state.listLastMessage = action.payload.listLastMessage;
    },
    getListLastMessageActionFailed(state) {
      state.loading_listLastMessage = false;
    },
  },
});
export const { actions, reducer, name: sliceKey } = ChatSlice;
