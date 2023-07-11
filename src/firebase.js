import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import firebase from "firebase/compat/app"; // Import the necessary Firebase modules
import "firebase/compat/firestore"; // Import Firestore module

const firebaseConfig = {
  apiKey: "AIzaSyBuR-LPND9F9J3ee6-0oh1oBMO-A2OsC-I",
  authDomain: "f-c-m-5e0c0.firebaseapp.com",
  projectId: "f-c-m-5e0c0",
  storageBucket: "f-c-m-5e0c0.appspot.com",
  messagingSenderId: "992376867117",
  appId: "1:992376867117:web:6838f3d41595723fda6ba4"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Initialize Firestore
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { app, messaging, db };

