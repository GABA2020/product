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
import PeoplePage from './people/screens/PeoplePage';
import { db } from '../helpers/firebase.module';
import { GET_USER_ACCOUNT, GET_USER_DATA } from 'service/queries';
import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('UA-183349067-1'); // put your tracking id here
};
export const GApageView = page => {
  ReactGA.pageview(page);
};

// Auth Route
const AuthRoute = ({ component: Component, ...rest }) => {
  const { isAuth } = rest;
  if (isAuth && rest.path === RoutesTypes.AUTH)
    return <Redirect to={RoutesTypes.HOME} />;
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
  const {
    graphQLClient,
    state: { isAuth, userWorks },
    dispatch: { login },
  } = React.useContext(Context);
  const [initialized, setInitialized] = React.useState(false);

  React.useEffect(() => {
    (window as any).$crisp = [];
    (window as any).CRISP_WEBSITE_ID = '8a0ef439-8fa0-4840-bd83-5a280d873944';
    (function () {
      var d = document;
      var s = d.createElement('script');

      s.src = 'https://client.crisp.chat/l.js';
      s.async = true;
      d.getElementsByTagName('head')[0].appendChild(s);
    })();

    initGA();

    auth().onAuthStateChanged(async user => {
      if (!user) {
        setInitialized(true);
      } else {
        const memberRef = await db
          .collection('member_data')
          .doc(user.email || '')
          .get();
        const userFirestore = memberRef.data();
        let userAccount: any = {};
        let userDataHasura: any = {};
        await graphQLClient
          .query({
            query: GET_USER_ACCOUNT,
            variables: { email: user.email },
          })
          .then(r => (userAccount = r?.data?.user_account[0]))
          .catch(e => console.log('GET_USER_ACCOUNT', e));
        await graphQLClient
          .query({
            query: GET_USER_DATA,
            variables: { email: user.email },
          })
          .then(r => (userDataHasura = r.data?.user))
          .catch(e => console.log('GET_USER_DATA', e));
        console.log('user', userFirestore, userAccount, userDataHasura);
        login({ userFirestore, userAccount, userDataHasura });
        (window as any).$crisp.push(["set", "user:email", [user.email]]);
        (window as any).$crisp.push(["set", "user:nickname", [`${userAccount.name} ${userAccount.last_name}`]])
        setInitialized(true);
      }
    });
  }, []);

  if (!initialized) return <></>;

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
          <AuthRoute
            isAuth={isAuth}
            exact
            path={RoutesTypes.SCHOOLS}
            component={MainPage}
          />
          <AuthRoute
            isAuth={isAuth}
            exact
            path={RoutesTypes.APLICANTDB}
            component={MainPage}
          />
        </Switch>
      </Router>
    </React.Fragment>
  );
}
