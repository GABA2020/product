import React, { Fragment, useEffect } from 'react';
import { authSelector } from 'redux/Auth/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { img_account } from 'assets/images';
import RoutesTypes from 'types/Routes';
import {
  actions as userActions,
  sliceKey as userSlice,
} from 'redux/User/slice';
import {
  actions as authActions,
  sliceKey as authSlice,
} from 'redux/Auth/slice';
import { UserSaga } from 'redux/User/saga';
import { useInjectSaga } from 'redux-injectors';
import { userSelector } from 'redux/User/selectors';
import { AuthSaga } from 'redux/Auth/saga';
import 'assets/css/header.scss';
import { SearchBox } from 'app/components/SearchBox';

export const Header = () => {
  const { isAuth, email } = useSelector(authSelector);
  const { userProfile, userSearchResults } = useSelector(userSelector);
  useInjectSaga({ key: userSlice, saga: UserSaga });
  useInjectSaga({ key: authSlice, saga: AuthSaga });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) {
      dispatch(userActions.getUserProfileAction(email));
      return;
    }
  }, [isAuth, dispatch]);
  const onchangeSearchText = (text: string) => {
    if (text.trim() !== '') {
      dispatch(userActions.searchUsersAction({ text }));
    }
  };

  const signOut = () => {
    // console.log(123);
    dispatch(authActions.logoutAction());
  };
  return (
    <Fragment>
      <header id="header">
        <div className="container-fluid">
          <div className="header-inner">
            <div className="header-brand">
              <div className="nav-action">
                <a href="#" className="nav-open">
                  <span className="menu-icon">&nbsp;</span>
                </a>
              </div>
              <div id="logo">
                <h1>
                  <span>Global Design information technology</span>
                </h1>
              </div>
            </div>
            {/*end header-col*/}
            <SearchBox
              searchResults={userSearchResults}
              onchangeSearchText={onchangeSearchText}
            ></SearchBox>
            {/*end header-col*/}
            <div className="header-account">
              {/*end account-cart*/}
              <div className="account-member dropdown">
                {isAuth && (
                  <Fragment>
                    <Link
                      to={`/${userProfile.username}`}
                      className="account-toggle"
                    >
                      <img className="icons" src={img_account} alt="" />
                      <span className="account-name">{userProfile.name}</span>
                    </Link>
                  </Fragment>
                )}
                <div className="dropdown-content">
                  <Link to={RoutesTypes.CV_PREVIEW}>Download CV</Link>
                  <a onClick={() => signOut()} href="#">
                    Sign out
                  </a>
                </div>
              </div>
              {/*end account-member*/}
            </div>
            {/*end header-col*/}
          </div>
        </div>
      </header>
    </Fragment>
  );
};
