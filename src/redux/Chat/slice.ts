import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { DTO } from 'types/DTO';
import { STATES } from 'types/STATE';

// The initial state of the GithubRepoForm container
export const initialState: STATES.Chat = {
  loading_listLastMessage: true,
  loading_listMessage: true,
  loading_connectUser: true,
  listLastMessage: [],
  listMessages: [],
  last_query: {},
  messages_length: 0,
  notificationCount: 0,
  lastMessageConnect: {
    created_at: { seconds: 0 },
    is_received: false,
    last_message: '',
    sender_email: '',
    users: [],
    connect_status: 2,
  },
};

const ChatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    ListenListLastMessageAction(
      state,
      action: PayloadAction<DTO.Chat.ListenListLastMessageRequest>,
    ) {
      state.listLastMessage = [];
    },
    ListenListLastMessageActionSuccess(
      state,
      action: PayloadAction<DTO.Chat.ListenListLastMessageResponse>,
    ) {
      state.loading_listLastMessage = false;
      state.listLastMessage = action.payload.listLastMessage.sort((a, b) => {
        return b.created_at.seconds - a.created_at.seconds;
      });
    },
    ListenListLastMessageActionFailed(state) {
      state.loading_listLastMessage = false;
    },
    getListMessageAction(
      state,
      action: PayloadAction<DTO.Chat.GetListMessageRequest>,
    ) {
      state.listMessages = [];
      state.last_query = initialState.last_query;
      state.messages_length = initialState.messages_length;
    },
    getListMessageActionSuccess(
      state,
      action: PayloadAction<DTO.Chat.GetListMessageResponse>,
    ) {
      state.loading_listMessage = false;
      state.listMessages = action.payload.listMessage.reverse();
      state.last_query = action.payload.last_query;
      state.messages_length = action.payload.messages_length;
    },
    getListMessageActionFailed(state) {
      state.loading_listMessage = false;
    },
    getMoreListMessageAction(
      state,
      action: PayloadAction<DTO.Chat.GetMoreListMessageRequest>,
    ) {},
    getMoreListMessageActionSuccess(
      state,
      action: PayloadAction<DTO.Chat.GetMoreListMessageResponse>,
    ) {
      const newMessages = action.payload.listMessage.reverse();
      state.listMessages = [...newMessages, ...state.listMessages];
      state.last_query = action.payload.last_query;
    },
    getMoreListMessageActionFailed(state) {},
    sendMessageAction(
      state,
      action: PayloadAction<DTO.Chat.SendMessageRequest>,
    ) {},
    sendMessageActionSuccess(
      state,
      action: PayloadAction<DTO.Chat.SendMessageResponse>,
    ) {},
    sendMessageActionFailed(state) {},
    listenNewMessageAction(
      state,
      action: PayloadAction<DTO.Chat.listenNewMessageRequest>,
    ) {},
    listenNewMessageActionSuccess(
      state,
      action: PayloadAction<DTO.Chat.listenNewMessageResponse>,
    ) {
      state.listMessages = [...state.listMessages, action.payload.message];
      state.messages_length = state.messages_length++;
    },
    listenNewMessageActionFailed(state) {},

    setMessageToReadAction(
      state,
      action: PayloadAction<DTO.Chat.SetMessageToReadRequest>,
    ) {},
    setMessageToReadActionSuccess(state) {},
    setMessageToReadActionFailed(state) {},

    listMessageNotificationAction(
      state,
      action: PayloadAction<DTO.Chat.ListenMessageNotificationRequest>,
    ) {
      state.notificationCount = 0;
    },
    listMessageNotificationActionSuccess(
      state,
      action: PayloadAction<DTO.Chat.ListenMessageNotificationResponse>,
    ) {
      state.notificationCount = action.payload.notificationCount;
    },
    listMessageNotificationActionFailed(state) {},
    resetLastMessageConnect(state) {
      state.lastMessageConnect = initialState.lastMessageConnect;
    },
    connectUserAction(
      state,
      action: PayloadAction<DTO.Chat.ConnectUserRequest>,
    ) {
      state.lastMessageConnect = initialState.lastMessageConnect;
    },
    connectUserActionSuccess(
      state,
      action: PayloadAction<DTO.Chat.ConnectUserResponse>,
    ) {
      state.loading_connectUser = false;
      state.lastMessageConnect = action.payload.lastMessage;
    },
    connectUserActionFailed(state) {
      state.loading_connectUser = false;
    },
  },
});
export const { actions, reducer, name: sliceKey } = ChatSlice;
