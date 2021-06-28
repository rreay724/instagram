import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { seedDatabase } from "../seed";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "instagram-d4f8e.firebaseapp.com",
  projectId: "instagram-d4f8e",
  storageBucket: "instagram-d4f8e.appspot.com",
  messagingSenderId: "1045685515743",
  appId: "1:1045685515743:web:9160e075dfa1910531006a",
  measurementId: "G-TB5NPGV38H",
};
const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// call seed file (only once)
// seedDatabase(firebase);

export { firebase, FieldValue };
