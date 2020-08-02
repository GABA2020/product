import { db } from 'helpers/firebase.module';
import { DTO } from 'types/DTO';

const getWorkExperiences = async (
  payload: DTO.User.WorkExperience.GetWorkExperiencesRequest,
) => {
  const workExperiences: ENTITIES.WorkExperience[] = [];

  const userRef = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('work');
  const workCollection = await userRef.get();
  workCollection.forEach(doc => {
    workExperiences.push({
      id: doc.id,
      ...doc.data(),
    } as ENTITIES.WorkExperience);
  });
  return { workExperiences: workExperiences };
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
      date_end: payload.workExperience.date_end,
      date_start: payload.workExperience.date_start,
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
      date_end: payload.workExperience.date_end,
      date_start: payload.workExperience.date_start,
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
  addNewWorkExperience,
  editWorkExperience,
  deleteWorkExperience,
};
