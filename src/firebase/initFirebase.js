import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB5IXHxdwNnQ4gt2ohknERijypPG0aVirk",
    authDomain: "sws-app-31e68.firebaseapp.com",
    projectId: "sws-app-31e68",
    storageBucket: "sws-app-31e68.appspot.com",
    messagingSenderId: "804682152917",
    appId: "1:804682152917:web:d718740a499efeb7269b5c",
    measurementId: "G-2GE77YH4BZ"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth();

export { auth, db };