import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { DTO } from 'types/DTO';
import { STATES } from 'types/STATE';

// The initial state of the GithubRepoForm container
export const initialState: STATES.Locker = {
  loading: true,
  reviews: [],
  lastQuery: {},
  reviewLength: 0,
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
    ) {
      state.loading = true;
    },
    getMoreReviewsActionSuccess(
      state,
      action: PayloadAction<DTO.Locker.GetMoreReviewsResponse>,
    ) {
      state.loading = false;
      state.reviews = [...state.reviews, ...action.payload.reviews];
      state.lastQuery = action.payload.lastQuery;
    },
    getMoreReviewsActionFailed(state) {
      state.loading = false;
    },
  },
});
export const { actions, reducer, name: sliceKey } = LockerSlice;
