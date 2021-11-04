import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
} from "firebase/auth";

const AuthContext = createContext({
	currentUser: null,
	signInWithGoogle: () => Promise,

	login: () => Promise,
	register: () => Promise,
	logout: () => Promise,
});
export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user ? user : null);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	function register(email, password, name, profile) {
		return createUserWithEmailAndPassword(auth, email, password).then(
			(userCredential) => {
				const user = userCredential.user;
				user.displayName = name;
				user.photoURL = profile;
			}
		);
	}

	function logout() {
		return signOut(auth);
	}

	function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		return signInWithPopup(auth, provider)
			.then(() => {})
			.catch((err) => {
				console.error(err);
			});
	}

	const value = {
		currentUser,
		signInWithGoogle,
		login,
		register,
		logout,
	};
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
