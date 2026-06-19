
import {
    FIREBASE_LoginAuth,
    FIREBASE_LogouyAuth,
    FIREBASE_RegisterUserAuth,
    FIREBASE_SendEMailResetPassword,
    FIREBASE_GoogleLoginAuth
} from "../Config/firebase/auth"


//LOGIN IN FIREBASE
export const LoginUtil = (email, password) => {
    return FIREBASE_LoginAuth(email, password)
}

//LOGOUT IN FIREBASE
export const LogoutUtil = () => {
    return FIREBASE_LogouyAuth()
} 

//FORGET PASSWORD FIREBASE
export const FoprgetPasswordUtil = (email, password) => {
    return FIREBASE_SendEMailResetPassword(email, password)
}

export async function RegisterUser(Email) {
    return FIREBASE_RegisterUserAuth(Email)
}

//GOOGLE LOGIN IN FIREBASE
export const LoginWithGoogleUtil = () => {
    return FIREBASE_GoogleLoginAuth()
}
