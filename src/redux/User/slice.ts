/*
 * GithubRepoForm Slice
 *
 * Here we define:
 * - The shape of our container's slice of Redux store,
 * - All the actions which can be triggered for this slice, including their effects on the store.
 *
 * Note that, while we are using dot notation in our reducer, we are not actually mutating the state
 * manually. Under the hood, we use immer to apply these updates to a new copy of the state.
 * Please see https://immerjs.github.io/immer/docs/introduction for more information.
 *
 */

import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { DTO } from 'types/DTO';

export const initialState: STATES.User = {
  loading: true,
  loadingSearchBox: true,
  loadingUserSearchProfile: true,
  workExperiences: [],
  educations: [],
  userProfile: {
    email: '',
    avatar: '',
    awards: '',
    about: '',
    class_quartile: '',
    clerkship_honors: [],
    complex_1: 0,
    complex_2: 0,
    couples_match: false,
    cs_pe: '',
    degrees: '',
    edit: false,
    gender: '',
    interview_offers: '',
    interview_offers_prelim: '',
    interview_offers_ty: '',
    interviews_cancelled_or_declined: '',
    learning_style: '',
    match: false,
    mcat: 0,
    name: '',
    number_of_apps_categorical: '',
    number_of_apps_preliminary_year: '',
    number_of_general_publications: '',
    number_of_ir_applications: '',
    number_of_ir_interviews: '',
    number_of_presentations: '',
    number_of_sub_1: '',
    places_interviewed: '',
    reapplicant: '',
    red_flag: '',
    rejections: '',
    specialty_interest: '',
    specialty_specific_publications: '',
    step_1: 0,
    step_1_resources_used: [],
    step_2: 0,
    step_2_resources_used: [],
    student_location: '',
    student_status: '',
    total_interviews_attended: '',
    total_ranked: '',
    username: '',
    verified: false,
    waitlists: 0,
    year: '',
    year_in_program: 0,
  },
  userSearchResults: [],
  userSearchProfile: {
    email: '',
    avatar: '',
    awards: '',
    about: '',
    class_quartile: '',
    clerkship_honors: [],
    complex_1: 0,
    complex_2: 0,
    couples_match: false,
    cs_pe: '',
    degrees: '',
    edit: false,
    gender: '',
    interview_offers: '',
    interview_offers_prelim: '',
    interview_offers_ty: '',
    interviews_cancelled_or_declined: '',
    learning_style: '',
    match: false,
    mcat: 0,
    name: '',
    number_of_apps_categorical: '',
    number_of_apps_preliminary_year: '',
    number_of_general_publications: '',
    number_of_ir_applications: '',
    number_of_ir_interviews: '',
    number_of_presentations: '',
    number_of_sub_1: '',
    places_interviewed: '',
    reapplicant: '',
    red_flag: '',
    rejections: '',
    specialty_interest: '',
    specialty_specific_publications: '',
    step_1: 0,
    step_1_resources_used: [],
    step_2: 0,
    step_2_resources_used: [],
    student_location: '',
    student_status: '',
    total_interviews_attended: '',
    total_ranked: '',
    username: '',
    verified: false,
    waitlists: 0,
    year: '',
    year_in_program: 0,
  },
};

