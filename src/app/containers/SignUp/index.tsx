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
import { Link } from 'react-router-dom';
import RoutesTypes from '../../../types/Routes';

const SignupSchema = yup.object().shape({
  firstname: yup.string().required('First Name is a required field.'),
  lastname: yup.string().required('Last Name is a required field'),
  username: yup.string().required('Username is a required field'),
  password: yup
    .string()
    .required('You are required to set a password.')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter.')
    .matches(/\d/, 'Password must contain at least one number.')
    .matches(/\W/, 'Password must contain at least one unique character.')
    .min(8, 'Passwords must be a minimum of 8 characters.'),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password here.'),
  emailAddress: yup
    .string()
    .email()
    .required('Email Address is a required field.'),
  medicalschool: yup
    .string()
    .required('Please provide the name of your medical school.'),
  filesubmission: yup
    .mixed()

    .test('fileSize', 'Files must be no larger than 5MB', value => {
      return value && value[0].size < 5242880;
    })
    .required(
      'We require a file submission to verify you are a medical student.',
    ),
});

export const SignUp = () => {
  const [createUsername, setCreateUsername] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [createEmail, setCreateEmail] = useState('');
  const [createFirstName, setCreateFirstName] = useState('');
  const [createLastName, setCreateLastName] = useState('');
  const [createMedicalSchoolYear, setCreateMedicalSchoolYear] = useState('MS1');
  const [createMedicalSchool, setCreateMedicalSchool] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState(null);

  const types = ['image/png', 'image/jpeg', 'application/pdf'];
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const updateValues = () => {
    setCreateUsername((document.querySelector('#username') as any)!.value);
    setCreatePassword((document.querySelector('#password') as any)!.value);
    setCreateEmail((document.querySelector('#emailAddress') as any)!.value);
    setCreateFirstName(document.querySelector('#firstname' as any)!.value);
    setCreateLastName(document.querySelector('#lastname' as any)!.value);
    setCreateMedicalSchool(
      document.querySelector('#medicalschool' as any)!.value,
    );
    setCreateMedicalSchoolYear(
      document.querySelector('#medicalschoolyear' as any)!.value,
    );
  };

  const fileStorage = async file => {
    let storageRef = storageFB.ref();
    let fileRef = storageRef.child(
      `files/${createEmail}/verification/${file.name}`,
    );
    const collectionRef = db.collection('member_data').doc(createEmail);
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

  const changeHandler = e => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
    }
  };

  const sendVerificationEmail = async () => {
    if (validationError === null) {
      const template_params = {
        contactEmail: createEmail,
        contactFirstName: createFirstName,
      };

      const service_id = 'default_service';
      const template_id = 'template_7uh3g6p';
      const user_id = 'user_yIq3IIfTQ8ruKbjBAqYaQ';
      await emailjs.send(service_id, template_id, template_params, user_id);
    } else throw error;
  };

  const createUser = async () => {
    await auth
      .createUserWithEmailAndPassword(createEmail, createPassword)
      .catch(error => {
        let errorMessage = error.message;
        setValidationError(errorMessage);
      });
  };

  const showPassword = () => {
    let password = document.querySelector('#password');
    let confirmPassword = document.querySelector('#confirmPassword');
    if ((password as any)!.type === 'password') {
      (password as any)!.type = 'text';
      (confirmPassword as any)!.type = 'text';
    } else {
      (password as any)!.type = 'password';
      (confirmPassword as any)!.type = 'password';
    }
  };

  const userDatabaseEntry = async () => {
    if (validationError === null) {
      await db
        .collection('member_data')
        .doc(createEmail)
        .set(
          {
            email: createEmail,
            avatar: '',
            awards: '',
            about: '',
            phone_number: '',
            address: '',
            honors: [],
            class_quartile: '',
            clerkship_honors: [],
            complex_1: 0,
            complex_2: 0,
            couples_match: false,
            cs_pe: '',
            degrees: '',
            edit: false,
            gender: '',
            interview_offers: '',
            interview_offers_prelim: '',
            interview_offers_ty: '',
            interviews_cancelled_or_declined: '',
            learning_style: '',
            match: false,
            mcat: 0,
            is_passed_mcat: false,
            mcat_document_name: '',
            mcat_review_requested: false,
            name: `${createFirstName} ${createLastName}`,
            number_of_apps_categorical: '',
            number_of_apps_preliminary_year: '',
            number_of_general_publications: '',
            number_of_ir_applications: '',
            number_of_ir_interviews: '',
            number_of_presentations: '',
            number_of_sub_1: '',
            places_interviewed: '',
            reapplicant: '',
            red_flag: '',
            rejections: '',
            specialty_interest: '',
            specialty_specific_publications: '',
            step_1: 0,
            is_passed_step1: false,
            step_1_document_name: '',
            step_1_review_requested: false,
            step_1_resources_used: [],
            step_2: 0,
            is_passed_step2: false,
            step_2_resources_used: [],
            step_2_document_name: '',
            step_2_review_requested: false,
            student_location: '',
            student_status: createMedicalSchoolYear,
            total_interviews_attended: '',
            total_ranked: '',
            username: createUsername,
            verified: false,
            waitlists: 0,
            year: '',
            year_in_program: 0,
            step_3: 0,
            is_passed_step3: false,
            step_3_document_name: '',
            step_3_resources_used: [],
            step_3_review_requested: false,
            medicalSchool: createMedicalSchool,
            isVerified: false,
          },
          { merge: true },
        );
      await db.collection('program_review').doc(createEmail).set(
        {
          specialty: '',
        },
        { merge: true },
      );
    } else throw error;
  };

  const onCreationSuccess = () => {
    if (validationError === null) {
      alert(
        'Submitted! Please allow 24-48 hours for your documents to be verified. You will be emailed when accepted!',
      );
      window.location.replace(RoutesTypes.SIGN_IN);
    } else throw error;
  };

  //This extremely messy series of trying and catching doesn't stop the function when any the other functions being referenced throw errors.
  const onSubmit = async () => {
    try {
      await auth
        .createUserWithEmailAndPassword(createEmail, createPassword)
        .catch(error => {
          let errorMessage = error.message;
          setValidationError(errorMessage);
        });
      if (!validationError) {
        await fileStorage(file)
          .then(async () => {
            await userDatabaseEntry();
          })
          .then(() => {
            sendVerificationEmail();
          })
          .then(() => {
            onCreationSuccess();
          });
      } else throw error;
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <section className="container">
        <Link to={RoutesTypes.SIGN_IN}>
          <button className="btn btn-primary btn-block">
            <i className="fas fa-user-plus" /> Already a member?
          </button>
        </Link>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="form-group">
            <label
              htmlFor="firstname"
              className="label"
              style={{ color: 'black' }}
            >
              First Name*
            </label>

            <input
              className="form-control"
              type="text"
              id="firstname"
              onChange={e => updateValues()}
              ref={register}
              name="firstname"
            />
            <small className="form-text text-muted">
              {errors.firstname?.message}
            </small>
          </section>
          <section className="form-group">
            <label
              htmlFor="lastname"
              className="label"
              style={{ color: 'black' }}
            >
              Last Name*
            </label>

            <input
              className="form-control"
              type="text"
              id="lastname"
              name="lastname"
              ref={register}
              onChange={e => updateValues()}
            />
            <small className="form-text text-muted">
              {errors.lastname?.message}
            </small>
          </section>
          <section className="form-group">
            <label
              htmlFor="username"
              className="label"
              style={{ color: 'black' }}
            >
              Username*
            </label>

            <input
              className="form-control"
              type="text"
              id="username"
              name="username"
              onChange={e => updateValues()}
              ref={register}
            />
            <small className="form-text text-muted">
              {errors.username?.message}
            </small>
          </section>
          <section className="form-group">
            <label
              htmlFor="password"
              className="label"
              style={{ color: 'black' }}
            >
              Password*
            </label>
            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              autoComplete="new-password"
              onChange={e => updateValues()}
              ref={register}
            />
            <small className="form-text text-muted">
              {errors.password?.message}
            </small>
          </section>
          <section className="form-group">
            <label
              htmlFor="confirmpassword"
              className="label"
              style={{ color: 'black' }}
            >
              Confirm Password*
            </label>
            <input
              className="form-control"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              onChange={e => updateValues()}
              ref={register}
              name="confirmpassword"
            />
            <small className="form-text text-muted">
              {errors.confirmpassword?.message}
            </small>
            <section className="form-check">
              <input
                type="checkbox"
                value=""
                onClick={showPassword}
                className="form-check-input"
                id="defaultCheck1"
              />
              <label className="form-check-label" htmlFor="defaultCheck1">
                Show Password
              </label>
            </section>
          </section>
          <section className="form-group">
            <label
              htmlFor="emailAddress"
              className="label"
              style={{ color: 'black' }}
            >
              Email Address*
            </label>

            <input
              className="form-control"
              type="email"
              autoComplete="email"
              ref={register}
              onChange={e => updateValues()}
              id="emailAddress"
              name="emailAddress"
            ></input>
            <small className="form-text text-muted">
              {errors.emailAddress?.message}
            </small>
            {validationError ? <p>{validationError}</p> : <p></p>}
          </section>
          <section className="form-group">
            <label
              htmlFor="medicalschool"
              className="label"
              style={{ color: 'black' }}
            >
              Medical School*
            </label>

            <input
              className="form-control"
              type="text"
              id="medicalschool"
              name="medicalschool"
              ref={register}
              onChange={e => updateValues()}
            ></input>
            <small className="form-text text-muted">
              {errors.medicalschool?.message}
            </small>
          </section>
          <section className="form-group">
            <label
              htmlFor="medicalschoolyear"
              className="label"
              style={{ color: 'black' }}
            >
              Medical School Year*
            </label>

            <select
              id="medicalschoolyear"
              name="medicalschoolyear"
              className="form-control"
              onChange={e => updateValues()}
            >
              <option value="MS1">MS1</option>
              <option value="MS2">MS2</option>
              <option value="MS3">MS3</option>
              <option value="MS4">MS4</option>
              <option value="Resident">Resident</option>
              <option value="Fellow">Fellow</option>
            </select>
            <small className="form-text text-muted">
              {errors.medicalschoolyear?.message}
            </small>
          </section>
          <section className="form-group">
            <label
              htmlFor="filesubmission"
              className="label"
              style={{ color: 'black' }}
            >
              Medical School Verification*
            </label>
            <small className="form-text text-muted">
              Please submit one of the following: school ID, acceptance letter,
              unofficial transcript, or certificate of enrollment.
            </small>
            <input
              type="file"
              ref={register}
              onChange={changeHandler}
              id="filesubmission"
              name="filesubmission"
              className="form-control-file"
            />
            <small className="form-text text-muted">
              {errors.filesubmission?.message}
            </small>
          </section>{' '}
          <input type="submit" className="btn btn-success btn-block" />
        </form>
      </section>
    </>
  );
};
