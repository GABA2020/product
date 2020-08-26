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
  allUserResources: [],
};

const LockerSlice = createSlice({
  name: 'locker',
  initialState,
  reducers: {
    getReviewsAction(
      state,
      action: PayloadAction<DTO.Locker.Review.GetReviewsRequest>,
    ) {
      state.loading = true;
      state.reviews = initialState.reviews;
      state.reviewLength = initialState.reviewLength;
      state.lastQuery = initialState.lastQuery;
    },
    getReviewsActionSuccess(
      state,
      action: PayloadAction<DTO.Locker.Review.GetReviewsResponse>,
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
      action: PayloadAction<DTO.Locker.Review.GetMoreReviewsRequest>,
    ) {},
    getMoreReviewsActionSuccess(
      state,
      action: PayloadAction<DTO.Locker.Review.GetMoreReviewsResponse>,
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
      // state.userResources = [
      //   ...state.userResources,
      //   action.payload.userResource,
      // ];
      // state.reviews = [...state.userResources, action.payload.userResource];
      // state.userResourceLength = state.userResourceLength++;
      // state.reviewLength = state.reviewLength++;
    },
    addUserResourceActionFailed(state) {},
    getAllUserResourceAction(
      state,
      action: PayloadAction<DTO.Locker.UserResource.getAllUserResourcesRequest>,
    ) {
      state.allUserResources = initialState.allUserResources;
    },
    getAllUserResourceActionSuccess(
      state,
      action: PayloadAction<
        DTO.Locker.UserResource.getAllUserResourcesResponse
      >,
    ) {
      state.allUserResources = action.payload.userResources;
    },
    getAllUserResourceActionFailed(state) {},
    editUserResourceAction(
      state,
      action: PayloadAction<DTO.Locker.UserResource.EditUserResourceRequest>,
    ) {},
    editUserResourceActionSuccess(
      state,
      action: PayloadAction<DTO.Locker.UserResource.EditUserResourceResponse>,
    ) {
      //update allUserResources;
      const index = state.allUserResources.findIndex(
        item => item.id === action.payload.userResource.id,
      );
      state.allUserResources[index] = action.payload.userResource;
      // //update userResources
      // const index2 = state.userResources.findIndex(
      //   item => item.id === action.payload.userResource.id,
      // );

      // state.userResources[index2] = action.payload.userResource;

      // //update reviews
      // const index3 = state.reviews.findIndex(
      //   item => item.id === action.payload.userResource.id,
      // );

      // state.reviews[index3] = action.payload.userResource;
    },
    editUserResourceActionFailed(state) {},
    deleteUserResourceAction(
      state,
      action: PayloadAction<DTO.Locker.UserResource.DeleteUserResourceRequest>,
    ) {},
    deleteUserResourceActionSuccess(
      state,
      action: PayloadAction<DTO.Locker.UserResource.DeleteUserResourceResponse>,
    ) {
      state.allUserResources = state.allUserResources.filter(
        item => item.id !== action.payload.userResource.id,
      );
      // state.userResources = state.userResources.filter(
      //   item => item.id !== action.payload.userResource.id,
      // );
      // state.userResourceLength = state.userResourceLength - 1;
      // state.reviews = state.reviews.filter(
      //   item => item.id !== action.payload.userResource.id,
      // );
      // state.reviewLength = state.reviewLength - 1;
    },
    deleteUserResourceActionFailed(state) {},
  },
});
export const { actions, reducer, name: sliceKey } = LockerSlice;
