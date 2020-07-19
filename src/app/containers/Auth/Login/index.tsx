import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectSaga } from 'utils/redux-injectors';
import { sliceKey, reducer, actions } from 'redux/Auth/slice';
import { authSelector } from 'redux/Auth/selectors';
import { AuthSaga } from 'redux/Auth/saga';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import 'assets/scss/login.scss';

const loginSchema = yup.object().shape({
  email: yup.string().required('Email is a required field'),
  password: yup.string().required('Password is a required field'),
});

export const Login: React.FC = props => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginSchema),
  });

  useInjectSaga({ key: sliceKey, saga: AuthSaga });

  const dispatch = useDispatch();
  const { isAuth } = useSelector(authSelector);
  const onSubmit = data => {
    dispatch(
      actions.loginAction({
        email: data.email,
        password: data.password,
      }),
    );
  };

  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sign in</title>
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      <div id="logreg-forms">
        <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h1 className="h3 font-weight-normal text-center">
              {' '}
              Sign in to GABA
            </h1>
          </div>
          <div className="form-group">
            <input
              ref={register}
              name="email"
              type="text"
              id="inputEmail"
              className="form-control"
              placeholder="Email address"
              autoFocus
            />
            {errors.email && (
              <span className={'text-danger'}>{errors.email.message}</span>
            )}
          </div>
          <div className="form-group">
            <input
              ref={register}
              name="password"
              type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Password"
            />
            {errors.password && (
              <span className={'text-danger'}>{errors.password.message}</span>
            )}
          </div>
          <button className="btn btn-success btn-block" type="submit">
            <i className="fas fa-sign-in-alt" /> Sign in
          </button>
          <div className="text-center form-group">
            <a className="mb-3" href="#" id="forgot_pswd">
              Forgot password?
            </a>
          </div>
          <button
            className="btn btn-primary btn-block"
            type="button"
            id="btn-signup"
          >
            <i className="fas fa-user-plus" /> Sign up
          </button>
        </form>
        <br />
      </div>
    </Fragment>
  );
};
