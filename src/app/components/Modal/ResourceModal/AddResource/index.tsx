// import React, { Fragment, FC, useState, useEffect } from 'react';
// import { Modal } from 'react-bootstrap';
// import ReactDatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import * as yup from 'yup';
// import { useFormik } from 'formik';
// import { convertDateToTimestamp, windowOpen } from 'helpers/Unity';
// import AsyncSelect from 'react-select/async';
// import '../style.scss';
// import Rate from 'antd/lib/rate';
// import { getResourcesWithConditionName } from 'services';
// import { showConfirmMessage } from 'helpers/Swal.module';
// import { Message } from 'helpers/Message';

// const schema = yup.object().shape({
//   name: yup
//     .string()
//     .max(100, 'Resource name must be at most 100 characters')
//     .required('Resource name is a required field'),
//   subject: yup
//     .string()
//     .max(30, 'Subject must be at most 30 characters')
//     .required('Subject is a required field'),
//   actual_exam: yup
//     .string()
//     .max(100, 'Exam must be at most 100 characters')
//     .required('Exam is a required field'),
//   date: yup.string().required('Date start using is a required field'),
//   actual_exam_score: yup
//     .number()
//     .min(0, 'Actual exam score must be greater than or equal to 0')
//     .typeError('Actual exam score must be a number')
//     .required('Actual exam score is a required field'),
//   rating: yup
//     .number()
//     .typeError('Rating must be a number')
//     .required('Rating is a required field')
//     .min(1, 'Please vote this resource'),
//   review_body: yup
//     .string()
//     .max(500, 'Review must be at most 200 characters')
//     .required('Review is a required field'),
// });
// interface IResource {
//   isShow: boolean;
//   onHide: () => void;
//   addNewUserResource: (userResource: ENTITIES.UserResource) => void;
//   allUserResources: ENTITIES.UserResource[];
// }

// interface IForm {
//   name: string;
//   subject: string;
//   actual_exam: string;
//   date: Date;
//   actual_exam_score: number;
//   rating: number;
//   review_body: string;
// }

// const initialValues: IForm = {
//   name: '',
//   subject: '',
//   actual_exam: '',
//   date: new Date(),
//   actual_exam_score: 0,
//   rating: 0,
//   review_body: '',
// };

// const initResourceSelected: ENTITIES.IResourceSelected = {
//   label: 'Resource name',
//   value: {
//     id: '',
//     name: '',
//     picture_name: '',
//     rating: 0,
//     link: '',
//   },
// };

// export const AddResource: FC<IResource> = props => {
//   const { isShow, onHide, addNewUserResource, allUserResources } = props;
//   const [resourceSelectedState, setResourceSelectedState] = useState<
//     ENTITIES.IResourceSelected
//   >(initResourceSelected);

//   useEffect(() => {
//     if (isShow === true) {
//       setResourceSelectedState(initResourceSelected);
//       resetForm({});
//       setFieldValue('actual_exam_score', 0);
//     }
//   }, [isShow]);

//   const {
//     handleSubmit,
//     handleChange,
//     values,
//     errors,
//     touched,
//     resetForm,
//     setFieldValue,
//   } = useFormik({
//     initialValues: {
//       ...initialValues,
//     },
//     validationSchema: schema,
//     onSubmit: async values => {
//       const userResource: ENTITIES.UserResource = {
//         id: '',
//         resource_id: resourceSelectedState.value.id,
//         match_score: 0,
//         date: {
//           seconds: convertDateToTimestamp(values.date.toDateString()),
//         },
//         actual_exam: values.actual_exam,
//         actual_exam_score: values.actual_exam_score,
//         review_body: values.review_body,
//         rating: values.rating,
//         subject: values.subject,
//         updated_at: {
//           seconds: convertDateToTimestamp(new Date().toString()),
//         },
//         created_at: {
//           seconds: convertDateToTimestamp(new Date().toString()),
//         },
//       };

//       const confirm = await showConfirmMessage(
//         Message.Add_New_Resource_Question,
//         '',
//         'question',
//       );
//       if (confirm.value === true) {
//         addNewUserResource(userResource);
//         onHide();
//       }
//     },
//   });

//   const getAsyncOptions = (input: string) => {
//     const resourceOptions: ENTITIES.IResourceSelected[] = [];
//     return new Promise((resolve, reject) => {
//       getResourcesWithConditionName(input.trim())
//         .then(resources => {
//           resources.forEach(item => {
//             const newResource = {
//               label: item.get('name'),
//               value: { id: item.id, ...item.data() } as ENTITIES.Resource,
//             };
//             if (
//               allUserResources.find(
//                 item => item.resource_id === newResource.value.id,
//               ) === undefined
//             ) {
//               resourceOptions.push(newResource);
//             }
//           });
//           resolve(resourceOptions);
//         })
//         .catch(() => {
//           reject(resourceOptions);
//         });
//     });
//   };

