import store from "../Config/store/store"
import { FIREBASE_LoginAuth, FIREBASE_LogouyAuth, FIREBASE_RegisterUserAuth, FIREBASE_SendEMailResetPassword } from "../Config/firebase/auth"
import { AddTipoAtivo, SetTiposAtivos } from "../Config/store/actions/TiposAtivosActions"
import { SetSetores } from "../Config/store/actions/SetoresActions"
import { SetTiposUsuarios } from "../Config/store/actions/TiposUsuariosActions"
import { SetStorageLocations } from "../Config/store/actions/StorageLocationsActions"
import { SetStatusAtivos } from "../Config/store/actions/AtivosStatusActions"
import { SetTiposDeUso } from "../Config/store/actions/TiposDeUsoActions"
import { AddAtivoAction, SetAtivos } from "../Config/store/actions/AtivosActions"
import { AddUsuarioAction, SetUsuarios } from "../Config/store/actions/UsuariosActions"
import { PermitIndexs } from "../GlobalVars"
import { EditRecordAction, SetRecords } from "../Config/store/actions/RecordsActions"
import moment from "moment"
import { FIREBASE_DeleteLocalArmazenamento, FIREBASE_DeleteSetor, FIREBASE_DeleteStatusAtivo, FIREBASE_DeleteTipoAtivo, FIREBASE_DeleteTipoDeUsuario, FIREBASE_DeleteTipoUso, FIREBASE_Get, FIREBASE_Update, AssetTypesCollectionName, SectorsCollectionName, UserTypesCollectionName, StorageLocationsCollectionName, RecordsCollectionName, UsageTypesCollectionName, AssetStatusCollectionName, AssetsCollectionName, UsersCollectionName, FIREBASE_Add } from "../Config/firebase/metodos"
import { DefaultUserRole } from "../Data/Items"
import { SetTemaAction } from "../Config/store/actions/TemaActions"
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "../Config/firebase"
import { SetLoggedUserPhotoUrlAction, ToggleSideBar } from "../Config/store/actions/LoggedUserActions"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../Config/firebase/index";

//UTILS

export const LoginUtil = (email, password) => {
    return FIREBASE_LoginAuth(email, password)
}

export const LogoutUtil = () => {
    return FIREBASE_LogouyAuth()
}

export const FoprgetPasswordUtil = (email, password) => {
    return FIREBASE_SendEMailResetPassword(email, password)
}


export const ImageUpload = (ImagePath, ImageToUpload) => {
    const imageRef = ref(storage, ImagePath);
    return uploadBytes(imageRef, ImageToUpload)
}

export const GetUserUrlImage = (path) => {
    return getDownloadURL(ref(storage, path))
}

export const DeleteFile = (path) => {
    const desertRef = ref(storage, path);
    return deleteObject(desertRef)
}

export const SetLoggedUserPhotoUrl = (URL) => {
    const User = GetFromStore('CurrentUser')
    User.PhotoUrl = URL
    UpdateInFirebase(UsersCollectionName, User)
    store.dispatch(SetLoggedUserPhotoUrlAction(URL))
}

export const SetLoggedUserPhotoUrlJustStore = (URL) => {
    store.dispatch(SetLoggedUserPhotoUrlAction(URL))
}

export const SetOtherUserPhotoUrl = (URL, ID) => {
    const User = GetFromStoreWithId('UsuariosWithDeleted', ID)
    User.PhotoUrl = URL
    UpdateInFirebase(UsersCollectionName, User)
}

export const SetAtivoPhotoUrl = (URL, AtivoId) => {
    const Ativo = GetFromStoreWithId('AtivosWithDeleted', AtivoId)
    Ativo.PhotoUrl = URL
    Ativo.LastEditedAt = moment().valueOf()
    UpdateInFirebase(AssetsCollectionName, Ativo)
}


export const ResetonAuthStateChanged = () => {
    onAuthStateChanged(auth, () => {
    })
}

export async function RegisterUser(Email) {
    return FIREBASE_RegisterUserAuth(Email)
}



export const ToggleSideBarVisibility = () => {
    store.dispatch(ToggleSideBar())
}




