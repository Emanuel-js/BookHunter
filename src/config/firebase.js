// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLzk_Iwwa5BXOidaoAIT8exfy0jwAfvXs",
  authDomain: "bookhunter-edf43.firebaseapp.com",
  projectId: "bookhunter-edf43",
  storageBucket: "bookhunter-edf43.appspot.com",
  messagingSenderId: "952682867896",
  appId: "1:952682867896:web:ddc1e825fcd8d3e9ee584d",
  measurementId: "G-YHWJVSJYKY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);