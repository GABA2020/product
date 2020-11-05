import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectSaga } from 'utils/redux-injectors';
import { sliceKey, actions } from 'redux/Auth/slice';
import { authSelector } from 'redux/Auth/selectors';
import { AuthSaga } from 'redux/Auth/saga';
import { useForm } from 'react-hook-form';
import { auth } from '../../../helpers/firebase.module';
import { Link } from 'react-router-dom';
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
  const [email, setEmail] = useState('')
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
          onChange={({target})=>setEmail(target.value)}
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
        // disabled={loading}
      />

      <div className="text-center form-group">
        <a
          onClick={e => {
            e.preventDefault();
            auth.sendPasswordResetEmail(email).then(()=> {
              console.log('reset password send')
            }).catch((error)=> {
              // An error happened.
            });
          }}
          className="mb-3"
          href="#"
          id="forgot_pswd"
        >
          Forgot password?
        </a>
      </div>
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
