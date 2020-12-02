import React, { Fragment, useEffect, useState, FC, useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal as ModalAnt, message } from 'antd';
import { ImageCrop } from 'app/components/ImageCrop';
import Select from 'react-select';
import * as yup from 'yup';
import { img_user } from 'assets/images';
import { showWarningMessage } from 'helpers/Swal.module';
import { Message } from 'helpers/Message';
import { useStorage } from 'hook/useStorage';
import { REF, storageFB } from 'helpers/firebase.module';
import { Context } from 'app/globalContext/GlobalContext';
import { dataUrlFile } from 'helpers/Unity';
import {
  EDIT_USER_PROFILE_FS,
  EDIT_USER_PROFILE_PG,
} from '../../../../service/mutations';
import styled from 'styled-components';
import { Dropdown } from 'semantic-ui-react';
import { Row, Column } from '../../../genericComponents/Layout';
import { Checkbox, RadioButton } from '../../../genericComponents';
import theme from '../../../../theme';
import { useQuery } from '@apollo/react-hooks';
import { GET_SPECIALTIES, GET_SCHOOLS } from '../../../../service/queries';

const BlueHero = require('../../../../assets/images/sprites/blueHero.jpg');

const radioOptions = [
  'Pre-Med',
  'MS4',
  'MS1',
  'Fellow',
  'MS2',
  'Resident',
  'MS3',
];

const CustomModal: any = styled(Modal)`
  .modal-content {
    width: 1111px;
    position: absolute;
    left: -250px;
    padding: 0 250px;

    background: url('${BlueHero}');
    background-size: 100% 250px;
    background-repeat: no-repeat;
    background-color: white;
  }
`;

const inputFontStyle = `
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.1px;
`;

const ModalHeader = styled.div`
  padding: 41px 200px 26px 200px;
  background-color: white;
  border-bottom: 1px solid ${props => props.theme.color.softGray};
`;

const HeaderTitle = styled.h3`
  width: 100%;
  border-bottom: 2px solid ${props => props.theme.color.gabaYellow};
  padding-bottom: 20px;
`;

const ModalContent = styled(Modal.Body)`
  padding: 26px 50px 41px 50px;
  width: 100%;
`;

const Divider: any = styled.div`
  width: 100%;
  border-bottom: 1px solid lightgray;
  margin: 25px 0;

  ${(props: any) =>
    props.header
      ? `border-bottom: 1px solid ${props.theme.color.gabaYellow};`
      : ''}
`;

const FormSection = styled(Row)`
  flex-wrap: wrap;
  label {
    margin-right: 25px;
    margin-top: 10px;
  }

  .react-datepicker-wrapper input {
    height: 40px;
    width: 136px;
    border: 1px solid lightgray;
    text-align: center;
    border-radius: 5px;
    margin-right: 15px;
  }

  .custom-date {
    width: 170px;
  }
`;

const Subtitle: any = styled.p`
  width: 100%;
  color: rgb(17, 23, 65);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0px;
  margin-bottom: 30px;
  padding-left: 10px;
  position: relative;

  ${(props: any) =>
    !props.header
      ? `
  &::before {
    display: inline-block;
    content: '*';
    color: red;
    width: 8px;
    height: 8px;
    font-size: 30px;
    position: absolute;
    left: -7px;
  }
  `
      : 'color: white;'}
`;

const NotRequiredSubtitle: any = styled.p`
  width: 100%;
  color: rgb(17, 23, 65);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0px;
  margin-bottom: 30px;
  padding-left: 10px;
  position: relative;
}
`;

const CheckboxContainer = styled.div`
  width: 50%;
`;

const TextInput = styled.input`
  height: 40px;
  border: 1px solid lightgray;
  border-radius: 5px;
  margin-right: 15px;
  padding-left: 10px;
  width: 100%;
  ${inputFontStyle}
`;

const CustomDropdown = styled(Dropdown)`
  min-height: 40px;
  border: 1px solid lightgray;
  border-radius: 5px;
  margin-right: 15px;
  padding-left: 10px;
  width: 100%;
  ${inputFontStyle}
`;

