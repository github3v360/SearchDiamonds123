// firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA3YaHDs3eFVwttZR_1jfnu7oGU6kzdAVQ",
    authDomain: "searchdiamonds-2b5c8.firebaseapp.com",
    projectId: "searchdiamonds-2b5c8",
    storageBucket: "searchdiamonds-2b5c8.appspot.com",
    messagingSenderId: "1066323327694",
    appId: "1:1066323327694:web:49f95c7e21a9c0b7416e9f"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export {firebase,db};
