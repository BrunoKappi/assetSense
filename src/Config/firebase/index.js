import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


//TENANT E DATABASE
export const TenantName = "Serrano"
export const TenantId = '74caab78-2823-4f5a-9e6f-a9c25cf60285'
export const DatabaseName = "Dados"

//STORAGE
export const UsersPhotosDirectory = "UserProfilePhotos"
export const AssetsPhotosDirectory = "AssetProfilePhotos"

const BANCO = 'Final'

var firebaseConfig



// BANCO ASSET SENSE FINAL 
if (BANCO === 'Final') {
  firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_APIKEY ,
    authDomain: import.meta.env.VITE_REACT_AUTHDOMAIN ,
    projectId: import.meta.env.VITE_REACT_PROJECTID ,
    storageBucket: import.meta.env.VITE_REACT_STORAGEBUCKET ,
    messagingSenderId: import.meta.env.VITE_REACT_MESSAGINGSENDERID ,
    appId: import.meta.env.VITE_REACT_APPID ,
    measurementId: import.meta.env.VITE_REACT_MEASUREMENTID ,
  };
}



// BANCO TESTE
if (BANCO === 'Teste') {
  firebaseConfig = {
    apiKey: "AIzaSyBm_MtZ9IzdJrMX4I58P1ULB8VhvC14fa8",
    authDomain: "todoappredux-fbc26.firebaseapp.com",
    projectId: "todoappredux-fbc26",
    storageBucket: "todoappredux-fbc26.appspot.com",
    messagingSenderId: "847472896392",
    appId: "1:847472896392:web:e7e827a71fe46ec245723d",
    measurementId: "G-DBKTF9HLZQ"
  };
}


const app = initializeApp(firebaseConfig);

console.log(app)

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);















