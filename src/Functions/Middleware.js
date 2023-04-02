import store from "../Config/store/store"
import { FIREBASE_LoginAuth, FIREBASE_LogouyAuth, FIREBASE_RegisterUserAuth, FIREBASE_SendEMailResetPassword, signInWithGoogle } from "../Config/firebase/auth"
import { AddTipoAtivo, SetTiposAtivos } from "../Config/store/actions/TiposAtivosActions"
import { SetSetores } from "../Config/store/actions/SetoresActions"
import { SetTiposUsuarios } from "../Config/store/actions/TiposUsuariosActions"
import { SetLocaisArmazenamento } from "../Config/store/actions/LocaisArmazenamentoActions"
import { SetStatusAtivos } from "../Config/store/actions/AtivosStatusActions"
import { SetTiposDeUso } from "../Config/store/actions/TiposDeUsoActions"
import { AddAtivoAction, DeleteAtivoAction, SetAtivos } from "../Config/store/actions/AtivosActions"
import { AddUsuarioAction, DeleteUsuarioAction, SetUsuarios } from "../Config/store/actions/UsuariosActions"
import { PermitIndexs } from "../GlobalVars"
import { AddRecordAction, SetRecords } from "../Config/store/actions/RecordsActions"
import moment from "moment"
import { FIREBASE_AddAtivo, FIREBASE_AddLocalArmazenamento, FIREBASE_AddRecord, FIREBASE_AddSetor, FIREBASE_AddStatusAtivo, FIREBASE_AddTipoAtivo, FIREBASE_AddTipoUso, FIREBASE_AddTipoUsuario, FIREBASE_AddUsuario, FIREBASE_DeleteLocalArmazenamento, FIREBASE_DeleteSetor, FIREBASE_DeleteStatusAtivo, FIREBASE_DeleteTipoAtivo, FIREBASE_DeleteTipoDeUsuario, FIREBASE_DeleteTipoUso, FIREBASE_GetAtivos, FIREBASE_GetLocaisArmazenamento, FIREBASE_GetRecords, FIREBASE_GetSetores, FIREBASE_GetStatusAtivos, FIREBASE_GetTiposAtivo, FIREBASE_GetTiposUso, FIREBASE_GetTiposUsuarios, FIREBASE_GetUsuarios, FIREBASE_UpdateAtivo, FIREBASE_UpdateLocalArmazenamento, FIREBASE_UpdateRecord, FIREBASE_UpdateSetor, FIREBASE_UpdateStatusAtivo, FIREBASE_UpdateTipoAtivo, FIREBASE_UpdateTipoDeUsuario, FIREBASE_UpdateTipoUso, FIREBASE_UpdateUsuario } from "../Config/firebase/metodos"
import { DefaultUserRole } from "../Data/Items"
import { SetTemaAction } from "../Config/store/actions/TemaActions"
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "../Config/firebase"
import { SetLoggedUserPhotoUrlAction } from "../Config/store/actions/LoggedUserActions"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../Config/firebase/index";

//UTILS

export const LoginUtil = (email, password) => {
    console.log("Recebdno login", email, password)
    return FIREBASE_LoginAuth(email, password)
}

export const LogoutUtil = () => {
    return FIREBASE_LogouyAuth()
}

export const FoprgetPasswordUtil = (email, password) => {
    return FIREBASE_SendEMailResetPassword(email, password)
}

export const LogarComGooglePopup = () => {
    return signInWithGoogle();
};




export const ImageUpload = (ImagePath, ImageToUpload) => {
    console.log("Recebendo para Atualizar", ImagePath)
    const imageRef = ref(storage, ImagePath);
    return uploadBytes(imageRef, ImageToUpload)
}


export const GetUserUrlImage = (path) => {
    return getDownloadURL(ref(storage, path))
}

export const DeleteFile = (path) => {
    console.log("Mandando apagar", path)
    const desertRef = ref(storage, path);
    return deleteObject(desertRef)
}


export const SetLoggedUserPhotoUrl = (URL) => {
    //console.log("Recebendo URL", URL)
    const User = GetCurrentUserFromStore()
    User.PhotoUrl = URL
    EditUser(User)
    store.dispatch(SetLoggedUserPhotoUrlAction(URL))
}

export const SetLoggedUserPhotoUrlJustStore = (URL) => {
    store.dispatch(SetLoggedUserPhotoUrlAction(URL))
}



