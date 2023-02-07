import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATRtQGeI4pL7j-a3URxykLq9m8LHjqcyk",
  authDomain: "seagon-ru.firebaseapp.com",
  projectId: "seagon-ru",
  storageBucket: "seagon-ru.appspot.com",
  messagingSenderId: "1030486913511",
  appId: "1:1030486913511:web:11b082bb5073fb503b0d42",
};

{
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