const TextArea = styled.textarea`
  border: 1px solid lightgray;
  border-radius: 5px;
  margin-right: 15px;
  padding-left: 10px;
  width: 100%;
  padding-top: 10px;
  ${inputFontStyle}
`;

const ModalButton = styled.button`
  background: ${(props: { background: string }) => props.background};
  border-radius: 6px;
  height: 48px;
  color: ${props => props.theme.color.darkBlue};
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  width: 48%;
  border: none;
`;

const ButtonsContainer = styled(Row)`
  justify-content: space-between;
  width: 100%;
`;

const CustomTitle = styled.p`
  color: white;
`;

const UserInfo = styled(Column)`
  margin-left: 20px;
`;

const Name: any = styled.h3`
  color: rgb(249, 249, 249);
  font-family: EksellDisplayMedium;
  font-size: 24px;
  letter-spacing: -0.3px;
  position: relative;

  &::after {
    display: inline-block;
    content: '${(props: any) => props.degree}';
    color: white;
    height: 8px;
    font-size: 15px;
    position: absolute;
    left: 100%;
    min-width: 200px;
  }
`;

const Info = styled.p`
  color: white;
`;

const ErrorMsg = styled.span.attrs({ className: 'text-danger' })`
  margin-bottom: -20px;
`;

interface IForm {
  name: string;
  last_name: string;
  specialties: string;
  school_year: string;
  medical_school: string;
  degrees: string[];
  avatar: string;
  honors: ENTITIES.ISelect[];
}

const degreesOptions = [
  { text: 'MD', key: 'MD', value: 'MD' },
  { text: 'DO', key: 'DO', value: 'DO' },
  { text: 'MBA', key: 'MBA', value: 'MBA' },
  { text: 'PhD', key: 'PhD', value: 'PhD' },
  { text: 'JD', key: 'JD', value: 'JD' },
  { text: 'MS', key: 'MS', value: 'MS' },
  { text: 'Masters', key: 'Masters', value: 'Masters' },
  { text: 'MPH', key: 'MPH', value: 'MPH' },
  { text: 'MBBS', key: 'MBBS', value: 'MBBS' },
  { text: 'Other', key: 'Other', value: 'Other' },
  { text: 'US IMG', key: 'US IMG', value: 'US IMG' },
  { text: 'IMG', key: 'IMG', value: 'IMG' },
  { text: 'Canad-IMG', key: 'Canad-IMG', value: 'Canad-IMG' },
  { text: 'Pre-Med', key: 'Pre-Med', value: 'Pre-Med' },
];

const initialValues: IForm = {
  name: '',
  last_name: '',
  specialties: '',
  school_year: '',
  degrees: [],
  avatar: '',
  honors: [],
  medical_school: '',
};

const initFile: ENTITIES.File = {
  lastModified: 0,
  lastModifiedDate: '',
  name: '',
  size: 0,
  type: '',
  webkitRelativePath: '',
};

const schema = yup.object().shape({
  name: yup
    .string()
    .max(200, 'Name must be at most 200 characters')
    .required('Name is a required field'),
  last_name: yup
    .string()
    .max(200, 'Last Name must be at most 200 characters')
    .required('Last Name is a required field'),
  specialties: yup
    .string()
    .max(200, 'Specialty must be at most 200 characters')
    .required('Specialty is a required field'),
  school_year: yup.string().required('Year in Program is a required field'),
  medical_school: yup.string().required('Medical school is a required field'),
  degrees: yup.array().required('Name is a required field'),
  avatar: yup.string(),
  honors: yup.array(),
});

const honorsOptions = [
  { value: 'Alpha Omega Alpha', label: 'Alpha Omega Alpha' },
  {
    value: 'Gold Humanism Honor Society',
    label: 'Gold Humanism Honor Society',
  },
];

