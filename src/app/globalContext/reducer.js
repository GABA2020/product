import { auth } from 'helpers/firebase.module';
export const reducer = () => {
  return {
    //Only curry functions:::::
    setUser: data => ({ user: data }),
    login: user => {
      const userDataHasura = user?.userDataHasura
      const userData = {
        ...user?.userFirestore,
        ...user?.userAccount
      };
      return ({
        user: userData,
        isAuth: true,
        userWorks: userDataHasura?.works,
        userVolunteers: userDataHasura?.volunteers,
        userSchools: userDataHasura?.schools,
        userResearchs: userDataHasura?.researchs,
        userLetters: userDataHasura?.letters
      })
    },
    logout: () => {
      auth.signOut();
      return ({
        user: {},
        isAuth: false,
      })
    },
    setUser: (data) => ({ user: data }),
    changeShowMenu: (data) => ({ showMenu: data }),
    setUserWorwks: (data) => ({ userWorks: data }),
    setUserVolunteers: (data) => ({ userVolunteers: data }),
    setUserSchools: (data) => ({ userSchools: data }),
    setUserResearchs: (data) => ({ userResearchs: data }),
    setUserLetters: (data) => ({ userLetters: data }),
    set: (key, value) => ({ [key]: value }),
  };
};

export const initialState = () => {
  return {
    isAuth: false,
    user: {},
    showMenu: false,
    userWorks: [],
    userVolunteers: [],
    userSchools: [],
    userResearchs: [],
    userLetters: []
  };
};
