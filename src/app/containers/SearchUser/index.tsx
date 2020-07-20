import React, { FC, Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectSaga } from 'utils/redux-injectors';
import {
  sliceKey as userSliceKey,
  actions as userActions,
} from 'redux/User/slice';
import {
  sliceKey as programSliceKey,
  actions as programActions,
} from 'redux/Program/slice';
import { UserSaga } from 'redux/User/saga';
import { ProgramSaga } from 'redux/Program/saga';
import { userSelector } from 'redux/User/selectors';
import { img_user, img_locker } from 'assets/images';
import { NotFoundPage } from '../NotFoundPage/Loadable';
import Helmet from 'react-helmet';
import { MyProfile } from 'app/components/MyProfile';
import { GuestUserProfile } from 'app/components/GuestUserProfile';
import { programSelector } from 'redux/Program/selectors';
import 'styles/scss/SearchUser.scss';

interface IProfile {
  match: {
    params: {
      username: string;
    };
  };
}

export const SearchUser: FC<IProfile> = props => {
  const { match } = props;
  useInjectSaga({ key: userSliceKey, saga: UserSaga });
  useInjectSaga({ key: programSliceKey, saga: ProgramSaga });
  const dispatch = useDispatch();
  const {
    userProfile,
    userSearchProfile,
    workExperiences,
    educations,
    loading,
  } = useSelector(userSelector);
  const { program } = useSelector(programSelector);

  useEffect(() => {
    dispatch(
      userActions.getUserSearchProfileAction({
        username: match.params.username,
      }),
    );
  }, [match.params.username]);
  useEffect(() => {
    if (userSearchProfile.username === userProfile.username) {
      dispatch(
        programActions.getProgramReviewAction({ email: userProfile.email }),
      );
      dispatch(
        userActions.getWorkExperiencesAction({ email: userProfile.email }),
      );
      dispatch(userActions.getEducationsAction({ email: userProfile.email }));
    } else {
      dispatch(
        programActions.getProgramReviewAction({
          email: userSearchProfile.email,
        }),
      );
    }
  }, [userSearchProfile.username, userProfile.username]);

  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{userSearchProfile.name}</title>
      </Helmet>
      <Fragment>
        {loading ? (
          <section className="page-loading"></section>
        ) : (
          <section id="page_content">
            {userSearchProfile.username === '' ? (
              <NotFoundPage />
            ) : (
              <Fragment>
                <section className="section-breadcrumb">
                  <div className="container">
                    <ul className="breadcrumb">
                      <li>
                        <a href="#">Home</a>
                      </li>
                      <li className="active">{userSearchProfile.name}</li>
                    </ul>
                  </div>
                </section>

                {userProfile.username === userSearchProfile.username ? (
                  <MyProfile
                    workExperiences={workExperiences}
                    educations={educations}
                    program={program}
                    userProfile={userProfile}
                  ></MyProfile>
                ) : (
                  <GuestUserProfile
                    program={program}
                    userGuestProfile={userSearchProfile}
                  ></GuestUserProfile>
                )}
              </Fragment>
            )}
          </section>
        )}
      </Fragment>
    </Fragment>
  );
};
