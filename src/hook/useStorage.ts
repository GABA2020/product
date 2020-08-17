import react, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  sliceKey as storageSliceKey,
  actions as storageActions,
} from 'redux/Storage/slice';
import { useInjectSaga } from 'redux-injectors';
import { StorageSaga } from 'redux/Storage/saga';
import { storageSelector } from 'redux/Storage/selectors';

export const useStorage = (fileName: string) => {
  useInjectSaga({ key: storageSliceKey, saga: StorageSaga });
  const dispatch = useDispatch();

  const { imageUrls } = useSelector(storageSelector);
  useEffect(() => {
    if (fileName !== '' && !imageUrls[fileName]) {
      dispatch(storageActions.getImageUrlAction({ name: fileName }));
    }
  }, [fileName, imageUrls]);

  return imageUrls[fileName] ?? '';
};
