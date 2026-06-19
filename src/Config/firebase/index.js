import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { env } from "../env";

const firebaseConfig = {
  apiKey: env.VITE_REACT_APIKEY,
  authDomain: env.VITE_REACT_AUTHDOMAIN,
  projectId: env.VITE_REACT_PROJECTID,
  storageBucket: env.VITE_REACT_STORAGEBUCKET,
  messagingSenderId: env.VITE_REACT_MESSAGINGSENDERID,
  appId: env.VITE_REACT_APPID,
  measurementId: env.VITE_REACT_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
