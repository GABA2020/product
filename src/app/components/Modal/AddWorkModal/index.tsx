import React, { Fragment, FC } from 'react';
import { Modal } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as yup from 'yup';
import 'styles/scss/ModalWorkExperience.scss';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Formik } from 'formik';
import { convertDateToTimestamp } from 'helpers/Unity';

const schema = yup.object().shape({
  job_title: yup
    .string()
    .max(200, 'Title must be at most 200 characters')
    .required('Title is a required field'),
  company: yup
    .string()
    .max(200, 'Company must be at most 200 characters')
    .required('Company is a required field'),
  company_address: yup
    .string()
    .max(200, 'Company Address must be at most 200 characters')
    .required('Company Address is a required field'),
  description: yup
    .string()
    .max(300, 'Description must be at most 300 characters')
    .required('Description is a required field'),
  date_start: yup.string().required('Date Start is a required field'),
  date_end: yup.string().required('Date End is a required field'),
});
interface IAddWorkModal {
  isShow: boolean;
  onHide: () => void;
  addNewWorkExperience: (workExperience: ENTITIES.WorkExperience) => void;
}

interface IForm {
  company: string;
  company_address: string;
  date_end: Date;
  date_start: Date;
  description: string;
  job_title: string;
}

const initialValues: IForm = {
  company: '',
  company_address: '',
  date_end: new Date(),
  date_start: new Date(),
  description: '',
  job_title: '',
};

const editorConfiguration = {
  toolbar: ['bulletedList', 'numberedList', 'blockQuote', 'undo', 'redo'],
};

export const AddWorkModal: FC<IAddWorkModal> = props => {
  const { isShow, onHide, addNewWorkExperience } = props;

  return (
    <Fragment>
      <Modal backdrop="static" show={isShow} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              ...initialValues,
            }}
            validationSchema={schema}
            onSubmit={values => {
              const newEx: ENTITIES.WorkExperience = {
                id: '',
                company: values.company,
                company_address: values.company_address,
                date_end: {
                  seconds: convertDateToTimestamp(
                    values.date_end.toDateString(),
                  ),
                },
                date_start: {
                  seconds: convertDateToTimestamp(
                    values.date_start.toDateString(),
                  ),
                },
                description: values.description,
                job_title: values.job_title,
              };
              addNewWorkExperience(newEx);
            }}
          >
            {({
              errors,
              handleChange,
              handleSubmit,
              values,
              touched,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Title</label>
                  <input
                    name="job_title"
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    value={values.job_title}
                    onChange={handleChange}
                  />
                  {touched.job_title && errors.job_title && (
                    <span className={'text-danger'}>{errors.job_title}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Company</label>
                  <input
                    name="company"
                    type="text"
                    className="form-control"
                    placeholder="Company"
                    value={values.company}
                    onChange={handleChange}
                  />
                  {touched.company && errors.company && (
                    <span className={'text-danger'}>{errors.company}</span>
                  )}
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="exampleInputPassword1">Start Date:</label>
                      <div>
                        <ReactDatePicker
                          name="date_start"
                          className="form-control"
                          showMonthYearPicker
                          maxDate={new Date()}
                          dateFormat="MM/yyyy"
                          placeholderText="MM/yyyy"
                          onChange={e => {
                            setFieldValue('date_start', e);
                          }}
                          selected={values.date_start}
                        />
                      </div>
                      {touched.date_start && errors.date_start && (
                        <span className={'text-danger'}>
                          {errors.date_start}
                        </span>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="exampleInputPassword1">End Date:</label>
                      <div>
                        <ReactDatePicker
                          name="date_end"
                          className="form-control"
                          showMonthYearPicker
                          maxDate={new Date()}
                          dateFormat="MM/yyyy"
                          placeholderText="MM/yyyy"
                          onChange={e => {
                            setFieldValue('date_end', e);
                          }}
                          selected={values.date_end}
                        />
                      </div>
                      {touched.date_end && errors.date_end && (
                        <span className={'text-danger'}>{errors.date_end}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Company Address</label>
                  <input
                    name="company_address"
                    type="text"
                    className="form-control"
                    placeholder="Company Address"
                    value={values.company_address}
                    onChange={handleChange}
                  />
                  {touched.company_address && errors.company_address && (
                    <span className={'text-danger'}>
                      {errors.company_address}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Description</label>
                  <CKEditor
                    name="description"
                    config={editorConfiguration}
                    data={values.description}
                    className="form-control"
                    editor={ClassicEditor}
                    onChange={(event, editor) => {
                      setFieldValue('description', editor.getData());
                    }}
                  />
                  {touched.description && errors.description && (
                    <span className={'text-danger'}>{errors.description}</span>
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
    </Fragment>
  );
};
