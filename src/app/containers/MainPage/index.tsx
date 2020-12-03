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
import { useDispatch} from 'react-redux';
import { SearchUser } from '../SearchUser';
import MarketPlacePage from '../../marketplace/screens/MarketPlaceScreen';
import { Context } from 'app/globalContext/GlobalContext';
import PeoplePage from '../../people/screens/PeoplePage';
import Schools from '../../schools/index';
import AplicantDatabase from 'app/aplicantDatabase';
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
  const { state: { isAuth, } } = React.useContext(Context);
  // const { isAuth } = useSelector(authSelector);
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
              path={RoutesTypes.PEOPLE}
              component={PeoplePage}
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
              path={RoutesTypes.SCHOOLS}
              component={Schools}
            />
            <AuthRoute
              isAuth={isAuth}
              exact
              path={RoutesTypes.APLICANTDB}
              component={AplicantDatabase}
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
