import React, { Fragment, useEffect, useState, FC } from 'react';
import { Modal } from 'react-bootstrap';
import { img_user } from 'assets/images';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import {
  showDialogSizeImage,
  showDialogUploadImage,
} from 'helpers/Swal.module';
import { ImageCrop } from 'app/components/ImageCrop';

interface IEditProfile {
  isShow: boolean;
  onHide: () => void;
  saveProfile: (
    userProfile: ENTITIES.UserProfile,
    program: ENTITIES.Program,
  ) => void;
  userProfile: ENTITIES.UserProfile;
  program: ENTITIES.Program;
  avatar_url: string;
}

interface IFIle {
  lastModified: number;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

const initFile: IFIle = {
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
    .max(100, 'Name must be at most 100 characters')
    .required('Name is a required field'),
  specialty: yup
    .string()
    .max(100, 'Specialty must be at most 20 characters')
    .required('Specialty is a required field'),
  year_in_program: yup
    .number()
    .typeError('Year In Program must be a number')
    .max(20, 'Year In Program must be less than or equal to 20')
    .required('Year in Program is a required field'),
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
  const { register, handleSubmit, errors, setValue } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    setValue('name', userProfile.name);
    setValue('specialty', program.specialty);
    setValue('year_in_program', userProfile.year_in_program);
  }, [
    userProfile.name,
    userProfile.year_in_program,
    program.specialty,
    isShow,
  ]);
  const [imageState, setImageState] = useState<IFIle>(initFile);
  const [imageBase64State, setImageBase64State] = useState<string>('');

  const onSubmit = data => {
    const newUserProfile: ENTITIES.UserProfile = {
      ...userProfile,
      name: data.name,
      year_in_program: data.year_in_program,
      avatar: imageBase64State ? imageBase64State : userProfile.avatar,
    };
    const newProgram: ENTITIES.Program = {
      ...program,
      specialty: data.specialty,
    };
    saveProfile(newUserProfile, newProgram);
  };

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
  const onCropDone = (imageBase64: string) => {
    setImageState(initFile);
    setImageBase64State(imageBase64);
  };
  const onCropCancel = () => {
    setImageState(initFile);
    setImageBase64State('');
  };
  return (
    <Fragment>
      <div className="modal-edit-profile">
        <Modal show={isShow} onHide={onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <div className="profile-images-wrapper text-center">
                  <img
                    className="profile-image"
                    alt="image preview"
                    src={imageBase64State ? imageBase64State : avatar_url}
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
                  ref={register}
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <span className={'text-danger'}>{errors.name.message}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Specialty</label>
                <input
                  name="specialty"
                  ref={register}
                  type="text"
                  className="form-control"
                  placeholder="Specialty"
                />
                {errors.specialty && (
                  <span className={'text-danger'}>
                    {errors.specialty.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Year of School</label>
                <input
                  name="year_in_program"
                  ref={register}
                  type="number"
                  className="form-control"
                  placeholder="Year of School"
                />
                {errors.year_in_program && (
                  <span className={'text-danger'}>
                    {errors.year_in_program.message}
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
          </Modal.Body>
        </Modal>
      </div>
    </Fragment>
  );
};
