import React, { Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as yup from 'yup';
import moment from 'moment';
import 'styles/scss/ModalWorkExperience.scss';
import Select from 'react-select';
import { Formik } from 'formik';

const schema = yup.object().shape({
  work_title: yup
    .string()
    .max(200, 'Title of work must be at most 200 characters'),
  research_type: yup
    .array()
    .min(1, 'Pick at least 1 tags')
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
      }),
    ),
  primary_investigator: yup
    .string()
    .max(200, 'Primary investigator must be at most 200 characters'),
  link: yup
    .string()
    .matches(
      /^((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url!',
    ),
  journal: yup
    .string()
    .max(200, 'Journal must be at most 200 characters'),
  event_date: yup.string().required('Event date is a required field'),
  city: yup
    .string()
    .max(200, 'Event address must be at most 200 characters'),
  author: yup
    .string()
    .max(200, 'Author must be at most 200 characters'),
  event_name: yup
    .string()
    .max(200, 'Event name must be at most 200 characters'),
});

const initialValues = {
  author: '',
  city: '',
  event_date: new Date(),
  event_name: '',
  journal: '',
  link: '',
  show_link: false,
  primary_investigator: '',
  research_type: [],
  work_title: '',
};

const researchTypeOptions = [
  { value: 'Publication', label: 'Publication' },
  { value: 'Presentation', label: 'Presentation' },
  { value: 'Abstract', label: 'Abstract' },
  { value: 'Poster', label: 'Poster' },
];

export function ResearchModal(props){
  const { isShow, onHide, addNewResearch, editResearch, deleteResearch, editValues } = props;

  function onSubmit(values) {

    let newResearchType = "";
    values.research_type.forEach(item => {
      newResearchType=`${newResearchType},${item.value}`;
    });
    const newResearch = {
      id: '',
      subcollectionId:'',
      author: values.author,
      event_date:moment(values.event_date).format('DD/MM/YYYY').toString(),
      event_name: values.event_name,
      journal: values.journal,
      link: values.link,
      primary_investigator: values.primary_investigator,
      research_type: newResearchType,
      show_link: values.show_link,
      work_title: values.work_title,
      city: values.city,
      subcollectionName: "researchs",
    };
    if (editValues) {
      newResearch.subcollectionId = editValues.id;
      newResearch.id = editValues.id;
      editResearch(newResearch);
    } else {
      addNewResearch(newResearch);
    }
  }

  function onDelete(e) {
    e.preventDefault();
    deleteResearch({
      subcollectionId:editValues.id,
      subcollectionName: 'researchs'
    });
  }

  return (
    <Fragment>
      <Modal backdrop="static" show={isShow} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editValues ? 'Edit Research' : 'Add Research'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={
              editValues
                ? { 
                    ...editValues,
                    event_date: new Date(moment(editValues.event_date, 'DD/MM/YYYY', ).format()),
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
              setFieldValue,
              touched,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Research type
                  </label>
                  <Select
                    name="research_type"
                    isMulti={true}
                    value={values.research_type}
                    onChange={(opt, e) => {
                      if (opt !== null) {
                        setFieldValue('research_type', opt);
                      }
                    }}
                    options={researchTypeOptions}
                  />
                  {touched.research_type && errors.research_type && (
                    <span className={'text-danger'}>
                      {errors.research_type}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Event Date
                  </label>
                  <div>
                    <ReactDatePicker
                      name="event_date"
                      className="form-control"
                      maxDate={new Date()}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="MMM DD,yyyy"
                      onChange={e => {
                        setFieldValue('event_date', e);
                      }}
                      selected={values.event_date}
                    />
                  </div>
                  {touched.event_date && errors.event_date && (
                    <span className={'text-danger'}>{errors.event_date}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Event name
                  </label>
                  <input
                    name="event_name"
                    type="text"
                    className="form-control"
                    placeholder="Event name"
                    value={values.event_name}
                    onChange={handleChange}
                  />
                  {touched.event_name && errors.event_name && (
                    <span className={'text-danger'}>{errors.event_name}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">
                    Title of work
                  </label>
                  <input
                    name="work_title"
                    type="text"
                    className="form-control"
                    placeholder="Title of work"
                    value={values.work_title}
                    onChange={handleChange}
                  />
                  {touched.work_title && errors.work_title && (
                    <span className={'text-danger'}>
                      {errors.work_title}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    City, State
                  </label>
                  <input
                    name="city"
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
                  <label htmlFor="exampleInputPassword1">
                    Primary investigator
                  </label>
                  <input
                    name="primary_investigator"
                    className="form-control"
                    placeholder="Primary investigator"
                    value={values.primary_investigator}
                    onChange={handleChange}
                  />
                  {touched.primary_investigator &&
                    errors.primary_investigator && (
                      <span className={'text-danger'}>
                        {errors.primary_investigator}
                      </span>
                    )}
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Author
                  </label>
                  <input
                    name="author"
                    className="form-control"
                    placeholder="Author"
                    value={values.author}
                    onChange={handleChange}
                  />
                  {touched.author && errors.author && (
                    <span className={'text-danger'}>{errors.author}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Journal
                  </label>
                  <input
                    name="journal"
                    className="form-control"
                    placeholder="Journal"
                    value={values.journal}
                    onChange={handleChange}
                  />
                  {touched.journal && errors.journal && (
                    <span className={'text-danger'}>{errors.journal}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Link
                  </label>
                  <input
                    name="link"
                    className="form-control"
                    placeholder="Link"
                    value={values.link}
                    onChange={handleChange}
                  />
                  {touched.link && errors.link && (
                    <span className={'text-danger'}>{errors.link}</span>
                  )}
                </div>
                <div className="checkbox">
                  <label>
                    <input
                      onChange={handleChange}
                      type="checkbox"
                      name="show_link"
                    />{' '}
                    Show link ?
                  </label>
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
