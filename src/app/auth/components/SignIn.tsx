import React, { Fragment, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectSaga } from 'utils/redux-injectors';
import { sliceKey, actions } from 'redux/Auth/slice';
import { authSelector } from 'redux/Auth/selectors';
import { AuthSaga } from 'redux/Auth/saga';
import { useForm } from 'react-hook-form';
import { auth, db } from '../../../helpers/firebase.module';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import 'styles/scss/login.scss';
import { DTO } from '../../../types/DTO';
import { toast } from 'react-toastify';
import { history } from 'utils/history';
import { Form, Input, Divider } from 'semantic-ui-react';
import styled from 'styled-components';
import { Context } from 'app/globalContext/GlobalContext';
import { GET_USER_ACCOUNT, GET_USER_DATA } from 'service/queries';
import { useFormik } from 'formik';

const loginSchema = yup.object().shape({
  email: yup.string().required('Email is a required field'),
  password: yup.string().required('Password is a required field'),
});

export const SignIn: React.FC = props => {
  const [loading, setLoading] = useState(false)
  const {
    graphQLClient,
    dispatch: { login },
  } = useContext(Context);

  const onSubmit = async data => {
    setLoading(true)
    const response = await auth.signInWithEmailAndPassword(
      data.email,
      data.password,
    );
    if (response.user) {
      const memberRef = await db
        .collection('member_data')
        .doc(data.email)
        .get();
      const userFirestore = memberRef.data();
      let userAccount = {};
      let userDataHasura = {};
      await graphQLClient
        .query({
          query: GET_USER_ACCOUNT,
          variables: { email: data.email },
        })
        .then(r => (userAccount = r?.data?.user_account[0]))
        .catch(e => console.log(e));
      await graphQLClient
        .query({
          query: GET_USER_DATA,
          variables: { email: data.email },
        })
        .then(r => (userDataHasura = r.data?.user))
        .catch(e => console.log(e));
      login({ userFirestore, userAccount, userDataHasura });
      toast.info('Welcome to GABA !');
      history.push(`/home/${userFirestore?.username || ''}`);
    } else {
      toast.error('Unable to log in with provided credentials');
      setLoading(false)
    }
  };

  const {
    errors,
    handleChange,
    handleSubmit,
    values,
    touched,
  } = useFormik({
    initialValues: {
      ...{
        email: '',
        password: '',
      },
    },
    validationSchema: loginSchema,
    onSubmit: onSubmit,
  });

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <h3>Sign in</h3>
      <Divider style={{ borderColor: '#eeaa35', marginBottom: 40 }} />
      <Form.Field required>
        <Label>Email Address </Label>
        <InputStyled
          onChange={handleChange}
          name="email"
          type="text"
          id="inputEmail"
          autoFocus
        />
        {errors.email && touched.email &&(
          <span className={'text-danger'}>{errors.email}</span>
        )}
      </Form.Field>
      <Form.Field required>
        <Label>Password</Label>
        <InputStyled
          onChange={handleChange}
          name="password"
          type="password"
          id="inputPassword"
        />
        {errors.password && touched.password &&(
          <span className={'text-danger'}>{errors.password}</span>
        )}
      </Form.Field>
      <br />
      <Form.Button
        content="Join GABA"
        primary={values.email&&values.password&&true||false}
        fluid
        loading={loading}
        size="huge"
        // disabled={loading}
      />

      <div className="text-center form-group">
        <a
          onClick={e => {
            e.preventDefault();
            auth
              .sendPasswordResetEmail(values.email)
              .then(() => {
                toast.success('reset password send');
              })
              .catch(error => {
                // An error happened.\
                console.log(error)
                toast.error('An error ocurred');
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
