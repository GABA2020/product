import React from 'react';
import { useSelector } from 'react-redux';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { history } from '../../../utils/history';
import RoutesTypes from 'types/Routes';
import { authSelector } from 'redux/Auth/selectors';

export function HomePage() {
  const { username } = useSelector(authSelector);
  return (
    <React.Fragment>
      <Router history={history}>
        <Switch>
          <Route
            exact
            path={RoutesTypes.HOME}
            render={() => {
              return <Redirect to={`/${username}`} />;
            }}
          ></Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}
