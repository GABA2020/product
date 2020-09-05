import { db } from 'helpers/firebase.module';
import { DTO } from 'types/DTO';
import moment from 'moment';
import { firestore } from 'firebase';

const limitContent = 5;

const getWorkExperiences = async (
  payload: DTO.User.WorkExperience.GetWorkExperiencesRequest,
) => {
  const workExperiences: ENTITIES.WorkExperience[] = [];

  const userRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('work');

  const arrayLength = await (await userRef.get()).size;

  const workCollection = await userRef
    .orderBy('date_end', 'desc')
    .limit(limitContent)
    .get();

  const lastQuery = workCollection.docs[workCollection.docs.length - 1].get(
    'date_end',
  );

  workCollection.forEach(doc => {
    workExperiences.push({
      id: doc.id,
      ...doc.data(),
    } as ENTITIES.WorkExperience);
  });
  return { workExperiences, arrayLength, lastQuery };
};

const getAllWorkExperiences = async (
  payload: DTO.User.WorkExperience.GetAllWorkExperiencesRequest,
) => {
  const workExperiences: ENTITIES.WorkExperience[] = [];

  const userRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('work');

  const workCollection = await userRef.orderBy('date_end', 'desc').get();

  workCollection.forEach(doc => {
    workExperiences.push({
      id: doc.id,
      ...doc.data(),
    } as ENTITIES.WorkExperience);
  });
  return { workExperiences };
};

const getMoreWorkExperiences = async (
  payload: DTO.User.WorkExperience.GetMoreWorkExperiencesRequest,
) => {
  const workExperiences: ENTITIES.WorkExperience[] = [];

  const userRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('work');

  const workCollection = await userRef
    .orderBy('date_end', 'desc')
    .startAfter(payload.lastQuery)
    .limit(limitContent)
    .get();
  const lastQuery = workCollection.docs[workCollection.docs.length - 1].get(
    'date_end',
  );

  workCollection.forEach(doc => {
    workExperiences.push({
      id: doc.id,
      ...doc.data(),
    } as ENTITIES.WorkExperience);
  });
  return { workExperiences, lastQuery };
};

const addNewWorkExperience = async (
  payload: DTO.User.WorkExperience.AddNewWorkExperiencesRequest,
) => {
  const workCollection = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('work')
    .add({
      company: payload.workExperience.company,
      company_address: payload.workExperience.company_address,
      date_end: firestore.Timestamp.fromDate(
        moment.unix(payload.workExperience.date_end.seconds).toDate(),
      ),
      date_start: firestore.Timestamp.fromDate(
        moment.unix(payload.workExperience.date_start.seconds).toDate(),
      ),
      description: payload.workExperience.description,
      job_title: payload.workExperience.job_title,
    });
};

const editWorkExperience = async (
  payload: DTO.User.WorkExperience.EditWorkExperiencesRequest,
) => {
  const workCollection = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('work')
    .doc(payload.workExperience.id)
    .set({
      company: payload.workExperience.company,
      company_address: payload.workExperience.company_address,
      date_end: firestore.Timestamp.fromDate(
        moment.unix(payload.workExperience.date_end.seconds).toDate(),
      ),
      date_start: firestore.Timestamp.fromDate(
        moment.unix(payload.workExperience.date_start.seconds).toDate(),
      ),
      description: payload.workExperience.description,
      job_title: payload.workExperience.job_title,
    });
};

const deleteWorkExperience = async (
  payload: DTO.User.WorkExperience.DeleteWorkExperiencesRequest,
) => {
  const workCollection = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('work')
    .doc(payload.id)
    .delete();
};

export {
  getWorkExperiences,
  getAllWorkExperiences,
  getMoreWorkExperiences,
  addNewWorkExperience,
  editWorkExperience,
  deleteWorkExperience,
};
