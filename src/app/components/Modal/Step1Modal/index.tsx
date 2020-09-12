import React, { Fragment, FC, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import * as yup from 'yup';
import Dragger from 'antd/lib/upload/Dragger';
import { FileOutlined } from '@ant-design/icons';
import { Message } from 'helpers/Message';
import { showWarningMessage, showConfirmMessage } from 'helpers/Swal.module';
import { useStorage } from 'hook/useStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import 'styles/scss/ModalWorkExperience.scss';
import { useFormik } from 'formik';

interface IStep1 {
  isShow: boolean;
  onHide: () => void;
  userProfile: ENTITIES.UserProfile;
  uploadFileStep1: (file: File) => void;
  updateUserProfile: (newUserProfile: ENTITIES.UserProfile) => void;
}

const schema = yup.object().shape({
  step_1: yup
    .number()
    .typeError('Score must be a number')
    .min(0)
    .max(1000, 'Score  must be less than or equal to 1000')
    .required('Score  is a required field'),
  step_1_document_name: yup.string(),
  is_passed_step1: yup.boolean().required('Please choose passed or failed'),
});
interface MCATForm {
  step_1: number;
  step_1_document_name: string;
  is_passed_step1: boolean;
}
const initialValues: MCATForm = {
  step_1: 0,
  step_1_document_name: '',
  is_passed_step1: false,
};

export const Step1Modal: FC<IStep1> = props => {
  const {
    isShow,
    onHide,
    uploadFileStep1,
    userProfile,
    updateUserProfile,
  } = props;

  useEffect(() => {
    setErrors({});
    if (isShow === true) {
      setFieldValue('step_1_document_name', userProfile.step_1_document_name);
      setFieldValue('step_1', userProfile.step_1);
      setFieldValue('is_passed_step1', userProfile.is_passed_step1);
    }
  }, [userProfile, isShow]);

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    setFieldValue,
    setErrors,
  } = useFormik({
    initialValues: {
      ...initialValues,
    },
    validationSchema: schema,
    onSubmit: async values => {
      const isUpdate = await showConfirmMessage(
        Message.Update_Question,
        '',
        'warning',
      );
      if (isUpdate.value === true) {
        updateUserProfile({
          ...userProfile,
          step_1: values.step_1,
          step_1_document_name: values.step_1_document_name,
          is_passed_step1: values.is_passed_step1,
        });
        onHide();
      }
    },
  });

  const url_file = useStorage(
    `files/${userProfile.email}/Step1/${values.step_1_document_name}`,
  );

  const beforeUpload = (file: File) => {
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      showWarningMessage(Message.Size_File_Too_Big);
    } else {
      setFieldValue('step_1_document_name', file.name);
      uploadFileStep1(file);
    }
    return false;
  };

  return (
    <Fragment>
      <Modal backdrop="static" show={isShow} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Step One</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">
                Score <span className="text-danger">*</span>
              </label>
              <input
                name="step_1"
                type="number"
                value={values.step_1}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter your Score"
                onChange={handleChange}
              />
              {touched.step_1 && errors.step_1 && (
                <span className={'text-danger'}>{errors.step_1}</span>
              )}
            </div>
            <div className="form-group">
              <div className="radio radio-box-inline">
                <label>
                  <input
                    type="radio"
                    name="is_passed_step1"
                    checked={values.is_passed_step1 === true}
                    onChange={() => setFieldValue('is_passed_step1', true)}
                  />
                  Pass
                </label>
              </div>
              <div className="radio radio-box-inline">
                <label>
                  <input
                    type="radio"
                    name="is_passed_step1"
                    checked={values.is_passed_step1 === false}
                    onChange={() => setFieldValue('is_passed_step1', false)}
                  />
                  Fail
                </label>
              </div>
            </div>
            <div className="form-group">
              <div className="upload-file">
                <Dragger beforeUpload={beforeUpload} showUploadList={false}>
                  <p className="ant-upload-drag-icon">
                    <FileOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload your document
                  </p>
                </Dragger>
                {values.step_1_document_name && (
                  <div className="file-name-link">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={url_file}
                    >
                      {values.step_1_document_name}
                    </a>
                    <a
                      onClick={e => {
                        e.preventDefault();
                        setFieldValue('step_1_document_name', '');
                      }}
                      href="#"
                    >
                      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </a>
                  </div>
                )}

                <input
                  type="text"
                  value={values.step_1_document_name}
                  name="step_1_document_name"
                  onChange={handleChange}
                  hidden
                />
              </div>
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
    </Fragment>
  );
};
