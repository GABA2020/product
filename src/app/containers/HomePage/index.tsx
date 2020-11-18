import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { history } from '../../../utils/history';
import RoutesTypes from 'types/Routes';
import { authSelector } from 'redux/Auth/selectors';
import { Context } from 'app/globalContext/GlobalContext';

export function HomePage() {
  // const { username } = useSelector(authSelector);
  const { state: { user } } = useContext(Context);
  const username = user?.username;
  return (
    <React.Fragment>
      <Router history={history}>
        <Switch>
          <Route
            exact
            path={RoutesTypes.HOME}
            render={() => {
              return <Redirect to={`home/${username}`} />;
            }}
          ></Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}
