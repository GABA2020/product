import React, { Fragment, useEffect, useState, FC } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import {
  showDialogSizeImage,
  showDialogUploadImage,
} from 'helpers/Swal.module';
import { ImageCrop } from 'app/components/ImageCrop';
import Select from 'react-select';
import * as yup from 'yup';

interface IEditProfile {
  isShow: boolean;
  onHide: () => void;
  saveProfile: (
    userProfile: ENTITIES.UserProfile,
    program: ENTITIES.Program,
    imageBase64: string,
  ) => void;
  userProfile: ENTITIES.UserProfile;
  program: ENTITIES.Program;
  avatar_url: string;
}

interface IImage {
  content: string;
  name: string;
}

interface IForm {
  name: string;
  specialty: string;
  year_in_program: number;
  degrees: string;
}

const degreesOptions = [
  { value: 'MD', label: 'MD' },
  { value: 'Strawberry', label: 'Strawberry' },
  { value: 'Vanilla', label: 'Vanilla' },
];

const initialValues: IForm = {
  name: '',
  specialty: '',
  year_in_program: 0,
  degrees: '',
};

const initImage: IImage = {
  content: '',
  name: '',
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
  specialty: yup
    .string()
    .max(200, 'Specialty must be at most 200 characters')
    .required('Specialty is a required field'),
  year_in_program: yup
    .number()
    .typeError('Year In Program must be a number')
    .max(20, 'Year In Program must be less than or equal to 20')
    .required('Year in Program is a required field'),
  degrees: yup.string().required('Name is a required field'),
});

export const EditProfileModal: FC<IEditProfile> = props => {
  const {
    isShow,
    onHide,
    userProfile,
    avatar_url,
    program,
    saveProfile,
  } = props;
  const [imageState, setImageState] = useState<ENTITIES.File>(initFile);
  const [imageBase64State, setImageBase64State] = useState<IImage>({
    content: '',
    name: '',
  });

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
          showDialogSizeImage();
        }
      } else {
        showDialogUploadImage();
      }
    }
  };
  const onCropDone = (imageBase64: string, name: string) => {
    setImageState(initFile);
    setImageBase64State({
      content: imageBase64,
      name,
    });
  };
  const onCropCancel = () => {
    setImageState(initFile);
    setImageBase64State(initImage);
  };
  return (
    <Fragment>
      <div className="modal-edit-profile">
        <Modal
          show={isShow}
          onHide={() => {
            setImageBase64State(initImage);
            onHide();
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{
                ...initialValues,
                name: userProfile.name,
                specialty: program.specialty,
                year_in_program: userProfile.year_in_program,
                degrees: userProfile.degrees,
              }}
              validationSchema={schema}
              onSubmit={values => {
                const newUserProfile: ENTITIES.UserProfile = {
                  ...userProfile,
                  name: values.name,
                  year_in_program: values.year_in_program,
                  avatar: imageBase64State.name
                    ? imageBase64State.name
                    : userProfile.avatar,
                  degrees: values.degrees,
                };
                const newProgram: ENTITIES.Program = {
                  ...program,
                  specialty: values.specialty,
                };
                saveProfile(
                  newUserProfile,
                  newProgram,
                  imageBase64State.content,
                );
              }}
            >
              {({
                errors,
                handleChange,
                handleSubmit,
                values,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <div className="profile-images-wrapper text-center">
                      <img
                        className="profile-image"
                        alt="image preview"
                        src={
                          imageBase64State.content
                            ? imageBase64State.content
                            : avatar_url
                        }
                        width={140}
                        height={140}
                      />
                      <input
                        type="file"
                        onChange={onHandleChangeAvatar}
                        className="upload-image"
                      />
                      <div className="upload-image-icon">
                        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                      </div>
                    </div>
                    <div className="upload-image-crop text-center">
                      {imageState.name !== '' ? (
                        <ImageCrop
                          onCropCancel={onCropCancel}
                          onCropDone={onCropDone}
                          imageSrc={imageState}
                        ></ImageCrop>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input
                      name="name"
                      value={values.name}
                      type="text"
                      className="form-control"
                      placeholder="Enter your name"
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <span className={'text-danger'}>{errors.name}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Specialty</label>
                    <input
                      name="specialty"
                      value={values.specialty}
                      type="text"
                      className="form-control"
                      placeholder="Specialty"
                      onChange={handleChange}
                    />
                    {errors.specialty && (
                      <span className={'text-danger'}>{errors.specialty}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Degrees</label>
                    <Select
                      name="degrees"
                      isMulti={false}
                      value={degreesOptions.find(
                        option => option.value === values.degrees,
                      )}
                      onChange={(opt, e) => {
                        setFieldValue('degrees', opt.value);
                      }}
                      options={degreesOptions}
                    />
                    {errors.degrees && (
                      <span className={'text-danger'}>{errors.degrees}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">
                      Year of School
                    </label>
                    <input
                      name="year_in_program"
                      value={values.year_in_program}
                      type="number"
                      className="form-control"
                      placeholder="Year of School"
                      onChange={handleChange}
                    />
                    {errors.year_in_program && (
                      <span className={'text-danger'}>
                        {errors.year_in_program}
                      </span>
                    )}
                  </div>
                  <div className="text-right mt-2">
                    <button
                      type="submit"
                      className="btn btn-primary btn-save-profile"
                    >
                      Save
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
      </div>
    </Fragment>
  );
};
