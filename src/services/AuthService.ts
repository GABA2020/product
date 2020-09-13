import { auth, db } from 'helpers/firebase.module';
import { DTO } from '../types/DTO';

const login = async (payload: DTO.Auth.LoginRequest) => {
  const response = await auth.signInWithEmailAndPassword(
    payload.email,
    payload.password,
  );
  if (response.user) {
    const memberRef = await db
      .collection('member_data')
      .doc(payload.email)
      .get();
    const user: DTO.Auth.LoginResponse = memberRef.data() as DTO.Auth.LoginResponse;
    return user;
  }
  return null;
};

const logout = async () => {
  const response = await auth.signOut();
  return response;
};

const updateLastLogin = async (payload: DTO.Auth.LoginRequest) => {
  var today = new Date();
  var todayString: string;
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  todayString = yyyy + '-' + mm + '-' + dd;

  const response = await db
      .collection('member_data')
      .doc(payload.email)
      .update({last_login: todayString});
  return response;
};

export { login, logout, updateLastLogin };
