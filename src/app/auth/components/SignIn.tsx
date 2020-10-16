import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectSaga } from 'utils/redux-injectors';
import { sliceKey, actions } from 'redux/Auth/slice';
import { authSelector } from 'redux/Auth/selectors';
import { AuthSaga } from 'redux/Auth/saga';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import RoutesTypes from '../../../types/Routes';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import 'styles/scss/login.scss';

import { Form, Input, Divider } from 'semantic-ui-react';
import styled from 'styled-components';

const loginSchema = yup.object().shape({
  email: yup.string().required('Email is a required field'),
  password: yup.string().required('Password is a required field'),
});

export const SignIn: React.FC = props => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginSchema),
  });

  useInjectSaga({ key: sliceKey, saga: AuthSaga });

  const dispatch = useDispatch();
  const { loading } = useSelector(authSelector);
  const onSubmit = data => {
    dispatch(
      actions.loginAction({
        email: data.email,
        password: data.password,
      }),
    );
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <h3>Sign in</h3>
      <Divider style={{ borderColor: '#eeaa35', marginBottom: 40 }} />
      <Form.Field required>
        <Label>Email Address </Label>
        <InputStyled
          ref={register}
          name="email"
          type="text"
          id="inputEmail"
          autoFocus
        />
        {errors.email && (
          <span className={'text-danger'}>{errors.email.message}</span>
        )}
      </Form.Field>
      <Form.Field required>
        <Label>Password</Label>
        <InputStyled
          ref={register}
          name="password"
          type="password"
          id="inputPassword"
          autoFocus
        />
        {errors.password && (
          <span className={'text-danger'}>{errors.password.message}</span>
        )}
      </Form.Field>
      <br/>
      <Form.Button
        content="Join GABA"
        primary
        fluid
        size="huge"
        disabled={loading}
      />

      {/* <div className="form-group">
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
      </div> */}
      {/* <div className="form-group">
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
      </div> */}
      {/* <button
        disabled={loading ? true : false}
        className="btn btn-success btn-block"
        type="submit"
      >
        <i className="fas fa-sign-in-alt" /> Sign in
      </button> */}
      <div className="text-center form-group">
        <a
          onClick={e => {
            e.preventDefault();
            if (!loading) {
              //Redirect
            }
          }}
          className="mb-3"
          href="#"
          id="forgot_pswd"
        >
          Forgot password?
        </a>
      </div>
      {/* <Link to={RoutesTypes.SIGN_UP}>
            <button
              className="btn btn-primary btn-block"
              type="button"
              id="btn-signup"
              disabled={loading ? true : false}
            >
              <i className="fas fa-user-plus" /> Sign up
            </button>
          </Link> */}
    </FormWrapper>
  );
};

const FormWrapper = styled(Form)`
  margin: 32px auto;
  width: 40%;
  @media (max-width: 768px) {
    width: 80%;
  }
`;
const Label = styled.label`
  font-size: 1.34em !important;
`;
const ExtraLabel = styled.label`
  font-size: 0.8em !important;
`;
const InputStyled = styled.input``;
