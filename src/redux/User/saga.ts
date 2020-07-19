import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { actions } from './slice';
import { DTO } from '../../types/DTO';
import {
  getUserProfile,
  searchUsers,
  getUserSearchProfile,
} from '../../services';

export function* GetUserProfile({ payload }) {
  yield delay(500);
  try {
    const response: DTO.User.GetUserProfileResponse = yield call(
      getUserProfile,
      payload,
    );

    yield put(actions.getUserProfileActionSuccess(response));
  } catch (e) {
    yield put(actions.getUserProfileActionFailed());
  }
}

export function* searchUsersSaga({ payload }) {
  yield delay(500);
  try {
    const response: DTO.User.SearchUsersResponse = yield call(
      searchUsers,
      payload,
    );
    yield put(actions.searchUsersActionSuccess(response));
  } catch (e) {
    yield put(actions.searchUsersActionFailed());
  }
}

export function* getUserSearchProfileSaga({ payload }) {
  yield delay(500);
  try {
    const response: DTO.User.GetUserSearchProfileResponse = yield call(
      getUserSearchProfile,
      payload,
    );
    if (response) {
      yield put(actions.getUserSearchProfileActionSuccess(response));
    } else {
      yield put(actions.getUserSearchProfileActionFailed());
    }
  } catch (e) {
    yield put(actions.getUserSearchProfileActionFailed());
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* UserSaga() {
  yield takeLatest(actions.getUserProfileAction, GetUserProfile);
  yield takeLatest(actions.searchUsersAction, searchUsersSaga);
  yield takeLatest(
    actions.getUserSearchProfileAction,
    getUserSearchProfileSaga,
  );
}
