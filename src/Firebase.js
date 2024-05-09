// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjslUyaamr24jrVaivDdKT7MzF_myNyzs",
  authDomain: "podcast-app-react01.firebaseapp.com",
  projectId: "podcast-app-react01",
  storageBucket: "podcast-app-react01.appspot.com",
  messagingSenderId: "81358321768",
  appId: "1:81358321768:web:0d71f6baeb84b30292e3dd",
  measurementId: "G-B12K2R4X4F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
export {auth, db, storage};