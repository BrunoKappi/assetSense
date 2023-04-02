import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, } from "firebase/auth";
import { auth } from "./index";
import store from '../store/store'
import { setLoggedUser, clearLoggedUser, SetCheckLogin } from '../store/actions/LoggedUserActions'
import { GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, FacebookAuthProvider, updatePassword } from "firebase/auth";
import { DefaultLoggedUser } from "../../GlobalVars";
import { GetCurrentUserEmailFromStore, GetCurrentUserFromStore, GetUserUrlImage } from "../../Functions/Middleware";



const onAuthStateChangedHandler = (currentUser) => {
  console.log("AUTHCHANGED", currentUser ? currentUser : 'VAZIO');

  const LoggedUserEmail = GetCurrentUserEmailFromStore()
  const CurrentUserEmail = currentUser?.email
  const Logado = store.getState().LoggedUser.CheckedLogin



  if (((LoggedUserEmail === CurrentUserEmail) || (!LoggedUserEmail)) && currentUser) {
    const user = {
      ...DefaultLoggedUser,
      Email: currentUser.email,
      uid: currentUser.uid,
      CurrentSidebarTab: 'Dash'
    }
    store.dispatch(setLoggedUser(user))

    GetUserUrlImage(`images/${currentUser.uid}`).then((url) => {
      //COMENTADO  console.log("Retorno", url)
      const user2 = {
        ...DefaultLoggedUser,
        Email: currentUser.email,
        uid: currentUser.uid,
        CurrentSidebarTab: 'Dash',
        PhotoUrl: url
      }
      store.dispatch(setLoggedUser(user2))
    }).catch((error) => {
      //COMENTADO  console.log("Retorno Erro", error)
    })


  } else {
    if (!CurrentUserEmail)
      store.dispatch(clearLoggedUser())
  }

  if (store.getState().LoggedUser.CheckedLogin === false)
    setTimeout(() => {
      store.dispatch(SetCheckLogin())
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


const provider = new GoogleAuthProvider();
const FacebookProvider = new FacebookAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
    }).catch(() => {
      //console.log(error);
    });
};



export const signInWithFacebook = () => {
  signInWithPopup(auth, FacebookProvider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
    })
    .catch(() => {
      //console.log(error);
    });
}; 