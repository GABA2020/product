import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { actions } from './slice';
import { DTO } from '../../types/DTO';
import {
  getUserProfile,
  searchUsers,
  getUserSearchProfile,
  getWorkExperiences,
  getEducations,
  addNewWorkExperience,
  editWorkExperience,
  deleteWorkExperience,
  getImageURL,
  updateUserProfile,
} from '../../services';

export function* GetUserProfile({ payload }) {
  yield delay(500);
  try {
    const response: DTO.User.GetUserProfileResponse = yield call(
      getUserProfile,
      payload,
    );
    // const imageURL = yield call(getImageURL, response.avatar);
    // response = imageURL;

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
      // const imageURL = yield call(getImageURL, response.avatar);
      // response.avatar = imageURL;

      yield put(actions.getUserSearchProfileActionSuccess(response));
    } else {
      yield put(actions.getUserSearchProfileActionFailed());
    }
  } catch (e) {
    yield put(actions.getUserSearchProfileActionFailed());
  }
}

function* updateUserProfileSaga({ payload }) {
  yield delay(500);
  try {
    const response = yield call(updateUserProfile, payload);
    yield put(actions.updateUserProfileActionSuccess());
  } catch (e) {
    yield put(actions.getUserProfileActionFailed());
  }
}

export function* getWorkExperiencesSaga({ payload }) {
  yield delay(500);
  try {
    const response: DTO.User.GetWorkExperiencesResponse = yield call(
      getWorkExperiences,
      payload,
    );
    yield put(actions.getWorkExperiencesActionSuccess(response));
  } catch (e) {
    yield put(actions.getWorkExperiencesActionFailed());
  }
}
export function* addNewWorkExperienceSaga({ payload }) {
  yield delay(500);
  try {
    const response = yield call(addNewWorkExperience, payload);
    yield put(actions.getWorkExperiencesAction({ email: payload.email }));
    yield put(actions.addNewWorkExperienceActionSuccess());
  } catch (e) {
    yield put(actions.addNewWorkExperienceActionFailed());
  }
}
export function* editWorkExperienceSaga({ payload }) {
  yield delay(500);
  try {
    const response = yield call(editWorkExperience, payload);
    yield put(actions.getWorkExperiencesAction({ email: payload.email }));
    yield put(actions.editWorkExperienceActionSuccess());
  } catch (e) {
    yield put(actions.editWorkExperienceActionFailed());
  }
}

export function* deleteWorkExperienceSaga({ payload }) {
  yield delay(500);
  try {
    const response = yield call(deleteWorkExperience, payload);
    yield put(actions.deleteWorkExperienceActionSuccess());
  } catch (e) {
    yield put(actions.deleteWorkExperienceActionFailed());
  }
}

export function* getEducationsSaga({ payload }) {
  yield delay(500);
  try {
    const response: DTO.User.GetEducationsResponse = yield call(
      getEducations,
      payload,
    );
    yield put(actions.getEducationsActionSuccess(response));
  } catch (e) {
    yield put(actions.getEducationsActionFailed());
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* UserSaga() {
  // profile
  yield takeLatest(actions.getUserProfileAction, GetUserProfile);
  yield takeLatest(actions.searchUsersAction, searchUsersSaga);
  yield takeLatest(
    actions.getUserSearchProfileAction,
    getUserSearchProfileSaga,
  );

  yield takeLatest(actions.updateUserProfileAction, updateUserProfileSaga);
  // work
  yield takeLatest(actions.getWorkExperiencesAction, getWorkExperiencesSaga);
  yield takeLatest(
    actions.addNewWorkExperienceAction,
    addNewWorkExperienceSaga,
  );
  yield takeLatest(actions.editWorkExperienceAction, editWorkExperienceSaga);
  yield takeLatest(
    actions.deleteWorkExperienceActionAction,
    deleteWorkExperienceSaga,
  );

  //education
  yield takeLatest(actions.getEducationsAction, getEducationsSaga);
}
