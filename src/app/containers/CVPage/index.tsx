import React, { Fragment, useContext, useEffect } from 'react';
import { CV } from '../../components/PDF/CV';
import {
  sliceKey as userSliceKey,
  actions as userActions,
} from 'redux/User/slice';
import { sliceKey as authSliceKey } from 'redux/Auth/slice';
import { useInjectSaga } from 'redux-injectors';
import { UserSaga } from 'redux/User/saga';
import { AuthSaga } from 'redux/Auth/saga';
import { userSelector } from 'redux/User/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { Context } from 'app/globalContext/GlobalContext';

export const CVPage = () => {
  useInjectSaga({ key: userSliceKey, saga: UserSaga });
  useInjectSaga({ key: authSliceKey, saga: AuthSaga });
  const dispatch = useDispatch();
  const {
    educations,
    workExperiences,
    volunteers,
    researches,
    // userProfile,
  } = useSelector(userSelector);
  const { state: { user:userProfile } } = useContext(Context);

  // const { email } = useSelector(authSelector);
  // const { state: { user } } = useContext(Context);
  // const userProfile.email = userProfile?.email;

  useEffect(() => {
    if (userProfile.email !== '') {
      dispatch(
        userActions.getAllEducationsAction({ email: userProfile.email }),
      );
      dispatch(
        userActions.getAllWorkExperiencesAction({ email: userProfile.email }),
      );
      dispatch(
        userActions.getAllVolunteersAction({ email: userProfile.email }),
      );
      dispatch(
        userActions.getAllResearchesAction({ email: userProfile.email }),
      );
    }
  }, [userProfile.email]);

  useEffect(() => {
    if (userProfile.email !== '') {
      dispatch(userActions.getUserProfileAction(userProfile.email));
    }
  }, [userProfile.email]);

  return (
    <Fragment>
      <section id="page_content">
        <CV
          userProfile={userProfile}
          volunteers={volunteers}
          educations={educations}
          workExperiences={workExperiences}
          researches={researches}
        ></CV>
      </section>
    </Fragment>
  );
};
