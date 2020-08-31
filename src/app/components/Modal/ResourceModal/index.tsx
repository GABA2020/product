import React, { Fragment, FC } from 'react';
import { Modal } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as yup from 'yup';
import moment from 'moment';
import 'styles/scss/ModalWorkExperience.scss';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Formik } from 'formik';
import { convertDateToTimestamp } from 'helpers/Unity';

// const schema = yup.object().shape({
//   job_title: yup
//     .string()
//     .max(200, 'Title must be at most 200 characters')
//     .required('Title is a required field'),
//   company: yup
//     .string()
//     .max(200, 'Company must be at most 200 characters')
//     .required('Company is a required field'),
//   company_address: yup
//     .string()
//     .max(200, 'Company Address must be at most 200 characters')
//     .required('Company Address is a required field'),
//   description: yup
//     .string()
//     .max(500, 'Description must be at most 500 characters')
//     .required('Description is a required field'),
//   date_start: yup.string().required('Date Start is a required field'),
//   date_end: yup.string().required('Date End is a required field'),
// });
interface IResource {
  isShow: boolean;
  onHide: () => void;
  resource: ENTITIES.Resource;
}

interface IForm {}

// const initialValues: IForm = {
//   company: '',
//   company_address: '',
//   date_end: new Date(),
//   date_start: new Date(),
//   description: '',
//   job_title: '',
// };

export const ResourceModal: FC<IResource> = props => {
  const { isShow, onHide, resource } = props;

  return (
    <Fragment>
      <Modal backdrop="static" show={isShow} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{resource.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>content</Modal.Body>
      </Modal>
    </Fragment>
  );
};
