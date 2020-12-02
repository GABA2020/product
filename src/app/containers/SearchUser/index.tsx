import React, { FC, Fragment, useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectSaga } from 'utils/redux-injectors';
import {
  sliceKey as userSliceKey,
  actions as userActions,
} from 'redux/User/slice';
import { sliceKey as chatSliceKey } from 'redux/Chat/slice';
import { UserSaga } from 'redux/User/saga';
import { ChatSaga } from 'redux/Chat/saga';
import { userSelector } from 'redux/User/selectors';
import { NotFoundPage } from '../NotFoundPage/Loadable';
import Helmet from 'react-helmet';
import 'styles/scss/SearchUser.scss';
import 'styles/scss/ModalEditProfile.scss';
import 'styles/scss/SectionProfile.scss';
import { NavLink } from 'react-router-dom';
import { Context } from 'app/globalContext/GlobalContext';
import { Profile } from 'app/profile/screens/ProfileScreen';
import { getUser } from 'app/auth/services';

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
  useInjectSaga({ key: chatSliceKey, saga: ChatSaga });
  const dispatch = useDispatch();
  // const {
  //   userProfile,
  //   loadingUserSearchProfile,
  // } = useSelector(userSelector);
  const [loadingUserSearchProfile, setLoadingUserSearchProfile] = useState(
    true,
  );
  const [userSearchProfile, setUserSearchProfile] = useState<any>({});
  const {
    graphQLClient,
    state: { user: userProfile },
  } = useContext(Context);

  useEffect(() => {
    setLoadingUserSearchProfile(true);
    if (match.params.username !== userProfile.username) {
      getUserSearchProfile(match.params.username);
    } else {
      setUserSearchProfile(userProfile);
      setLoadingUserSearchProfile(false);
    }
    // dispatch(
    //   userActions.getUserSearchProfileAction({
    //     username: match.params.username,
    //   }),
    // );
  }, [match.params.username, userProfile]);

  async function getUserSearchProfile(username) {
    console.log(username);
    const userData = await getUser(graphQLClient, '', username);
    setUserSearchProfile({
      ...userData?.userFirestore,
      ...userData?.userAccount,
    });
    setLoadingUserSearchProfile(false);
  }

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
              {!userSearchProfile.username ? (
                <NotFoundPage />
              ) : (
                  <Fragment>
                    <section className="section-breadcrumb">
                      <div className="container">
                        <ul className="breadcrumb">
                          <li>
                            <NavLink to="/">Home</NavLink>
                          </li>
                          <li className="active">
                            {userProfile.username === userSearchProfile.username
                              ? userSearchProfile.name
                              : userSearchProfile.username}
                          </li>
                        </ul>
                      </div>
                    </section>
                    <Profile
                      owner={userProfile.username === userSearchProfile.username}
                      userSearchProfile={userSearchProfile}
                    />

                    {/* {userProfile.username === userSearchProfile.username ? ( */}
                    {/* ) : ( */}
                    {/* <GuestUserProfile></GuestUserProfile> */}
                    {/* )} */}
                  </Fragment>
                )}
            </section>
          )}
      </Fragment>
    </Fragment>
  );
};
