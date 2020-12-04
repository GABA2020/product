import React, { Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as yup from 'yup';
import 'styles/scss/ModalWorkExperience.scss';
import { Formik } from 'formik';
import moment from 'moment';

const schema = yup.object().shape({
  job_title: yup.string().max(200, 'Job title must be at most 200 characters'),
  nbr_hours_served: yup
    .number()
    .typeError('Number of hours served must be a number')
    .min(0)
    .max(
      2000000,
      'Number of hours served  must be less than or equal to 2000000',
    ),
  city: yup
    .string()
    .max(200, 'Organization address must be at most 200 characters'),
  organization_name: yup
    .string()
    .max(200, 'Organization name must be at most 200 characters'),
  description: yup
    .string()
    .max(500, 'Description must be at most 500 characters'),
  start_date: yup.date(),
  end_date: yup
    .date()
    .min(yup.ref('start_date'), "End Date can't be before Start Date"),
});

const initialValues = {
  end_date: new Date(),
  start_date: new Date(),
  description: '',
  job_title: '',
  nbr_hours_served: '',
  city: '',
  organization_name: '',
};

export function VolunteerModal(props) {
  const {
    isShow,
    onHide,
    addNewVolunteer,
    editVolunteer,
    deleteVolunteer,
    editValues,
  } = props;

  function onSubmit(values) {
    const newVolunteer = {
      id: '',
      subcollectionId: '',
      city: values.city,
      description: values.description,
      start_date: `${values.start_date.getMonth() + 1 }/${values.start_date.getFullYear()}`,
      end_date: `${ values.end_date.getMonth() + 1}/${values.end_date.getFullYear()}`,
      job_title: values.job_title,
      nbr_hours_served: values.nbr_hours_served,
      organization_name: values.organization_name,
      subcollectionName: "volunteers"
    };
    if (editValues) {
      newVolunteer.subcollectionId = editValues.id;
      newVolunteer.id = editValues.id;
      editVolunteer(newVolunteer);
    } else {
      addNewVolunteer(newVolunteer);
    }
  }

  function onDelete(e) {
    e.preventDefault();
    deleteVolunteer({
      subcollectionId:editValues.id,
      subcollectionName: 'volunteers'
    });
  }

  return (
    <Fragment>
      <Modal backdrop="static" show={isShow} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{editValues ? 'Edit Volunteer' : 'Add Volunteer'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={
              editValues
                ? {
                    ...editValues,
                    end_date: new Date(moment( `20/${editValues.end_date}`, 'DD/MM/YYYY', ).format()),
                    start_date: new Date(moment(`20/${editValues.end_date}`,'DD/MM/YYYY',).format()),
                  }
                : { ...initialValues }
            }
            validationSchema={schema}
            onSubmit={onSubmit}
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
                      <label htmlFor="exampleInputPassword1">Start Date</label>
                      <div>
                        <ReactDatePicker
                          name="start_date"
                          className="form-control"
                          showMonthYearPicker
                          maxDate={new Date()}
                          dateFormat="MM/yyyy"
                          placeholderText="MM/yyyy"
                          onChange={e => {
                            setFieldValue('start_date', e);
                          }}
                          selected={values.start_date}
                        />
                      </div>
                      {touched.start_date && errors.start_date && (
                        <span className={'text-danger'}>
                          {errors.start_date}
                        </span>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="exampleInputPassword1">End Date</label>
                      <div>
                        <ReactDatePicker
                          name="end_date"
                          className="form-control"
                          showMonthYearPicker
                          maxDate={new Date()}
                          dateFormat="MM/yyyy"
                          placeholderText="MM/yyyy"
                          onChange={e => {
                            if (
                              moment(e).isSame(moment(), 'year') &&
                              moment(e).isSame(moment(), 'month')
                            ) {
                              setFieldValue('end_date', moment().toDate());
                              return;
                            }
                            setFieldValue('end_date', e);
                            return;
                          }}
                          selected={values.end_date}
                        />
                      </div>
                      {touched.end_date && errors.end_date && (
                        <span className={'text-danger'}>{errors.end_date}</span>
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
                  <label htmlFor="exampleInputPassword1">City, State</label>
                  <input
                    name="city"
                    type="text"
                    className="form-control"
                    placeholder="City, State"
                    value={values.city}
                    onChange={handleChange}
                  />
                  {touched.city &&
                    errors.city && (
                      <span className={'text-danger'}>
                        {errors.city}
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
                    Number of hours served{' '}
                  </label>
                  <input
                    name="nbr_hours_served"
                    type="number"
                    min={0}
                    className="form-control"
                    placeholder="Number of hours served"
                    value={values.nbr_hours_served}
                    onChange={handleChange}
                  />
                  {touched.nbr_hours_served &&
                    errors.nbr_hours_served && (
                      <span className={'text-danger'}>
                        {errors.nbr_hours_served}
                      </span>
                    )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Description</label>
                  <textarea
                    rows={5}
                    className="form-control"
                    name="description"
                    onChange={handleChange}
                    value={values.description}
                  ></textarea>
                  {touched.description && errors.description && (
                    <span className={'text-danger'}>{errors.description}</span>
                  )}
                </div>
                {editValues ? (
                  <div className="btn-wrapper-submit mt-2">
                    <button
                      type="button"
                      className="btn btn-light btn-save-profile"
                      onClick={onDelete}
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
                ) : (
                  <div className="text-right mt-2">
                    <button
                      type="submit"
                      className="btn btn-success btn-save-profile"
                    >
                      Save
                    </button>
                  </div>
                )}
              </form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}
