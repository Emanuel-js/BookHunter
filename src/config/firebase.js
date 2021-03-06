import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
	apiKey: "AIzaSyCLzk_Iwwa5BXOidaoAIT8exfy0jwAfvXs",
	authDomain: "bookhunter-edf43.firebaseapp.com",
	projectId: "bookhunter-edf43",
	storageBucket: "bookhunter-edf43.appspot.com",
	messagingSenderId: "952682867896",
	appId: "1:952682867896:web:ddc1e825fcd8d3e9ee584d",
	measurementId: "G-YHWJVSJYKY",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
