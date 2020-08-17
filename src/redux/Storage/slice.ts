import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { DTO } from 'types/DTO';
import { STATES } from 'types/STATE';

export const initialState: STATES.Storage = {
  loadingImage: true,
  loadingFile: true,
  imageUrls: {},
  fileUrls: {},
};

const StorageSliceState = createSlice({
  name: 'storage',
  initialState,
  reducers: {
    getImageUrlAction(
      state,
      action: PayloadAction<DTO.Storage.GetImageUrlRequest>,
    ) {
      state.loadingImage = true;
      state.imageUrls[action.payload.name] = null;
    },
    getImageUrlActionSuccess(
      state,
      action: PayloadAction<DTO.Storage.GetImageUrlResponse>,
    ) {
      state.loadingImage = false;
      state.imageUrls[action.payload.name] = action.payload.url;
    },
    getImageUrlActionFailed(state) {
      state.loadingImage = false;
    },
    uploadFileAction(
      state,
      action: PayloadAction<DTO.Storage.UploadFileRequest>,
    ) {
      state.loadingFile = true;
    },
    uploadFileActionSuccess(
      state,
      action: PayloadAction<DTO.Storage.UploadFileResponse>,
    ) {
      state.loadingFile = false;
      state.imageUrls[action.payload.name] = action.payload.url;
    },
    uploadFileActionFailed(state) {
      state.loadingFile = false;
    },
    getFileUrlAction(
      state,
      action: PayloadAction<DTO.Storage.GetFileUrlRequest>,
    ) {
      state.loadingFile = true;
    },
    getFileUrlActionSuccess(
      state,
      action: PayloadAction<DTO.Storage.GetFileUrlResponse>,
    ) {
      state.loadingFile = false;
      state.fileUrls[action.payload.name] = action.payload.url;
    },
    getFileUrlActionFailed(state) {
      state.loadingFile = false;
    },
  },
});

export const { actions, reducer, name: sliceKey } = StorageSliceState;
