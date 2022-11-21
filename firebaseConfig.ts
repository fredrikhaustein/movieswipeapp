// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3ibxTliCHN_DFbnrxctxJRMbbZVfm6-4",
  authDomain: "movieswipeapp-25e73.firebaseapp.com",
  projectId: "movieswipeapp-25e73",
  storageBucket: "movieswipeapp-25e73.appspot.com",
  messagingSenderId: "60713919340",
  appId: "1:60713919340:web:57d02f624bb728dbc2c949"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)
