import React, { Fragment, FC } from 'react';
import { Modal } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as yup from 'yup';
import moment from 'moment';
import 'styles/scss/ModalWorkExperience.scss';
import { Formik } from 'formik';
import { convertDateToTimestamp } from 'helpers/Unity';
import { showConfirmMessage } from 'helpers/Swal.module';
import { Message } from 'helpers/Message';

const schema = yup.object().shape({
  job_title: yup
    .string()
    .max(200, 'Title must be at most 200 characters'),
  company: yup
    .string()
    .max(200, 'Company must be at most 200 characters'),
  company_address: yup
    .string()
    .max(200, 'Company Address must be at most 200 characters'),
  description: yup
    .string()
    .max(500, 'Description must be at most 500 characters'),
  date_start: yup.string(),
  date_end: yup.string(),
});
interface IEditWorkModal {
  isShow: boolean;
  onHide: () => void;
  editWorkExperience: (workExperience: ENTITIES.WorkExperience) => void;
  deleteWorkExperience: (workExperience: ENTITIES.WorkExperience) => void;
  workExperience: ENTITIES.WorkExperience;
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

export const EditWorkModal: FC<IEditWorkModal> = props => {
  const {
    isShow,
    onHide,
    editWorkExperience,
    deleteWorkExperience,
    workExperience,
  } = props;

  const onHandleDelete = async () => {
    const isDelete = await showConfirmMessage(
      Message.Delete_Question,
      '',
      'warning',
    );
    if (isDelete.value === true) {
      deleteWorkExperience(workExperience);
    }
  };
  return (
    <Fragment>
      <Modal backdrop="static" show={isShow} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Edit experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              ...initialValues,
              company: workExperience.company,
              company_address: workExperience.company_address,
              date_end: moment.unix(workExperience.date_end.seconds).toDate(),
              date_start: moment
                .unix(workExperience.date_start.seconds)
                .toDate(),
              description: workExperience.description,
              job_title: workExperience.job_title,
            }}
            validationSchema={schema}
            onSubmit={values => {
              const newEx: ENTITIES.WorkExperience = {
                ...workExperience,
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
              editWorkExperience(newEx);
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
                  <label htmlFor="exampleInputEmail1">
                    Title
                  </label>
                  <input
                    name="job_title"
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    value={values.job_title}
                    onChange={handleChange}
                  />
                  {errors.job_title && (
                    <span className={'text-danger'}>{errors.job_title}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Company
                  </label>
                  <input
                    name="company"
                    type="text"
                    className="form-control"
                    placeholder="Company"
                    value={values.company}
                    onChange={handleChange}
                  />
                  {errors.company && (
                    <span className={'text-danger'}>{errors.company}</span>
                  )}
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="exampleInputPassword1">
                        Start Date
                      </label>
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
                      {errors.date_start && (
                        <span className={'text-danger'}>
                          {errors.date_start}
                        </span>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="exampleInputPassword1">
                        End Date
                      </label>
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
                      {errors.date_end && (
                        <span className={'text-danger'}>{errors.date_end}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    City, State
                  </label>
                  <input
                    name="company_address"
                    type="text"
                    className="form-control"
                    placeholder="City, State"
                    value={values.company_address}
                    onChange={handleChange}
                  />
                  {errors.company_address && (
                    <span className={'text-danger'}>
                      {errors.company_address}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Description
                  </label>
                  <textarea
                    value={values.description}
                    rows={5}
                    className="form-control"
                    name="description"
                    onChange={handleChange}
                  ></textarea>
                  {/* <CKEditor
                    name="description"
                    config={editorConfiguration}
                    data={values.description}
                    className="form-control"
                    editor={ClassicEditor}
                    onChange={(event, editor) => {
                      setFieldValue('description', editor.getData());
                    }}
                  /> */}
                  {errors.description && (
                    <span className={'text-danger'}>{errors.description}</span>
                  )}
                </div>
                <div className="btn-wrapper-submit mt-2">
                  <button
                    type="button"
                    className="btn btn-light btn-save-profile"
                    onClick={() => onHandleDelete()}
                  >
                    Delete
                  </button>
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
