import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const BANCO = 'Final'

var firebaseConfig

// BANCO ASSET SENSE FINAL 
if (BANCO === 'Final') {
  firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_APIKEY,
    authDomain: import.meta.env.VITE_REACT_AUTHDOMAIN,
    projectId: import.meta.env.VITE_REACT_PROJECTID,
    storageBucket: import.meta.env.VITE_REACT_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_REACT_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_REACT_APPID,
    measurementId: import.meta.env.VITE_REACT_MEASUREMENTID,
  };
}



// BANCO TESTE
if (BANCO === 'Teste') {
  firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_TEST_APIKEY,
    authDomain: import.meta.env.VITE_REACT_TEST_AUTHDOMAIN,
    projectId: import.meta.env.VITE_REACT_TEST_PROJECTID,
    storageBucket: import.meta.env.VITE_REACT_TEST_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_REACT_TEST_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_REACT_TEST_APPID,
    measurementId: import.meta.env.VITE_REACT_TEST_MEASUREMENTID,
  };
}




const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);