export const GetFromStoreFunctions = {
    TiposAtivos: () => GetFromStore('TiposAtivos'),
    Setores: () => GetFromStore('Setores'),
    TiposUsuarios: () => GetFromStore('TiposUsuarios'),
    Locais: () => GetFromStore('StorageLocations'),
    StatusAtivos: () => GetFromStore('StatusAtivos'),
    TiposUso: () => GetFromStore('TiposDeUso')
};



/////////////////*********************** STORE SAVES ********************////////////////////////

export const SaveTipos = (Itens) => store.dispatch(SetTiposAtivos(Itens))
export const SaveSetores = (Itens) => store.dispatch(SetSetores(Itens))
export const SaveUserTipos = (Itens) => store.dispatch(SetTiposUsuarios(Itens))
export const SaveStorageLocations = (Itens) => store.dispatch(SetStorageLocations(Itens))
export const SaveRecords = (Itens) => store.dispatch(SetRecords(Itens))
export const SaveStatusAtivos = (Itens) => store.dispatch(SetStatusAtivos(Itens))
export const SaveTiposDeUso = (Itens) => store.dispatch(SetTiposDeUso(Itens))
export const SaveAtivos = (Itens) => store.dispatch(SetAtivos(Itens))
export const SaveUsers = (Itens) => store.dispatch(SetUsuarios(Itens))



///********* FIREBASE GET **********//////

export async function GetFromFirebase(Collection) {
    return FIREBASE_Get(Collection)
}


///********* FIREBASE EDIT/UPDATES **********//////

export const UpdateInFirebase = (Collection, Item) => FIREBASE_Update(Collection, { ...Item, LastEditedAt: moment().valueOf() })



///********* FIREBASE ADD **********//////

export const AddToFirebase = (Collection, Item) => {
    return FIREBASE_Add(Collection, { ...Item, CreatedAt: moment().valueOf(), LastEditedAt: moment().valueOf() })
}






export const EditRecordStore = (Item) => store.dispatch(EditRecordAction(Item))






export async function AddAtivoStore(Item) {
    Item.CreatedAt = moment().valueOf()
    Item.LastEditedAt = moment().valueOf()
    store.dispatch(AddAtivoAction(Item))
}

export async function AddUserToStore(New) {
    New.CreatedAt = moment().valueOf()
    New.LastEditedAt = moment().valueOf()
    store.dispatch(AddUsuarioAction(New))
}



export async function DeleteAtivo(Item) {
    return new Promise((resolve, reject) => {
        Item.Deleted = true
        UpdateInFirebase(AssetsCollectionName, Item)
        resolve('Ok');
    });
}

export async function DeleteUser(User) {
    return new Promise((resolve, reject) => {
        User.Deleted = true
        UpdateInFirebase(UsersCollectionName, User)
        resolve('Ok');
    });
}











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

//GET LOGGED USER INFO BY KEY
export const GetLoggedUserInfo = (Key) => {
    return store.getState().LoggedUser[Key]
}

//GET FROM STORE WITH KEY
export const GetFromStore = (Key) => {

    const StoreList = store.getState()

    if (Key === 'Ativos' || Key === 'Usuarios')
        return StoreList[Key].filter(Item => Item.Deleted === false)
    else if (Key === 'AtivosWithDeleted' || Key === 'UsuariosWithDeleted')
        return StoreList[Key.replace(/WithDeleted/g, "")]
    else if (Key === 'CurrentUser')
        return StoreList.Usuarios.find(U => U.Email === GetLoggedUserInfo('Email'))
    else if (Key === 'CurrentUserType') {
        const CurrentUser = StoreList.Usuarios.find(U => U.Email === GetLoggedUserInfo('Email'))
        const CurrentUserType = GetFromStore('TiposUsuarios').find(U => U.id === CurrentUser?.Type?.id)
        return CurrentUserType ? CurrentUserType : DefaultUserRole
    }
    else
        return StoreList[Key]
}




// USERS THAT TOOK AN ASSET / NO CURRENT USER 
export const GetUsersThatTookAsset = (AtivoId) => {
    const Current = GetFromStore('CurrentUser')
    const UsersThatTook = GetUsersThatTookAtivo(AtivoId)
    const Users = [...store.getState().Usuarios].filter(User => User.id !== Current.id)
    const UsersNotTook = Users.filter(user => !UsersThatTook.some(took => took.id === user.id));
    return UsersNotTook
}



