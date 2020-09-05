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
  updateUserProfile,
  addNewEducation,
  editEducation,
  deleteEducation,
  getLetters,
  addNewLetter,
  editLetter,
  deleteLetter,
  getMoreWorkExperiences,
  getMoreLetters,
  getMoreEducations,
  getGuestUserProfile,
  getAllEducations,
  getAllWorkExperiences,
} from '../../services';
import {
  getVolunteers,
  addNewVolunteer,
  editVolunteer,
  deleteVolunteer,
  getMoreVolunteers,
  getAllVolunteers,
} from 'services/VolunteerService';
import {
  getResearches,
  addNewResearch,
  editResearch,
  deleteResearch,
  getMoreResearches,
  getAllResearches,
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

export function* getAllWorkExperiencesSaga({ payload }) {
  yield delay(500);
  try {
    const response: DTO.User.WorkExperience.GetAllWorkExperiencesResponse = yield call(
      getAllWorkExperiences,
      payload,
    );
    yield put(actions.getAllWorkExperiencesActionSuccess(response));
  } catch (e) {
    yield put(actions.getAllWorkExperiencesActionFailed());
  }
}

export function* getMoreWorkExperiencesSaga({ payload }) {
  yield delay(500);
  try {
    const response: DTO.User.WorkExperience.GetMoreWorkExperiencesResponse = yield call(
      getMoreWorkExperiences,
      payload,
    );
    yield put(actions.getMoreWorkExperiencesActionSuccess(response));
  } catch (e) {
    yield put(actions.getMoreWorkExperiencesActionFailed());
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

export function* getAllEducationsSaga({ payload }) {
  try {
    const response: DTO.User.Education.GetAllEducationsResponse = yield call(
      getAllEducations,
      payload,
    );
    yield put(actions.getAllEducationsActionSuccess(response));
  } catch (e) {
    yield put(actions.getAllEducationsActionFailed());
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

export function* getMoreEducationsSaga({ payload }) {
  yield delay(500);
  try {
    const response: DTO.User.Education.GetMoreEducationsResponse = yield call(
      getMoreEducations,
      payload,
    );
    yield put(actions.getMoreEducationsActionSuccess(response));
  } catch (e) {
    yield put(actions.getMoreEducationsActionFailed());
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

export function* getAllVolunteersSaga({ payload }) {
  yield delay(500);
  try {
    const response: DTO.User.Volunteer.GetAllVolunteersResponse = yield call(
      getAllVolunteers,
      payload,
    );
    yield put(actions.getAllVolunteersActionSuccess(response));
  } catch (e) {
    yield put(actions.getAllVolunteersActionFailed());
  }
}

export function* getMoreVolunteersSaga({ payload }) {
  yield delay(500);
  try {
    const response: DTO.User.Volunteer.GetMoreVolunteersResponse = yield call(
      getMoreVolunteers,
      payload,
    );
    yield put(actions.getMoreVolunteersActionSuccess(response));
  } catch (e) {
    yield put(actions.getMoreVolunteersActionFailed());
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

export function* getAllResearchesSaga({ payload }) {
  yield delay(500);
  try {
    const response: DTO.User.Research.GetAllResearchesResponse = yield call(
      getAllResearches,
      payload,
    );
    yield put(actions.getAllResearchesActionSuccess(response));
  } catch (e) {
    yield put(actions.getAllResearchesActionFailed());
  }
}

export function* getMoreResearchesSaga({ payload }) {
  yield delay(500);
  try {
    const response: DTO.User.Research.GetMoreResearchesResponse = yield call(
      getMoreResearches,
      payload,
    );
    yield put(actions.getMoreResearchesActionSuccess(response));
  } catch (e) {
    yield put(actions.getMoreResearchesActionFailed());
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

export function* getLettersSaga({ payload }) {
  yield delay(500);
  try {
    const response: DTO.User.Letter.GetLettersResponse = yield call(
      getLetters,
      payload,
    );
    yield put(actions.getLettersActionSuccess(response));
  } catch (e) {
    yield put(actions.getLettersActionFailed());
  }
}

export function* getMoreLettersSaga({ payload }) {
  yield delay(500);
  try {
    const response: DTO.User.Letter.GetMoreLettersResponse = yield call(
      getMoreLetters,
      payload,
    );
    yield put(actions.getMoreLettersActionSuccess(response));
  } catch (e) {
    yield put(actions.getMoreLettersActionFailed());
  }
}

export function* addLetterSaga({ payload }) {
  yield delay(500);
  try {
    const response = yield call(addNewLetter, payload);
    yield put(actions.addNewLetterActionSuccess());
    yield put(actions.getLettersAction({ email: payload.email }));
  } catch (e) {
    yield put(actions.addNewLetterActionFailed());
  }
}

export function* editLetterSaga({ payload }) {
  yield delay(500);
  try {
    const response = yield call(editLetter, payload);
    yield put(actions.editLetterActionSuccess());
    yield put(actions.getLettersAction({ email: payload.email }));
  } catch (e) {
    yield put(actions.editLetterActionFailed());
  }
}

export function* deleteLetterSaga({ payload }) {
  yield delay(500);
  try {
    const response = yield call(deleteLetter, payload);
    yield put(actions.deleteLetterActionSuccess());
  } catch (e) {
    yield put(actions.deleteLetterActionFailed());
  }
}

export function* getGuestUserProfileCacheSaga({ payload }) {
  try {
    const response: DTO.User.GetGuestUserProfileCacheResponse = yield call(
      getGuestUserProfile,
      payload,
    );
    yield put(actions.getGuestUserProfileCacheActionSuccess(response));
  } catch (e) {
    yield put(actions.getGuestUserProfileCacheActionFailed());
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
  yield takeLatest(
    actions.getAllWorkExperiencesAction,
    getAllWorkExperiencesSaga,
  );
  yield takeLatest(actions.getWorkExperiencesAction, getWorkExperiencesSaga);
  yield takeLatest(
    actions.getMoreWorkExperiencesAction,
    getMoreWorkExperiencesSaga,
  );
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
  yield takeLatest(actions.getAllEducationsAction, getAllEducationsSaga);
  yield takeLatest(actions.getEducationsAction, getEducationsSaga);
  yield takeLatest(actions.getMoreEducationsAction, getMoreEducationsSaga);
  yield takeLatest(actions.addNewEducationAction, addNewEducationsSaga);
  yield takeLatest(actions.editEducationAction, editEducationsSaga);
  yield takeLatest(actions.deleteEducationAction, deleteEducationsSaga);

  //volunteer
  yield takeLatest(actions.getVolunteersAction, getVolunteersSaga);
  yield takeLatest(actions.getAllVolunteersAction, getAllVolunteersSaga);
  yield takeLatest(actions.getMoreVolunteersAction, getMoreVolunteersSaga);
  yield takeLatest(actions.getVolunteersAction, getVolunteersSaga);
  yield takeLatest(actions.addNewVolunteerAction, addVolunteerSaga);
  yield takeLatest(actions.editVolunteerAction, editVolunteerSaga);
  yield takeLatest(actions.deleteVolunteerAction, deleteVolunteerSaga);

  //research
  yield takeLatest(actions.getResearchesAction, getResearchesSaga);
  yield takeLatest(actions.getAllResearchesAction, getAllResearchesSaga);
  yield takeLatest(actions.getMoreResearchesAction, getMoreResearchesSaga);
  yield takeLatest(actions.addNewResearchAction, addResearchSaga);
  yield takeLatest(actions.editResearchAction, editResearchSaga);
  yield takeLatest(actions.deleteResearchAction, deleteResearchSaga);

  //letter
  yield takeLatest(actions.getLettersAction, getLettersSaga);
  yield takeLatest(actions.getMoreLettersAction, getMoreLettersSaga);
  yield takeLatest(actions.addNewLetterAction, addLetterSaga);
  yield takeLatest(actions.editLetterAction, editLetterSaga);
  yield takeLatest(actions.deleteLetterAction, deleteLetterSaga);

  //cache user
  yield takeLatest(
    actions.getGuestUserProfileCacheAction,
    getGuestUserProfileCacheSaga,
  );
}