export const SetOtherUserPhotoUrl = (URL, ID) => {
    //console.log("Recebendo URL", URL)
    const User = GetUserWithIdFromStore(ID)
    User.PhotoUrl = URL
    EditUser(User)
}

export const SetAtivoPhotoUrl = (URL, AtivoId) => {
    //console.log("Recebendo URL", URL)
    const Ativo = GetAtivoWithIdFromStore(AtivoId)
    Ativo.PhotoUrl = URL
    //console.log("EDITANDO ATIVO", Ativo)
    EditAtivo(Ativo)
    //store.dispatch(SetLoggedUserPhotoUrlAction(URL))
}




// Define um objeto de mapeamento que relaciona o nome do módulo/prop com a função get correspondente
export const fetchFunctions = {
    TiposAtivos: GetTipos,
    Setores: FIREBASE_GetSetores,
    TiposUsuarios: GetUserTipos,
    Locais: GetLocaisArmazenamento,
    StatusAtivos: GetStatusAtivos,
    TiposUso: GetTiposDeUso
};


//////////// TIPOS ATIVOS //////////////////

export async function GetTipos() {
    return FIREBASE_GetTiposAtivo()
}


export async function SaveTipos(Tipos) {
    return new Promise((resolve, reject) => {

        localStorage.setItem('AssetSenseTipos', JSON.stringify(Tipos))
        store.dispatch(SetTiposAtivos(Tipos))
        resolve('Ok');

    });
}


export function GetTiposAtivosSelect() {

    return new Promise((resolve, reject) => {

        const Types = [...GetTiposAtivosFromStore()].map((item) => {
            return {
                value: item.id,
                label: item.Value,
            };
        });
        Types.push({ value: 'Todos', label: 'Todos' })
        resolve(Types)

    });
}

export async function AddTipo(TipoAtivo) {
    store.dispatch(AddTipoAtivo(TipoAtivo))
}


export const EditTipoAtivo = (EditedItem) => {
    return FIREBASE_UpdateTipoAtivo(EditedItem)
}




//////////// SETORES //////////////////

export async function GetSetores() {
    //COMENTADO  console.log("Pegando setores")
    return FIREBASE_GetSetores()
}


export async function SaveSetores(Setores) {
    return new Promise((resolve, reject) => {
        localStorage.setItem('AssetSenseSetores', JSON.stringify(Setores))
        store.dispatch(SetSetores(Setores))
        resolve('Ok');
    });
}

export async function GetSetoresSelect() {
    return new Promise((resolve, reject) => {

        const Types = [...GetSetoresFromStore()].map((item) => {
            return {
                value: item.id,
                label: item.Value,
            };
        });
        Types.push({ value: 'Todos', label: 'Todos' })
        resolve(Types)

    });
}



export const EditSetor = (EditedSetor) => {
    return FIREBASE_UpdateSetor(EditedSetor)
}










//////////// TIPOS USUARIOS //////////////////

export async function GetUserTiposFromFirebase() {
    return FIREBASE_GetTiposUsuarios()
}
export async function GetUserTipos() {
    return GetUserTypesFromStore()
}


export async function SaveUserTipos(Tipos) {
    return new Promise((resolve, reject) => {
        localStorage.setItem('AssetSenseUsersTypes', JSON.stringify(Tipos))
        store.dispatch(SetTiposUsuarios(Tipos))
        resolve('Ok');
    });
}

export async function GetUsersTypesSelect() {
    return new Promise((resolve, reject) => {

        const Types = [...GetUserTypesFromStore()].map((item) => {
            return {
                value: item.id,
                label: item.Value,
            };
        });
        Types.push({ value: 'Todos', label: 'Todos' })
        resolve(Types)
    });
}


export const EditUserType = (EditedItem) => {
    return FIREBASE_UpdateTipoDeUsuario(EditedItem)
}











//////////// LOCAIS //////////////////


export async function GetLocaisArmazenamento() {
    return FIREBASE_GetLocaisArmazenamento()
}


export async function SaveLocaisArmazenamento(Locais) {
    return new Promise((resolve, reject) => {
        localStorage.setItem('AssetSenseLocaisArmazenamento', JSON.stringify(Locais))
        store.dispatch(SetLocaisArmazenamento(Locais))
        resolve('Ok');
    });
}

