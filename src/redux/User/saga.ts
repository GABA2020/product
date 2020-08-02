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
  addNewEducation,
  editEducation,
  deleteEducation,
} from '../../services';
import {
  getVolunteers,
  addNewVolunteer,
  editVolunteer,
  deleteVolunteer,
} from 'services/VolunteerService';
import {
  getResearches,
  addNewResearch,
  editResearch,
  deleteResearch,
} from 'services/ResearchService';

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
    const response: DTO.User.WorkExperience.GetWorkExperiencesResponse = yield call(
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
    const response: DTO.User.Education.GetEducationsResponse = yield call(
      getEducations,
      payload,
    );
    yield put(actions.getEducationsActionSuccess(response));
  } catch (e) {
    yield put(actions.getEducationsActionFailed());
  }
}

export function* addNewEducationsSaga({ payload }) {
  yield delay(500);
  try {
    const response = yield call(addNewEducation, payload);
    yield put(actions.addNewEducationActionSuccess());
    yield put(actions.getEducationsAction({ email: payload.email }));
  } catch (e) {
    yield put(actions.addNewEducationActionFailed());
  }
}

export function* editEducationsSaga({ payload }) {
  yield delay(500);
  try {
    const response = yield call(editEducation, payload);
    yield put(actions.editEducationActionSuccess());
    yield put(actions.getEducationsAction({ email: payload.email }));
  } catch (e) {
    yield put(actions.editEducationActionFailed());
  }
}

export function* deleteEducationsSaga({ payload }) {
  yield delay(500);
  try {
    const response = yield call(deleteEducation, payload);
    yield put(actions.deleteEducationActionSuccess());
  } catch (e) {
    yield put(actions.deleteEducationActionFailed());
  }
}

export function* getVolunteersSaga({ payload }) {
  yield delay(500);
  try {
    const response: DTO.User.Volunteer.GetVolunteersResponse = yield call(
      getVolunteers,
      payload,
    );
    yield put(actions.getVolunteersActionSuccess(response));
  } catch (e) {
    yield put(actions.getVolunteersActionFailed());
  }
}

export function* addVolunteerSaga({ payload }) {
  yield delay(500);
  try {
    const response = yield call(addNewVolunteer, payload);
    yield put(actions.addNewVolunteerActionSuccess());
    yield put(actions.getVolunteersAction({ email: payload.email }));
  } catch (e) {
    yield put(actions.addNewVolunteerActionFailed());
  }
}

export function* editVolunteerSaga({ payload }) {
  yield delay(500);
  try {
    const response = yield call(editVolunteer, payload);
    yield put(actions.editVolunteerActionSuccess());
    yield put(actions.getVolunteersAction({ email: payload.email }));
  } catch (e) {
    yield put(actions.editVolunteerActionFailed());
  }
}

export function* deleteVolunteerSaga({ payload }) {
  yield delay(500);
  try {
    const response = yield call(deleteVolunteer, payload);
    yield put(actions.deleteVolunteerActionSuccess());
  } catch (e) {
    yield put(actions.deleteVolunteerActionFailed());
  }
}

export function* getResearchesSaga({ payload }) {
  yield delay(500);
  try {
    const response: DTO.User.Research.GetResearchesResponse = yield call(
      getResearches,
      payload,
    );
    yield put(actions.getResearchesActionSuccess(response));
  } catch (e) {
    yield put(actions.getResearchesActionFailed());
  }
}

export function* addResearchSaga({ payload }) {
  yield delay(500);
  try {
    const response = yield call(addNewResearch, payload);
    yield put(actions.addNewResearchActionSuccess());
    yield put(actions.getResearchesAction({ email: payload.email }));
  } catch (e) {
    yield put(actions.addNewResearchActionFailed());
  }
}

export function* editResearchSaga({ payload }) {
  yield delay(500);
  try {
    const response = yield call(editResearch, payload);
    yield put(actions.editResearchActionSuccess());
    yield put(actions.getResearchesAction({ email: payload.email }));
  } catch (e) {
    yield put(actions.editResearchActionFailed());
  }
}

export function* deleteResearchSaga({ payload }) {
  yield delay(500);
  try {
    const response = yield call(deleteResearch, payload);
    yield put(actions.deleteResearchActionSuccess());
  } catch (e) {
    yield put(actions.deleteResearchActionFailed());
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
  yield takeLatest(actions.addNewEducationAction, addNewEducationsSaga);
  yield takeLatest(actions.editEducationAction, editEducationsSaga);
  yield takeLatest(actions.deleteEducationAction, deleteEducationsSaga);

  //volunteer
  yield takeLatest(actions.getVolunteersAction, getVolunteersSaga);
  yield takeLatest(actions.addNewVolunteerAction, addVolunteerSaga);
  yield takeLatest(actions.editVolunteerAction, editVolunteerSaga);
  yield takeLatest(actions.deleteVolunteerAction, deleteVolunteerSaga);

  //research
  yield takeLatest(actions.getResearchesAction, getResearchesSaga);
  yield takeLatest(actions.addNewResearchAction, addResearchSaga);
  yield takeLatest(actions.editResearchAction, editResearchSaga);
  yield takeLatest(actions.deleteResearchAction, deleteResearchSaga);
}
