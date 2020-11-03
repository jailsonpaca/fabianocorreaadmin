import { FirebaseAuthProvider, FirebaseDataProvider } from 'react-admin-firebase';
import firebase from '@firebase/app';
import '@firebase/storage';

const config = {
  apiKey: "AIzaSyCIRPDLxH1rNPmlx1v9sjE3fj_tgWr0wPg",
  authDomain: "fabianocorreasite.firebaseapp.com",
  databaseURL: "https://fabianocorreasite.firebaseio.com",
  projectId: "fabianocorreasite",
  storageBucket: "fabianocorreasite.appspot.com",
  messagingSenderId: "1071618794884",
  appId: "1:1071618794884:web:0613f01ff7dce6ffe769d1",
  measurementId: "G-R0356LDYXJ"
};

const options = {
  logging: true,
};

export const dataProvider = FirebaseDataProvider(config, options);
export const authProvider = FirebaseAuthProvider(config, options);
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const storage = firebase.storage();
export {
  storage, firebase as default
}