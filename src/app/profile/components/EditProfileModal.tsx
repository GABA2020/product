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
import { EDIT_USER_PROFILE_FS, EDIT_USER_PROFILE_PG } from '../../../service/mutations';

interface IForm {
  name: string;
  last_name: string;
  specialties: string;
  school_year: string;
  medical_school: string;
  degrees: string;
  avatar: string;
  honors: ENTITIES.ISelect[];
}

const degreesOptions = [
  { value: 'MD', label: 'MD' },
  { value: 'DO', label: 'DO' },
  { value: 'MBA', label: 'MBA' },
  { value: 'PhD', label: 'PhD' },
  { value: 'JD', label: 'JD' },
  { value: 'MS', label: 'MS' },
  { value: 'Masters', label: 'Masters' },
  { value: 'MPH', label: 'MPH' },
  { value: 'MBBS', label: 'MBBS' },
  { value: 'Other', label: 'Other' },
  { value: 'US IMG', label: 'US IMG' },
  { value: 'IMG', label: 'IMG' },
  { value: 'Canad-IMG', label: 'Canad-IMG' },
  { value: 'Pre-Med', label: 'Pre-Med' },
];

const initialValues: IForm = {
  name: '',
  last_name: '',
  specialties: '',
  school_year: '',
  degrees: '',
  avatar: '',
  honors: [],
  medical_school: ''
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
  degrees: yup.string().required('Name is a required field'),
  avatar: yup.string(),
  honors: yup.array(),
});

const honorsOptions = [
  { value: 'AOA', label: 'AOA' },
  { value: 'GHHS', label: 'GHHS' },
];

export function EditProfileModal(props) {
  const { isShow, onHide } = props;

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
  } = useFormik({
    initialValues: {
      ...initialValues,
      ...{
        avatar: user.avatar,
        name: user.name,
        last_name: user.last_name,
        school_year: user.school_year,
        degrees: user.degrees[0],
        honors: user.honors?.map(value => ({ label: value, value })),
        specialties: user.specialties[0],
        medical_school: user.medical_school
      },
    },
    validationSchema: schema,
    onSubmit: submitHandle,
  });

  useEffect(() => {
    if(!isShow){
      resetForm();
    }
  }, [isShow])

  const image_preview = useStorage(`${REF.avatars}/${values.avatar}`);

  async function submitHandle(values) {
    const newDegrees: string[] = [];
    newDegrees.push(values.degrees);
    const newHonors: string[] = [];
    values.honors.forEach(item => newHonors.push(item.value));
    const newSpecialties: string[] = [];
    newSpecialties.push(values.specialties);
    const variablesFS = {
      avatar: values.avatar,
      email: user.email,
      name: `${values.name} ${values.last_name}`,
      school_year: values.school_year.toString(),
      degrees: newDegrees,
      honors: newHonors,
      specialties: newSpecialties,
    };
    const variablesPG = {
      email: user.email,
      name: values.name,
      last_name: values.last_name,
      school_year: values.school_year.toString(),
      medical_school: values.medical_school,
    };
    let response1;
    await graphQLClient
      .mutate({ mutation: EDIT_USER_PROFILE_PG, variables:variablesPG })
      .then(r =>  response1=r)
      .catch(r => console.log('EDIT_USER_PROFILE_PG',r));
    await graphQLClient
      .mutate({ mutation: EDIT_USER_PROFILE_FS, variables:variablesFS })
      .then(r => setUser({ ...user, ...variablesFS, ...variablesPG }))
      .catch(r => console.log('EDIT_USER_PROFILE_FS',r));
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
      <div className="modal-edit-profile">
        <Modal
          backdrop="static"
          size="lg"
          show={isShow}
          onHide={() => {
            onHide();
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="profile-images-wrapper text-center">
                  {image_preview !== '' ? (
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
                <label htmlFor="exampleInputEmail1">
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  name="name"
                  value={values.name}
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  onChange={handleChange}
                />
                {touched.name && errors.name && (
                  <span className={'text-danger'}>{errors.name}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">
                  Last Name <span className="text-danger">*</span>
                </label>
                <input
                  name="last_name"
                  value={values.last_name}
                  type="text"
                  className="form-control"
                  placeholder="Enter your last name"
                  onChange={handleChange}
                />
                {touched.last_name && errors.last_name && (
                  <span className={'text-danger'}>{errors.last_name}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">
                  Specialty <span className="text-danger">*</span>
                </label>
                <input
                  name="specialties"
                  value={values.specialties}
                  type="text"
                  className="form-control"
                  placeholder="Specialty"
                  onChange={handleChange}
                />
                {touched.specialties && errors.specialties && (
                  <span className={'text-danger'}>{errors.specialties}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">
                  Degrees <span className="text-danger">*</span>
                </label>
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
                {touched.degrees && errors.degrees && (
                  <span className={'text-danger'}>{errors.degrees}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Honors</label>
                <Select
                  name="honors"
                  isMulti={true}
                  value={values.honors}
                  onChange={(opt, e) => {
                    if (opt !== null) {
                      setFieldValue('honors', opt);
                    }
                  }}
                  options={honorsOptions}
                />
                {touched.honors && errors.honors && (
                  <span className={'text-danger'}>{errors.honors}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">
                  Medical School <span className="text-danger">*</span>
                </label>
                <input
                  name="medical_school"
                  value={values.medical_school}
                  type="text"
                  className="form-control"
                  placeholder="Medocal School"
                  onChange={handleChange}
                />
                {touched.medical_school && errors.medical_school && (
                  <span className={'text-danger'}>{errors.medical_school}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">
                  Year of School <span className="text-danger">*</span>
                </label>
                <input
                  name="school_year"
                  value={values.school_year}
                  type="text"
                  className="form-control"
                  placeholder="Year of School"
                  onChange={handleChange}
                />
                {touched.school_year && errors.school_year && (
                  <span className={'text-danger'}>{errors.school_year}</span>
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
          </Modal.Body>
        </Modal>
      </div>
    </Fragment>
  );
}
