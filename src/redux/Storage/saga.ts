import { takeLatest, call, put } from 'redux-saga/effects';
import { actions } from './slice';
import {
  getImageURL,
  uploadAvatar,
  uploadFile,
  getFileURL,
} from 'services/index';
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

export function* uploadFileSaga({ payload }) {
  try {
    const response: DTO.Storage.UploadFileResponse = yield call(
      uploadFile,
      payload,
    );
    yield put(actions.uploadFileActionSuccess(response));
  } catch (e) {
    yield put(actions.uploadFileActionFailed());
  }
}

export function* getFileUrlSaga({ payload }) {
  try {
    const response: DTO.Storage.GetFileUrlResponse = yield call(
      getFileURL,
      payload,
    );
    yield put(actions.getFileUrlActionSuccess(response));
  } catch (e) {
    yield put(actions.getFileUrlActionFailed());
  }
}
export function* StorageSaga() {
  yield takeLatest(actions.getImageUrlAction, getAvatarUrl);

  yield takeLatest(actions.uploadFileAction, uploadFileSaga);
  yield takeLatest(actions.getFileUrlAction, getFileUrlSaga);
}
