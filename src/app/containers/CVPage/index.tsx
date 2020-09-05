import React, { Fragment, useEffect } from 'react';
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
import { authSelector } from 'redux/Auth/selectors';

export const CVPage = () => {
  useInjectSaga({ key: userSliceKey, saga: UserSaga });
  useInjectSaga({ key: authSliceKey, saga: AuthSaga });
  const dispatch = useDispatch();
  const {
    educations,
    workExperiences,
    volunteers,
    researches,
    userProfile,
  } = useSelector(userSelector);

  const { email } = useSelector(authSelector);

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
    if (email !== '') {
      dispatch(userActions.getUserProfileAction(email));
    }
  }, [email]);

  return (
    <Fragment>
      <section id="page_content">
        <CV
          base_url={process.env.REACT_APP_BASE_URL}
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
