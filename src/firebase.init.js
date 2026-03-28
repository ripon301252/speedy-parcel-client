// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPSmk2xD0lGe5HgPHeH-jv_05enUkDCFg",
  authDomain: "speedy-parcel.firebaseapp.com",
  projectId: "speedy-parcel",
  storageBucket: "speedy-parcel.firebasestorage.app",
  messagingSenderId: "435142935594",
  appId: "1:435142935594:web:d6d61ecaaaf5b90d47ef53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);