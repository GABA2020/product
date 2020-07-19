import { auth, db } from 'helpers/firebase.module';
import { DTO } from '../types/DTO';

const login = async (payload: DTO.Auth.LoginRequest) => {
  const response = await auth.signInWithEmailAndPassword(
    payload.email,
    payload.password,
  );
  if (response.user) {
    const memberCollection = await db
      .collection('member_data')
      .doc(payload.email)
      .get();
    const user: DTO.Auth.LoginResponse = memberCollection.data() as DTO.Auth.LoginResponse;
    return user;
  }
  return null;
};

const logout = async () => {
  const response = await auth.signOut();
  return response;
};

export { login, logout };
