import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Divider } from 'semantic-ui-react';
import styled from 'styled-components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { useForm } from 'react-hook-form';
import { auth, db } from '../../../helpers/firebase.module';
import RoutesTypes from 'types/Routes';

const SignupSchema = yup.object().shape({
  firstname: yup.string().required('First Name is a required field.'),
  lastname: yup.string().required('Last Name is a required field'),
  username: yup.string().required('Username is a required field'),
  email: yup
    .string()
    .email('Email format incorrect')
    .required('Email Address is a required field.'),
  password: yup
    .string()
    .required('You are required to set a password.')
    .min(8, 'Passwords must be a minimum of 8 characters.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password here.'),
});

export function SignUp() {
  const [validationError, setValidationError] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  function onSubmit(data) {
    console.log(data);
    auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(async r => {
        // await userDatabaseEntry();
        window.location.replace(RoutesTypes.AUTH);
      })
      .catch(error => {
        let errorMessage = error.message;
        setValidationError(errorMessage);
      });
  }

  function userDatabaseEntry(firstname,lastname,email,username,) {
    
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <h3>Join GABA</h3>
      <Divider style={{ borderColor: '#eeaa35', marginBottom: 40 }} />
      <Form.Group widths="equal">
        <Form.Field required>
          <Label>First name</Label>
          <input type="text" ref={register} name="firstname" id="firstname" />
          {errors.firstname && (
            <span className={'text-danger'}>{errors.firstname.message}</span>
          )}
        </Form.Field>
        <Form.Field required>
          <Label>Last name</Label>
          <input type="text" ref={register} name="lastname" />
          {errors.lastname && (
            <span className={'text-danger'}>{errors.lastname.message}</span>
          )}
        </Form.Field>
      </Form.Group>
      <Divider />
      <Form.Field required>
        <Label>
          Username{' '}
          <ExtraLabel>
            Your username will be diplayed on your public profile and reviews
          </ExtraLabel>
        </Label>
        <input placeholder="@" type="text" ref={register} name="username" />
        {errors.username && (
          <span className={'text-danger'}>{errors.username.message}</span>
        )}
      </Form.Field>
      <Divider />
      <Form.Field required>
        <Label>Email Address </Label>

        <input
          // icon="mail"
          // iconPosition="left"
          type="text"
          ref={register}
          name="email"
        />
        {errors.email && (
          <span className={'text-danger'}>{errors.email.message}</span>
        )}
      </Form.Field>
      <Divider />
      <Form.Group widths="equal">
        <Form.Field required>
          <Label>Password</Label>
          <input type="password" ref={register} name="password" />
          {errors.password && (
            <span className={'text-danger'}>{errors.password.message}</span>
          )}
        </Form.Field>
        <Form.Field required>
          <Label>Confirm Password</Label>
          <input type="password" ref={register} name="confirmPassword" />
          {errors.confirmPassword && (
            <span className={'text-danger'}>
              {errors.confirmPassword.message}
            </span>
          )}
        </Form.Field>
      </Form.Group>
      <Divider />
      <Form.Button content="Join GABA" fluid size="huge" />
    </FormWrapper>
  );
}

const FormWrapper = styled(Form)`
  margin: 32px auto;
  width: 50%;
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
