import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Divider, Select } from 'semantic-ui-react';
import styled from 'styled-components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { useForm } from 'react-hook-form';
import {
  auth,
  db,
  storageFB,
  timestamp,
} from '../../../helpers/firebase.module';
import RoutesTypes from 'types/Routes';
import emailjs from 'emailjs-com';
import { Context } from 'app/globalContext/GlobalContext';
import { CREATE_USER } from '../../../service/queries';
import { toast } from 'react-toastify';

const SignupSchema = yup.object().shape({
  firstname: yup.string().required('First Name is a required field.'),
  lastname: yup.string().required('Last Name is a required field'),
  username: yup.string().required('Username is a required field'),
  medicalschool: yup.string().required('Medical School is a required field'),
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
  const [file, setFile] = useState<File|null>(null);
  const [error, setError] = useState('');
  const [schoolYear, setSchoolYear] = useState('');
  const {
    graphQLClient,
    dispatch: { login },
  } = useContext(Context);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const changeHandler = e => {
    let selected = e.target.files[0];
    const types = ['image/png', 'image/jpeg', 'application/pdf'];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
    }
  };

  const fileStorage = async (file, data) => {
    let storageRef = storageFB.ref();
    let fileRef = storageRef.child(
      `files/${data.email}/verification/${file.name}`,
    );
    const collectionRef = db.collection('member_data').doc(data.email);
    await fileRef.put(file).then(async () => {
      const url = await fileRef.getDownloadURL();
      collectionRef.set(
        {
          schoolVerification: url,
          creationDate: timestamp(),
        },
        { merge: true },
      );
    });
  };

  const sendVerificationEmail = async data => {
    if (validationError === null) {
      const template_params = {
        contactEmail: data.email,
        contactFirstName: data.firstname,
      };

      const service_id = 'default_service';
      const template_id = 'template_7uh3g6p';
      const user_id = 'user_yIq3IIfTQ8ruKbjBAqYaQ';
      await emailjs.send(service_id, template_id, template_params, user_id);
    } else throw error;
  };

  const onSubmit = async data => {
    try {
      const variables = {
        email: data.email,
        last_name: data.lastname,
        medical_school: data.medicalschool,
        name: data.firstname,
        password: data.password,
        school_year: schoolYear,
        username: data.username,
        verification_file:file?.name||''
      };
      await graphQLClient
        .mutate({
          variables,
          mutation: CREATE_USER,
        })
        .then(result => console.log(result))
      sendVerificationEmail(data);
      await auth.signInWithEmailAndPassword(data.email,data.password);
      await fileStorage(file, data);
      alert(
        'Submitted! Please allow 24-48 hours for your documents to be verified. You will be emailed when accepted!',
      );
      window.location.replace(RoutesTypes.AUTH);
    } catch (error) {
      console.log(error);
      console.log(error.message);
      toast.error('Unable to sign in with provided data');
    }
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
        <Label>Medical School </Label>
        <input type="text" ref={register} name="medicalschool" />
        {errors.medicalschool && (
          <span className={'text-danger'}>{errors.medicalschool.message}</span>
        )}
      </Form.Field>
      <Form.Field required>
        <Label>Stundent Status </Label>
        <Select
          clearable
          options={[
            { key: 'MS1', text: 'MS1', value: 'MS1' },
            { key: 'MS2', text: 'MS2', value: 'MS2' },
            { key: 'MS3', text: 'MS3', value: 'MS3' },
            { key: 'MS4', text: 'MS4', value: 'MS4' },
            { key: 'Resident', text: 'Resident', value: 'Resident' },
            { key: 'Fellow', text: 'Fellow', value: 'Fellow' },
          ]}
          onChange={(e, { value }: any) => setSchoolYear(value)}
        />
      </Form.Field>

      <Form.Field required>
        <Label>Medical School Verification</Label>
        <input
          type="file"
          ref={register}
          name="filesubmission"
          onChange={changeHandler}
        />
        {errors.filesubmission && (
          <span className={'text-danger'}>{errors.filesubmission.message}</span>
        )}
      </Form.Field>
      <Divider />

      <Form.Field required>
        <Label>Email Address </Label>
        <input type="text" ref={register} name="email" />
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