export default function EditProfileModal(props) {
  const { isShow, onHide } = props;
  const [specialities, setSpecialities]: any = useState([]);
  const [schools, setSchools]: any = useState([]);

  useQuery(GET_SPECIALTIES, {
    onCompleted: data =>
      setSpecialities(
        data.medical_specialties.map(speciality => ({
          text: speciality.specialties_name,
          key: speciality.id,
          value: speciality.specialties_name,
        })),
      ),
  });

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

  const {
    graphQLClient,
    state: { user },
    dispatch: { setUser },
  } = useContext(Context);

  const [imageState, setImageState] = useState<ENTITIES.File>(initFile);
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
      ...initialValues,
      ...{
        avatar: user.avatar,
        name: user.name,
        last_name: user.last_name,
        school_year: user.school_year,
        degrees: user.degrees || [],
        honors: user.honors || [],
        specialties: user.specialties || [],
        medical_school: user.medical_school,
      },
    },
    validationSchema: schema,
    onSubmit: submitHandle,
  });

  useEffect(() => {
    if (!isShow) {
      resetForm();
    }
  }, [isShow]);

  const image_preview = useStorage(`${REF.avatars}/${values.avatar}`);

  async function submitHandle(values) {
    const variablesFS = {
      avatar: values.avatar,
      email: user.email,
      name: `${values.name} ${values.last_name}`,
      school_year: values.school_year.toString(),
      degrees: values.degrees,
      honors: values.honors,
      specialties: values.specialties,
      medical_school: values.medical_school,
    };
    const variablesPG = {
      email: user.email,
      name: values.name,
      last_name: values.last_name,
      school_year: values.school_year.toString(),
      medical_school: values.medical_school,
    };
    let response1;
    try {
      await graphQLClient
        .mutate({ mutation: EDIT_USER_PROFILE_PG, variables: variablesPG })
        .then(r => (response1 = r))
        .catch(r => console.log('EDIT_USER_PROFILE_PG', r));
      await graphQLClient
        .mutate({ mutation: EDIT_USER_PROFILE_FS, variables: variablesFS })
        .then(r => setUser({ ...user, ...variablesFS, ...variablesPG }))
        .catch(r => console.log('EDIT_USER_PROFILE_FS', r));
    } catch (err) {
      console.log(err);
    }
    onHide();
  }

  const onHandleChangeAvatar = event => {
    const file = event.target.files[0];
    if (event.target.value !== '') {
      const { type } = file;
      if (
        type.endsWith('jpeg') ||
        type.endsWith('png') ||
        type.endsWith('jpg') ||
        type.endsWith('raw')
      ) {
        if (file.size / 1024 / 1024 < 5) {
          setImageState(file);
        } else {
          showWarningMessage(Message.Size_File_Too_Big);
        }
      } else {
        showWarningMessage(Message.Format_Image);
      }
    }
  };

  async function onCropDone(imageBase64: string, name: string) {
    setImageState(initFile);
    const image = dataUrlFile(imageBase64, name);
    await storageFB.ref(`avatars/${name}`).put(image);
    setFieldValue('avatar', name);
  }

  const onCropCancel = () => {
    setImageState(initFile);
  };

  return (
    <Fragment>
      <form className="modal-edit-profile">
        <CustomModal
          backdrop="static"
          size="lg"
          show={isShow}
          onHide={() => {
            onHide();
          }}
        >
          <ModalContent>
            <FormSection>
              <Subtitle header>Edit Profile</Subtitle>
            </FormSection>
            <Divider header />
            <FormSection style={{ marginBottom: 35 }}>
              <div className="profile-images-wrapper text-center">
                {imageState.name !== '' ? (
                  <ImageCrop
                    onCropCancel={onCropCancel}
                    onCropDone={onCropDone}
                    imageSrc={imageState}
                    size={120}
                  ></ImageCrop>
                ) : image_preview !== '' ? (
                  <img
                    className="profile-image"
                    alt="image preview"
                    src={image_preview}
                    width={140}
                    height={140}
                  />
                ) : (
                      <img
                        className="profile-image"
                        alt="image preview"
                        src={img_user}
                        width={140}
                        height={140}
                      />
                    )}
                <input
                  type="file"
                  onChange={onHandleChangeAvatar}
                  className="upload-image"
                />
                <div className="upload-image-icon">
                  <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                </div>
              </div>
              <UserInfo>
                <Name degree={user.degrees.join(', ')}>
                  {user.name} {user.last_name}
                </Name>
                <Info>{user.username}</Info>
                <Info>{user.medical_school}</Info>
              </UserInfo>
            </FormSection>
            <FormSection>
              <Subtitle>First Name</Subtitle>
              <TextInput
                value={values.name}
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                onBlur={() => setFieldTouched('name', true)}
              />
              {touched.name && errors.name && (
                <ErrorMsg>{errors.name}</ErrorMsg>
              )}
            </FormSection>
            <Divider />
            <FormSection style={{ justifyContent: 'space-between' }}>
              <FormSection style={{ width: '57%' }}>
                <Subtitle>Last Name</Subtitle>
                <TextInput
                  name="last_name"
                  value={values.last_name}
                  type="text"
                  placeholder="Enter your last name"
                  onChange={handleChange}
                  onBlur={() => setFieldTouched('last_name', true)}
                />
                {touched.last_name && errors.last_name && (
                  <ErrorMsg>{errors.last_name}</ErrorMsg>
                )}
              </FormSection>
              <FormSection style={{ width: '43%' }}>
                <Subtitle>Degree</Subtitle>
                <CustomDropdown
                  placeholder="Select Degree"
                  fluid
                  search
                  selection
                  multiple
                  options={degreesOptions}
                  name="degrees"
                  value={values.degrees}
                  onChange={(_, data) => {
                    setFieldValue('degrees', data.value);
                  }}
                  onBlur={() => setFieldTouched('degrees', true)}
                />
                {errors.degrees && touched.degrees && (
                  <ErrorMsg>{errors.degrees}</ErrorMsg>
                )}
              </FormSection>
            </FormSection>
            <Divider />
            <FormSection>
              <Subtitle>Medical School</Subtitle>
              <CustomDropdown
                placeholder="Select School"
                fluid
                search
                selection
                options={schools}
                onChange={(_, data) =>
                  setFieldValue('medical_school', data.value)
                }
                onBlur={() => setFieldTouched('medica_school', true)}
                value={values.medical_school}
              />
            </FormSection>
            {errors.medical_school && touched.medical_school && (
              <ErrorMsg>{errors.medical_school}</ErrorMsg>
            )}
            <Divider />
            <FormSection>
              <Subtitle>Medical Speciality</Subtitle>
              <CustomDropdown
                placeholder="Select Speciality"
                fluid
                search
                selection
                multiple
                options={specialities}
                onChange={(_, data) => setFieldValue('specialties', data.value)}
                onBlur={() => setFieldTouched('specialties', true)}
                value={values.specialties}
              />
            </FormSection>
            {errors.specialties && touched.specialties && (
              <ErrorMsg>{errors.medical_school}</ErrorMsg>
            )}
            <Divider />
            <FormSection>
              <Subtitle>School Year</Subtitle>
              {radioOptions.map(value => (
                <CheckboxContainer key={value}>
                  <RadioButton
                    onChange={() => setFieldValue('school_year', value)}
                    label={value}
                    checked={values.school_year === value}
                  />
                </CheckboxContainer>
              ))}
            </FormSection>
            <Divider />
            <FormSection>
              <NotRequiredSubtitle>Honors Society</NotRequiredSubtitle>
              {honorsOptions.map((option,index) => (
                <CheckboxContainer>
                  <Checkbox key={index}
                    label={option.label}
                    checked={
                      !!values.honors.filter(e => e === option.value).length
                    }
                    onChange={() => {
                      const isChecked = !!values.honors.filter(
                        e => e === option.value,
                      ).length;
                      if (!isChecked)
                        setFieldValue('honors', [
                          ...values.honors,
                          option.value,
                        ]);
                      else
                        setFieldValue(
                          'honors',
                          values.honors.filter(e => e !== option.value),
                        );
                    }}
                  />
                </CheckboxContainer>
              ))}
            </FormSection>
            <Divider />
            <FormSection>
              <ButtonsContainer>
                <ModalButton
                  onClick={() => onHide()}
                  background={theme.color.softPurple}
                >
                  Cancel
                </ModalButton>
                <ModalButton
                  onClick={() => {
                    handleSubmit();
                  }}
                  background={theme.color.gabaYellow}
                  type="button"
                >
                  Update Profile
                </ModalButton>
              </ButtonsContainer>
            </FormSection>
          </ModalContent>
        </CustomModal>
      </form>
    </Fragment>
  );
}
