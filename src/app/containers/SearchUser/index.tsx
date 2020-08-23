import React, { FC, Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectSaga } from 'utils/redux-injectors';
import {
  sliceKey as userSliceKey,
  actions as userActions,
} from 'redux/User/slice';
import { UserSaga } from 'redux/User/saga';
import { userSelector } from 'redux/User/selectors';
import { NotFoundPage } from '../NotFoundPage/Loadable';
import Helmet from 'react-helmet';
import 'styles/scss/SearchUser.scss';
import 'styles/scss/ModalEditProfile.scss';
import 'styles/scss/SectionProfile.scss';
import { MyProfile } from '../MyProfile';
import { GuestUserProfile } from '../GuestUserProfile';

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
  const dispatch = useDispatch();
  const {
    userProfile,
    userSearchProfile,
    loadingUserSearchProfile,
  } = useSelector(userSelector);

  useEffect(() => {
    dispatch(
      userActions.getUserSearchProfileAction({
        username: match.params.username,
      }),
    );
  }, [match.params.username]);

  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{userSearchProfile.name}</title>
      </Helmet>
      <Fragment>
        {loadingUserSearchProfile ? (
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
                  <MyProfile></MyProfile>
                ) : (
                  <GuestUserProfile></GuestUserProfile>
                )}
              </Fragment>
            )}
          </section>
        )}
      </Fragment>
    </Fragment>
  );
};