export async function GetLocaisSelect() {

    return new Promise((resolve, reject) => {

        const Types = [...GetLocaisArmazenamentoFromStore()].map((item) => {
            return {
                value: item.id,
                label: item.Value,
            };
        });
        Types.push({ value: 'Todos', label: 'Todos' })
        resolve(Types)

    });

}


export const EditLocalArmazenamento = (EditedItem) => {
    return FIREBASE_UpdateLocalArmazenamento(EditedItem)
}








//////////// RECORDS //////////////////

export async function GetRecordsFromFirebase() {
    return FIREBASE_GetRecords()
}
export async function GetRecords() {
    return new Promise((resolve) => {
        resolve(GetRecordsFromStore())
    });
}


export async function SaveRecords(Records) {
    store.dispatch(SetRecords(Records))
    localStorage.setItem('AssetSenseRecords', JSON.stringify(Records))
}


export async function AddRecord(RecordToAdd) {
    return FIREBASE_AddRecord(RecordToAdd)
}


export const EditRecord = (EditedItem) => {
    return FIREBASE_UpdateRecord(EditedItem)
}




























//////////// STATUS ATIVOS //////////////////

export async function GetStatusAtivosFromFirebase() {
    return FIREBASE_GetStatusAtivos()
}
export async function GetStatusAtivos() {
    return FIREBASE_GetStatusAtivos()
}


export async function SaveStatusAtivos(Locais) {
    return new Promise((resolve, reject) => {
        localStorage.setItem('AssetSenseStatusAtivos', JSON.stringify(Locais))
        store.dispatch(SetStatusAtivos(Locais))
        resolve('Ok')
    });
}


export const EditStatusAtivo = (EditedItem) => {
    return FIREBASE_UpdateStatusAtivo(EditedItem)
}




//////////// TIPOS DE USO  //////////////////


export async function GetTiposDeUso() {
    return FIREBASE_GetTiposUso()
}


export async function SaveTiposDeUso(Locais) {
    return new Promise((resolve, reject) => {
        localStorage.setItem('AssetSenseTiposDeUso', JSON.stringify(Locais))
        store.dispatch(SetTiposDeUso(Locais))
    });
}


export const EditTipoDeUso = (EditedItem) => {
    return FIREBASE_UpdateTipoUso(EditedItem)
}




////////////////////// ATIVOS //////////////////////////


export async function GetAtivos() {
    return FIREBASE_GetAtivos()
}




export async function SaveAtivos(Ativos) {
    return new Promise((resolve, reject) => {
        localStorage.setItem('AssetSenseAtivos', JSON.stringify(Ativos))
        store.dispatch(SetAtivos(Ativos))
        resolve('Ok');
    });
}


export async function AddAtivo(Ativo) {
    return FIREBASE_AddAtivo(Ativo)
}

export async function AddAtivoFirebase(New) {
    store.dispatch(AddAtivoAction(New))
}


export async function DeleteAtivo(Ativo) {
    return new Promise((resolve, reject) => {
        Ativo.Deleted = true
        EditAtivo(Ativo)
        resolve('Ok');
    });
}




export const EditAtivo = (EditedItem) => {
    return FIREBASE_UpdateAtivo(EditedItem).then(() => {
        GetAtivos().then(Lista => {

            const NewAtivos = Lista.filter(ativo => {
                return ativo.id !== EditedItem.id
            }).concat(EditedItem)

            SaveAtivos(NewAtivos)

        })
    })
}




////////////////////// ATIVOS //////////////////////////












////////////////////// USUARIOS  //////////////////////////
export async function GetUsers() {
    return FIREBASE_GetUsuarios()
}


export async function SaveUsers(Users) {
    return new Promise((resolve, reject) => {
        localStorage.setItem('AssetSenseUsers', JSON.stringify(Users))
        store.dispatch(SetUsuarios(Users))
        resolve('Ok');
    });
}


export const ResetonAuthStateChanged = () => {
    onAuthStateChanged(auth, () => {
        console.log("Usuário Registrado AUTH")
    })
}

export async function RegisterUser(Email) {
    return FIREBASE_RegisterUserAuth(Email)
}



export async function AddUser(User) {
    return FIREBASE_AddUsuario(User)
}

export async function AddUserFirebase(New) {
    store.dispatch(AddUsuarioAction(New))
}

export async function DeleteUser(User) {
    return new Promise((resolve, reject) => {
        User.Deleted = true
        EditUser(User)
        resolve('Ok');
    });
}




