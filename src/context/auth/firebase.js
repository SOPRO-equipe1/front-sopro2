// src/context/auth/firebase.js

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA5jsj8XYKxbEGXQNtPxV1BtcLG_FdsIAM",
  authDomain: "sopro-66d25.firebaseapp.com",
  projectId: "sopro-66d25",
  storageBucket: "sopro-66d25.firebasestorage.app",
  messagingSenderId: "557167722130",
  appId: "1:557167722130:web:ed27644bfe6056f618b04b",
  measurementId: "G-S71CZF3GYF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider('apple.com');

export { auth, googleProvider, appleProvider };
export default app;
