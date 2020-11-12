import React, { Fragment, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectSaga } from 'utils/redux-injectors';
import { sliceKey, actions } from 'redux/Auth/slice';
import { authSelector } from 'redux/Auth/selectors';
import { AuthSaga } from 'redux/Auth/saga';
import { useForm } from 'react-hook-form';
import { auth, db} from '../../../helpers/firebase.module';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import 'styles/scss/login.scss';
import { DTO  } from '../../../types/DTO';
import { toast } from 'react-toastify';
import { history } from 'utils/history';
import { Form, Input, Divider } from 'semantic-ui-react';
import styled from 'styled-components';
import { Context } from 'app/globalContext/GlobalContext';

const loginSchema = yup.object().shape({
  email: yup.string().required('Email is a required field'),
  password: yup.string().required('Password is a required field'),
});

export const SignIn: React.FC = props => {
  const [email, setEmail] = useState('')
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const { dispatch: { login } } = useContext(Context);


  const onSubmit = async data => {

    const response = await auth.signInWithEmailAndPassword(
      data.email,
      data.password,
    );
    if (response.user) {
      const memberRef = await db
        .collection('member_data')
        .doc(data.email)
        .get();
      const user: DTO.Auth.LoginResponse = memberRef.data() as DTO.Auth.LoginResponse;
      login(user);
      toast.info('Welcome to GABA !');
      history.push(`/${user.username}`);
    }else{
      toast.error('Unable to log in with provided credentials');
    }
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