export const EditUser = (EditedItem) => {
    return FIREBASE_UpdateUsuario(EditedItem).then(() => {
        GetUsers().then(Lista => {

            const NewUsers = Lista.filter(usuario => {
                return usuario.id !== EditedItem.id
            }).concat(EditedItem)

            SaveUsers(NewUsers)

        })
    })
}

////////////////////// USUARIOS  //////////////////////////











/////////////////////// TEMA //////////////////



export async function GetTema() {
    if (!localStorage.getItem('AssetSenseTema')) {
        localStorage.setItem('AssetSenseTema', 'Claro')
        store.dispatch(SetTemaAction("Claro"))
    } else {
        store.dispatch(SetTemaAction(localStorage.getItem('AssetSenseTema')))
    }

}


export async function ToggleTema() {
    const TEMA = localStorage.getItem('AssetSenseTema')
    if (TEMA === 'Escuro') {
        store.dispatch(SetTemaAction("Claro"))
        localStorage.setItem('AssetSenseTema', 'Claro')
    }

    if (TEMA === 'Claro') {
        store.dispatch(SetTemaAction("Escuro"))
        localStorage.setItem('AssetSenseTema', 'Escuro')
    }


}





///// GETTERS DA STORE /////

export const GetCurrentUserEmailFromStore = () => {
    return store.getState().LoggedUser.Email
}
export const GetUserTypesFromStore = () => {
    return [...store.getState().TiposUsuarios]
}
export const GetLocaisArmazenamentoFromStore = () => {
    return [...store.getState().LocaisArmazenamento]
}
export const GetTiposAtivosFromStore = () => {
    return [...store.getState().TiposAtivos]
}
export const GetTiposDeUsoFromStore = () => {
    return [...store.getState().TiposDeUso]
}
export const GetAtivosFromStore = () => {
    return [...store.getState().Ativos].filter(User => User.Deleted === false)
}
export const GetAtivosFromStoreWithDeleted = () => {
    return [...store.getState().Ativos]
}
export const GetStatusAtivosFromStore = () => {
    return [...store.getState().StatusAtivos]
}
export const GetSetoresFromStore = () => {
    return [...store.getState().Setores] ? [...store.getState().Setores] : []
}
export const GetUsersFromStore = () => {
    return [...store.getState().Usuarios].filter(User => User.Deleted === false)
}
export const GetUsersFromStoreWithDeleted = () => {
    return [...store.getState().Usuarios]
}
export const GetUsersFromStoreWithNoCurrentUser = (AtivoId) => {
    const Current = GetCurrentUserFromStore()
    const UsersThatTook = GetUsersThatTookAtivo(AtivoId)
    const Users = [...store.getState().Usuarios].filter(User => User.id !== Current.id)
    const UsersNotTook = Users.filter(user => !UsersThatTook.some(took => took.id === user.id));
    //COMENTADO  console.log("FILTER USERS", UsersNotTook)
    return UsersNotTook
}
export const GetRecordsFromStore = () => {
    return [...store.getState().RecordsAtivos]
}

export const GetCurrentUserFromStore = () => {
    const Email = GetCurrentUserEmailFromStore()
    const Users = GetUsersFromStore()
    const CurrentUser = Users.find(U => U.Email === Email)
    return CurrentUser
}

export const GetCurrentUserTypeFromStore = () => {
    const Email = GetCurrentUserEmailFromStore()
    const Users = GetUsersFromStore()
    const Types = GetUserTypesFromStore()
    const CurrentUser = Users.find(U => U.Email === Email)
    const CurrentUserType = Types.find(U => U.id === CurrentUser?.Type?.id)
    return CurrentUserType ? CurrentUserType : DefaultUserRole
}


/// OBJECT GET WITH ID

export const GetCurrentUserTypeWithIdFromStore = (Id) => {
    const Types = GetUserTypesFromStore()
    const Type = Types.find(U => U.id === Id)
    return Type
}
export const GetAtivoTypeWithIdFromStore = (Id) => {
    const Types = GetTiposAtivosFromStore()
    const Type = Types.find(U => U.id === Id)
    return Type
}

