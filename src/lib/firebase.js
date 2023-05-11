// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator, signInWithPopup } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { getStorage, connectStorageEmulator } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcaUgw8JS31ChFq4hUtas2hckt-qRb91o",
  authDomain: "ekuri-qrbook.firebaseapp.com",
  projectId: "ekuri-qrbook",
  storageBucket: "ekuri-qrbook.appspot.com",
  messagingSenderId: "969483635137",
  appId: "1:969483635137:web:68a56ebc3c5b1eb3420740",
  measurementId: "G-GK1W6EW4EB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const functions = getFunctions(app, "europe-west1");
export const firestore = getFirestore(app);
export const storage = getStorage(app);

if (location.hostname === "localhost") {
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
    connectFunctionsEmulator(functions, "127.0.0.1", 5001);
    connectFirestoreEmulator(firestore, "127.0.0.1", 8080);
    connectStorageEmulator(storage, "127.0.0.1", 9199);
}

import { GoogleAuthProvider } from "firebase/auth";
import { writable } from "svelte/store";

export const provider = new GoogleAuthProvider();

export function logIn() {
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    console.log(user);
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    console.error(errorCode, errorMessage);
  });
}

export const user = writable(auth.currentUser);

auth.onAuthStateChanged((u) => {
  user.set(u);
  console.log(u);
})
