import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { DTO } from 'types/DTO';
import { STATES } from 'types/STATE';

// The initial state of the GithubRepoForm container
export const initialState: STATES.Locker = {
  loading: true,
  reviews: [],
  resources: [],
  lastQuery: {},
  arrayLength: 0,
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
      state.arrayLength = initialState.arrayLength;
      state.lastQuery = initialState.lastQuery;
    },
    getReviewsActionSuccess(
      state,
      action: PayloadAction<DTO.Locker.GetReviewsResponse>,
    ) {
      state.loading = false;
      state.reviews = action.payload.reviews;
      state.arrayLength = action.payload.arrayLength;
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

    getResourcesAction(
      state,
      action: PayloadAction<DTO.Locker.Resource.getResourcesRequest>,
    ) {
      state.loading = true;
      state.lastQuery = initialState.lastQuery;
      state.arrayLength = initialState.arrayLength;
      state.resources = initialState.resources;
    },
    getResourcesActionSuccess(
      state,
      action: PayloadAction<DTO.Locker.Resource.getResourcesResponse>,
    ) {
      state.loading = false;
      state.lastQuery = action.payload.lastQuery;
      state.arrayLength = action.payload.arrayLength;
      state.resources = action.payload.resources;
    },
    getResourcesActionFailed(state) {
      state.loading = false;
    },
    getMoreResourcesAction(
      state,
      action: PayloadAction<DTO.Locker.Resource.getMoreResourcesRequest>,
    ) {},
    getMoreResourcesActionSuccess(
      state,
      action: PayloadAction<DTO.Locker.Resource.getMoreResourcesResponse>,
    ) {
      state.resources = [...state.resources, ...action.payload.resources];
      state.lastQuery = action.payload.lastQuery;
    },
    getMoreResourcesActionFailed(state) {},

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
  },
});
export const { actions, reducer, name: sliceKey } = LockerSlice;
