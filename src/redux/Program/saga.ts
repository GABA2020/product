import { takeLatest, call, put } from 'redux-saga/effects';
import { actions } from './slice';
import { DTO } from 'types/DTO';
import { getProgramOfUser } from 'services/index';
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
export function* ProgramSaga() {
  yield takeLatest(actions.getProgramReviewAction, getProgramReview);
}
