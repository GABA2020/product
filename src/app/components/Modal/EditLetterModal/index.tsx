import React, { Fragment, FC } from 'react';
import { Modal } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as yup from 'yup';
import moment from 'moment';
import 'styles/scss/ModalWorkExperience.scss';
import { Formik } from 'formik';
import { showDialogDelete } from 'helpers/Swal.module';

const schema = yup.object().shape({
  document_name: yup
    .string()
    .max(200, 'Document name must be at most 200 characters')
    .required('Document name is a required field'),
  document_type: yup
    .string()
    .max(200, 'Document type must be at most 200 characters')
    .required('Document type is a required field'),
  link: yup
    .string()
    .matches(
      /^((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url!',
    )
    .required('Link is a required field'),
  receive_date: yup.string().required('Receive date is a required field'),
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
}

const initialValues: IForm = {
  document_name: '',
  document_type: '',
  link: '',
  receive_date: new Date(),
};

export const EditLetterModal: FC<IEditLetterModal> = props => {
  const { isShow, onHide, letter, editLetter, deleteLetter } = props;

  const onHandleDelete = async () => {
    const isDelete = await showDialogDelete();
    if (isDelete.value === true) {
      deleteLetter(letter);
    }
  };

  return (
    <Fragment>
      <Modal show={isShow} onHide={onHide}>
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
              receive_date: new Date(letter.receive_date),
            }}
            validationSchema={schema}
            onSubmit={values => {
              const newLetter: ENTITIES.Letter = {
                id: letter.id,
                document_name: values.document_name,
                document_type: values.document_type,
                link: values.link,
                receive_date: moment(values.receive_date).format('yyyy/MM/DD'),
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
                  <label htmlFor="exampleInputPassword1">Receive date:</label>
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
                  <label htmlFor="exampleInputPassword1">Document type</label>
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
                  <label htmlFor="exampleInputPassword1">Link</label>
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
                <div className="btn-wrapper-submit">
                  <button
                    type="button"
                    className="btn btn-light btn-save-profile"
                    onClick={() => onHandleDelete()}
                  >
                    Delete
                  </button>
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
