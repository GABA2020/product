import React, { useState } from 'react';
import {
  db,
  storageFB,
  auth,
  timestamp,
} from '../../../helpers/firebase.module';
import emailjs from 'emailjs-com';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import 'bulma/css/bulma.css';

const SignupSchema = yup.object().shape({
  firstname: yup.string().required('First Name is a required field.'),
  lastname: yup.string().required('Last Name is a required field'),
  username: yup.string().required('Username is a required field'),
  password: yup
    .string()
    .min(8)
    .required('Passwords must be a minimum of 8 characters'),
  confirmpassword: yup
    .string()
    .min(8)
    .required('Passwords must be a minimum of 8 characters'),
  emailAdress: yup.string().email().required(),
  medicalschool: yup.string().required(),
  medicalschoolyear: yup.string(),
  filesubmission: yup.string().required(),
});

export const SignUp = () => {
  const [createUsername, setCreateUsername] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [createEmail, setCreateEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [createFirstName, setCreateFirstName] = useState('');
  const [createLastName, setCreateLastName] = useState('');
  const [createMedicalSchoolYear, setCreateMedicalSchoolYear] = useState('MS1');
  const [createMedicalSchool, setCreateMedicalSchool] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState(null);

  const types = ['image/png', 'image/jpeg', 'application/pdf'];
  //Yup completely invalidates my submission process for some reason. It's likely an issue with all inputs being controlled by state instead of the actual input field.
  const { register, handleSubmit, control, errors } = useForm();
  // {resolver: yupResolver(SignupSchema)}

  const updateValues = () => {
    setCreateUsername((document.querySelector('#username') as any)!.value);
    setCreatePassword((document.querySelector('#password') as any)!.value);
    setCreateEmail((document.querySelector('#emailAddress') as any)!.value);
    setConfirmPassword(
      (document.querySelector('#confirmPassword') as any)!.value,
    );
    setCreateFirstName(document.querySelector('#firstname' as any)!.value);
    setCreateLastName(document.querySelector('#lastname' as any)!.value);
    setCreateMedicalSchool(
      document.querySelector('#medicalschool' as any)!.value,
    );
    setCreateMedicalSchoolYear(
      document.querySelector('#medicalschoolyear' as any)!.value,
    );
  };

  const fileStorage = file => {
    let storageRef = storageFB.ref();
    let fileRef = storageRef.child(`files/${createEmail}/${file.name}`);
    const collectionRef = db.collection('member_data').doc(createEmail);
    fileRef.put(file).then(async () => {
      const url = await fileRef.getDownloadURL();
      collectionRef.set(
        {
          schoolVerification: url,
          creationDate: timestamp(),
        },
        { merge: true },
      );
      console.log(url);
    });
  };
  const changeHandler = e => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('Please select an image file (png or jpeg)');
    }
  };

  const sendVerificationEmail = async () => {
    const template_params = {
      contactEmail: createEmail,
      contactFirstName: createFirstName,
    };

    const service_id = 'default_service';
    const template_id = 'welcome_to_gaba_bronze_';
    const user_id = 'user_yIq3IIfTQ8ruKbjBAqYaQ';
    await emailjs.send(service_id, template_id, template_params, user_id);
    console.log('Email sent successfully to ', createEmail);
  };

  //Despite the create user function being a single function from the firebase docs, I can't login with any account I've created, or even either of the default accounts we already had. I'm told my credentials are invalid when signing in to a new account, and when attempting to sign in to an old account I get a status code 400 error.
  const createUser = async () => {
    await auth.createUserWithEmailAndPassword(createEmail, createPassword);
  };

  const userDatabaseEntry = async () => {
    await db.collection('member_data').doc(createEmail).set(
      {
        username: createUsername,
        email: createEmail,
        firstName: createFirstName,
        lastName: createLastName,
        medicalSchool: createMedicalSchool,
        medicalSchoolYear: createMedicalSchoolYear,
        isVerified: false,
      },
      { merge: true },
    );
    console.log('Document successfully written!');
  };

  //This extremely messy series of trying and catching doesn't stop the function when any the other functions being referenced throw errors.
  const onSubmit = data => {
    console.log(data);
    try {
      createUser()
        .catch(error => {
          let errorCode = error.code;
          let errorMessage = error.message;
          setValidationError(errorMessage);
          console.error(`Error Code: ${errorCode}. ${errorMessage}`);
        })
        .then(() => {
          fileStorage(file);
        })
        .catch(error => {
          console.error(error);
        })
        .then(async () => {
          await userDatabaseEntry();
        })
        .catch(error => {
          console.error(error);
        })
        .then(() => {
          sendVerificationEmail();
        })
        .catch(error => {
          console.error('Error sending email', error);
        });
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  };

  return (
    <section className="section box">
      <p className="has-text-centered" style={{ color: 'red' }}>
        All fields are required for submission.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="field">
          <label htmlFor="firstname" className="label">
            First Name
          </label>
          <section className="control">
            {' '}
            <input
              className="input is-rounded"
              type="text"
              id="firstname"
              value={createFirstName}
              onChange={e => updateValues()}
              ref={register}
              required
              name="firstname"
            />
            {errors.firstname && <p>{errors.firstname.message}</p>}
          </section>
        </section>
        <section className="field">
          <label htmlFor="lastname" className="label">
            Last Name
          </label>
          <section className="control">
            <input
              className="input is-rounded"
              type="text"
              id="lastname"
              name="firstname"
              ref={register}
              value={createLastName}
              onChange={e => updateValues()}
              required
            />
            <p>{errors.lastname?.message}</p>
          </section>
        </section>
        <section className="field">
          <label htmlFor="username" className="label">
            Username
          </label>
          <section className="control">
            <input
              className="input is-rounded"
              type="text"
              id="username"
              name="username"
              value={createUsername}
              onChange={e => updateValues()}
              ref={register}
              required
            />
            <span>{errors.username?.message}</span>
          </section>
        </section>
        <section className="field">
          <label htmlFor="password" className="label">
            Password
          </label>
          <section className="control">
            <input
              className="input is-rounded"
              type="password"
              id="password"
              name="password"
              autoComplete="new-password"
              value={createPassword}
              onChange={e => updateValues()}
              ref={register}
              required
            />
            <p>{errors.password?.message}</p>
          </section>
        </section>
        <section className="field">
          <label htmlFor="confirmpassword" className="label">
            Confirm Password
          </label>
          <section className="control">
            <input
              className="input is-rounded"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={e => updateValues()}
              ref={register}
              name="confirmpassword"
              required
            />
            {createPassword !== confirmPassword ? (
              <p>Your passwords don't match.</p>
            ) : (
              <p></p>
            )}
          </section>
        </section>
        <section className="field">
          <label htmlFor="emailAddress" className="label">
            Email Address
          </label>
          <section className="control">
            <input
              className="input is-rounded"
              type="email"
              autoComplete="email"
              ref={register}
              value={createEmail}
              onChange={e => updateValues()}
              id="emailAddress"
              name="emailAddress"
              required
            ></input>
            <span>{errors.emailAddress?.message}</span>
            {validationError ? <p>{validationError}</p> : <p></p>}
          </section>
        </section>
        <section className="field">
          <label htmlFor="medicalschool" className="label">
            Medical School
          </label>
          <section className="control">
            <input
              className="input is-rounded"
              type="text"
              id="medicalschool"
              name="medicalschool"
              ref={register}
              value={createMedicalSchool}
              onChange={e => updateValues()}
              required
            ></input>
            <span>{errors.medicalschool?.message}</span>
          </section>
        </section>
        <section className="field">
          <label htmlFor="medicalschoolyear" className="label">
            Medical School Year
          </label>
          <section className="control">
            <select
              id="medicalschoolyear"
              name="medicalschoolyear"
              className="input is-rounded"
              onChange={e => updateValues()}
            >
              <option value="MS1">MS1</option>
              <option value="MS2">MS2</option>
              <option value="MS3">MS3</option>
              <option value="MS4">MS4</option>
              <option value="Resident">Resident</option>
              <option value="Fellow">Fellow</option>
            </select>
            <span>{errors.medicalschoolyear?.message}</span>
          </section>
        </section>
        <section className="field">
          <label htmlFor="filesubmission" className="label">
            Medical School Verification
          </label>
          <p style={{ fontSize: '12px' }}>
            Please submit one of the following: school ID, acceptance letter,
            unofficial transcript, or certificate of enrollment.
          </p>
          <input
            type="file"
            ref={register}
            onChange={changeHandler}
            required
            id="filesubmission"
            name="filesubmission"
          />
          <span>{errors.filesubmission?.message}</span>
          <section className="output">
            {error && <section className="error">{error}</section>}
            {file && <section className="file">{(file! as any).name}</section>}
          </section>
        </section>{' '}
        <input type="submit" className="button is-success" />
      </form>
    </section>
  );
};
