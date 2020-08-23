import React, { Fragment, useEffect } from 'react';
import { authSelector } from 'redux/Auth/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { img_account, gaba, nav_icon } from 'assets/images';
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
import 'styles/scss/header.scss';
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
                  {/* <span className="menu-icon"></span> */}
                  <img src={nav_icon} alt="logo" />
                </a>
              </div>
              <div id="logo">
                <img src={gaba} alt="logo" />
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
