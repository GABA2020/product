import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions, sliceKey } from 'redux/User/slice';
import { useInjectSaga } from 'redux-injectors';
import { UserSaga } from 'redux/User/saga';
import { userSelector } from 'redux/User/selectors';

export const useUser = (email: string) => {
  useInjectSaga({ key: sliceKey, saga: UserSaga });
  const dispatch = useDispatch();

  const { listGuestUserCache } = useSelector(userSelector);
  useEffect(() => {
    if (email !== '' && !listGuestUserCache[email]) {
      dispatch(actions.getGuestUserProfileCacheAction({ email }));
    }
  }, [email, listGuestUserCache]);

  return listGuestUserCache[email] ?? null;
};
