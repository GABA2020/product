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
interface IEditLetterModal {
  isShow: boolean;
  letter: ENTITIES.Letter;
  onHide: () => void;
  editLetter: (letter: ENTITIES.Letter) => void;
  deleteLetter: (letter: ENTITIES.Letter) => void;
}

interface IForm {
  document_name: string;
  document_type: string;
  link: string;
  receive_date: Date;
  is_show_link: boolean;
}

const initialValues: IForm = {
  document_name: '',
  document_type: '',
  link: '',
  receive_date: new Date(),
  is_show_link: false,
};

export const EditLetterModal: FC<IEditLetterModal> = props => {
  const { isShow, onHide, letter, editLetter, deleteLetter } = props;

  const onHandleDelete = async () => {
    const isDelete = await showConfirmMessage(
      Message.Delete_Question,
      '',
      'warning',
    );
    if (isDelete.value === true) {
      deleteLetter(letter);
    }
  };

  return (
    <Fragment>
      <Modal backdrop="static" show={isShow} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add letter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              ...initialValues,
              document_name: letter.document_name,
              document_type: letter.document_type,
              link: letter.link,
              receive_date: moment.unix(letter.receive_date.seconds).toDate(),
              is_show_link: letter.is_show_link,
            }}
            validationSchema={schema}
            onSubmit={values => {
              const newLetter: ENTITIES.Letter = {
                id: letter.id,
                document_name: values.document_name,
                document_type: values.document_type,
                link: values.link,
                receive_date: {
                  seconds: convertDateToTimestamp(
                    values.receive_date.toDateString(),
                  ),
                },
                is_show_link: values.is_show_link,
              };
              editLetter(newLetter);
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
                  <label htmlFor="exampleInputPassword1">
                    Receive date
                  </label>
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
                  <label htmlFor="exampleInputEmail1">
                    Document name
                  </label>
                  <input
                    name="document_name"
                    type="text"
                    className="form-control"
                    placeholder="Document name"
                    onChange={handleChange}
                    value={values.document_name}
                  />
                  {touched.document_name && errors.document_name && (
                    <span className={'text-danger'}>
                      {errors.document_name}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Document type
                  </label>
                  <input
                    name="document_type"
                    type="text"
                    className="form-control"
                    placeholder="Document type"
                    onChange={handleChange}
                    value={values.document_type}
                  />
                  {touched.document_type && errors.document_type && (
                    <span className={'text-danger'}>
                      {errors.document_type}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Link
                  </label>
                  <input
                    name="link"
                    type="text"
                    className="form-control"
                    placeholder="Link"
                    onChange={handleChange}
                    value={values.link}
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
                      checked={values.is_show_link === true ? true : false}
                    />{' '}
                    Show link ?
                  </label>
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
