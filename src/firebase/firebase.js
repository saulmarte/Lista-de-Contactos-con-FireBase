import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database'
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAq0s42Kafw3iCNJCiJwR8jLDBdH6-_0jI",
    authDomain: "react-crud-with-login-app.firebaseapp.com",
    projectId: "react-crud-with-login-app",
    storageBucket: "react-crud-with-login-app.appspot.com",
    messagingSenderId: "902294049057",
    appId: "1:902294049057:web:02bfbc93730d5c9a692e60"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
const analytics = getAnalytics(app);
