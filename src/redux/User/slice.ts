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
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { STATES } from 'types/STATE';

export const initialState: STATES.User = {
  loading: true,
  loadingSearchBox: true,
  loadingUserSearchProfile: true,
  imageUploadPreview: '',
  workExperiences: [],
  educations: [],
  volunteers: [],
  researches: [],
  letters: [],
  arrayLength: 0,
  lastQuery: {},
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
    is_passed_mcat: false,
    mcat_document_name: '',
    mcat_review_requested: false,
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
    is_passed_step1: false,
    step_1_document_name: '',
    step_1_review_requested: false,
    step_1_resources_used: [],
    step_2: 0,
    is_passed_step2: false,
    step_2_document_name: '',
    step_2_review_requested: false,
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
    step_3: 0,
    is_passed_step3: false,
    step_3_document_name: '',
    step_3_resources_used: [],
    step_3_review_requested: false,
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
    is_passed_mcat: false,
    mcat_document_name: '',
    mcat_review_requested: false,
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
    is_passed_step1: false,
    step_1_document_name: '',
    step_1_review_requested: false,
    step_1_resources_used: [],
    step_2: 0,
    is_passed_step2: false,
    step_2_document_name: '',
    step_2_review_requested: false,
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
    step_3: 0,
    is_passed_step3: false,
    step_3_document_name: '',
    step_3_resources_used: [],
    step_3_review_requested: false,
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
    uploadAvatarAction(
      state,
      action: PayloadAction<DTO.User.UploadAvatarRequest>,
    ) {
      state.loading = true;
      state.imageUploadPreview = '';
    },
    uploadAvatarActionSuccess(
      state,
      action: PayloadAction<DTO.User.UploadAvatarResponse>,
    ) {
      state.loading = false;
      state.imageUploadPreview = action.payload.name;
    },
    uploadAvatarActionFailed(state) {
      state.loading = false;
    },
    //CV
    // work experiences
    getWorkExperiencesAction(
      state,
      action: PayloadAction<DTO.User.WorkExperience.GetWorkExperiencesRequest>,
    ) {
      state.loading = true;
      state.workExperiences = [];
      state.lastQuery = {};
      state.arrayLength = 0;
    },
    getWorkExperiencesActionSuccess(
      state,
      action: PayloadAction<DTO.User.WorkExperience.GetWorkExperiencesResponse>,
    ) {
      state.loading = false;
      state.workExperiences = action.payload.workExperiences;
      state.lastQuery = action.payload.lastQuery;
      state.arrayLength = action.payload.arrayLength;
    },
    getWorkExperiencesActionFailed(state) {
      state.loading = false;
    },
    getMoreWorkExperiencesAction(
      state,
      action: PayloadAction<
        DTO.User.WorkExperience.GetMoreWorkExperiencesRequest
      >,
    ) {},
    getMoreWorkExperiencesActionSuccess(
      state,
      action: PayloadAction<
        DTO.User.WorkExperience.GetMoreWorkExperiencesResponse
      >,
    ) {
      state.loading = false;
      state.lastQuery = action.payload.lastQuery;
      state.workExperiences = [
        ...state.workExperiences,
        ...action.payload.workExperiences,
      ];
    },
    getMoreWorkExperiencesActionFailed(state) {
      state.loading = false;
    },
    addNewWorkExperienceAction(
      state,
      action: PayloadAction<
        DTO.User.WorkExperience.AddNewWorkExperiencesRequest
      >,
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
      action: PayloadAction<DTO.User.WorkExperience.EditWorkExperiencesRequest>,
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
      action: PayloadAction<
        DTO.User.WorkExperience.DeleteWorkExperiencesRequest
      >,
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
      action: PayloadAction<DTO.User.Education.GetEducationsRequest>,
    ) {
      state.loading = true;
      state.educations = [];
      state.lastQuery = {};
      state.arrayLength = 0;
    },
    getEducationsActionSuccess(
      state,
      action: PayloadAction<DTO.User.Education.GetEducationsResponse>,
    ) {
      state.loading = false;
      state.educations = action.payload.educations;
      state.lastQuery = action.payload.lastQuery;
      state.arrayLength = action.payload.arrayLength;
    },
    getEducationsActionFailed(state) {
      state.loading = false;
    },
    getMoreEducationsAction(
      state,
      action: PayloadAction<DTO.User.Education.GetMoreEducationsRequest>,
    ) {},
    getMoreEducationsActionSuccess(
      state,
      action: PayloadAction<DTO.User.Education.GetMoreEducationsResponse>,
    ) {
      state.loading = false;
      state.educations = [...state.educations, ...action.payload.educations];
      state.lastQuery = action.payload.lastQuery;
    },
    getMoreEducationsActionFailed(state) {
      state.loading = false;
    },
    addNewEducationAction(
      state,
      actions: PayloadAction<DTO.User.Education.AddNewEducationRequest>,
    ) {
      state.loading = true;
    },
    addNewEducationActionSuccess(state) {
      state.loading = false;
    },
    addNewEducationActionFailed(state) {
      state.loading = false;
    },
    editEducationAction(
      state,
      action: PayloadAction<DTO.User.Education.EditEducationRequest>,
    ) {
      state.loading = true;
    },
    editEducationActionSuccess(state) {
      state.loading = false;
    },
    editEducationActionFailed(state) {
      state.loading = false;
    },
    deleteEducationAction(
      state,
      action: PayloadAction<DTO.User.Education.DeleteEducationRequest>,
    ) {
      state.loading = true;
      state.educations = state.educations.filter(
        item => item.id !== action.payload.id,
      );
    },
    deleteEducationActionSuccess(state) {
      state.loading = false;
    },
    deleteEducationActionFailed(state) {
      state.loading = false;
    },
    // end education

    // volunteer
    getVolunteersAction(
      state,
      action: PayloadAction<DTO.User.Volunteer.GetVolunteersRequest>,
    ) {
      state.loading = true;
      state.volunteers = [];
      state.lastQuery = {};
      state.arrayLength = 0;
    },
    getVolunteersActionSuccess(
      state,
      action: PayloadAction<DTO.User.Volunteer.GetVolunteersResponse>,
    ) {
      state.loading = false;
      state.volunteers = action.payload.volunteers;
      state.arrayLength = action.payload.arrayLength;
      state.lastQuery = action.payload.lastQuery;
    },
    getVolunteersActionFailed(state) {
      state.loading = false;
    },
    getMoreVolunteersAction(
      state,
      action: PayloadAction<DTO.User.Volunteer.GetMoreVolunteersRequest>,
    ) {},
    getMoreVolunteersActionSuccess(
      state,
      action: PayloadAction<DTO.User.Volunteer.GetMoreVolunteersResponse>,
    ) {
      state.loading = false;
      state.volunteers = [...state.volunteers, ...action.payload.volunteers];
      state.lastQuery = action.payload.lastQuery;
    },
    getMoreVolunteersActionFailed(state) {
      state.loading = false;
    },
    addNewVolunteerAction(
      state,
      action: PayloadAction<DTO.User.Volunteer.AddNewVolunteerRequest>,
    ) {
      state.loading = true;
    },
    addNewVolunteerActionSuccess(state) {
      state.loading = false;
    },
    addNewVolunteerActionFailed(state) {
      state.loading = false;
    },
    editVolunteerAction(
      state,
      action: PayloadAction<DTO.User.Volunteer.EditVolunteerRequest>,
    ) {
      state.loading = true;
    },
    editVolunteerActionSuccess(state) {
      state.loading = false;
    },
    editVolunteerActionFailed(state) {
      state.loading = false;
    },
    deleteVolunteerAction(
      state,
      action: PayloadAction<DTO.User.Volunteer.DeleteVolunteerRequest>,
    ) {
      state.loading = true;
      state.volunteers = state.volunteers.filter(
        item => item.id !== action.payload.id,
      );
    },
    deleteVolunteerActionSuccess(state) {
      state.loading = false;
    },
    deleteVolunteerActionFailed(state) {
      state.loading = false;
    },
    // end volunteer

    // research
    getResearchesAction(
      state,
      action: PayloadAction<DTO.User.Research.GetResearchesRequest>,
    ) {
      state.loading = true;
      state.researches = [];
      state.lastQuery = {};
      state.arrayLength = 0;
    },
    getResearchesActionSuccess(
      state,
      action: PayloadAction<DTO.User.Research.GetResearchesResponse>,
    ) {
      state.loading = false;
      state.researches = action.payload.researches;
      state.arrayLength = action.payload.arrayLength;
      state.lastQuery = action.payload.lastQuery;
    },
    getResearchesActionFailed(state) {
      state.loading = false;
    },
    getMoreResearchesAction(
      state,
      action: PayloadAction<DTO.User.Research.GetMoreResearchesRequest>,
    ) {},
    getMoreResearchesActionSuccess(
      state,
      action: PayloadAction<DTO.User.Research.GetMoreResearchesResponse>,
    ) {
      state.loading = false;
      state.researches = [...state.researches, ...action.payload.researches];
      state.lastQuery = action.payload.lastQuery;
    },
    getMoreResearchesActionFailed(state) {
      state.loading = false;
    },
    addNewResearchAction(
      state,
      action: PayloadAction<DTO.User.Research.AddNewResearchRequest>,
    ) {
      state.loading = true;
    },
    addNewResearchActionSuccess(state) {
      state.loading = false;
    },
    addNewResearchActionFailed(state) {
      state.loading = false;
    },
    editResearchAction(
      state,
      action: PayloadAction<DTO.User.Research.EditResearchRequest>,
    ) {
      state.loading = true;
    },
    editResearchActionSuccess(state) {
      state.loading = false;
    },
    editResearchActionFailed(state) {
      state.loading = false;
    },
    deleteResearchAction(
      state,
      action: PayloadAction<DTO.User.Research.DeleteResearchRequest>,
    ) {
      state.loading = true;
      state.researches = state.researches.filter(
        item => item.id !== action.payload.id,
      );
    },
    deleteResearchActionSuccess(state) {
      state.loading = false;
    },
    deleteResearchActionFailed(state) {
      state.loading = false;
    },
    // end research

    // letter
    getLettersAction(
      state,
      action: PayloadAction<DTO.User.Letter.GetLettersRequest>,
    ) {
      state.loading = true;
      state.letters = [];
      state.arrayLength = 0;
      state.lastQuery = {};
    },
    getLettersActionSuccess(
      state,
      action: PayloadAction<DTO.User.Letter.GetLettersResponse>,
    ) {
      state.loading = false;
      state.letters = action.payload.letters;
      state.arrayLength = action.payload.arrayLength;
      state.lastQuery = action.payload.lastQuery;
    },
    getLettersActionFailed(state) {
      state.loading = false;
    },
    getMoreLettersAction(
      state,
      action: PayloadAction<DTO.User.Letter.GetMoreLettersRequest>,
    ) {},
    getMoreLettersActionSuccess(
      state,
      action: PayloadAction<DTO.User.Letter.GetMoreLettersResponse>,
    ) {
      state.loading = false;
      state.letters = [...state.letters, ...action.payload.letters];
      state.lastQuery = action.payload.lastQuery;
    },
    getMoreLettersActionFailed(state) {
      state.loading = false;
    },
    addNewLetterAction(
      state,
      action: PayloadAction<DTO.User.Letter.AddNewLetterRequest>,
    ) {
      state.loading = true;
    },
    addNewLetterActionSuccess(state) {
      state.loading = false;
    },
    addNewLetterActionFailed(state) {
      state.loading = false;
    },
    editLetterAction(
      state,
      action: PayloadAction<DTO.User.Letter.EditLetterRequest>,
    ) {
      state.loading = true;
    },
    editLetterActionSuccess(state) {
      state.loading = false;
    },
    editLetterActionFailed(state) {
      state.loading = false;
    },
    deleteLetterAction(
      state,
      action: PayloadAction<DTO.User.Letter.DeleteLetterRequest>,
    ) {
      state.loading = true;
      state.letters = state.letters.filter(
        item => item.id !== action.payload.id,
      );
    },
    deleteLetterActionSuccess(state) {
      state.loading = false;
    },
    deleteLetterActionFailed(state) {
      state.loading = false;
    },
    // end letter
  },
});

export const { actions, reducer, name: sliceKey } = UserSliceState;
