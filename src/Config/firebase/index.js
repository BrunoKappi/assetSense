import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

var firebaseConfig
 
const BANCO = 'Final'

// BANCO ASSET SENSE FINAL 
if (BANCO === 'Final') {
  firebaseConfig = {
    apiKey: "AIzaSyAokGdM7586Mv3MceiP5to3ur4WLDi9QNQ",
    authDomain: "assetsense.firebaseapp.com",
    projectId: "assetsense",
    storageBucket: "assetsense.appspot.com",
    messagingSenderId: "713222303683",
    appId: "1:713222303683:web:c89b06adaefafdb4261776",
    measurementId: "G-2ZY0BXZYH6" 
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
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);















