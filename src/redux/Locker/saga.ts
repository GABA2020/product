import { call, put, takeLatest, delay, cps } from 'redux-saga/effects';
import { actions } from './slice';
import { DTO } from 'types/DTO';
import {
  getMoreReviews,
  getReviews,
  getUserResources,
  getMoreUserResources,
  getResourceDetail,
  addNewUserResource,
  getAllUserResources,
  editUserResource,
  deleteUserResource,
} from 'services';

export function* getReviewSaga({ payload }) {
  delay(500);

  try {
    const response: DTO.Locker.Review.GetReviewsResponse = yield call(
      getReviews,
      payload,
    );

    yield put(actions.getReviewsActionSuccess(response));
  } catch (error) {
    yield put(actions.getReviewsActionFailed());
  }
}

export function* getMoreReviewSaga({ payload }) {
  delay(500);
  try {
    const response: DTO.Locker.Review.GetMoreReviewsResponse = yield call(
      getMoreReviews,
      payload,
    );
    yield put(actions.getMoreReviewsActionSuccess(response));
  } catch (error) {
    yield put(actions.getMoreReviewsActionFailed());
  }
}

export function* getUserResourcesSaga({ payload }) {
  delay(500);

  try {
    const response: DTO.Locker.UserResource.getUserResourcesResponse = yield call(
      getUserResources,
      payload,
    );

    yield put(actions.getUserResourcesActionSuccess(response));
  } catch (error) {
    yield put(actions.getUserResourcesActionFailed());
  }
}

export function* getMoreUserResourcesSaga({ payload }) {
  delay(500);

  try {
    const response: DTO.Locker.UserResource.getMoreUserResourcesResponse = yield call(
      getMoreUserResources,
      payload,
    );

    yield put(actions.getMoreUserResourcesActionSuccess(response));
  } catch (error) {
    yield put(actions.getMoreUserResourcesActionFailed());
  }
}

export function* getUserResourceDetailSaga({ payload }) {
  delay(500);

  try {
    const response: DTO.Locker.Resource.GetResourceDetailResponse = yield call(
      getResourceDetail,
      payload,
    );
    yield put(actions.getResourceDetailActionSuccess(response));
  } catch (error) {
    yield put(actions.getResourceDetailActionFailed());
  }
}

export function* addUserResourceSaga({ payload }) {
  delay(500);

  try {
    const response: DTO.Locker.UserResource.AddUserResourceResponse = yield call(
      addNewUserResource,
      payload,
    );

    yield put(actions.addUserResourceActionSuccess(response));
    yield put(actions.getUserResourcesAction({ email: payload.email }));
    yield put(actions.getReviewsAction({ email: payload.email }));
    //update list all user resource
    yield put(actions.getAllUserResourceAction({ email: payload.email }));
  } catch (error) {
    yield put(actions.addUserResourceActionFailed());
  }
}

export function* editUserResourceSaga({ payload }) {
  delay(500);

  try {
    const response: DTO.Locker.UserResource.EditUserResourceResponse = yield call(
      editUserResource,
      payload,
    );

    yield put(actions.editUserResourceActionSuccess(response));
    yield put(actions.getUserResourcesAction({ email: payload.email }));
  } catch (error) {
    yield put(actions.editUserResourceActionFailed());
  }
}

export function* deleteUserResourceSaga({ payload }) {
  delay(500);

  try {
    const response: DTO.Locker.UserResource.DeleteUserResourceResponse = yield call(
      deleteUserResource,
      payload,
    );

    yield put(actions.deleteUserResourceActionSuccess(response));
    yield put(actions.getUserResourcesAction({ email: payload.email }));
  } catch (error) {
    yield put(actions.deleteUserResourceActionFailed());
  }
}

export function* getAllUserResourceSaga({ payload }) {
  delay(500);

  try {
    const response: DTO.Locker.UserResource.getAllUserResourcesResponse = yield call(
      getAllUserResources,
      payload,
    );

    yield put(actions.getAllUserResourceActionSuccess(response));
  } catch (error) {
    yield put(actions.getAllUserResourceActionFailed());
  }
}

export function* LockerSaga() {
  yield takeLatest(actions.getReviewsAction, getReviewSaga);
  yield takeLatest(actions.getMoreReviewsAction, getMoreReviewSaga);

  yield takeLatest(actions.getUserResourcesAction, getUserResourcesSaga);
  yield takeLatest(
    actions.getMoreUserResourcesAction,
    getMoreUserResourcesSaga,
  );
  yield takeLatest(actions.getResourceDetailAction, getUserResourceDetailSaga);
  yield takeLatest(actions.addUserResourceAction, addUserResourceSaga);
  yield takeLatest(actions.editUserResourceAction, editUserResourceSaga);
  yield takeLatest(actions.deleteUserResourceAction, deleteUserResourceSaga);
  yield takeLatest(actions.getAllUserResourceAction, getAllUserResourceSaga);
}
