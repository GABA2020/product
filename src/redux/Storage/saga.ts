import { takeLatest, call, put } from 'redux-saga/effects';
import { actions } from './slice';
import { getImageURL, uploadAvatar } from 'services/index';
import { DTO } from 'types/DTO';
/**
 * Root saga manages watcher lifecycle
 */
export function* getAvatarUrl({ payload }) {
  try {
    const response: string = yield call(getImageURL, payload);
    yield put(
      actions.getImageUrlActionSuccess({ name: payload.name, url: response }),
    );
  } catch (e) {
    yield put(actions.getImageUrlActionFailed());
  }
}

export function* uploadAvatarSaga({ payload }) {
  try {
    const response: DTO.Storage.UploadAvatarResponse = yield call(
      uploadAvatar,
      payload,
    );
    yield put(actions.uploadAvatarActionSuccess(response));
  } catch (e) {
    yield put(actions.uploadAvatarActionFailed());
  }
}
export function* StorageSaga() {
  yield takeLatest(actions.getImageUrlAction, getAvatarUrl);
  yield takeLatest(actions.uploadAvatarAction, uploadAvatarSaga);
}
