import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, } from "firebase/auth";
import { auth } from "./index";
import { sendPasswordResetEmail, updatePassword } from "firebase/auth";
import { DefaultLoggedUser } from "../../GlobalVars";
import { GetLoggedUserInfo, SetCheckLoginOnStore, SetLoggedUserOnStore, SetTema, SetTenant } from "../../Functions/StoreMiddleware";

import { FillStore } from "../store/store";
import { FIREBASE_GetUserByEmail } from "./metodos2";




const onAuthStateChangedHandler = (currentUser) => {
  console.log("AUTHCHANGED", currentUser ? currentUser : 'VAZIO');

  const LoggedUserEmail = GetLoggedUserInfo('Email')
  const CurrentUserEmail = currentUser?.email


  if (((LoggedUserEmail === CurrentUserEmail) || (!LoggedUserEmail)) && currentUser) {

    SetLoggedUserOnStore(
      {
        ...DefaultLoggedUser,
        Email: currentUser.email,
        uid: currentUser.uid,
        CurrentSidebarTab: 'Dash'
      }
    )



    const Tenant = window.location.pathname.split("/")[1]

    FIREBASE_GetUserByEmail("Users", currentUser.email, Tenant).then((message) => {
      const currentUser = { ...message[0] }
      const Theme = currentUser?.Preference?.Theme || 'Claro'
      const Tenant = currentUser?.Tenant?.Name || ''
      //console.log("AUTH", window.location.pathname, Tenant)
      SetTema(Theme)
      SetTenant(Tenant).then(() => {
        FillStore()
      })
    })




  } else {
    if (!CurrentUserEmail) {
      SetLoggedUserOnStore(DefaultLoggedUser)
      SetTenant('').then(() => {
        console.log("Tenant ")
      })
    }

  }

  if (GetLoggedUserInfo('CheckedLogin') === false)
    setTimeout(() => {
      SetCheckLoginOnStore()
    }, 5);







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


