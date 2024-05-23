import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@fortawesome/fontawesome-free/css/all.css';
import store from './store';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCyzFpJ3NvvS0nAY7kFj-6V2TwPEWxqRgE",
  authDomain: "projeto-front-end-1.firebaseapp.com",
  projectId: "projeto-front-end-1",
  storageBucket: "projeto-front-end-1.appspot.com",
  messagingSenderId: "448972342245",
  appId: "1:448972342245:web:0513b33868522ffc52e50c",
  measurementId: "G-NKJ0X4ST3T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

createApp(App).use(store).use(router).mount('#app');

export { db, auth };