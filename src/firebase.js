// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDXL-UBB-C6l9s7_A5yNf6p82iCmcplhfo",
  authDomain: "aitc-silchar.firebaseapp.com",
  databaseURL: "https://aitc-silchar-default-rtdb.firebaseio.com",
  projectId: "aitc-silchar",
  storageBucket: "aitc-silchar.appspot.com",
  messagingSenderId: "171795590201",
  appId: "1:171795590201:web:62e3c18c92e96ae3fab1e8"
};
// Initialize Firebase
const app =firebase.initializeApp(firebaseConfig);

const db = app.firestore();
export const databaseMode = "test"
export default db;