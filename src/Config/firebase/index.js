import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAokGdM7586Mv3MceiP5to3ur4WLDi9QNQ",
  authDomain: "assetsense.firebaseapp.com",
  projectId: "assetsense",
  storageBucket: "assetsense.appspot.com",
  messagingSenderid: "713222303683",
  appid: "1:713222303683:web:c89b06adaefafdb4261776",
  measurementid: "G-2ZY0BXZYH6"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);















