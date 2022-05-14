import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCm2-vBF_Nj-jkLH_PsHVQBxARfwm2379Q",
  authDomain: "betablog-9c10a.firebaseapp.com",
  projectId: "betablog-9c10a",
  storageBucket: "betablog-9c10a.appspot.com",
  messagingSenderId: "489934495566",
  appId: "1:489934495566:web:283eace4748b85351f881f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);