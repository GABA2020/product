import React, { Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as yup from 'yup';
import 'styles/scss/ModalWorkExperience.scss';
import { Formik } from 'formik';
import moment from 'moment';

const schema = yup.object().shape({
  title: yup.string().max(200, 'Title must be at most 200 characters'),
  company: yup.string().max(200, 'Company must be at most 200 characters'),
  city: yup.string().max(200, 'Company Address must be at most 200 characters'),
  description: yup
    .string()
    .max(300, 'Description must be at most 300 characters'),
  start_date: yup.date(),
  end_date: yup
    .date()
    .min(yup.ref('start_date'), "End Date can't be before Start Date"),
});

const initialValues = {
  company: '',
  city: '',
  end_date: new Date(),
  start_date: new Date(),
  description: '',
  title: '',
};

export function WorkModal(props) {
  const {
    isShow,
    onHide,
    addNewWorkExperience,
    editWorkExPerience,
    deleteWorkExperience,
    editValues,
  } = props;

  function onSubmit(values) {
    const newWork = {
      id:'',
      subcollectionId: '',
      company: values.company,
      city: values.city,
      end_date: `${ values.end_date.getMonth() + 1}/${values.end_date.getFullYear()}`,
      start_date: `${values.start_date.getMonth() + 1 }/${values.start_date.getFullYear()}`,
      description: values.description,
      title: values.title,
      subcollectionName: "works"
    };
    if (editValues) {
      newWork.subcollectionId = editValues.id;
      newWork.id = editValues.id;
      editWorkExPerience(newWork);
    } else {
      addNewWorkExperience(newWork);
    }
  }

  function onDelete(e) {
    e.preventDefault();
    deleteWorkExperience({
      subcollectionId:editValues.id,
      subcollectionName: 'works'
    });
  }

  return (
    <Fragment>
      <Modal backdrop="static" show={isShow} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{editValues ? 'Edit experience' : 'Add experience'}</Modal.Title>
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
                  <label htmlFor="exampleInputEmail1">Title</label>
                  <input
                    name="title"
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    value={values.title}
                    onChange={handleChange}
                  />
                  {touched.title && errors.title && (
                    <span className={'text-danger'}>{errors.title}</span>
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
                  <label htmlFor="exampleInputPassword1">City, State</label>
                  <input
                    name="city"
                    type="text"
                    className="form-control"
                    placeholder="City, State"
                    value={values.city}
                    onChange={handleChange}
                  />
                  {touched.city && errors.city && (
                    <span className={'text-danger'}>{errors.city}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Description</label>
                  <textarea
                    rows={5}
                    value={values.description}
                    className="form-control"
                    name="description"
                    onChange={handleChange}
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
