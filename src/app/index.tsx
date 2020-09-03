/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import 'antd/dist/antd.css';
import 'assets/css/common.css';
import 'styles/scss/common.scss';
import 'styles/scss/LoadingPage.scss';
import 'styles/scss/LockerReview.scss';
import 'styles/scss/PageContent.scss';
import 'styles/scss/SectionFooter.scss';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { HomePage } from './containers/HomePage/Loadable';
// import { NotFoundPage } from './containers/NotFoundPage/Loadable';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import RoutesTypes from '../types/Routes';
import { authSelector } from 'redux/Auth/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from 'firebase';
import { history } from 'utils/history';
import {
  actions as authActions,
  reducer as authReducer,
  sliceKey as authSlice,
} from 'redux/Auth/slice';
import {
  reducer as userReducer,
  sliceKey as userSlice,
} from 'redux/User/slice';
import {
  sliceKey as programSlice,
  reducer as programReducer,
} from 'redux/Program/slice';
import {
  sliceKey as storageSlice,
  reducer as storageReducer,
} from 'redux/Storage/slice';
import {
  sliceKey as lockerSlice,
  reducer as lockerReducer,
} from 'redux/Locker/slice';
import {
  sliceKey as chatSlice,
  reducer as chatReducer,
} from 'redux/Chat/slice';
import { useInjectReducer } from 'utils/redux-injectors';
import { MainPage } from './containers/MainPage';
import { Login } from './containers/Auth/Login';
import { CVPage } from './containers/CVPage';

// Auth Route
const AuthRoute = ({ component: Component, ...rest }) => {
  const { isAuth } = rest;
  return (
    <Route
      {...rest}
      render={props =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect to={RoutesTypes.SIGN_IN} />
        )
      }
    />
  );
};

export function App() {
  const { isAuth } = useSelector(authSelector);
  const dispatch = useDispatch();

  useInjectReducer({ key: authSlice, reducer: authReducer });
  useInjectReducer({ key: userSlice, reducer: userReducer });
  useInjectReducer({ key: programSlice, reducer: programReducer });
  useInjectReducer({ key: storageSlice, reducer: storageReducer });
  useInjectReducer({ key: lockerSlice, reducer: lockerReducer });
  useInjectReducer({ key: chatSlice, reducer: chatReducer });

  React.useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (!user) {
        dispatch(authActions.logoutAction());
      }
    });
  }, [dispatch]);

  return (
    <React.Fragment>
      <ToastContainer
        autoClose={3000}
        transition={Slide}
        newestOnTop
        closeOnClick
        pauseOnHover={false}
        draggable
      />
      <Router history={history}>
        <Switch>
          <Route exact path={RoutesTypes.SIGN_IN} component={Login} />
          <AuthRoute
            isAuth={isAuth}
            exact
            path={RoutesTypes.CV_PREVIEW}
            component={CVPage}
          />
          <AuthRoute
            isAuth={isAuth}
            exact
            path={RoutesTypes.PRODUCT}
            component={MainPage}
          />
          <AuthRoute
            isAuth={isAuth}
            exact
            path={RoutesTypes.USER}
            component={MainPage}
          />
          <AuthRoute
            isAuth={isAuth}
            exact
            path={RoutesTypes.HOME}
            component={MainPage}
          />
        </Switch>
      </Router>
    </React.Fragment>
  );
}
