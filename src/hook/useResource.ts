import react, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectSaga } from 'redux-injectors';
import { storageSelector } from 'redux/Storage/selectors';
import { LockerSaga } from 'redux/Locker/saga';
import { actions, sliceKey } from 'redux/Locker/slice';
import { lockerSelector } from 'redux/Locker/selectors';

export const useResource = (id: string, email: string) => {
  useInjectSaga({ key: sliceKey, saga: LockerSaga });
  const dispatch = useDispatch();
  const { listResourceCache } = useSelector(lockerSelector);

  useEffect(() => {
    if (id !== '' && email !== '' && !listResourceCache[id]) {
      dispatch(actions.getResourceDetailAction({ id, email }));
    }
  }, [id, email, listResourceCache]);

  return listResourceCache[id] ? listResourceCache[id] : null;
};
