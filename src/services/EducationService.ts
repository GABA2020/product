import { db } from 'helpers/firebase.module';
import { DTO } from 'types/DTO';

const getEducations = async (
  payload: DTO.User.Education.GetEducationsRequest,
) => {
  const educations: ENTITIES.Education[] = [];

  const userRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('education');
  const educationCollection = await userRef.get();
  educationCollection.forEach(doc => {
    educations.push({
      id: doc.id,
      ...doc.data(),
    } as ENTITIES.Education);
  });
  return { educations: educations };
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
    date_end: payload.education.date_end,
    date_start: payload.education.date_start,
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
    date_end: payload.education.date_end,
    date_start: payload.education.date_start,
  });
  return educationCollection;
};

const deleteEducation = async (
  payload: DTO.User.WorkExperience.DeleteWorkExperiencesRequest,
) => {
  const workCollection = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('education')
    .doc(payload.id)
    .delete();
};

export { getEducations, addNewEducation, editEducation, deleteEducation };
