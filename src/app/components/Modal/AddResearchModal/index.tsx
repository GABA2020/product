import React, { Fragment, FC } from 'react';
import { Modal } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as yup from 'yup';
import moment from 'moment';
import 'styles/scss/ModalWorkExperience.scss';
import Select from 'react-select';
import { Formik } from 'formik';
import { convertDateToTimestamp } from 'helpers/Unity';

const schema = yup.object().shape({
  title_of_work: yup
    .string()
    .max(200, 'Title of work must be at most 200 characters')
    .required('Title of work is a required field'),
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
    .max(200, 'Primary investigator must be at most 200 characters')
    .required('Primary investigator is a required field'),
  link: yup
    .string()
    .matches(
      /^((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url!',
    )
    .required('Link is a required field'),
  journal: yup
    .string()
    .max(200, 'Journal must be at most 200 characters')
    .required('Journal is a required field'),
  event_date: yup.string().required('Event date is a required field'),
  event_address: yup
    .string()
    .max(200, 'Event address must be at most 200 characters')
    .required('Event address is a required field'),
  author: yup
    .string()
    .max(200, 'Author must be at most 200 characters')
    .required('Author is a required field'),
  event_name: yup
    .string()
    .max(200, 'Event name must be at most 200 characters')
    .required('Event name is a required field'),
});

interface IAddResearchModal {
  isShow: boolean;
  onHide: () => void;
  addNewResearch: (research: ENTITIES.Research) => void;
}

interface IForm {
  author: string;
  event_address: string;
  event_date: Date;
  event_name: string;
  journal: string;
  link: string;
  is_show_link: boolean;
  primary_investigator: string;
  research_type: ENTITIES.ISelect[];
  title_of_work: string;
}

const initialValues: IForm = {
  author: '',
  event_address: '',
  event_date: new Date(),
  event_name: '',
  journal: '',
  link: '',
  is_show_link: false,
  primary_investigator: '',
  research_type: [],
  title_of_work: '',
};

const researchTypeOptions = [
  { value: 'Publication', label: 'Publication' },
  { value: 'Presentation', label: 'Presentation' },
  { value: 'Abstract', label: 'Abstract' },
  { value: 'Poster', label: 'Poster' },
];

export const AddResearchModal: FC<IAddResearchModal> = props => {
  const { isShow, onHide, addNewResearch } = props;

  return (
    <Fragment>
      <Modal backdrop="static" show={isShow} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add Research</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              ...initialValues,
            }}
            validationSchema={schema}
            onSubmit={values => {
              const newResearchType: string[] = [];
              values.research_type.forEach(item => {
                newResearchType.push(item.value);
              });
              const newResearch: ENTITIES.Research = {
                id: '',
                author: values.author,
                event_address: values.event_address,
                event_date: {
                  seconds: convertDateToTimestamp(
                    values.event_date.toDateString(),
                  ),
                },
                event_name: values.event_name,
                journal: values.journal,
                link: values.link,
                is_show_link: values.is_show_link,
                primary_investigator: values.primary_investigator,
                research_type: newResearchType,
                title_of_work: values.title_of_work,
              };
              addNewResearch(newResearch);
            }}
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
                    Research type <span className="text-danger">*</span>
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
                    Event Date <span className="text-danger">*</span>
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
                    Event name <span className="text-danger">*</span>
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
                    Title of work <span className="text-danger">*</span>
                  </label>
                  <input
                    name="title_of_work"
                    type="text"
                    className="form-control"
                    placeholder="Title of work"
                    value={values.title_of_work}
                    onChange={handleChange}
                  />
                  {touched.title_of_work && errors.title_of_work && (
                    <span className={'text-danger'}>
                      {errors.title_of_work}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Event address <span className="text-danger">*</span>
                  </label>
                  <input
                    name="event_address"
                    className="form-control"
                    placeholder="Event address"
                    value={values.event_address}
                    onChange={handleChange}
                  />
                  {touched.event_address && errors.event_address && (
                    <span className={'text-danger'}>
                      {errors.event_address}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Primary investigator <span className="text-danger">*</span>
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
                    Author <span className="text-danger">*</span>
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
                    Journal <span className="text-danger">*</span>
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
                    Link <span className="text-danger">*</span>
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
                      name="is_show_link"
                    />{' '}
                    Show link ?
                  </label>
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
