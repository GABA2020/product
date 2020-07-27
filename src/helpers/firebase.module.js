import * as firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_GOOGLE_API_FIREBASE_ID,
  authDomain: process.env.REACT_APP_GOOGLE_API_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_GOOGLE_API_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_GOOGLE_API_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_GOOGLE_API_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.REACT_APP_GOOGLE_API_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_GOOGLE_API_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_GOOGLE_API_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(config);

const auth = firebase.auth();
const db = firebase.firestore();
const storageAvatar = async name => {
  return await firebase.storage().ref('avatar').child(name);
};

export { auth, db, storageAvatar };
