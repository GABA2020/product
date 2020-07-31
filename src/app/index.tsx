/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import 'assets/css/common.css';
import 'styles/scss/LoadingPage.scss';
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
import { useInjectReducer } from 'utils/redux-injectors';
import { MainPage } from './containers/MainPage';
import { Login } from './containers/Auth/Login';
import { CVPage } from './containers/CVPage';
import { SignUp } from './containers/SignUp';

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
          <Route exact path={RoutesTypes.SIGN_UP} component={SignUp} />
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
