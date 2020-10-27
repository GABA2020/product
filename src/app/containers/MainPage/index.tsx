import React, { Fragment, useEffect } from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Redirect, Route, Router, Switch } from 'react-router';
import { history } from '../../../utils/history';
import RoutesTypes from '../../../types/Routes';
import ProductPage from '../../product/screens/ProductScreen';
import { HomePage } from '../HomePage/Loadable';
import { auth } from 'firebase';
import { actions as authActions } from '../../../redux/Auth/slice';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../redux/Auth/selectors';
import { SearchUser } from '../SearchUser';
import MarketPlacePage from '../../marketplace/screens/MarketPlaceScreen';

// Auth Route
const AuthRoute = ({ component: Component, ...rest }) => {
  const { isAuth } = rest;
  return (
    <Route
      {...rest}
      render={props =>
        isAuth ? <Component {...props} /> : <Redirect to={RoutesTypes.AUTH} />
      }
    />
  );
};
export const MainPage = () => {
  const { isAuth } = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (!user) {
        dispatch(authActions.logoutAction());
      }
    });
  }, [dispatch]);

  return (
    <Fragment>
      <div id="wrapper">
        <Header />
        <Router history={history}>
          <Switch>
            <AuthRoute
              isAuth={isAuth}
              exact
              path={RoutesTypes.MARKET_PLACE}
              component={MarketPlacePage}
            />
            <AuthRoute
              isAuth={isAuth}
              exact
              path={RoutesTypes.PRODUCT}
              component={ProductPage}
            />
            <AuthRoute
              isAuth={isAuth}
              exact
              path={RoutesTypes.USER}
              component={SearchUser}
            />
            <AuthRoute
              isAuth={isAuth}
              exact
              path={RoutesTypes.HOME}
              component={HomePage}
            />
          </Switch>
        </Router>
      </div>
      <Footer />
    </Fragment>
  );
};
