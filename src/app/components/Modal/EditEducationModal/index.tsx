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
  school: yup
    .string()
    .max(200, 'School must be at most 200 characters'),
  school_address: yup
    .string()
    .max(200, 'School address must be at most 200 characters'),
  major: yup
    .string()
    .max(200, 'Major must be at most 200 characters'),
  honors: yup
    .string()
    .max(200, 'Honors must be at most 200 characters'),
  degree_type: yup
    .string()
    .max(200, 'Degree type must be at most 200 characters'),
  date_start: yup.string(),
  date_end: yup.string(),
});
interface IEditEducationModal {
  isShow: boolean;
  onHide: () => void;
  education: ENTITIES.Education;
  editEducation: (education: ENTITIES.Education) => void;
  deleteEducation: (education: ENTITIES.Education) => void;
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

export const EditEducationModal: FC<IEditEducationModal> = props => {
  const { isShow, onHide, editEducation, deleteEducation, education } = props;

  const onHandleDelete = async () => {
    const isDelete = await showConfirmMessage(
      Message.Delete_Question,
      '',
      'warning',
    );
    if (isDelete.value === true) {
      deleteEducation(education);
    }
  };

  return (
    <Fragment>
      <Modal backdrop="static" show={isShow} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Edit education</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              ...initialValues,
              school: education.school,
              school_address: education.school_address,
              degree_type: education.degree_type,
              major: education.major,
              honors: education.honors,
              date_start: moment.unix(education.date_start.seconds).toDate(),
              date_end: moment.unix(education.date_end.seconds).toDate(),
            }}
            validationSchema={schema}
            onSubmit={values => {
              const newEducation: ENTITIES.Education = {
                id: education.id,
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
              editEducation(newEducation);
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
                    School
                  </label>
                  <input
                    name="school"
                    type="text"
                    className="form-control"
                    placeholder="School"
                    value={values.school}
                    onChange={handleChange}
                  />
                  {errors.school && (
                    <span className={'text-danger'}>{errors.school}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    City, State
                  </label>
                  <input
                    name="school_address"
                    type="text"
                    className="form-control"
                    placeholder="School address"
                    value={values.school_address}
                    onChange={handleChange}
                  />
                  {errors.school_address && (
                    <span className={'text-danger'}>
                      {errors.school_address}
                    </span>
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
                    Majors
                  </label>
                  <input
                    name="major"
                    type="text"
                    className="form-control"
                    placeholder="Majors"
                    value={values.major}
                    onChange={handleChange}
                  />
                  {errors.major && (
                    <span className={'text-danger'}>{errors.major}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Honors
                  </label>
                  <input
                    name="honors"
                    type="text"
                    className="form-control"
                    placeholder="Honors"
                    value={values.honors}
                    onChange={handleChange}
                  />
                  {errors.honors && (
                    <span className={'text-danger'}>{errors.honors}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Degree type
                  </label>
                  <input
                    name="degree_type"
                    type="text"
                    className="form-control"
                    placeholder="Degree type"
                    value={values.degree_type}
                    onChange={handleChange}
                  />
                  {errors.degree_type && (
                    <span className={'text-danger'}>{errors.degree_type}</span>
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
