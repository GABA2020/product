import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Divider, Select, Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { useForm } from 'react-hook-form';
import { Formik, useFormik } from 'formik';
import {
  auth,
  db,
  storageFB,
  timestamp,
} from '../../../helpers/firebase.module';
import RoutesTypes from 'types/Routes';
import emailjs from 'emailjs-com';
import { Context } from 'app/globalContext/GlobalContext';
import {
  CREATE_USER,
  EMAIL_USERNAME_VERIFICATION,
  GET_SCHOOLS,
} from '../../../service/queries';
import { toast } from 'react-toastify';
import { useQuery } from '@apollo/client';

const SignupSchema = yup.object().shape({
  name: yup.string().required('First Name is a required field.'),
  last_name: yup.string().required('Last Name is a required field'),
  username: yup.string().required('Username is a required field'),
  medical_school: yup.string().required('Medical School is a required field'),
  school_year: yup.string().required('School Year is a required field'),
  filesubmission: yup
    .object()
    .nullable()
    .shape({
      file: yup.mixed().required('A file is required'),
    }),
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

const schoolYearOptions = [
  { key: 'Pre-Med', text: 'Pre-Med', value: 'Pre-Med' },
  { key: 'MS1', text: 'MS1', value: 'MS1' },
  { key: 'MS2', text: 'MS2', value: 'MS2' },
  { key: 'MS3', text: 'MS3', value: 'MS3' },
  { key: 'MS4', text: 'MS4', value: 'MS4' },
  { key: 'Resident', text: 'Resident', value: 'Resident' },
  { key: 'Fellow', text: 'Fellow', value: 'Fellow' },
];

export function SignUp() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const { graphQLClient } = useContext(Context);

  useQuery(GET_SCHOOLS, {
    onCompleted: data =>
      setSchools(
        data.school_programs.map((school, index) => ({
          text: school.school_name,
          key: school.index,
          value: school.school_name,
        })),
      ),
  });

  const changeHandler = e => {
    let selected = e.target.files[0];
    const types = ['image/png', 'image/jpeg', 'application/pdf'];

    if (selected && types.includes(selected.type)) {
      setFieldValue('filesubmission', selected);
    } else {
      setFieldValue('filesubmission', {});
    }
  };

  function capitalizeText(text = '') {
    return text[0].toUpperCase() + text.slice(1).toLowerCase();
  }

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
    const template_params = {
      contactEmail: data.email,
      contactFirstName: data.firstname,
    };

    const service_id = 'default_service';
    const template_id = 'template_7uh3g6p';
    const user_id = 'user_yIq3IIfTQ8ruKbjBAqYaQ';
    await emailjs.send(service_id, template_id, template_params, user_id);
  };

  const {
    errors,
    handleChange,
    handleSubmit,
    values,
    setFieldValue,
    touched,
    resetForm,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      ...{
        name: '',
        last_name: '',
        username: '',
        medical_school: '',
        school_year: '',
        filesubmission: { file: '' },
        email: '',
        password: '',
        confirmPassword: '',
      },
    },
    validationSchema: SignupSchema,
    onSubmit: onSubmitHandle,
  });

  async function onSubmitHandle(data) {
    setLoading(true);
    try {
      const resultVerify = await verifyEmailAndUsername(
        data.email,
        data.username,
      );
      if (!resultVerify) {
        toast.error('Username or Email is already used');
        setLoading(false);
        return;
      }
      const variables = {
        email: data.email.trim().toLowerCase(),
        last_name: capitalizeText(data.last_name.trim()),
        medical_school: data.medical_school,
        name: capitalizeText(data.name.trim()),
        password: data.password,
        school_year: data.school_year,
        username: data.username.trim().toLowerCase(),
        verification_file: data.filesubmission?.name || '',
      };
      await graphQLClient
        .mutate({
          variables,
          mutation: CREATE_USER,
        })
        .then(result => console.log(result));
      sendVerificationEmail(data);
      await auth.signInWithEmailAndPassword(data.email, data.password);
      await fileStorage(data.filesubmission, data);
      alert(
        'Submitted! Please allow 24-48 hours for your documents to be verified. You will be emailed when accepted!',
      );
      window.location.replace(RoutesTypes.AUTH);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error('Unable to sign in with provided data');
    }
  }

  async function verifyEmailAndUsername(email, username) {
    const emailAndUsername = await graphQLClient.query({
      variables: { email, username },
      query: EMAIL_USERNAME_VERIFICATION,
    });
    if (emailAndUsername?.data?.user_account?.length) return false;
    return true;
  }

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <h3>Join GABA</h3>
      <Divider style={{ borderColor: '#eeaa35', marginBottom: 40 }} />
      <Form.Group widths="equal">
        <Form.Field required>
          <Label>First name</Label>
          <input type="text" onChange={handleChange} name="name" id="name" />
          {errors.name && touched.name && (
            <span className={'text-danger'}>{errors.name}</span>
          )}
        </Form.Field>
        <Form.Field required>
          <Label>Last name</Label>
          <input type="text" onChange={handleChange} name="last_name" />
          {errors.last_name && touched.last_name && (
            <span className={'text-danger'}>{errors.last_name}</span>
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
        <input
          placeholder="@"
          onChange={handleChange}
          type="text"
          name="username"
        />
        {errors.username && touched.username && (
          <span className={'text-danger'}>{errors.username}</span>
        )}
      </Form.Field>

      <Divider />

      {/* <Form.Field required>
        <Label>Medical School </Label>
        <input type="text" onChange={handleChange} name="medical_school" />
        {errors.medical_school && (
          <span className={'text-danger'}>{errors.medical_school}</span>
        )}
      </Form.Field> */}
      <Form.Field>
        <Label>Medical School</Label>
        <CustomDropdown
          placeholder="Select School"
          fluid
          search
          selection
          options={schools}
          onChange={(_, data) => setFieldValue('medical_school', data.value)}
          onBlur={() => setFieldTouched('medica_school', true)}
          value={values.medical_school}
          name="medical_school"
          id="medical_school"
        />
        {errors.medical_school && touched.medical_school && (
          <span className={'text-danger'}>{errors.medical_school}</span>
        )}
      </Form.Field>
      <Form.Field required>
        <Label>Student Status </Label>
        <Select
          clearable
          options={schoolYearOptions}
          onChange={(e, { value }: any) => setFieldValue('school_year', value)}
        />
        {errors.school_year && touched.school_year && (
          <span className={'text-danger'}>{errors.school_year}</span>
        )}
      </Form.Field>
      <Form.Field required>
        <Label>Medical School Verification</Label>
        <input type="file" name="filesubmission" onChange={changeHandler} />
        {errors.filesubmission?.file && touched.filesubmission && (
          <span className={'text-danger'}>{errors.filesubmission?.file}</span>
        )}
      </Form.Field>
      <Divider />

      <Form.Field required>
        <Label>Email Address </Label>
        <input type="text" onChange={handleChange} name="email" />
        {errors.email && touched.email && (
          <span className={'text-danger'}>{errors.email}</span>
        )}
      </Form.Field>
      <Divider />
      <Form.Group widths="equal">
        <Form.Field required>
          <Label>Password</Label>
          <input type="password" onChange={handleChange} name="password" />
          {errors.password && touched.password && (
            <span className={'text-danger'}>{errors.password}</span>
          )}
        </Form.Field>
        <Form.Field required>
          <Label>Confirm Password</Label>
          <input
            type="password"
            onChange={handleChange}
            name="confirmPassword"
          />
          {errors.confirmPassword && touched.password && (
            <span className={'text-danger'}> {errors.confirmPassword} </span>
          )}
        </Form.Field>
      </Form.Group>
      <Divider />

      <Form.Button
        type="submit"
        content="Join GABA"
        fluid
        size="huge"
        active={false}
        loading={loading}
        primary={
          (!Object.keys(errors).length && Object.keys(touched).length !== 0) ||
          false
        }
      />
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
const inputFontStyle = `
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.1px;
`;
const CustomDropdown = styled(Dropdown)`
  height: 40px;
  border: 1px solid lightgray;
  border-radius: 5px;
  margin-right: 15px;
  padding-left: 10px;
  width: 100%;
  ${inputFontStyle}
`;
