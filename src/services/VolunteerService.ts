import { db } from 'helpers/firebase.module';
import { DTO } from 'types/DTO';
import moment from 'moment';
import { firestore } from 'firebase';

const limitContent = 5;

const getVolunteers = async (
  payload: DTO.User.Volunteer.GetVolunteersRequest,
) => {
  const volunteers: ENTITIES.Volunteer[] = [];

  const userRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('volunteer');

  const arrayLength = await (await userRef.get()).size;

  const volunteerCollection = await userRef
    .orderBy('date_end', 'desc')
    .limit(limitContent)
    .get();

  const lastQuery = volunteerCollection.docs[
    volunteerCollection.docs.length - 1
  ].get('date_end');

  volunteerCollection.forEach(doc => {
    volunteers.push({
      id: doc.id,
      ...doc.data(),
    } as ENTITIES.Volunteer);
  });
  return { volunteers, arrayLength, lastQuery };
};

const getMoreVolunteers = async (
  payload: DTO.User.Volunteer.GetMoreVolunteersRequest,
) => {
  const volunteers: ENTITIES.Volunteer[] = [];

  const userRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('volunteer');

  const volunteerCollection = await userRef
    .orderBy('date_end', 'desc')
    .startAfter(payload.lastQuery)
    .limit(limitContent)
    .get();

  const lastQuery = volunteerCollection.docs[
    volunteerCollection.docs.length - 1
  ].get('date_end');

  volunteerCollection.forEach(doc => {
    volunteers.push({
      id: doc.id,
      ...doc.data(),
    } as ENTITIES.Volunteer);
  });

  return { volunteers, lastQuery };
};

const addNewVolunteer = async (
  payload: DTO.User.Volunteer.AddNewVolunteerRequest,
) => {
  const userRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('volunteer');

  const volunteerCollection = await userRef.add({
    date_end: firestore.Timestamp.fromDate(
      moment.unix(payload.volunteer.date_end.seconds).toDate(),
    ),
    date_start: firestore.Timestamp.fromDate(
      moment.unix(payload.volunteer.date_start.seconds).toDate(),
    ),
    description: payload.volunteer.description,
    job_title: payload.volunteer.job_title,
    number_of_hours_served: payload.volunteer.number_of_hours_served,
    organization_address: payload.volunteer.organization_address,
    organization_name: payload.volunteer.organization_name,
  });
  return volunteerCollection;
};

const editVolunteer = async (
  payload: DTO.User.Volunteer.EditVolunteerRequest,
) => {
  const userRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('volunteer')
    .doc(payload.volunteer.id);

  const volunteerCollection = await userRef.set({
    date_end: firestore.Timestamp.fromDate(
      moment.unix(payload.volunteer.date_end.seconds).toDate(),
    ),
    date_start: firestore.Timestamp.fromDate(
      moment.unix(payload.volunteer.date_start.seconds).toDate(),
    ),
    description: payload.volunteer.description,
    job_title: payload.volunteer.job_title,
    number_of_hours_served: payload.volunteer.number_of_hours_served,
    organization_address: payload.volunteer.organization_address,
    organization_name: payload.volunteer.organization_name,
  });
  return volunteerCollection;
};

const deleteVolunteer = async (
  payload: DTO.User.Volunteer.DeleteVolunteerRequest,
) => {
  const volunteerCollection = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('volunteer')
    .doc(payload.id)
    .delete();
};

export {
  getVolunteers,
  getMoreVolunteers,
  addNewVolunteer,
  editVolunteer,
  deleteVolunteer,
};