//GET FROM STORE WITH ID
export const GetFromStoreWithId = (Reducer, Id) => {
    const StoreList = store.getState()
    const List = StoreList[Reducer.replace(/WithDeleted/g, "")]
    return List.find(U => U.id === Id)
}



// GET USER BY EMAIL
export const GetUserWithEmailFromStore = (Email) => {
    const Users = GetFromStore('UsuariosWithDeleted')
    const User = Users.find(U => U.Email === Email)
    return User
}


//GET NAME FROM STORE WITH ID
export const GetNameFromStoreWithId = (Reducer, Id) => {
    const StoreList = store.getState()
    const List = StoreList[Reducer.replace(/WithDeleted/g, "")]

    if (Reducer === 'AtivosWithDeleted' || Reducer === 'Ativos')
        return List.find(U => U.id === Id)?.Item || ''
    if (Reducer === 'UsuariosWithDeleted' || Reducer === 'Usuarios') {
        const User = List.find(User => User.id === Id)
        const Name = User?.Name + ' ' + User?.LastName
        return Name
    }
    else
        return List.find(U => U.id === Id)?.Value || ''
}



// GET NAME WITH ID

export const GetCurrentUserSetorNameWithIdFromStore = (Id) => {
    if (!Id) return 'Selecione um Setor'
    const Setores = GetFromStore('Setores')
    const Name = Setores.find(Setor => Setor.id === Id).Value
    return Name ? Name : ''
}
export const GetCurrentUserTypeNameWithIdFromStore = (Id) => {
    if (!Id) return 'Selecione um Tipo de Usuário'
    const Types = GetFromStore('TiposUsuarios')
    const Name = Types.find(Type => Type.id === Id).Value
    return Name
}



//VERIFICA SE  ALGUM ATIVO DO TIPO FOI RETIRADO
export const CheckIfAnyAtivoOfStatusTaken = (StatusId) => {
    const Records = GetFromStore('RecordsAtivos')
    const Ativos = GetFromStore('Ativos')
    const AtivosOfStatus = Ativos.filter(Ativo => Ativo.Status.id === StatusId)
    const AtivosTaken = AtivosOfStatus.filter(Ativo => Records.some(Record => Record.AtivoId === Ativo.id && !Record.ReturnDate));
    return AtivosTaken?.length > 0 ? true : false
}


//VERIFICA SE  ALGUM ATIVO DO TIPO FOI RETIRADO
export const CheckIfAnyAtivoOfStatusTaken2 = (StatusId) => {
    const Ativos = GetFromStore('Ativos')
    const AtivosOfStatus = Ativos.filter(Ativo => Ativo.Status.id === StatusId)
    const AtivosTaken = AtivosOfStatus.filter(Ativo => Ativo.QtdInUse > 0);
    return AtivosTaken?.length > 0 ? true : false
}

//VERIFICA SE  ALGUM ATIVO DO TIPO FOI RETIRADO
export const ReturnAllAtivosOfUserWithId = (UserId) => {
    const Records = GetFromStore('RecordsAtivos')

    Records.forEach(Record => {
        if (Record.TakenFor.id === UserId) {
            Record.ReturnDate = moment().valueOf()
            Record.Duration = moment().valueOf() - Record.TakeDate
            Record.TakenForDeleted = true
            if (Record.TakenBy.id === UserId)
                Record.TakenByDeleted = true
            UpdateInFirebase(RecordsCollectionName, Record)
        }
        else if (Record.TakenBy.id === UserId) {
            Record.TakenByDeleted = true
            UpdateInFirebase(RecordsCollectionName, Record)
        }


    })

    SaveRecords(Records)

}
//VERIFICA SE  ALGUM ATIVO DO TIPO FOI RETIRADO
export const ReturnAllRecordOfAtivowithId = (AtivoId) => {
    const Records = GetFromStore('RecordsAtivos')

    Records.forEach(Record => {
        if (Record.AtivoId === AtivoId) {
            Record.ReturnDate = moment().valueOf()
            Record.Duration = moment().valueOf() - Record.TakeDate
            Record.AtivoDeleted = true
            UpdateInFirebase(RecordsCollectionName, Record)
        }
    })

    SaveRecords(Records)

}


