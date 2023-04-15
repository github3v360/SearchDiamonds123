import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import firebase from 'firebase';
import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: "AIzaSyA3YaHDs3eFVwttZR_1jfnu7oGU6kzdAVQ",
  authDomain: "searchdiamonds-2b5c8.firebaseapp.com",
  projectId: "searchdiamonds-2b5c8",
  storageBucket: "searchdiamonds-2b5c8.appspot.com",
  messagingSenderId: "1066323327694",
  appId: "1:1066323327694:web:49f95c7e21a9c0b7416e9f"
};

firebase.initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
