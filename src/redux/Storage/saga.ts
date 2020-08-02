import { takeLatest, call, put } from 'redux-saga/effects';
import { actions } from './slice';
import { DTO } from 'types/DTO';
import { getImageURL, uploadAvatar } from 'services/index';
/**
 * Root saga manages watcher lifecycle
 */
export function* getAvatarUrl({ payload }) {
  try {
    const response: string = yield call(getImageURL, payload);
    yield put(actions.getAvatarURLActionSuccess(response));
  } catch (e) {
    yield put(actions.getAvatarURLActionFailed());
  }
}
export function* uploadAvatarSaga({ payload }) {
  try {
    const response: string = yield call(uploadAvatar, payload);
    yield put(actions.uploadAvatarActionSuccess(response));
  } catch (e) {
    yield put(actions.uploadAvatarActionFailed());
  }
}
export function* StorageSaga() {
  yield takeLatest(actions.getAvatarURLAction, getAvatarUrl);
  yield takeLatest(actions.uploadAvatarAction, uploadAvatarSaga);
}
