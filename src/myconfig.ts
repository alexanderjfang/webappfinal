// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjasFsux9DPcA9OIwgSiyNO5cwLZqANTE",
  authDomain: "webappfinal-c6673.firebaseapp.com",
  projectId: "webappfinal-c6673",
  storageBucket: "webappfinal-c6673.appspot.com",
  messagingSenderId: "192063874596",
  appId: "1:192063874596:web:a4bc6a327f67422d3adab1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {firebaseConfig}