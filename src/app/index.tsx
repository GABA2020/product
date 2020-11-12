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
import { actions as authActions } from 'redux/Auth/slice';
import { MainPage } from './containers/MainPage';
import { Login } from './containers/Auth/Login';
import { CVPage } from './containers/CVPage';
import { AuthScreen } from './auth/screens/AuthScreen';
import { AdminConsole } from './containers/AdminConsole';
import { PaymentPage } from './containers/PaymentPage';
import { LateralMenu } from './genericComponents/LateralMenu';
import { Context } from './globalContext/GlobalContext';
import PeoplePage from './people/screens/PeoplePage'
// Auth Route
const AuthRoute = ({ component: Component, ...rest }) => {
  const { isAuth } = rest;
  return (
    <Route
      {...rest}
      render={props =>
        isAuth ? (
          <LateralMenu>
            <Component {...props} />
          </LateralMenu>
        ) : (
          <Redirect to={RoutesTypes.AUTH} />
        )
      }
    />
  );
};

export function App() {
  // const { isAuth } = useSelector(authSelector);
  const { state: { isAuth } } = React.useContext(Context);

  const dispatch = useDispatch();


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
          <Route exact path={RoutesTypes.AUTH} component={AuthScreen} />
          <Route
            isAuth={isAuth}
            exact
            path={RoutesTypes.PAYMENT}
            component={PaymentPage}
          />
          <AuthRoute
            isAuth={isAuth}
            exact
            path={RoutesTypes.ADMIN_CONSOLE}
            component={AdminConsole}
          />
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
          <AuthRoute
            isAuth={isAuth}
            exact
            path={RoutesTypes.MARKET_PLACE}
            component={MainPage}
          />
          <AuthRoute
            isAuth={isAuth}
            exact
            path={RoutesTypes.PEOPLE}
            component={MainPage}
          />
        </Switch>
      </Router>
    </React.Fragment>
  );
}
