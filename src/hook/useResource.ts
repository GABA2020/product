import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectSaga } from 'redux-injectors';
import { LockerSaga } from 'redux/Locker/saga';
import { actions, sliceKey } from 'redux/Locker/slice';
import { lockerSelector } from 'redux/Locker/selectors';

export const useResource = (id: string) => {
  useInjectSaga({ key: sliceKey, saga: LockerSaga });
  const dispatch = useDispatch();
  const { listResourceCache } = useSelector(lockerSelector);

  useEffect(() => {
    if (id !== '' && !listResourceCache[id]) {
      dispatch(actions.getResourceDetailAction({ id }));
    }
  }, [id, listResourceCache]);

  return listResourceCache[id] ? listResourceCache[id] : null;
};
