import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { DTO } from 'types/DTO';
export const initialState: STATES.Storage = {
  loading: true,
  avatar_url: '',
};

const StorageSliceState = createSlice({
  name: 'storage',
  initialState,
  reducers: {
    getAvatarURLAction(
      state,
      action: PayloadAction<DTO.Storage.GetAvatarUrlRequest>,
    ) {
      state.loading = true;
      state.avatar_url = initialState.avatar_url;
    },
    getAvatarURLActionSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.avatar_url = action.payload;
    },
    getAvatarURLActionFailed(state) {
      state.loading = false;
    },
  },
});

export const { actions, reducer, name: sliceKey } = StorageSliceState;
