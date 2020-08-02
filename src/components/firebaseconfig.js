import firebase from "firebase";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyB1Z4MNpAJjVLWSOUy8X8ShmTWJPuPUf68",
  authDomain: "phunt-65bf6.firebaseapp.com",
  databaseURL: "https://phunt-65bf6.firebaseio.com",
  projectId: "phunt-65bf6",
  storageBucket: "phunt-65bf6.appspot.com",
  messagingSenderId: "1067364011577",
  appId: "1:1067364011577:web:ddbd95134948d40bacc7e8",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