export const GetLocalArmazenamentoWithIdFromStore = (Id) => {
    const Locais = GetLocaisArmazenamentoFromStore()
    const Local = Locais.find(U => U.id === Id)
    return Local
}
export const GetAtivoStatusWithIdFromStore = (Id) => {

    const Statuses = GetStatusAtivosFromStore()
    const Status = Statuses.find(U => U.id === Id)
    return Status
}
export const GetTipoDeUsoWithIdFromStore = (Id) => {
    const TiposDeUso = GetTiposDeUsoFromStore()
    const TipoDeUso = TiposDeUso.find(U => U.id === Id)
    return TipoDeUso
}

export const GetUserWithIdFromStore = (Id) => {
    const Users = GetUsersFromStoreWithDeleted()
    const User = Users.find(U => U.id === Id)
    return User
}
export const GetUserWithEmailFromStore = (Email) => {
    const Users = GetUsersFromStoreWithDeleted()
    const User = Users.find(U => U.Email === Email)
    return User
}

export const GetAtivoWithIdFromStore = (Id) => {
    const Ativos = GetAtivosFromStoreWithDeleted()
    const Ativo = Ativos.find(U => U.id === Id)
    return Ativo ? Ativo : {}
}



// GET NAME WITH ID

export const GetLocalArmazenamentoNameWithIdFromStore = (Id) => {
    const Locais = GetLocaisArmazenamentoFromStore()
    const LocalName = Locais.find(U => U.id === Id)?.Value
    return LocalName
}
export const GetTipoAtivoNameWithIdFromStore = (Id) => {
    const Tipos = GetTiposAtivosFromStore()
    const TiposName = Tipos.find(U => U.id === Id)?.Value
    return TiposName ? TiposName : ''
}
export const GetTipoDeUsoNameWithIdFromStore = (Id) => {
    const Tipos = GetTiposDeUsoFromStore()
    const TiposName = Tipos.find(U => U.id === Id)?.Value
    return TiposName ? TiposName : ''
}

export const GetCurrentUserSetorNameWithIdFromStore = (Id) => {
    if (!Id) return 'Selecione um Setor'
    const Setores = GetSetoresFromStore()
    const Name = Setores.find(Setor => Setor.id === Id).Value
    return Name ? Name : ''
}
export const GetCurrentUserTypeNameWithIdFromStore = (Id) => {
    if (!Id) return 'Selecione um Tipo de Usuário'
    const Types = GetUserTypesFromStore()
    const Name = Types.find(Type => Type.id === Id).Value
    return Name
}
export const GetuserNameWithIdFromStore = (Id) => {
    const Users = GetUsersFromStoreWithDeleted()
    const User = Users.find(User => User.id === Id)
    const Name = User?.Name + ' ' + User?.LastName
    return Name
}
export const GetAtivoNameWithIdFromStore = (Id) => {
    const Ativos = GetAtivosFromStoreWithDeleted()
    const Ativo = Ativos.find(ativo => ativo.id === Id)
    const Name = Ativo.Item
    return Name
}

//VERIFICA SE  ALGUM ATIVO DO TIPO FOI RETIRADO
export const CheckIfAnyAtivoOfStatusTaken = (StatusId) => {
    const Records = GetRecordsFromStore()
    const Ativos = GetAtivosFromStore()
    const AtivosOfStatus = Ativos.filter(Ativo => Ativo.Status.id === StatusId)
    const AtivosTaken = AtivosOfStatus.filter(Ativo => Records.some(Record => Record.AtivoId === Ativo.id && Record.Duration === 0));
    return AtivosTaken?.length > 0 ? true : false

}

//VERIFICA SE  ALGUM ATIVO DO TIPO FOI RETIRADO
export const ReturnAllAtivosOfUserWithId = (UserId) => {
    const Records = GetRecordsFromStore()

    Records.forEach(Record => {
        if (Record.TakenFor.id === UserId) {
            Record.ReturnDate = moment().valueOf()
            Record.Duration = moment().valueOf() - Record.TakeDate
            Record.TakenForDeleted = true
            if (Record.TakenBy.id === UserId)
                Record.TakenByDeleted = true
            EditRecord(Record)
        }
        else if (Record.TakenBy.id === UserId) {
            Record.TakenByDeleted = true
            EditRecord(Record)
        }


    })

    SaveRecords(Records)

}
//VERIFICA SE  ALGUM ATIVO DO TIPO FOI RETIRADO
export const ReturnAllRecordOfAtivowithId = (AtivoId) => {
    const Records = GetRecordsFromStore()

    Records.forEach(Record => {
        if (Record.AtivoId === AtivoId) {
            Record.ReturnDate = moment().valueOf()
            Record.Duration = moment().valueOf() - Record.TakeDate
            Record.AtivoDeleted = true
            EditRecord(Record)
        }
    })

    SaveRecords(Records)

}


