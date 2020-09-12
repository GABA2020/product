import React, { Fragment, FC } from 'react';
import { Modal } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as yup from 'yup';
import moment from 'moment';
import 'styles/scss/ModalWorkExperience.scss';
import { Formik } from 'formik';
import { showConfirmMessage } from 'helpers/Swal.module';
import { convertDateToTimestamp } from 'helpers/Unity';
import { Message } from 'helpers/Message';

const schema = yup.object().shape({
  job_title: yup
    .string()
    .max(200, 'Job title must be at most 200 characters')
    .required('Job title is a required field'),
  number_of_hours_served: yup
    .number()
    .typeError('Number of hours served must be a number')
    .min(0)
    .max(
      2000000,
      'Number of hours served  must be less than or equal to 2000000',
    )
    .required('Number of hours served  is a required field'),
  organization_address: yup
    .string()
    .max(200, 'Organization address must be at most 200 characters')
    .required('Organization address is a required field'),
  organization_name: yup
    .string()
    .max(200, 'Organization name must be at most 200 characters')
    .required('Organization name is a required field'),
  description: yup
    .string()
    .max(500, 'Description must be at most 500 characters')
    .required('Description is a required field'),
  date_start: yup.string().required('Date Start is a required field'),
  date_end: yup.string().required('Date End is a required field'),
});

interface IEditVolunteerModal {
  isShow: boolean;
  onHide: () => void;
  volunteer: ENTITIES.Volunteer;
  editVolunteer: (volunteer: ENTITIES.Volunteer) => void;
  deleteVolunteer: (volunteer: ENTITIES.Volunteer) => void;
}

interface IForm {
  date_end: Date;
  date_start: Date;
  description: string;
  job_title: string;
  number_of_hours_served: string;
  organization_address: string;
  organization_name: string;
}

const initialValues: IForm = {
  date_end: new Date(),
  date_start: new Date(),
  description: '',
  job_title: '',
  number_of_hours_served: '',
  organization_address: '',
  organization_name: '',
};

export const EditVolunteerModal: FC<IEditVolunteerModal> = props => {
  const { isShow, onHide, editVolunteer, deleteVolunteer, volunteer } = props;

  const onHandleDelete = async () => {
    const isDelete = await showConfirmMessage(
      Message.Delete_Question,
      '',
      'warning',
    );
    if (isDelete.value === true) {
      deleteVolunteer(volunteer);
    }
  };
  return (
    <Fragment>
      <Modal backdrop="static" show={isShow} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Volunteer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              ...initialValues,
              date_end: moment.unix(volunteer.date_end.seconds).toDate(),
              date_start: moment.unix(volunteer.date_start.seconds).toDate(),
              description: volunteer.description,
              job_title: volunteer.job_title,
              number_of_hours_served: volunteer.number_of_hours_served,
              organization_address: volunteer.organization_address,
              organization_name: volunteer.organization_name,
            }}
            validationSchema={schema}
            onSubmit={values => {
              const newVolunteer: ENTITIES.Volunteer = {
                id: volunteer.id,
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
                number_of_hours_served: values.number_of_hours_served,
                organization_address: values.organization_address,
                organization_name: values.organization_name,
              };
              editVolunteer(newVolunteer);
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
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="exampleInputPassword1">
                        Start Date <span className="text-danger">*</span>
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
                        End Date <span className="text-danger">*</span>
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
                    Organization Name <span className="text-danger">*</span>
                  </label>
                  <input
                    name="organization_name"
                    type="text"
                    className="form-control"
                    placeholder="Organization Name"
                    value={values.organization_name}
                    onChange={handleChange}
                  />
                  {errors.organization_name && (
                    <span className={'text-danger'}>
                      {errors.organization_name}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Organization address <span className="text-danger">*</span>
                  </label>
                  <input
                    name="organization_address"
                    type="text"
                    className="form-control"
                    placeholder="Organization address"
                    value={values.organization_address}
                    onChange={handleChange}
                  />
                  {errors.organization_address && (
                    <span className={'text-danger'}>
                      {errors.organization_address}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">
                    Job title <span className="text-danger">*</span>
                  </label>
                  <input
                    name="job_title"
                    type="text"
                    className="form-control"
                    placeholder="Job title"
                    value={values.job_title}
                    onChange={handleChange}
                  />
                  {errors.job_title && (
                    <span className={'text-danger'}>{errors.job_title}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Number of hours served{' '}
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    name="number_of_hours_served"
                    type="number"
                    min={0}
                    className="form-control"
                    placeholder="Number of hours served"
                    value={values.number_of_hours_served}
                    onChange={handleChange}
                  />
                  {errors.number_of_hours_served && (
                    <span className={'text-danger'}>
                      {errors.number_of_hours_served}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    rows={5}
                    className="form-control"
                    name="description"
                    onChange={handleChange}
                  >
                    {values.description}
                  </textarea>
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
