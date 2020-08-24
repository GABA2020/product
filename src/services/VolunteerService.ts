import { db } from 'helpers/firebase.module';
import { DTO } from 'types/DTO';

const getVolunteers = async (
  payload: DTO.User.Volunteer.GetVolunteersRequest,
) => {
  const volunteers: ENTITIES.Volunteer[] = [];

  const userRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('volunteer');
  const volunteerCollection = await userRef.get();
  volunteerCollection.forEach(doc => {
    volunteers.push({
      id: doc.id,
      ...doc.data(),
    } as ENTITIES.Volunteer);
  });
  return { volunteers: volunteers };
};

const addNewVolunteer = async (
  payload: DTO.User.Volunteer.AddNewVolunteerRequest,
) => {
  const userRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('volunteer');

  const volunteerCollection = await userRef.add({
    date_end: payload.volunteer.date_end,
    date_start: payload.volunteer.date_start,
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
    date_end: payload.volunteer.date_end,
    date_start: payload.volunteer.date_start,
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

export { getVolunteers, addNewVolunteer, editVolunteer, deleteVolunteer };
