import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { actions } from './slice';
import { actions as userActions } from 'redux/User/slice';
import { login, logout } from '../../services';
import { toast } from 'react-toastify';
import { history } from 'utils/history';
import { DTO } from 'types/DTO';

/**
 * Github repos request/response handler
 */
export function* loginSaga({ payload }) {
  yield delay(500);
  try {
    const response: DTO.Auth.LoginResponse = yield call(login, payload);
    if (response.username) {
      yield put(actions.loginActionSuccess({ username: response.username }));
      yield put(userActions.resetSearchUsersAction());
      toast.info('Welcome to GABA !');
      history.push(`/${response.username}`);
    }
  } catch (e) {
    toast.error('Unable to log in with provided credentials');
    yield put(actions.loginActionFailed());
  }
}

export function* logoutSaga({ payload }) {
  yield delay(500);
  try {
    const response = yield call(logout);
    yield put(actions.logoutActionSuccess());
  } catch (e) {
    yield put(actions.logoutActionSuccess());
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* AuthSaga() {
  yield takeLatest(actions.loginAction, loginSaga);
  yield takeLatest(actions.logoutAction, logoutSaga);
}
