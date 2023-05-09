import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, } from "firebase/auth";
import { auth } from "./index";
import { sendPasswordResetEmail, updatePassword } from "firebase/auth";
import { DefaultLoggedUser } from "../../GlobalVars";
import { SetLoggedUserOnStore } from "../../Functions/StoreMiddleware";





const onAuthStateChangedHandler = (AuthCurrentUser) => {
  //console.log("AUTHCHANGED", AuthCurrentUser ? AuthCurrentUser : 'VAZIO');

  SetLoggedUserOnStore(
    {
      ...DefaultLoggedUser,
      Email: AuthCurrentUser?.email || '',
      uid: AuthCurrentUser?.uid || '',
      CurrentSidebarTab: AuthCurrentUser?.email ? 'Dash' : 'Login',
      CheckedLogin: true
    }
  )
}



export const unsubscribe = onAuthStateChanged(auth, onAuthStateChangedHandler)

export const mudarSenha = async (novaSenha) => {
  return updatePassword(auth.currentUser, novaSenha)
}


export const FIREBASE_SendEMailResetPassword = async (email) => {
  return sendPasswordResetEmail(auth, email)
};

export const FIREBASE_RegisterUserAuth = async (email) => {
  return createUserWithEmailAndPassword(auth, email, email)
};



export const FIREBASE_LoginAuth = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const FIREBASE_LogouyAuth = async () => {
  await signOut(auth);
};


