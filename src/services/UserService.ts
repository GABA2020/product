import { db, storageAvatar } from 'helpers/firebase.module';
import { DTO } from 'types/DTO';

const getUserProfile = async (email: string) => {
  const userRef = db.collection('member_data').doc(email);
  const userDoc = await userRef.get();
  return { email: userDoc.id, ...userDoc.data() };
};

const searchUsers = async (payload: DTO.User.SearchUsersRequest) => {
  const listUser: ENTITIES.UserProfile[] = [];
  const userRef = await db
    .collection('member_data')
    .where('name', '>=', payload.text)
    .get();
  const userCollection = userRef.forEach(doc => {
    listUser.push({ email: doc.id, ...doc.data() } as ENTITIES.UserProfile);
  });
  return { listUser: listUser };
};

const getUserSearchProfile = async (
  payload: DTO.User.GetUserSearchProfileRequest,
) => {
  let profileUser;
  const userRef = await db
    .collection('member_data')
    .where('username', '==', payload.username)
    .get()
    .then(queryDocs => {
      queryDocs.forEach(docItem => {
        profileUser = {
          email: docItem.id,
          ...docItem.data(),
        } as ENTITIES.UserProfile;
      });
    });
  return profileUser;
};

const updateUserProfile = async (
  payload: DTO.User.UpdateUserProfileRequest,
) => {
  const userRef = await db
    .collection('member_data')
    .doc(payload.userProfile.email)
    .set({
      ...payload.userProfile,
    });
  return userRef;
};

// work
const getWorkExperiences = async (
  payload: DTO.User.GetWorkExperiencesRequest,
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
  payload: DTO.User.AddNewWorkExperiencesRequest,
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
  payload: DTO.User.EditWorkExperiencesRequest,
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
  payload: DTO.User.DeleteWorkExperiencesRequest,
) => {
  const workCollection = await db
    .collection('member_data')
    .doc(payload.email)
    .collection('work')
    .doc(payload.id)
    .delete();
};
// end work

const getEducations = async (payload: DTO.User.GetEducationsRequest) => {
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
export {
  getUserProfile,
  searchUsers,
  getUserSearchProfile,
  getWorkExperiences,
  getEducations,
  addNewWorkExperience,
  editWorkExperience,
  deleteWorkExperience,
  updateUserProfile,
};
