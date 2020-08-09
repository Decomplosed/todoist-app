import firebase from 'firebase/app';

const firebaseConfig = firebase.initializeApp({
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  storageBucket: '',
  messageSenderId: '',
  apiId: '',
});

export { firebaseConfig as firebase };
