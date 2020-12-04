import React, { Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as yup from 'yup';
import moment from 'moment';
import 'styles/scss/ModalWorkExperience.scss';
import { Formik } from 'formik';

const schema = yup.object().shape({
  document_name: yup
    .string()
    .max(200, 'Document name must be at most 200 characters'),
  document_type: yup
    .string()
    .max(200, 'Document type must be at most 200 characters'),
  link: yup
    .string()
    .matches(
      /^((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url!',
    ),
  receive_date: yup.string(),
});

const initialValues = {
  document_name: '',
  document_type: '',
  link: '',
  receive_date: new Date(),
  show_link: false,
};

export function LetterModal(props) {
  const {
    isShow,
    onHide,
    addNewLetter,
    editLetter,
    deleteLetter,
    editValues,
  } = props;

  function onSubmit(values) {
    const newLetter = {
      id: '',
      subcollectionId: '',
      document_name: values.document_name,
      document_type: values.document_type,
      link: values.link,
      receive_date: moment(values.receive_date).format('DD/MM/YYYY'),
      show_link: values.show_link,
      subcollectionName: 'letters',
    };
    if (editValues) {
      newLetter.subcollectionId = editValues.id;
      newLetter.id = editValues.id;
      editLetter(newLetter);
    } else {
      addNewLetter(newLetter);
    }
  }

  function onDelete(e) {
    e.preventDefault();
    deleteLetter({
      subcollectionId: editValues.id,
      subcollectionName: 'letters',
    });
  }

  return (
    <Fragment>
      <Modal backdrop="static" show={isShow} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{editValues ? 'Edit letter' : 'Add letter'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={
              editValues
                ? {
                    ...editValues,
                    receive_date: new Date(moment(editValues.receive_date, 'DD/MM/YYYY').format()),
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
                  <label htmlFor="exampleInputPassword1">Receive date</label>
                  <div>
                    <ReactDatePicker
                      name="receive_date"
                      className="form-control"
                      maxDate={new Date()}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="MMM DD,yyyy"
                      onChange={e => {
                        setFieldValue('receive_date', e);
                      }}
                      selected={values.receive_date}
                    />
                  </div>
                  {touched.receive_date && errors.receive_date && (
                    <span className={'text-danger'}>{errors.receive_date}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Document name</label>
                  <input
                    name="document_name"
                    type="text"
                    className="form-control"
                    placeholder="Document name"
                    value={values.document_name}
                    onChange={handleChange}
                  />
                  {touched.document_name && errors.document_name && (
                    <span className={'text-danger'}>
                      {errors.document_name}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Document type</label>
                  <input
                    name="document_type"
                    type="text"
                    className="form-control"
                    placeholder="Document type"
                    value={values.document_type}
                    onChange={handleChange}
                  />
                  {touched.document_type && errors.document_type && (
                    <span className={'text-danger'}>
                      {errors.document_type}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Link</label>
                  <input
                    name="link"
                    type="text"
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
                      value={values.show_link}
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
}
