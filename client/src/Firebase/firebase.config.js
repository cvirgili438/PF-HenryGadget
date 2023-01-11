import { initializeApp ,getApps , getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB7HAPehoiR0eCvugPPvUoAN9e7_SAXYlI",
    authDomain: "henrygadget-67a4a.firebaseapp.com",
    projectId: "henrygadget-67a4a",
    storageBucket: "henrygadget-67a4a.appspot.com",
    messagingSenderId: "1079914917493",
    appId: "1:1079914917493:web:4b9e7b84d7b47e3841d23c",
    measurementId: "G-4J51MTNZ3F"
  };

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app)
const analytics = getAnalytics(app);

export {app, storage , analytics} ;