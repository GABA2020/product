import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { DTO } from 'types/DTO';
import { STATES } from 'types/STATE';
export const initialState: STATES.Storage = {
  loading: true,
  imageUrls: {},
};

const StorageSliceState = createSlice({
  name: 'storage',
  initialState,
  reducers: {
    getImageUrlAction(
      state,
      action: PayloadAction<DTO.Storage.GetImageUrlRequest>,
    ) {
      state.loading = true;
      state.imageUrls[action.payload.name] = null;
    },
    getImageUrlActionSuccess(
      state,
      action: PayloadAction<DTO.Storage.GetImageUrlResponse>,
    ) {
      state.loading = false;
      state.imageUrls[action.payload.name] = action.payload.url;
    },
    getImageUrlActionFailed(state) {
      state.loading = false;
    },
    uploadAvatarAction(
      state,
      action: PayloadAction<DTO.Storage.UploadAvatarRequest>,
    ) {
      state.loading = true;
    },
    uploadAvatarActionSuccess(
      state,
      action: PayloadAction<DTO.Storage.UploadAvatarResponse>,
    ) {
      state.loading = false;
      state.imageUrls[action.payload.name] = action.payload.url;
    },
    uploadAvatarActionFailed(state) {
      state.loading = false;
    },
  },
});

export const { actions, reducer, name: sliceKey } = StorageSliceState;
