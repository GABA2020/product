import { useEffect } from 'react';
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

  const { fileUrls } = useSelector(storageSelector);
  useEffect(() => {
    const parts: string[] = fileName.split('/');
    if (
      parts[parts.length - 1] !== '' &&
      fileName !== '' &&
      !fileUrls[fileName]
    ) {
      dispatch(storageActions.getFileUrlAction({ name: fileName }));
    }
  }, [fileName, fileUrls]);

  return fileUrls[fileName] ?? '';
};
