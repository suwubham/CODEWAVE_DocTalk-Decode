// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrvJWkaZjpaX9dMuE9dFPZ3F7ps1vlbp0",
  authDomain: "codewave-hackathon.firebaseapp.com",
  projectId: "codewave-hackathon",
  storageBucket: "codewave-hackathon.appspot.com",
  messagingSenderId: "373070727094",
  appId: "1:373070727094:web:2eac21fc3754cab2466317",
  measurementId: "G-PB4WPK1M6K",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
