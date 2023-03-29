import { LoginFirebase, signInWithGoogle } from "../../Config/firebase/auth";
import { setLoggedUser } from "../../Config/store/actions/LoggedUserActions";
import store from "../../Config/store/store";
import { DefaultLoggedUser } from "../../GlobalVars";



export const LoginUtil = (email, password) => {
    return LoginFirebase(email, password)
}

export const LogarComGooglePopup = () => {
    return signInWithGoogle();
};


export const LoginSuccess = (message) => {
    const user = {
        ...DefaultLoggedUser,
        Email: message.user.email,
        uid: message.user.uid,
        CurrentSidebarTab: 'Dash'
    }
    store.dispatch(setLoggedUser(user))
}



export const HandleFirebaseEmailPasswordLogin = (ErrorMessage) => {
    //console.log(ErrorMessage)
    if (ErrorMessage.includes("found"))
        return 'Usuário não encontrado'
    else if (ErrorMessage.includes("wrong"))
        return 'Usuário ou Senha incorretos'
    else if (ErrorMessage.includes("disabled"))
        return 'Usuário Desabilitado'
    else if (ErrorMessage.includes("many-requests"))
        return 'Muitas requisições'
    else
        return 'Usuário ou Senha incorretos'
}