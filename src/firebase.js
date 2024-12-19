// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDpZbyy5byA5hmtoiWXyJV72NGlpmRFq0U",
	authDomain: "tic-tac-toe-73d1e.firebaseapp.com",
	projectId: "tic-tac-toe-73d1e",
	storageBucket: "tic-tac-toe-73d1e.firebasestorage.app",
	messagingSenderId: "521405681926",
	appId: "1:521405681926:web:b48f4f8498709f140fce87",
	measurementId: "G-987X42FN8W"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// initialize services
const auth = getAuth();

const createUser = async (name, email, password) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
	} catch (e) {
		console.log("Error, could not create account");
		console.log(e);
	}
};

const signIn = async (email, password) => {
	try {
		const res = await signInWithEmailAndPassword(auth, email, password);
		return true;
	} catch (e) {
		console.log("Error, unable to sign in.");
		console.log(e);
		return false;
	}
};

export { auth, createUser, signIn };
