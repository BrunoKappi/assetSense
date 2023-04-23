import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, } from "firebase/auth";
import { auth } from "./index";
import store from '../store/store'
import { setLoggedUser, clearLoggedUser, SetCheckLogin } from '../store/actions/LoggedUserActions'
import { sendPasswordResetEmail, updatePassword } from "firebase/auth";
import { DefaultLoggedUser } from "../../GlobalVars";
import { GetLoggedUserInfo, GetUserUrlImage, GetUserWithEmailFromStore } from "../../Functions/Middleware";



const onAuthStateChangedHandler = (currentUser) => {
  console.log("AUTHCHANGED", currentUser ? currentUser : 'VAZIO');

  const LoggedUserEmail = GetLoggedUserInfo('Email')
  const CurrentUserEmail = currentUser?.email




  if (((LoggedUserEmail === CurrentUserEmail) || (!LoggedUserEmail)) && currentUser) {
    const user = {
      ...DefaultLoggedUser,
      Email: currentUser.email,
      uid: currentUser.uid,
      CurrentSidebarTab: 'Dash'
    }
    store.dispatch(setLoggedUser(user))




  } else {
    if (!CurrentUserEmail)
      store.dispatch(clearLoggedUser())
  }

  if (store.getState().LoggedUser.CheckedLogin === false)
    setTimeout(() => {
      store.dispatch(SetCheckLogin())
    }, 5);



  setTimeout(() => {
    const CurrentUserFromStore = GetUserWithEmailFromStore(CurrentUserEmail)
    GetUserUrlImage(`images/${CurrentUserFromStore.id}`).then((url) => {
      const user2 = {
        ...DefaultLoggedUser,
        Email: currentUser.email,
        uid: currentUser.uid,
        CurrentSidebarTab: 'Dash',
        PhotoUrl: url
      }
      store.dispatch(setLoggedUser(user2))
    })
  }, 100000);



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


