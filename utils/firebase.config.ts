// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDG7i2wfD8q7eu40jl5-_LA7OTRcw46tLk",
	authDomain: "onionwatch-a9a56.firebaseapp.com",
	databaseURL: "https://onionwatch-a9a56-default-rtdb.firebaseio.com",
	projectId: "onionwatch-a9a56",
	storageBucket: "onionwatch-a9a56.firebasestorage.app",
	messagingSenderId: "388063519158",
	appId: "1:388063519158:web:c6e5d99f24bee30d446117",
	measurementId: "G-VFE0XXL7XF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
