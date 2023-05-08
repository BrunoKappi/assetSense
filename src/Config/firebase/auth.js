import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, } from "firebase/auth";
import { auth } from "./index";
import { sendPasswordResetEmail, updatePassword } from "firebase/auth";
import { DefaultLoggedUser } from "../../GlobalVars";
import { GetLoggedUserInfo, SetCheckLoginOnStore, SetCurrentUserOnStore, SetLoggedUserOnStore, SetTema, SetTenant } from "../../Functions/StoreMiddleware";

import { FillStore } from "../store/store";
import { FIREBASE_GetUserByEmail } from "./metodos2";




const onAuthStateChangedHandler = (AuthCurrentUser) => {
  console.log("AUTHCHANGED", AuthCurrentUser ? AuthCurrentUser : 'VAZIO');

  const LoggedUserEmail = GetLoggedUserInfo('Email')
  const CurrentUserEmail = AuthCurrentUser?.email


  if (((LoggedUserEmail === CurrentUserEmail) || (!LoggedUserEmail)) && AuthCurrentUser) {

    SetLoggedUserOnStore(
      {
        ...DefaultLoggedUser,
        Email: AuthCurrentUser.email,
        uid: AuthCurrentUser.uid,
        CurrentSidebarTab: 'Dash', 
      }
    )



    FIREBASE_GetUserByEmail("Users", AuthCurrentUser.email).then((Response) => {
      const User = { ...Response[0] }
      const Theme = User?.Preference?.Theme || 'Claro'
      const Tenant = User?.Tenant?.Name || ''
      SetCurrentUserOnStore({ ...User, uid: AuthCurrentUser.uid })
      SetTema(Theme)
      SetTenant(Tenant).then(() => {
        FillStore()
      })
    })




  } else {
    if (!CurrentUserEmail) {
      SetLoggedUserOnStore(DefaultLoggedUser)
      SetTenant('').then(() => {
        //console.log("Tenant ")
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
  return updatePassword(auth.AuthCurrentUser, novaSenha)
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


