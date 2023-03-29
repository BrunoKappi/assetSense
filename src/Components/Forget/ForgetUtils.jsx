import { ResetFirebasePassword } from "../../Config/firebase/auth"



export const ResetarSenha = (Email) => {
    return ResetFirebasePassword(Email)
} 