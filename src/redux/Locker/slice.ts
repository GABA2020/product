import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { DTO } from 'types/DTO';
import { STATES } from 'types/STATE';

// The initial state of the GithubRepoForm container
export const initialState: STATES.Locker = {
  loading: true,
  reviews: [],
  reviewLength: 0,
  userResources: [],
  userResourceLength: 0,
  lastQuery: {},
  listResourceCache: {},
};

const LockerSlice = createSlice({
  name: 'locker',
  initialState,
  reducers: {
    getReviewsAction(
      state,
      action: PayloadAction<DTO.Locker.GetReviewsRequest>,
    ) {
      state.loading = true;
      state.reviews = initialState.reviews;
      state.reviewLength = initialState.reviewLength;
      state.lastQuery = initialState.lastQuery;
    },
    getReviewsActionSuccess(
      state,
      action: PayloadAction<DTO.Locker.GetReviewsResponse>,
    ) {
      state.loading = false;
      state.reviews = action.payload.reviews;
      state.reviewLength = action.payload.reviewLength;
      state.lastQuery = action.payload.lastQuery;
    },
    getReviewsActionFailed(state) {
      state.loading = false;
    },
    getMoreReviewsAction(
      state,
      action: PayloadAction<DTO.Locker.GetMoreReviewsRequest>,
    ) {},
    getMoreReviewsActionSuccess(
      state,
      action: PayloadAction<DTO.Locker.GetMoreReviewsResponse>,
    ) {
      state.reviews = [...state.reviews, ...action.payload.reviews];
      state.lastQuery = action.payload.lastQuery;
    },
    getMoreReviewsActionFailed(state) {},

    getUserResourcesAction(
      state,
      action: PayloadAction<DTO.Locker.UserResource.getUserResourcesRequest>,
    ) {
      state.loading = true;
      state.lastQuery = initialState.lastQuery;
      state.userResourceLength = initialState.userResourceLength;
      state.userResources = initialState.userResources;
    },
    getUserResourcesActionSuccess(
      state,
      action: PayloadAction<DTO.Locker.UserResource.getUserResourcesResponse>,
    ) {
      state.loading = false;
      state.lastQuery = action.payload.lastQuery;
      state.userResourceLength = action.payload.userResourceLength;
      state.userResources = action.payload.userResources;
    },
    getUserResourcesActionFailed(state) {
      state.loading = false;
    },
    getMoreUserResourcesAction(
      state,
      action: PayloadAction<
        DTO.Locker.UserResource.getMoreUserResourcesRequest
      >,
    ) {},
    getMoreUserResourcesActionSuccess(
      state,
      action: PayloadAction<
        DTO.Locker.UserResource.getMoreUserResourcesResponse
      >,
    ) {
      state.userResources = [
        ...state.userResources,
        ...action.payload.userResources,
      ];
      state.lastQuery = action.payload.lastQuery;
    },
    getMoreUserResourcesActionFailed(state) {},

    getResourceDetailAction(
      state,
      action: PayloadAction<DTO.Locker.Resource.GetResourceDetailRequest>,
    ) {
      state.listResourceCache[action.payload.id] = null;
    },
    getResourceDetailActionSuccess(
      state,
      action: PayloadAction<DTO.Locker.Resource.GetResourceDetailResponse>,
    ) {
      state.listResourceCache[action.payload.id] = action.payload.resource;
    },
    getResourceDetailActionFailed(state) {},
    addUserResourceAction(
      state,
      action: PayloadAction<DTO.Locker.UserResource.AddUserResourceRequest>,
    ) {},
    addUserResourceActionSuccess(
      state,
      action: PayloadAction<DTO.Locker.UserResource.AddUserResourceResponse>,
    ) {
      state.userResources = [
        ...state.userResources,
        action.payload.userResource,
      ];
      state.userResourceLength = state.userResourceLength++;
    },
    addUserResourceActionFailed(state) {},
    addReviewAction(
      state,
      action: PayloadAction<DTO.Locker.AddReviewRequest>,
    ) {},
    addReviewActionSuccess(
      state,
      action: PayloadAction<DTO.Locker.AddReviewResponse>,
    ) {
      state.reviews = [...state.reviews, action.payload.review];
      state.reviewLength = state.reviewLength++;
    },
    addReviewActionFailed(state) {},
  },
});
export const { actions, reducer, name: sliceKey } = LockerSlice;
