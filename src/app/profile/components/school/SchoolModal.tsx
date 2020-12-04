import React, { Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as yup from 'yup';
import moment from 'moment';
import 'styles/scss/ModalWorkExperience.scss';
import { Formik } from 'formik';

const schema = yup.object().shape({
  school: yup
    .string()
    .max(200, 'School must be at most 200 characters'),
  city: yup
    .string()
    .max(200, 'School address must be at most 200 characters'),
  majors: yup
    .string()
    .max(200, 'Major must be at most 200 characters'),
  honors: yup
    .string()
    .max(200, 'Honors must be at most 200 characters'),
  degree_type: yup
    .string()
    .max(200, 'Degree type must be at most 200 characters'),
  start_date: yup.date(),
  end_date: yup
    .date()
    .min(yup.ref('start_date'), "End Date can't be before Start Date"),
  is_present_date: yup.boolean(),
});

const initialValues = {
  school: '',
  city: '',
  degree_type: '',
  majors: '',
  honors: '',
  end_date: new Date(),
  start_date: new Date(),
  is_present_date: false,
};

export function SchoolModal(props){
  const { isShow, onHide, addNewSchool, editSchool, deleteSchool, editValues } = props;

  function onSubmit(values) {
    const newHonors:string[]=[];
    newHonors.push(values.honors);
    const newMajors:string[]=[];
    newMajors.push(values.majors);
    const newDegreeType:string[]=[];
    newDegreeType.push(values.degree_type)
    const newSchool = {
      id: '',
      subcollectionId: '',
      city: values.city,
      degree_type: newDegreeType,
      end_date: `${ values.end_date.getMonth() + 1}/${values.end_date.getFullYear()}`,
      start_date: `${values.start_date.getMonth() + 1 }/${values.start_date.getFullYear()}`,
      majors: newMajors,
      school: values.school,
      honors:newHonors,
      is_present_date: values.is_present_date,
      subcollectionName: "schools"
    };
    if (editValues) {
      newSchool.subcollectionId = editValues.id;
      newSchool.id = editValues.id;
      editSchool(newSchool);
    } else {
      addNewSchool(newSchool);
    }
  }

  function onDelete(e) {
    e.preventDefault();
    deleteSchool({
      subcollectionId:editValues.id,
      subcollectionName: 'schools'
    });
  }

  return (
    <Fragment>
      <Modal backdrop="static" show={isShow} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{editValues ? 'Edit education' : 'Add education'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={
              editValues
                ? {
                    ...editValues,
                    end_date: new Date(moment( `20/${editValues.end_date}`, 'DD/MM/YYYY', ).format()),
                    start_date: new Date(moment(`20/${editValues.end_date}`,'DD/MM/YYYY',).format()),
                    honors:editValues.honors[0],
                    degree_type:editValues.degree_type[0],
                    majors:editValues.majors[0],
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
                  {touched.school && errors.school && (
                    <span className={'text-danger'}>{errors.school}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    City, State
                  </label>
                  <input
                    name="city"
                    type="text"
                    className="form-control"
                    placeholder="City, State"
                    value={values.city}
                    onChange={handleChange}
                  />
                  {touched.city && errors.city && (
                    <span className={'text-danger'}>
                      {errors.city}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <div className="checkbox">
                    <label>
                      <input
                        onChange={handleChange}
                        type="checkbox"
                        name="is_present_date"
                        checked={values.is_present_date === true ? true : false}
                      />{' '}
                      I am currently working in this role ?
                    </label>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="exampleInputPassword1">
                        Start Date
                      </label>
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
                    {values.is_present_date === false ? (
                      <div className="col-md-6">
                        <label htmlFor="exampleInputPassword1">
                          End Date
                        </label>
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
                          <span className={'text-danger'}>
                            {errors.end_date}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="col-md-6">
                        <label htmlFor="exampleInputPassword1">
                          End Date
                        </label>
                        <h5 className="present-date-text">Present</h5>
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Majors
                  </label>
                  <input
                    name="majors"
                    type="text"
                    className="form-control"
                    placeholder="Majors"
                    value={values.majors}
                    onChange={handleChange}
                  />
                  {touched.majors && errors.majors && (
                    <span className={'text-danger'}>{errors.majors}</span>
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
                  {touched.honors && errors.honors && (
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
                  {touched.degree_type && errors.degree_type && (
                    <span className={'text-danger'}>{errors.degree_type}</span>
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
};
