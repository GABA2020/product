import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { actions } from './slice';
import { actions as userActions } from 'redux/User/slice';
import { login, logout } from '../../services';
import { toast } from 'react-toastify';
import { history } from 'utils/history';
import { DTO } from 'types/DTO';
import moment from 'moment';

const isUserPayment = (
  last_login: string,
  membership_type: string,
  payment_complete: boolean,
) => {
  if (
    membership_type === 'GABASilver' &&
    payment_complete === false &&
    moment().diff(last_login, 'days') >= 3
  ) {
    return false;
  }
  return true;
};

/**
 * Github repos request/response handler
 */
export function* loginSaga({ payload }) {
  yield delay(500);
  try {
    yield put(userActions.resetSearchUsersAction());
    const response: DTO.Auth.LoginResponse = yield call(login, payload);
    if (response.username) {
      if (
        response.last_login.trim() !== '' &&
        moment(response.last_login).isValid()
      ) {
        const last_login = moment(response.last_login).format('yyyy-MM-DD');
        if (
          isUserPayment(
            last_login,
            response.membership_type,
            response.payment_complete,
          ) === false
        ) {
          yield put(actions.loginActionFailed());
          alert('Redirect to payment page');
        } else {
          yield put(actions.loginActionSuccess(response.username));
          toast.info('Welcome to GABA !');
          history.push(`/${response.username}`);
        }
      } else {
        yield put(actions.loginActionFailed());
        alert('Redirect to payment page');
      }
    }
  } catch (e) {
    toast.error('Unable to log in with provided credentials');
    yield put(actions.loginActionFailed());
  }
}

export function* logoutSaga() {
  yield delay(500);
  try {
    yield call(logout);
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
