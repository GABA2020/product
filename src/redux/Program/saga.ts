import { takeLatest, call, put } from 'redux-saga/effects';
import { actions } from './slice';
import { DTO } from 'types/DTO';
import { getProgramOfUser, updateProgramOfUser } from 'services/index';
/**
 * Root saga manages watcher lifecycle
 */
export function* getProgramReview({ payload }) {
  try {
    const program: DTO.Program.GetProgramReviewResponse = yield call(
      getProgramOfUser,
      payload,
    );
    yield put(actions.getProgramReviewActionSuccess(program));
  } catch (e) {
    yield put(actions.getProgramReviewActionFailed());
  }
}

export function* updateProgramReview({ payload }) {
  try {
    yield call(updateProgramOfUser, payload);
    yield put(actions.updateProgramActionSuccess());
  } catch (e) {
    yield put(actions.updateProgramActionFailed());
  }
}
export function* ProgramSaga() {
  yield takeLatest(actions.getProgramReviewAction, getProgramReview);
  yield takeLatest(actions.updateProgramAction, updateProgramReview);
}
