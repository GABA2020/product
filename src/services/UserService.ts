import { db } from 'helpers/firebase.module';
import { DTO } from 'types/DTO';

const getUserProfile = async (email: string) => {
  const userRef = db.collection('member_data').doc(email);
  const userDoc = await userRef.get();
  return { email: userDoc.id, ...userDoc.data() };
};

const getGuestUserProfile = async (
  payload: DTO.User.GetGuestUserProfileCacheRequest,
) => {
  const userRef = await db.collection('member_data').doc(payload.email).get();
  return {
    email: userRef.id,
    ...userRef.data(),
  } as DTO.User.GetGuestUserProfileCacheResponse;
};

const searchUsers = async (payload: DTO.User.SearchUsersRequest) => {
  const listUser: ENTITIES.UserProfile[] = [];
  const userRef = await db
    .collection('member_data')
    .where('username', '>=', payload.text)
    .get();
  userRef.forEach(doc => {
    listUser.push({ email: doc.id, ...doc.data() } as ENTITIES.UserProfile);
  });
  return { listUser: listUser };
};

const getUserSearchProfile = async (
  payload: DTO.User.GetUserSearchProfileRequest,
) => {
  let profileUser;
  await db
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

const updateAbout = async (payload: DTO.User.UpdateAboutRequest) => {
  const userRef = await db.collection('member_data').doc(payload.email).update({
    about: payload.about,
  });
  return userRef;
};

export {
  getUserProfile,
  searchUsers,
  getUserSearchProfile,
  getGuestUserProfile,
  updateUserProfile,
  updateAbout,
};
