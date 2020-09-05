import { takeLatest, call, put, take } from 'redux-saga/effects';
import { actions } from './slice';
import { DTO } from 'types/DTO';
import {
  listenListLastMessage,
  getListMessage,
  sendMessage,
  listenNewMessage,
  getMoreListMessage,
  setMessageToRead,
  connectUser,
  responseConnect,
} from 'services';
import { eventChannel } from 'redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';

function* getListLastMessageSaga({ payload }) {
  try {
    const channelChats = eventChannel(onChanges =>
      listenListLastMessage(payload, onChanges),
    );
    while (true) {
      const listLastMessage: ENTITIES.LastMessage[] = yield take(channelChats);
      yield put(
        actions.ListenListLastMessageActionSuccess({ listLastMessage }),
      );
    }
  } catch (error) {
    yield put(actions.ListenListLastMessageActionFailed());
  }
}

function* getListMessageSaga({ payload }) {
  try {
    const response: DTO.Chat.GetListMessageResponse = yield call(
      getListMessage,
      payload,
    );
    yield put(actions.getListMessageActionSuccess(response));
  } catch (error) {
    yield put(actions.getListMessageActionFailed());
  }
}

function* getMoreListMessageSaga({ payload }) {
  try {
    const response: DTO.Chat.GetMoreListMessageResponse = yield call(
      getMoreListMessage,
      payload,
    );
    yield put(actions.getMoreListMessageActionSuccess(response));
  } catch (error) {
    yield put(actions.getMoreListMessageActionFailed());
  }
}

function* sendMessageSaga({ payload }) {
  try {
    const response: DTO.Chat.SendMessageResponse = yield call(
      sendMessage,
      payload,
    );
    yield put(actions.sendMessageActionSuccess(response));
  } catch (error) {
    yield put(actions.sendMessageActionFailed());
  }
}

function* setMessageToReadSaga({ payload }) {
  try {
    yield call(setMessageToRead, payload);
    yield put(actions.setMessageToReadActionSuccess());
  } catch (error) {
    yield put(actions.setMessageToReadActionFailed());
  }
}

function* listenNewMessageSaga({ payload }) {
  try {
    const channelChats = eventChannel(onChanges =>
      listenNewMessage(payload, onChanges),
    );
    while (true) {
      const chats: ENTITIES.Message[] = yield take(channelChats);
      if (chats.length > 0) {
        yield put(
          actions.listenNewMessageActionSuccess({
            message: chats[chats.length - 1],
          }),
        );
      } else {
        yield put(actions.listenNewMessageActionFailed());
      }
    }
  } catch (error) {
    yield put(actions.listenNewMessageActionFailed());
  }
}

function* connectUserSaga(action: PayloadAction<DTO.Chat.ConnectUserRequest>) {
  try {
    const response: DTO.Chat.ConnectUserResponse = yield call(
      connectUser,
      action.payload,
    );
    if (response !== undefined) {
      yield put(
        actions.connectUserActionSuccess({
          users_mail_key: response.users_mail_key,
        }),
      );
    }
  } catch (error) {
    yield put(actions.connectUserActionFailed());
  }
}

function* responseConnectSaga(
  action: PayloadAction<DTO.Chat.ResponseConnectRequest>,
) {
  try {
    yield call(responseConnect, action.payload);
    yield put(actions.responseConnectActionSuccess());
  } catch (error) {
    yield put(actions.responseConnectActionFailed());
  }
}

export function* ChatSaga() {
  yield takeLatest(actions.ListenListLastMessageAction, getListLastMessageSaga);
  yield takeLatest(actions.getListMessageAction, getListMessageSaga);
  yield takeLatest(actions.getMoreListMessageAction, getMoreListMessageSaga);
  yield takeLatest(actions.sendMessageAction, sendMessageSaga);
  yield takeLatest(actions.listenNewMessageAction, listenNewMessageSaga);
  yield takeLatest(actions.setMessageToReadAction, setMessageToReadSaga);
  yield takeLatest(actions.connectUserAction, connectUserSaga);
  yield takeLatest(actions.responseConnectAction, responseConnectSaga);
}
