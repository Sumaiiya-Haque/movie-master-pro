// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAU_8QJHhcI03uNogXWtQkfyOybPYvnDIc",
  authDomain: "movie-master-936ba.firebaseapp.com",
  projectId: "movie-master-936ba",
  storageBucket: "movie-master-936ba.firebasestorage.app",
  messagingSenderId: "879354141330",
  appId: "1:879354141330:web:267572eac1056d39a7244b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
 export const auth = getAuth(app);