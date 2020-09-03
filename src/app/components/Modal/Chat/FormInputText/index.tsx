import React, { Fragment, FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from 'formik';
import * as yup from 'yup';

const initialValues = {
  message: '',
};

const schema = yup.object().shape({
  message: yup.string().min(1).required(),
});

interface IFormInputText {
  sendMessage: (message: string) => void;
}

export const FormInputText: FC<IFormInputText> = props => {
  const { sendMessage } = props;
  const { handleSubmit, handleChange, values, resetForm } = useFormik({
    initialValues: {
      ...initialValues,
    },
    validationSchema: schema,
    onSubmit: async values => {
      if (values.message.trim() !== '') {
        sendMessage(values.message);
        resetForm({});
      }
    },
  });
  return (
    <Fragment>
      <div className="type_msg">
        <form onSubmit={handleSubmit}>
          <div className="input_msg_write">
            <input
              name="message"
              type="text"
              className="write_msg"
              placeholder="Type a message"
              onChange={handleChange}
              value={values.message}
            />
            <button className="msg_send_btn" type="submit">
              <FontAwesomeIcon icon={faReply} />
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