const UserSliceState = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserProfileAction(state, action: PayloadAction<string>) {
      state.loading = true;
      state.userProfile = initialState.userProfile;
    },
    getUserProfileActionSuccess(
      state,
      action: PayloadAction<DTO.User.GetUserProfileResponse>,
    ) {
      state.loading = false;
      state.userProfile = action.payload;
    },
    getUserProfileActionFailed(state) {
      state.loading = false;
    },
    searchUsersAction(
      state,
      action: PayloadAction<DTO.User.SearchUsersRequest>,
    ) {
      state.loadingSearchBox = true;
      state.userSearchResults = [];
    },
    searchUsersActionSuccess(
      state,
      action: PayloadAction<DTO.User.SearchUsersResponse>,
    ) {
      state.loadingSearchBox = false;
      state.userSearchResults = action.payload.listUser;
    },
    searchUsersActionFailed(state) {
      state.loadingSearchBox = false;
      state.userSearchResults = [];
    },
    resetSearchUsersAction(state) {
      state.userSearchResults = [];
    },
    getUserSearchProfileAction(
      state,
      action: PayloadAction<DTO.User.GetUserSearchProfileRequest>,
    ) {
      state.loadingUserSearchProfile = true;
      state.userSearchProfile = initialState.userSearchProfile;
    },
    getUserSearchProfileActionSuccess(
      state,
      action: PayloadAction<DTO.User.GetUserSearchProfileResponse>,
    ) {
      state.loadingUserSearchProfile = false;
      state.userSearchProfile = action.payload;
    },
    getUserSearchProfileActionFailed(state) {
      state.loadingUserSearchProfile = false;
    },
    updateUserProfileAction(
      state,
      action: PayloadAction<DTO.User.UpdateUserProfileRequest>,
    ) {
      state.loading = true;
      state.userProfile = action.payload.userProfile;
    },
    updateUserProfileActionSuccess(state) {
      state.loading = false;
    },
    updateUserProfileActionFailed(state) {
      state.loading = false;
    },
    //CV
    // work experiences
    getWorkExperiencesAction(
      state,
      action: PayloadAction<DTO.User.GetWorkExperiencesRequest>,
    ) {
      state.loading = true;
      state.workExperiences = [];
    },
    getWorkExperiencesActionSuccess(
      state,
      action: PayloadAction<DTO.User.GetWorkExperiencesResponse>,
    ) {
      state.loading = false;
      state.workExperiences = action.payload.workExperiences.sort((a, b) =>
        a.date_end < b.date_end ? 1 : a.date_end > b.date_end ? -1 : 0,
      );
    },
    getWorkExperiencesActionFailed(state) {
      state.loading = false;
    },
    addNewWorkExperienceAction(
      state,
      action: PayloadAction<DTO.User.AddNewWorkExperiencesRequest>,
    ) {
      state.loading = true;
    },
    addNewWorkExperienceActionSuccess(state) {
      state.loading = false;
    },
    addNewWorkExperienceActionFailed(state) {
      state.loading = false;
    },
    editWorkExperienceAction(
      state,
      action: PayloadAction<DTO.User.EditWorkExperiencesRequest>,
    ) {
      state.loading = true;
      // const workExperiencesTemp = state.workExperiences;
      // const foundIndex = workExperiencesTemp.findIndex(
      //   x => x.id === action.payload.workExperience.id,
      // );
      // workExperiencesTemp[foundIndex] = action.payload.workExperience;

      // state.workExperiences = workExperiencesTemp.sort((a, b) =>
      //   a.date_end < b.date_end ? 1 : a.date_end > b.date_end ? -1 : 0,
      // );
    },
    editWorkExperienceActionSuccess(state) {
      state.loading = false;
    },
    editWorkExperienceActionFailed(state) {
      state.loading = false;
    },
    deleteWorkExperienceActionAction(
      state,
      action: PayloadAction<DTO.User.DeleteWorkExperiencesRequest>,
    ) {
      state.loading = true;
      state.workExperiences = state.workExperiences.filter(
        item => item.id !== action.payload.id,
      );
    },
    deleteWorkExperienceActionSuccess(state) {
      state.loading = false;
    },
    deleteWorkExperienceActionFailed(state) {
      state.loading = false;
    },
    // end work experiences
    //education
    getEducationsAction(
      state,
      action: PayloadAction<DTO.User.GetEducationsRequest>,
    ) {
      state.loading = true;
      state.educations = [];
    },
    getEducationsActionSuccess(
      state,
      action: PayloadAction<DTO.User.GetEducationsResponse>,
    ) {
      state.loading = false;
      state.educations = action.payload.educations.sort((a, b) =>
        a.date_end < b.date_end ? 1 : a.date_end > b.date_end ? -1 : 0,
      );
    },
    getEducationsActionFailed(state) {
      state.loading = false;
    },
  },
});

export const { actions, reducer, name: sliceKey } = UserSliceState;