//   return (
//     <Fragment>
//       <Modal backdrop="static" show={isShow} onHide={onHide}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add resource</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="exampleInputEmail1">
//                 Resource name <span className="text-danger">*</span>
//               </label>
//               <div className="search-resource">
//                 <div className="row">
//                   <div className="col-lg-8 col-md-8">
//                     <AsyncSelect
//                       cacheOptions
//                       value={resourceSelectedState}
//                       onChange={select => {
//                         setResourceSelectedState(select);
//                         setFieldValue('name', select.label);
//                       }}
//                       defaultOptions
//                       loadOptions={getAsyncOptions}
//                     ></AsyncSelect>
//                   </div>
//                   <div className="col-lg-4 col-md-4">
//                     <div className="search-btn-wrap">
//                       <button
//                         onClick={() => {
//                           if (resourceSelectedState.value.link !== '#') {
//                             windowOpen(resourceSelectedState.value.link);
//                           }
//                         }}
//                         type="button"
//                         className="btn btn-primary search-btn"
//                       >
//                         Go to resource
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {touched.name && errors.name && (
//                 <span className={'text-danger'}>{errors.name}</span>
//               )}
//             </div>
//             <div className="form-group">
//               <label htmlFor="exampleInputEmail1">
//                 Subject <span className="text-danger">*</span>
//               </label>
//               <input
//                 name="subject"
//                 type="text"
//                 className="form-control"
//                 id="exampleInputEmail1"
//                 placeholder="Subject"
//                 onChange={handleChange}
//               />
//               {touched.subject && errors.subject && (
//                 <span className={'text-danger'}>{errors.subject}</span>
//               )}
//             </div>
//             <div className="form-group">
//               <label htmlFor="exampleInputEmail1">
//                 Exam <span className="text-danger">*</span>
//               </label>
//               <input
//                 name="actual_exam"
//                 type="text"
//                 className="form-control"
//                 id="exampleInputEmail1"
//                 placeholder="Exam"
//                 onChange={handleChange}
//               />
//               {touched.actual_exam && errors.actual_exam && (
//                 <span className={'text-danger'}>{errors.actual_exam}</span>
//               )}
//             </div>
//             <div className="form-group">
//               <label htmlFor="exampleInputEmail1">
//                 Date start using <span className="text-danger">*</span>
//               </label>
//               <div>
//                 <ReactDatePicker
//                   name="date"
//                   className="form-control"
//                   maxDate={new Date()}
//                   dateFormat="dd/MM/yyyy"
//                   placeholderText="Date start using"
//                   onChange={e => {
//                     setFieldValue('date', e);
//                   }}
//                   selected={values.date}
//                 />
//               </div>
//               {touched.date && errors.date && (
//                 <span className={'text-danger'}>{errors.date}</span>
//               )}
//             </div>
//             <div className="form-group">
//               <label htmlFor="exampleInputEmail1">
//                 Actual exam score <span className="text-danger">*</span>
//               </label>
//               <input
//                 name="actual_exam_score"
//                 type="number"
//                 min={0}
//                 className="form-control"
//                 id="exampleInputEmail1"
//                 placeholder="Actual exam score"
//                 onChange={handleChange}
//                 value={values.actual_exam_score}
//               />
//               {touched.actual_exam_score && errors.actual_exam_score && (
//                 <span className={'text-danger'}>
//                   {errors.actual_exam_score}
//                 </span>
//               )}
//             </div>
//             <div className="form-group rating-group">
//               <label htmlFor="exampleInputEmail1">
//                 Rating <span className="text-danger">*</span>
//               </label>
//               <Rate
//                 value={values.rating}
//                 onChange={value => {
//                   setFieldValue('rating', value);
//                 }}
//               />
//               {touched.rating && errors.rating && (
//                 <span style={{ marginTop: '5px' }} className={'text-danger'}>
//                   {errors.rating}
//                 </span>
//               )}
//             </div>
//             <div className="form-group">
//               <label htmlFor="exampleFormControlTextarea1">
//                 Review <span className="text-danger">*</span>
//               </label>
//               <textarea
//                 name="review_body"
//                 onChange={handleChange}
//                 className="form-control"
//                 id="exampleFormControlTextarea1"
//                 rows={3}
//               />
//               {touched.review_body && errors.review_body && (
//                 <span className={'text-danger'}>{errors.review_body}</span>
//               )}
//             </div>

//             <div className="text-right mt-2">
//               <button
//                 type="submit"
//                 className="btn btn-success btn-save-profile"
//               >
//                 Save
//               </button>
//             </div>
//           </form>
//         </Modal.Body>
//       </Modal>
//     </Fragment>
//   );
// };

import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { useMutation } from '@apollo/react-hooks';

import { Column, Row } from '../../../../genericComponents/Layout';
import Checkbox from '../../../../genericComponents/Checkbox';
import Stars from '../../../../genericComponents/Stars';
import theme from '../../../../../theme';
import { CREATE_REVIEW } from '../../../../../service/mutations';
import AsyncSelect from 'react-select/async';
import { getResourcesWithConditionName } from 'services';
import { Context } from 'app/globalContext/GlobalContext';

const initResourceSelected: ENTITIES.IResourceSelected = {
  label: 'Resource name',
  value: {
    id: '',
    name: '',
    picture_name: '',
    rating: 0,
    link: '',
  },
};

const inputFontStyle = `
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.1px;
`;

const ModalContainer = styled(Column)`
  width: 100%;
  height: 100%;
  position: fixed;
  overflow-y: hidden;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Modal = styled(Column)`
  flex-direction: column;
  position: realtive;
  width: 1000px;
  background-color: white;
  margin-top: 50px;
`;

const ModalHeader = styled.div`
  padding: 41px 200px 26px 200px;
  background-color: white;
  border-bottom: 1px solid ${props => props.theme.color.softGray};
`;

const HeaderTitle = styled.h3`
  width: 100%;
  border-bottom: 2px solid ${props => props.theme.color.gabaYellow};
  padding-bottom: 20px;
`;

const ModalContent = styled(Column)`
  padding: 26px 200px 41px 200px;
  width: 100%;
`;

const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid lightgray;
  margin: 25px 0;
`;

const FormSection = styled(Row)`
  flex-wrap: wrap;
  label {
    margin-right: 25px;
    margin-top: 10px;
  }

  .react-datepicker-wrapper input {
    height: 40px;
    width: 136px;
    border: 1px solid lightgray;
    text-align: center;
    border-radius: 5px;
    margin-right: 15px;
  }

  .custom-date {
    width: 170px;
  }
`;

const Subtitle = styled.p`
  width: 100%;
  color: rgb(17, 23, 65);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0px;
  margin-bottom: 30px;
  padding-left: 10px;
  position: relative;
  &::before {
    display: inline-block;
    content: '*';
    color: red;
    width: 8px;
    height: 8px;
    font-size: 30px;
    position: absolute;
    left: -7px;
  }
`;

const CheckboxContainer = styled.div`
  width: 50%;
`;

const TextInput = styled.input`
  height: 40px;
  border: 1px solid lightgray;
  border-radius: 5px;
  margin-right: 15px;
  padding-left: 10px;
  width: 100%;
  ${inputFontStyle}
`;

const TextArea = styled.textarea`
  border: 1px solid lightgray;
  border-radius: 5px;
  margin-right: 15px;
  padding-left: 10px;
  width: 100%;
  padding-top: 10px;
  ${inputFontStyle}
`;

const ModalButton = styled.button`
  background: ${(props: { background: string }) => props.background};
  border-radius: 6px;
  height: 48px;
  color: ${props => props.theme.color.darkBlue};
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  width: 48%;
  border: none;
`;

const ButtonsContainer = styled(Row)`
  justify-content: space-between;
  width: 100%;
`;

interface params {
  id: string;
}

const AddReviewModal = ({ onClose }: { onClose: () => void }) => {
  const [startDateValue, setStartDateValue] = useState(new Date());
  const [endDateValue, setEndDateValue] = useState(new Date());
  const [exams, setExams] = useState({
    'Subject One': false,
    'Exam Title One': false,
    'Subject Two': false,
    'Exam Title Two': false,
  });
  const [examDate, setExamDate] = useState(new Date());
  const [stars, setStars] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [id, setId] = useState('');
  const [titleHeader, setTitleHeadet] = useState('Choose a resource:');
  //let { id }: params = useParams();
  //const email = useSelector((state: any) => state.auth.email);
  const {
    state: { user },
  } = useContext(Context);
  const [createReview, { data }] = useMutation(CREATE_REVIEW, {
    onCompleted: () => onClose(),
  });

  const [resourceSelectedState, setResourceSelectedState] = useState<
    ENTITIES.IResourceSelected
  >(initResourceSelected);

  const handleCheckboxChange = exam =>
    setExams(prevExams => {
      return {
        ...prevExams,
        [exam]: !prevExams[exam],
      };
    });

  const handleSave = () => {
    createReview({
      variables: {
        comment,
        myRating: stars,
        resourceId: id,
        specialties: [],
        subjects: [],
        title,
        usedInTests: Object.keys(exams).filter(key => exams[key]),
        used_end: endDateValue,
        used_start: startDateValue,
        userId: user.email,
        username: user.username,
      },
    });
  };

  const getAsyncOptions = (input: string) => {
    const resourceOptions: ENTITIES.IResourceSelected[] = [];
    return new Promise((resolve, reject) => {
      getResourcesWithConditionName(input.trim())
        .then(resources => {
          resources.forEach(item => {
            const newResource = {
              label: item.get('name'),
              value: { id: item.id, ...item.data() } as ENTITIES.Resource,
            };
            resourceOptions.push(newResource);
            // if (
            //   allUserResources.find(
            //     item => item.resource_id === newResource.value.id,
            //   ) === undefined
            // ) {
            //   resourceOptions.push(newResource);
            // }
          });
          resolve(resourceOptions);
        })
        .catch(() => {
          reject(resourceOptions);
        });
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ModalContainer>
      <Modal>
        <ModalHeader>
          <HeaderTitle>{titleHeader}</HeaderTitle>
          <AsyncSelect
            cacheOptions
            value={resourceSelectedState}
            onChange={select => {
              setResourceSelectedState(select);
              setId(select.value.id);
              setTitleHeadet(select.label);
              // setFieldValue('name', select.label);
            }}
            defaultOptions
            loadOptions={getAsyncOptions}
          ></AsyncSelect>
        </ModalHeader>
        <ModalContent>
          <FormSection>
            <Subtitle>When did you start?</Subtitle>
            <Row>
              <label>Start: </label>
              <DatePicker
                selected={startDateValue}
                onChange={date => setStartDateValue(date)}
                dateFormat="MM / yyyy"
                showMonthYearPicker
              />
            </Row>
            <Row>
              <label>End: </label>
              <DatePicker
                selected={endDateValue}
                onChange={date => setEndDateValue(date)}
                dateFormat="MM / yyyy"
                showMonthYearPicker
              />
            </Row>
          </FormSection>
          <Divider />
          <FormSection>
            <Subtitle>What test did you use this resource for?</Subtitle>
            <CheckboxContainer>
              <Checkbox
                onChange={() => handleCheckboxChange('Subject One')}
                label="Subject One"
                checked={exams['Subject One']}
              />
            </CheckboxContainer>
            <CheckboxContainer>
              <Checkbox
                onChange={() => handleCheckboxChange('Exam Title One')}
                label="Exam Title One"
                checked={exams['Exam Title One']}
              />
            </CheckboxContainer>
            <CheckboxContainer>
              <Checkbox
                onChange={() => handleCheckboxChange('Subject Two')}
                label="Subject Two"
                checked={exams['Subject Two']}
              />
            </CheckboxContainer>
            <CheckboxContainer>
              <Checkbox
                onChange={() => handleCheckboxChange('Exam Title Two')}
                label="Exam Title Two"
                checked={exams['Exam Title Two']}
              />
            </CheckboxContainer>
          </FormSection>
          <Divider />
          <FormSection>
            <Subtitle>When did you take the exam?</Subtitle>
            <Row>
              <label>Date: </label>
              <DatePicker
                selected={examDate}
                onChange={date => setExamDate(date)}
                dateFormat="MM / dd / yyyy"
                calendarClassName="custom-date"
              />
            </Row>
          </FormSection>
          <Divider />
          <FormSection>
            <Subtitle>Star Rating</Subtitle>
            <Row>
              <Stars
                onChange={numOfStars => setStars(numOfStars)}
                numberOfStars={stars}
                color="yellow"
              />
            </Row>
          </FormSection>
          <Divider />
          <FormSection>
            <Subtitle>Review Title</Subtitle>
            <TextInput
              value={title}
              onChange={({ target: { value } }) => setTitle(value)}
            />
          </FormSection>
          <Divider />
          <FormSection>
            <Subtitle>Review</Subtitle>
            <TextArea
              rows={6}
              value={comment}
              onChange={({ target: { value } }) => setComment(value)}
            />
          </FormSection>
          <Divider />
          <FormSection>
            <ButtonsContainer>
              <ModalButton
                onClick={onClose}
                background={theme.color.softPurple}
              >
                Cancel
              </ModalButton>
              <ModalButton
                onClick={handleSave}
                background={theme.color.darkGray}
              >
                Save To Locker
              </ModalButton>
            </ButtonsContainer>
          </FormSection>
        </ModalContent>
      </Modal>
    </ModalContainer>
  );
};

export default AddReviewModal;
