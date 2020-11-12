import { auth, db } from 'helpers/firebase.module';
// import {auth} from 'firebase/app';
export const reducer = state => {
  return {
    //Only curry functions:::::
    setUser: data => ({user: data}),
    login: user => ({
      user:user,
      isAuth:true,
    }),
    logout: () => {
      auth.signOut();
      return ({
        user:{},
        isAuth:false,
      })
    },
    changeShowMenu: (data) => ({showMenu:data}),
    set: (key, value) => ({[key]: value}),
  };
};

export const initialState = () => {
  return {
    isAuth: false,
    user: {},
    showMenu: false,
  };
};