// OTHER GETTERS 
export const GetCurrentUserTypePermitFromStore = (Permit) => {
    const CurrentUserType = GetFromStore('CurrentUserType')
    return CurrentUserType?.Permits[PermitIndexs[Permit]]
}

//Quantidade Retirada sem devolução de um determinado Ativo 
export const GetTakesOfAtivo = (ID) => {
    var Records1 = [...GetFromStore('RecordsAtivos')]
    const Qtd = Records1.filter(Record => Record.AtivoId === ID && !Record.ReturnDate)
    return Qtd ? Qtd.length : 0
}

//Quantidade Retirada sem devolução de um determinado Ativo 
export const GetRecordsOfAtivo = (ID) => {
    var Records1 = [...GetFromStore('RecordsAtivos')]
    return Records1.filter(Record => Record.AtivoId === ID)
}
//REGISTROS DE UM USUARIO
export const GetRecordsOfUser = (ID) => {
    var Records1 = [...GetFromStore('RecordsAtivos')]
    return Records1.filter(Record => Record.TakenFor.id === ID)
}

//Quantidade Retirada sem devolução de um determinado Ativo pelo CurrentUser
export const GetTakesOfAtivoOfCurrentUser = (ID) => {
    const CurrentUser = GetFromStore('CurrentUser')
    var Records2 = [...GetFromStore('RecordsAtivos')]
    const Qtd = Records2.filter(Record => Record.AtivoId === ID && !Record.ReturnDate && Record.TakenFor.id === CurrentUser.id)
    return Qtd ? Qtd.length : 0
}

//Quantidade Retirada DE UM ATIVO PELO ID
export const GetQtdInUseOfAtivoWithId = (ID) => {
    const Ativo = GetFromStoreWithId('AtivosWithDeleted', ID)
    return Ativo?.QtdInUse ? Ativo?.QtdInUse : 0
}

//Usuarios que Pegaram um determinado Ativo, menos o currentuser
export const GetUsersThatTookAtivo = (ID) => {
    const CurrentUser = GetFromStore('CurrentUser')
    var Records3 = [...GetFromStore('RecordsAtivos')]
    const AtivosPegos = Records3.filter(Record => Record.AtivoId === ID && !Record.ReturnDate)

    const Users = GetFromStore('Usuarios')
    const UsersThatTook = Users.filter(user => AtivosPegos.some(AtivoPego => AtivoPego.TakenFor.id === user.id && user.id !== CurrentUser.id));

    return UsersThatTook
}


export const GetRecordByAtivoIdAndUserId = (AtivoId, UserId) => {
    var Records4 = [...GetFromStore('RecordsAtivos')]
    const Record = Records4.filter(Record => Record.AtivoId === AtivoId && Record.TakenFor.id === UserId && !Record.ReturnDate)[0]
    return Record
}








export const saveFunctions = {
    "TiposAtivos": SaveTipos,
    "Setores": SaveSetores,
    "TiposUsuarios": SaveUserTipos,
    "Locais": SaveStorageLocations,
    "StatusAtivos": SaveStatusAtivos,
    "TiposUso": SaveTiposDeUso
};

export const EditFunctions = {
    "TiposAtivos": (Item) => UpdateInFirebase(AssetTypesCollectionName, Item),
    "Setores": (Item) => UpdateInFirebase(SectorsCollectionName, Item),
    "TiposUsuarios": (Item) => UpdateInFirebase(UserTypesCollectionName, Item),
    "Locais": (Item) => UpdateInFirebase(StorageLocationsCollectionName, Item),
    "StatusAtivos": (Item) => UpdateInFirebase(AssetStatusCollectionName, Item),
    "TiposUso": (Item) => UpdateInFirebase(UsageTypesCollectionName, Item)
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
    "TiposAtivos": (Item) => AddToFirebase(AssetTypesCollectionName, Item),
    "Setores": (Item) => AddToFirebase(SectorsCollectionName, Item),
    "TiposUsuarios": (Item) => AddToFirebase(UserTypesCollectionName, Item),
    "Locais": (Item) => AddToFirebase(StorageLocationsCollectionName, Item),
    "StatusAtivos": (Item) => AddToFirebase(AssetTypesCollectionName, Item),
    "TiposUso": (Item) => AddToFirebase(UsageTypesCollectionName, Item),
};