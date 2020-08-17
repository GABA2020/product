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

export { getUserProfile, searchUsers, getUserSearchProfile, updateUserProfile };
