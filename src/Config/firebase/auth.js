import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, } from "firebase/auth";
import { auth } from "./index";
import store from '../store/store'
import { setLoggedUser, clearLoggedUser, SetCheckLogin } from '../store/actions/LoggedUserActions'
import { GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, FacebookAuthProvider, updatePassword } from "firebase/auth";
import { DefaultLoggedUser } from "../../GlobalVars";

onAuthStateChanged(auth, (currentUser) => {
  console.log("AUTHCHANGED", currentUser ? currentUser : 'VAZIO');
  if (currentUser) {
    const user = {
      ...DefaultLoggedUser,
      Email: currentUser.email,
      uid: currentUser.uid,
      CurrentSidebarTab: 'Dash'
    }
    store.dispatch(setLoggedUser(user))
  } else {
    store.dispatch(clearLoggedUser())
  }

  if (store.getState().LoggedUser.CheckedLogin === false)
    setTimeout(() => {
      store.dispatch(SetCheckLogin())
    }, 5);

})

export const mudarSenha = async (novaSenha) => {
  return updatePassword(auth.currentUser, novaSenha)
}


export const ResetFirebasePassword = async (email) => {
  return sendPasswordResetEmail(auth, email)
};

export const register = async (email, senha) => {
  return createUserWithEmailAndPassword(auth, email, senha)
};

export const LoginFirebase = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
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
    }).catch((error) => {
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
    .catch((error) => {
      //console.log(error);
    });
};