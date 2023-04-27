import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, } from "firebase/auth";
import { auth } from "./index";
import { sendPasswordResetEmail, updatePassword } from "firebase/auth";
import { DefaultLoggedUser } from "../../GlobalVars";
import { GetLoggedUserInfo,  GetUserWithEmailFromStore, SetCheckLoginOnStore, SetLoggedUserOnStore } from "../../Functions/StoreMiddleware";
import { GetUserUrlImage } from "../../Functions/StorageMiddleware";



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
    SetLoggedUserOnStore(user)




  } else {
    if (!CurrentUserEmail)
      SetLoggedUserOnStore(DefaultLoggedUser)
  }

  if (GetLoggedUserInfo('CheckedLogin') === false)
    setTimeout(() => {
      SetCheckLoginOnStore()
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
      SetLoggedUserOnStore(user2)
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


