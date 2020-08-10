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
  },
});
export const { actions, reducer, name: sliceKey } = LockerSlice;
