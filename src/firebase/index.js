import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDX7gfC_guMeEA_Lg0s3gjxa2EptHvsYe4",
  authDomain: "library-app-78592.firebaseapp.com",
  projectId: "library-app-78592",
  storageBucket: "library-app-78592.appspot.com",
  messagingSenderId: "35027223315",
  appId: "1:35027223315:web:e502b6b2338750b72c10e6",
  measurementId: "G-PCTC367GJN",
};
const App = initializeApp(firebaseConfig);

let auth = getAuth(App);
let database = getFirestore(App);
let storage = getStorage(App);

export { database, auth ,storage};
