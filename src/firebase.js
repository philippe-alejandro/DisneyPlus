import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  // your firebase config here
  apiKey: "AIzaSyDzhVceb30ETAjVHAUtu6tIg6--tCtRFzA",
  authDomain: "disneyplus-clone-35f68.firebaseapp.com",
  projectId: "disneyplus-clone-35f68",
  storageBucket: "disneyplus-clone-35f68.appspot.com",
  messagingSenderId: "494084426157",
  appId: "1:494084426157:web:f8d899063992a5223e3924",
  measurementId: "G-9BBHZ1TRDH"
  
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage, provider };