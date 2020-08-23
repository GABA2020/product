import React, { Fragment, FC, useState } from 'react';
import { Modal } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as yup from 'yup';
import moment from 'moment';
import 'styles/scss/ModalWorkExperience.scss';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Formik, useFormik } from 'formik';
import { convertDateToTimestamp, windowOpen } from 'helpers/Unity';
import AsyncSelect from 'react-select/async';
import './style.scss';
import Rate from 'antd/lib/rate';
import { db } from 'helpers/firebase.module';
import { getResourcesWithConditionName } from 'services';
import { showConfirmMessage } from 'helpers/Swal.module';
import { Message } from 'helpers/Message';

const schema = yup.object().shape({
  name: yup
    .string()
    .max(100, 'Resource name must be at most 100 characters')
    .required('Resource name is a required field'),
  subject: yup
    .string()
    .max(30, 'Subject must be at most 30 characters')
    .required('Subject is a required field'),
  actual_exam: yup
    .string()
    .max(100, 'Exam must be at most 100 characters')
    .required('Exam is a required field'),
  date: yup.string().required('Date start using is a required field'),
  actual_exam_score: yup
    .number()
    .typeError('Actual exam score must be a number')
    .required('Actual exam score is a required field'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .required('Rating is a required field'),
  review_body: yup
    .string()
    .max(500, 'Review must be at most 200 characters')
    .required('Review is a required field'),
});
interface IResource {
  isShow: boolean;
  onHide: () => void;
  addNewUserResource: (userResource: ENTITIES.UserResource) => void;
  addResourceReview: (review: ENTITIES.Review) => void;
}

interface IForm {
  name: string;
  subject: string;
  actual_exam: string;
  date: Date;
  actual_exam_score: number;
  rating: number;
  review_body: string;
}

const initialValues: IForm = {
  name: '',
  subject: '',
  actual_exam: '',
  date: new Date(),
  actual_exam_score: 0,
  rating: 0,
  review_body: '',
};

const initResourceSelected: ENTITIES.IResourceSelected = {
  label: '',
  value: {
    id: '',
    name: '',
    picture_name: '',
    rating: 0,
    link: '',
  },
};

export const AddResource: FC<IResource> = props => {
  const { isShow, onHide, addNewUserResource, addResourceReview } = props;
  const [resourceSelectedState, setResourceSelectedState] = useState<
    ENTITIES.IResourceSelected
  >(initResourceSelected);

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      ...initialValues,
    },
    validationSchema: schema,
    onSubmit: async values => {
      const userResource: ENTITIES.UserResource = {
        id: '',
        resource_id: resourceSelectedState.value.id,
        match_score: 0,
        date: {
          seconds: convertDateToTimestamp(values.date.toDateString()),
        },
        actual_exam: values.actual_exam,
        actual_exam_score: values.actual_exam_score,
      };
      const review: ENTITIES.Review = {
        id: '',
        resource_id: resourceSelectedState.value.id,
        review_body: values.review_body,
        subject: values.subject,
        rating: values.rating,
        date_time: {
          seconds: convertDateToTimestamp(new Date().toString()),
        },
        updated_at: {
          seconds: convertDateToTimestamp(new Date().toString()),
        },
      };
      const confirm = await showConfirmMessage(
        Message.Add_New_Resource_Question,
        '',
        'question',
      );
      if (confirm.value === true) {
        addNewUserResource(userResource);
        addResourceReview(review);
        onHide();
      }
    },
  });

  const getAsyncOptions = (input: string) => {
    const resourceOptions: ENTITIES.IResourceSelected[] = [];
    return new Promise((resolve, reject) => {
      getResourcesWithConditionName(input.trim())
        .then(resources => {
          resources.forEach(item => {
            resourceOptions.push({
              label: item.get('name'),
              value: { id: item.id, ...item.data() } as ENTITIES.Resource,
            });
          });
          resolve(resourceOptions);
        })
        .catch(() => {
          reject(resourceOptions);
        });
    });
  };

  return (
    <Fragment>
      <Modal backdrop="static" show={isShow} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add resource</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Resource name</label>
              <div className="search-resource">
                <div className="row">
                  <div className="col-lg-8 col-md-8">
                    <AsyncSelect
                      cacheOptions
                      value={resourceSelectedState}
                      onChange={select => {
                        setResourceSelectedState(select);
                        setFieldValue('name', select.label);
                      }}
                      defaultOptions
                      loadOptions={getAsyncOptions}
                    ></AsyncSelect>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <div className="search-btn-wrap">
                      <button
                        onClick={() => {
                          if (resourceSelectedState.value.link !== '#') {
                            windowOpen(resourceSelectedState.value.link);
                          }
                        }}
                        type="button"
                        className="btn btn-primary search-btn"
                      >
                        Go to resource
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {touched.name && errors.name && (
                <span className={'text-danger'}>{errors.name}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Subject</label>
              <input
                name="subject"
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Subject"
                onChange={handleChange}
              />
              {touched.subject && errors.subject && (
                <span className={'text-danger'}>{errors.subject}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Exam</label>
              <input
                name="actual_exam"
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Exam"
                onChange={handleChange}
              />
              {touched.actual_exam && errors.actual_exam && (
                <span className={'text-danger'}>{errors.actual_exam}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Date start using</label>
              <div>
                <ReactDatePicker
                  name="date"
                  className="form-control"
                  maxDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Date start using"
                  onChange={e => {
                    setFieldValue('date', e);
                  }}
                  selected={values.date}
                />
              </div>
              {touched.date && errors.date && (
                <span className={'text-danger'}>{errors.date}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Actual exam score</label>
              <input
                name="actual_exam_score"
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Actual exam score"
                onChange={handleChange}
              />
              {touched.actual_exam_score && errors.actual_exam_score && (
                <span className={'text-danger'}>
                  {errors.actual_exam_score}
                </span>
              )}
            </div>
            <div className="form-group rating-group">
              <label htmlFor="exampleInputEmail1">Rating</label>
              <Rate
                value={values.rating}
                onChange={value => {
                  setFieldValue('rating', value);
                }}
              />
              {touched.rating && errors.rating && (
                <span className={'text-danger'}>{errors.rating}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Review</label>
              <textarea
                name="review_body"
                onChange={handleChange}
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
              />
              {touched.review_body && errors.review_body && (
                <span className={'text-danger'}>{errors.review_body}</span>
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
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};
