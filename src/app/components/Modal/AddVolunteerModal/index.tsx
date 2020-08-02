import React, { Fragment, FC } from 'react';
import { Modal } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as yup from 'yup';
import moment from 'moment';
import 'styles/scss/ModalWorkExperience.scss';
import { Formik } from 'formik';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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

const editorConfiguration = {
  toolbar: ['bulletedList', 'numberedList', 'blockQuote', 'undo', 'redo'],
};

interface IAddVolunteerModal {
  isShow: boolean;
  onHide: () => void;
  addNewVolunteer: (volunteer: ENTITIES.Volunteer) => void;
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

export const AddVolunteerModal: FC<IAddVolunteerModal> = props => {
  const { isShow, onHide, addNewVolunteer } = props;

  return (
    <Fragment>
      <Modal show={isShow} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add Volunteer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              ...initialValues,
            }}
            validationSchema={schema}
            onSubmit={values => {
              const newVolunteer: ENTITIES.Volunteer = {
                id: '',
                date_end: moment(values.date_end).format('yyyy/MM'),
                date_start: moment(values.date_start).format('yyyy/MM'),
                description: values.description,
                job_title: values.job_title,
                number_of_hours_served: values.number_of_hours_served,
                organization_address: values.organization_address,
                organization_name: values.organization_name,
              };
              addNewVolunteer(newVolunteer);
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
                  <label htmlFor="exampleInputPassword1">
                    Organization Name
                  </label>
                  <input
                    name="organization_name"
                    type="text"
                    className="form-control"
                    placeholder="Organization Name"
                    value={values.organization_name}
                    onChange={handleChange}
                  />
                  {touched.organization_name && errors.organization_name && (
                    <span className={'text-danger'}>
                      {errors.organization_name}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Organization address
                  </label>
                  <input
                    name="organization_address"
                    type="text"
                    className="form-control"
                    placeholder="Organization address"
                    value={values.organization_address}
                    onChange={handleChange}
                  />
                  {touched.organization_address &&
                    errors.organization_address && (
                      <span className={'text-danger'}>
                        {errors.organization_address}
                      </span>
                    )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Job title</label>
                  <input
                    name="job_title"
                    type="text"
                    className="form-control"
                    placeholder="Job title"
                    value={values.job_title}
                    onChange={handleChange}
                  />
                  {touched.job_title && errors.job_title && (
                    <span className={'text-danger'}>{errors.job_title}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Number of hours served
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
                  {touched.number_of_hours_served &&
                    errors.number_of_hours_served && (
                      <span className={'text-danger'}>
                        {errors.number_of_hours_served}
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
    </Fragment>
  );
};
