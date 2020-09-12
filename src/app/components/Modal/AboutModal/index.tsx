import React, { Fragment, FC } from 'react';
import { Modal } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import * as yup from 'yup';
import 'styles/scss/ModalWorkExperience.scss';
import { Formik } from 'formik';

const schema = yup.object().shape({
  about: yup.string().max(500, 'About must be at most 500 characters'),
});

interface IAbout {
  isShow: boolean;
  onHide: () => void;
  editAbout: (about: string) => void;
  about: string;
}

interface IForm {
  about: string;
}

const initialValues: IForm = {
  about: '',
};

export const AboutModal: FC<IAbout> = props => {
  const { isShow, about, onHide, editAbout } = props;

  return (
    <Fragment>
      <Modal backdrop="static" show={isShow} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Edit about</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              ...initialValues,
              about,
            }}
            validationSchema={schema}
            onSubmit={values => {
              editAbout(values.about);
              onHide();
            }}
          >
            {({ errors, handleChange, handleSubmit, values, touched }) => (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <textarea
                    value={values.about}
                    rows={7}
                    className="form-control"
                    name="about"
                    onChange={handleChange}
                  ></textarea>
                  {touched.about && errors.about && (
                    <span className={'text-danger'}>{errors.about}</span>
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