// OTHER GETTERS 

export const GetCurrentUserTypePermitFromStore = (Permit) => {
    const CurrentUserType = GetCurrentUserTypeFromStore()
    return CurrentUserType?.Permits[PermitIndexs[Permit]]
}

//Quantidade Retirada sem devolução de um determinado Ativo 
export const GetTakesOfAtivo = (ID) => {
    var Records1 = [...GetRecordsFromStore()]
    const Qtd = Records1.filter(Record => Record.AtivoId === ID && !Record.ReturnDate)
    return Qtd ? Qtd.length : 0
}

//Quantidade Retirada sem devolução de um determinado Ativo 
export const GetRecordsOfAtivo = (ID) => {
    var Records1 = [...GetRecordsFromStore()]
    return Records1.filter(Record => Record.AtivoId === ID)
}
//REGISTROS DE UM USUARIO
export const GetRecordsOfUser = (ID) => {
    var Records1 = [...GetRecordsFromStore()]
    return Records1.filter(Record => Record.TakenFor.id === ID)
}

//Quantidade Retirada sem devolução de um determinado Ativo pelo CurrentUser
export const GetTakesOfAtivoOfCurrentUser = (ID) => {
    const CurrentUser = GetCurrentUserFromStore()
    var Records2 = [...GetRecordsFromStore()]
    const Qtd = Records2.filter(Record => Record.AtivoId === ID && !Record.ReturnDate && Record.TakenFor.id === CurrentUser.id)
    return Qtd ? Qtd.length : 0
}

//Usuarios que Pegaram um determinado Ativo, menos o currentuser
export const GetUsersThatTookAtivo = (ID) => {
    const CurrentUser = GetCurrentUserFromStore()
    var Records3 = [...GetRecordsFromStore()]
    const AtivosPegos = Records3.filter(Record => Record.AtivoId === ID && !Record.ReturnDate)
    //console.log("RECORDS", AtivosPegos)
    const Users = GetUsersFromStore()
    const UsersThatTook = Users.filter(user => AtivosPegos.some(AtivoPego => AtivoPego.TakenFor.id === user.id && user.id !== CurrentUser.id));
    //console.log("PEGARAM", UsersThatTook)
    return UsersThatTook
}


export const GetRecordByAtivoIdAndUserId = (AtivoId, UserId) => {
    var Records4 = [...GetRecordsFromStore()]
    const Record = Records4.filter(Record => Record.AtivoId === AtivoId && Record.TakenFor.id === UserId && !Record.ReturnDate)[0]
    return Record
}

















export const saveFunctions = {
    "TiposAtivos": SaveTipos,
    "Setores": SaveSetores,
    "TiposUsuarios": SaveUserTipos,
    "Locais": SaveLocaisArmazenamento,
    "StatusAtivos": SaveStatusAtivos,
    "TiposUso": SaveTiposDeUso
};

export const EditFunctions = {
    "TiposAtivos": EditTipoAtivo,
    "Setores": EditSetor,
    "TiposUsuarios": EditUserType,
    "Locais": EditLocalArmazenamento,
    "StatusAtivos": EditStatusAtivo,
    "TiposUso": EditTipoDeUso
};

export const DeleteFunctions = {
    "TiposAtivos": FIREBASE_DeleteTipoAtivo,
    "Setores": FIREBASE_DeleteSetor,
    "TiposUsuarios": FIREBASE_DeleteTipoDeUsuario,
    "Locais": FIREBASE_DeleteLocalArmazenamento,
    "StatusAtivos": FIREBASE_DeleteStatusAtivo,
    "TiposUso": FIREBASE_DeleteTipoUso
};

export const AddFunctions = {
    "TiposAtivos": FIREBASE_AddTipoAtivo,
    "Setores": FIREBASE_AddSetor,
    "TiposUsuarios": FIREBASE_AddTipoUsuario,
    "Locais": FIREBASE_AddLocalArmazenamento,
    "StatusAtivos": FIREBASE_AddStatusAtivo,
    "TiposUso": FIREBASE_AddTipoUso
};
