import { takeLatest, call, delay, put } from 'redux-saga/effects';
import { actions } from './slice';
import { DTO } from 'types/DTO';
import { getListLastMessage } from 'services';

function* getListLastMessageSaga({ payload }) {
  try {
    const response: DTO.Chat.GetListLastMessageResponse = yield call(
      getListLastMessage,
      payload,
    );
    yield put(actions.getListLastMessageActionSuccess(response));
  } catch (error) {
    yield put(actions.getListLastMessageActionFailed());
  }
}
export function* ChatSaga() {
  yield takeLatest(actions.getListLastMessageAction, getListLastMessageSaga);
}
