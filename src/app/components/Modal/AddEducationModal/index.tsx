import React, { Fragment, FC } from 'react';
import { Modal } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as yup from 'yup';
import moment from 'moment';
import 'styles/scss/ModalWorkExperience.scss';
import { Formik } from 'formik';
import { convertDateToTimestamp } from 'helpers/Unity';

const schema = yup.object().shape({
  school: yup
    .string()
    .max(200, 'School must be at most 200 characters')
    .required('School is a required field'),
  school_address: yup
    .string()
    .max(200, 'School address must be at most 200 characters')
    .required('School address is a required field'),
  major: yup
    .string()
    .max(200, 'Major must be at most 200 characters')
    .required('Major is a required field'),
  honors: yup
    .string()
    .max(200, 'Honors must be at most 200 characters')
    .required('Honors is a required field'),
  degree_type: yup
    .string()
    .max(200, 'Degree type must be at most 200 characters')
    .required('Degree type is a required field'),
  date_start: yup.string().required('Date Start is a required field'),
  date_end: yup.string().required('Date End is a required field'),
});
interface IAddEducationModal {
  isShow: boolean;
  onHide: () => void;
  addNewEducation: (education: ENTITIES.Education) => void;
}

interface IForm {
  school: string;
  school_address: string;
  major: string;
  honors: string;
  degree_type: string;
  date_start: Date;
  date_end: Date;
}

const initialValues: IForm = {
  school: '',
  school_address: '',
  degree_type: '',
  major: '',
  honors: '',
  date_end: new Date(),
  date_start: new Date(),
};

export const AddEducationModal: FC<IAddEducationModal> = props => {
  const { isShow, onHide, addNewEducation } = props;

  return (
    <Fragment>
      <Modal backdrop="static" show={isShow} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add education</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              ...initialValues,
            }}
            validationSchema={schema}
            onSubmit={values => {
              const newEducation: ENTITIES.Education = {
                id: '',
                school: values.school,
                school_address: values.school_address,
                degree_type: values.degree_type,
                major: values.major,
                honors: values.honors,
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
              };
              addNewEducation(newEducation);
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
                  <label htmlFor="exampleInputEmail1">School</label>
                  <input
                    name="school"
                    type="text"
                    className="form-control"
                    placeholder="School"
                    value={values.school}
                    onChange={handleChange}
                  />
                  {touched.school && errors.school && (
                    <span className={'text-danger'}>{errors.school}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">School address</label>
                  <input
                    name="school_address"
                    type="text"
                    className="form-control"
                    placeholder="School address"
                    value={values.school_address}
                    onChange={handleChange}
                  />
                  {touched.school_address && errors.school_address && (
                    <span className={'text-danger'}>
                      {errors.school_address}
                    </span>
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
                  <label htmlFor="exampleInputPassword1">Majors</label>
                  <input
                    name="major"
                    type="text"
                    className="form-control"
                    placeholder="Majors"
                    value={values.major}
                    onChange={handleChange}
                  />
                  {touched.major && errors.major && (
                    <span className={'text-danger'}>{errors.major}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Honors</label>
                  <input
                    name="honors"
                    type="text"
                    className="form-control"
                    placeholder="Honors"
                    value={values.honors}
                    onChange={handleChange}
                  />
                  {touched.honors && errors.honors && (
                    <span className={'text-danger'}>{errors.honors}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Degree type</label>
                  <input
                    name="degree_type"
                    type="text"
                    className="form-control"
                    placeholder="Degree type"
                    value={values.degree_type}
                    onChange={handleChange}
                  />
                  {touched.degree_type && errors.degree_type && (
                    <span className={'text-danger'}>{errors.degree_type}</span>
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
