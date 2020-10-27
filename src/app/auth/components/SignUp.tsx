import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Divider, Select } from 'semantic-ui-react';
import styled from 'styled-components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { useForm } from 'react-hook-form';
import { auth, db , storageFB,timestamp} from '../../../helpers/firebase.module';
import RoutesTypes from 'types/Routes';
import emailjs from 'emailjs-com';


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
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [schoolYear, setSchoolYear] = useState('');
  
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

  // function onSubmit(data) {
  //   console.log(data);
  //   auth
  //     .createUserWithEmailAndPassword(data.email, data.password)
  //     .then(async r => {
  //       // await userDatabaseEntry();
  //       window.location.replace(RoutesTypes.AUTH);
  //     })
  //     .catch(error => {
  //       let errorMessage = error.message;
  //       setValidationError(errorMessage);
  //     });
  // }
  const userDatabaseEntry = async () => {
    if (validationError === null) {
      await db
        .collection('member_data')
        .doc("createEmail")
        .set(
          {
            email: "createEmail",
            avatar: '',
            membership_type: 'GABASilver',
            payment_complete: false,
            last_login: '',
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
            name: `${"createFirstName"} ${"createLastName"}`,
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
            student_status: "createMedicalSchoolYear",
            total_interviews_attended: '',
            total_ranked: '',
            username: "createUsername",
            verified: false,
            waitlists: 0,
            year: '',
            year_in_program: 0,
            step_3: 0,
            is_passed_step3: false,
            step_3_document_name: '',
            step_3_resources_used: [],
            step_3_review_requested: false,
            medicalSchool: "createMedicalSchool"
          },
          { merge: true },
        );
      await db.collection('program_review').doc("createEmail").set(
        {
          specialty: '',
        },
        { merge: true },
      );
    } else throw error;
  };

  const fileStorage = async file => {
    let storageRef = storageFB.ref();
    let fileRef = storageRef.child(
      `files/${"createEmail"}/verification/${file.name}`,
    );
    const collectionRef = db.collection('member_data').doc("createEmail");
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

  const onCreationSuccess = () => {
    if (validationError === null) {
      alert(
        'Submitted! Please allow 24-48 hours for your documents to be verified. You will be emailed when accepted!',
      );
      window.location.replace(RoutesTypes.AUTH);
    } else throw error;
  };

  const sendVerificationEmail = async () => {
    if (validationError === null) {
      const template_params = {
        contactEmail: "createEmail",
        contactFirstName: "createFirstName",
      };

      const service_id = 'default_service';
      const template_id = 'template_7uh3g6p';
      const user_id = 'user_yIq3IIfTQ8ruKbjBAqYaQ';
      await emailjs.send(service_id, template_id, template_params, user_id);
    } else throw error;
  };

  const onSubmit = async () => {
    try {
      await auth
        .createUserWithEmailAndPassword("createEmail", "createPassword")
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

  //function userDatabaseEntry(firstname, lastname, email, username) {}

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
        <Label>School Year </Label>
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
          onChange={(e, { value }:any) => setSchoolYear(value)}
        />
      </Form.Field>

      <Form.Field required>
        <Label>Medical School Verification</Label>

        <input
          // icon="mail"
          // iconPosition="left"
          type="file"
          ref={register}
          name="filesubmission"
          onChange={changeHandler}
        />
        {errors.email && (
          <span className={'text-danger'}>{errors.email.message}</span>
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
