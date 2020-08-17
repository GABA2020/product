import React, { Fragment, FC, useState, useEffect } from 'react';
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
import { Formik, useFormik } from 'formik';

interface IMCat {
  isShow: boolean;
  onHide: () => void;
  userProfile: ENTITIES.UserProfile;
  uploadFileMCAT: (file: File) => void;
  updateUserProfile: (newUserProfile: ENTITIES.UserProfile) => void;
}

const schema = yup.object().shape({
  mcat: yup
    .number()
    .typeError('Score of hours served must be a number')
    .min(0)
    .max(1000, 'Score  must be less than or equal to 1000')
    .required('Score  is a required field'),
  mcat_document_name: yup.string().required('Please upload your document'),
});
interface MCATForm {
  mcat: number;
  mcat_document_name: string;
}
const initialValues: MCATForm = {
  mcat: 0,
  mcat_document_name: '',
};

export const MCATModal: FC<IMCat> = props => {
  const {
    isShow,
    onHide,
    uploadFileMCAT,
    userProfile,
    updateUserProfile,
  } = props;

  useEffect(() => {
    if (isShow) {
      setFieldValue('mcat_document_name', userProfile.mcat_document_name);
      setFieldValue('mcat', userProfile.mcat);
      setErrors({});
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
          mcat: values.mcat,
          mcat_document_name: values.mcat_document_name,
        });
        onHide();
      }
    },
  });

  const url_file = useStorage(
    `files/${userProfile.email}/MCAT/${values.mcat_document_name}`,
  );

  const beforeUpload = (file: File) => {
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      showWarningMessage(Message.Size_File_Too_Big);
    } else {
      setFieldValue('mcat_document_name', file.name);
      uploadFileMCAT(file);
    }
    return false;
  };

  return (
    <Fragment>
      <Modal backdrop="static" show={isShow} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>MCAT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Score</label>
              <input
                name="mcat"
                type="number"
                value={values.mcat}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter your Score"
                onChange={handleChange}
              />
              {touched.mcat && errors.mcat && (
                <span className={'text-danger'}>{errors.mcat}</span>
              )}
            </div>
            <div className="form-group">
              <div className="radio radio-box-inline">
                <label>
                  <input type="radio" name="optradio" />
                  Pass
                </label>
              </div>
              <div className="radio radio-box-inline">
                <label>
                  <input type="radio" name="optradio" />
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
                {url_file && (
                  <div className="file-name-link">
                    <a target="_blank" href={url_file}>
                      {values.mcat_document_name}
                    </a>
                    <a
                      onClick={e => {
                        e.preventDefault();
                        setFieldValue('mcat_document_name', '');
                      }}
                      href="#"
                    >
                      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </a>
                  </div>
                )}

                <input
                  type="text"
                  value={values.mcat_document_name}
                  name="mcat_document_name"
                  onChange={handleChange}
                  hidden
                />
                {touched.mcat_document_name && errors.mcat_document_name && (
                  <span className={'text-danger'}>
                    {errors.mcat_document_name}
                  </span>
                )}
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
