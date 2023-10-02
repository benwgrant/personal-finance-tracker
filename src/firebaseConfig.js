import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBWL0OXV0tRo77AU1jaC9IvReXcEYqKC6o",
  authDomain: "personal-finance-tracker.firebaseapp.com",
  projectId: "personal-finance-tracker-315",
  messagingSenderId: "368298008100",
  appId: "personal-finance-tracker-315"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };