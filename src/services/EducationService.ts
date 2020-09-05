import { db } from 'helpers/firebase.module';
import { DTO } from 'types/DTO';
import moment from 'moment';
import { firestore } from 'firebase';

const limitContent = 5;

const getEducations = async (
  payload: DTO.User.Education.GetEducationsRequest,
) => {
  const educations: ENTITIES.Education[] = [];

  const userRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('education');

  const arrayLength = await (await userRef.get()).size;

  const educationCollection = await userRef
    .orderBy('date_end', 'desc')
    .limit(limitContent)
    .get();

  const lastQuery = educationCollection.docs[
    educationCollection.docs.length - 1
  ].get('date_end');

  educationCollection.forEach(doc => {
    educations.push({
      id: doc.id,
      ...doc.data(),
    } as ENTITIES.Education);
  });
  return { educations, lastQuery, arrayLength };
};

const getAllEducations = async (
  payload: DTO.User.Education.GetAllEducationsRequest,
) => {
  const educations: ENTITIES.Education[] = [];

  const userRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('education');

  const educationCollection = await userRef.orderBy('date_end', 'desc').get();

  educationCollection.forEach(doc => {
    educations.push({
      id: doc.id,
      ...doc.data(),
    } as ENTITIES.Education);
  });
  return { educations } as DTO.User.Education.GetAllEducationsResponse;
};

const getMoreEducations = async (
  payload: DTO.User.Education.GetMoreEducationsRequest,
) => {
  const educations: ENTITIES.Education[] = [];

  const userRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('education');

  const educationCollection = await userRef
    .orderBy('date_end', 'desc')
    .startAfter(payload.lastQuery)
    .limit(limitContent)
    .get();

  const lastQuery = educationCollection.docs[
    educationCollection.docs.length - 1
  ].get('date_end');

  educationCollection.forEach(doc => {
    educations.push({
      id: doc.id,
      ...doc.data(),
    } as ENTITIES.Education);
  });
  return { educations, lastQuery };
};

const addNewEducation = async (
  payload: DTO.User.Education.AddNewEducationRequest,
) => {
  const userRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('education');

  const educationCollection = await userRef.add({
    school: payload.education.school,
    school_address: payload.education.school_address,
    degree_type: payload.education.degree_type,
    major: payload.education.major,
    honors: payload.education.honors,
    date_end: firestore.Timestamp.fromDate(
      moment.unix(payload.education.date_end.seconds).toDate(),
    ),
    date_start: firestore.Timestamp.fromDate(
      moment.unix(payload.education.date_start.seconds).toDate(),
    ),
  });
  return educationCollection;
};

const editEducation = async (
  payload: DTO.User.Education.EditEducationRequest,
) => {
  const userRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('education')
    .doc(payload.education.id);

  const educationCollection = await userRef.set({
    school: payload.education.school,
    school_address: payload.education.school_address,
    degree_type: payload.education.degree_type,
    major: payload.education.major,
    honors: payload.education.honors,
    date_end: firestore.Timestamp.fromDate(
      moment.unix(payload.education.date_end.seconds).toDate(),
    ),
    date_start: firestore.Timestamp.fromDate(
      moment.unix(payload.education.date_start.seconds).toDate(),
    ),
  });
  return educationCollection;
};

const deleteEducation = async (
  payload: DTO.User.WorkExperience.DeleteWorkExperiencesRequest,
) => {
  await db
    .collection('member_data')
    .doc(payload.email)
    .collection('education')
    .doc(payload.id)
    .delete();
};

export {
  getEducations,
  getAllEducations,
  getMoreEducations,
  addNewEducation,
  editEducation,
  deleteEducation,
};
