import React, { Fragment, useEffect, useState, FC } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal as ModalAnt, message } from 'antd';
import { ImageCrop } from 'app/components/ImageCrop';
import Select from 'react-select';
import * as yup from 'yup';
import { img_user } from 'assets/images';
import { showWarningMessage } from 'helpers/Swal.module';
import { Message } from 'helpers/Message';

interface IEditProfile {
  isShow: boolean;
  userProfile: ENTITIES.UserProfile;
  program: ENTITIES.Program;
  image_preview_url: string;
  saveAvatar: (imageBase64: string, name: string) => void;
  onHide: () => void;
  saveProfile: (
    userProfile: ENTITIES.UserProfile,
    program: ENTITIES.Program,
  ) => void;
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
    userProfile,
    program,
    image_preview_url,
    onHide,
    saveProfile,
    saveAvatar,
  } = props;

  const [imageState, setImageState] = useState<ENTITIES.File>(initFile);

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
          showWarningMessage(Message.Format_Image);
        }
      } else {
        showWarningMessage(Message.Size_File_Too_Big);
      }
    }
  };
  const onCropDone = (imageBase64: string, name: string) => {
    setImageState(initFile);
    saveAvatar(imageBase64, name);
  };
  const onCropCancel = () => {
    setImageState(initFile);
  };
  return (
    <Fragment>
      <div className="modal-edit-profile">
        <Modal
          backdrop="static"
          show={isShow}
          onHide={() => {
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
                  avatar: userProfile.avatar,
                  degrees: values.degrees,
                };
                const newProgram: ENTITIES.Program = {
                  ...program,
                  specialty: values.specialty,
                };
                saveProfile(newUserProfile, newProgram);
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
                      {image_preview_url !== '' ? (
                        <img
                          className="profile-image"
                          alt="image preview"
                          src={image_preview_url}
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
                      className="btn btn-success btn-save-profile"
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
