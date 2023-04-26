import store from "../Config/store/store"
import { FIREBASE_LoginAuth, FIREBASE_LogouyAuth, FIREBASE_RegisterUserAuth, FIREBASE_SendEMailResetPassword } from "../Config/firebase/auth"
import { SetTiposAtivos } from "../Config/store/actions/AssetTypesActions"
import { SetSetores } from "../Config/store/actions/SectorsActions"
import { SetTiposUsuarios } from "../Config/store/actions/UserTypesActions"
import { SetStorageLocations } from "../Config/store/actions/StorageLocationsActions"
import { SetStatusAtivos } from "../Config/store/actions/AssetsStatusActions"
import { SetTiposDeUso } from "../Config/store/actions/UsageTypesActions"
import { AddAtivoAction, EditAtivoAction, SetAtivos } from "../Config/store/actions/AssetsActions"
import { AddUsuarioAction, EditUsuarioAction, SetUsuarios } from "../Config/store/actions/UsersActions"
import { PermitIndexs } from "../GlobalVars"
import { EditRecordAction, SetRecords } from "../Config/store/actions/RecordsActions"
import moment from "moment"
import { FIREBASE_Get, FIREBASE_Update, AssetTypesCollectionName, SectorsCollectionName, UserTypesCollectionName, StorageLocationsCollectionName, RecordsCollectionName, UsageTypesCollectionName, AssetStatusCollectionName, AssetsCollectionName, UsersCollectionName, FIREBASE_Add, FIREBASE_Delete } from "../Config/firebase/metodos"
import { DefaultUserRole } from "../Data/Items"
import { SetTemaAction } from "../Config/store/actions/ThemeActions"
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "../Config/firebase"
import { SetCheckLogin, SetLoggedUserPhotoUrlAction, SetSidebarTag, ToggleSideBar, setLoggedUser } from "../Config/store/actions/LoggedUserActions"

//UTILS

//DISPATCH TO STORE
const Dispatch = store.dispatch


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

//UPLOAD IMAGE TO FIREBASE STORAGE
export const ImageUpload = (ImagePath, ImageToUpload) => {
    const imageRef = ref(storage, ImagePath);
    return uploadBytes(imageRef, ImageToUpload)
}

//GET IMG URL FROM FIREBASE STORAGE
export const GetUserUrlImage = (path) => {
    return getDownloadURL(ref(storage, path))
}

//DELETE FILE FROM FIREBASE STORAGE
export const DeleteFile = (path) => {
    const desertRef = ref(storage, path);
    return deleteObject(desertRef)
}

//SET LOGGED USER PHOTO URL
export const SetLoggedUserPhotoUrl = (URL) => {
    const User = GetFromStore('CurrentUser')
    User.PhotoUrl = URL
    EditUserInFirebase(User)
    Dispatch(SetLoggedUserPhotoUrlAction(URL))
}

//SET LOGGED USER PHOTO URL IN STORE
export const SetLoggedUserPhotoUrlJustStore = (URL) => {
    Dispatch(SetLoggedUserPhotoUrlAction(URL))
}

//SET USER PHOTO URL
export const SetOtherUserPhotoUrl = (URL, ID) => {
    const User = GetFromStoreWithId('UsuariosWithDeleted', ID)
    User.PhotoUrl = URL
    EditUserInFirebase(User)
}

//SET ASSET PHOTO URL
export const SetAtivoPhotoUrl = (URL, AtivoId) => {
    const Ativo = GetFromStoreWithId('AtivosWithDeleted', AtivoId)
    Ativo.PhotoUrl = URL
    Ativo.LastEditedAt = moment().valueOf()
    UpdateInFirebase(AssetsCollectionName, Ativo)
}












////////// FIREBASE ////////////


export async function RegisterUser(Email) {
    return FIREBASE_RegisterUserAuth(Email)
}


//FIREBASE GET BASE
export async function GetFromFirebase(Collection) {
    return FIREBASE_Get(Collection)
}

//FIREBASE EDIT/UPDATES BASE
export const UpdateInFirebase = (Collection, Item) => FIREBASE_Update(Collection, { ...Item, LastEditedAt: moment().valueOf() })

//FIREBASE ADD BASE
export const AddToFirebase = (Collection, Item) =>
    FIREBASE_Add(Collection, {
        ...Item,
        CreatedAt: moment().valueOf(),
        LastEditedAt: moment().valueOf()
    })

//FIREBASE DELETE 
export const DeleteFromFirebase = (Collection, Item) => FIREBASE_Delete(Collection, Item)
export const DeleteAtivo = (Item) => UpdateInFirebase(AssetsCollectionName, { ...Item, Deleted: true })
export const DeleteUser = (Item) => UpdateInFirebase(UsersCollectionName, { ...Item, Deleted: true })



//FIREBASE --> GETS
export async function GetUsersFromFirebase() { return GetFromFirebase(UsersCollectionName) }
export async function GetAssetsFromFirebase() { return GetFromFirebase(AssetsCollectionName) }
export async function GetAssetTypesFromFirebase() { return GetFromFirebase(AssetTypesCollectionName) }
export async function GetSectorsFromFirebase() { return GetFromFirebase(SectorsCollectionName) }
export async function GetUserTypesFromFirebase() { return GetFromFirebase(UserTypesCollectionName) }
export async function GetStorageLocationsFromFirebase() { return GetFromFirebase(StorageLocationsCollectionName) }
export async function GetAssetStatusFromFirebase() { return GetFromFirebase(AssetStatusCollectionName) }
export async function GetUsageTypesFromFirebase() { return GetFromFirebase(UsageTypesCollectionName) }
export async function GetRecordsFromFirebase() { return GetFromFirebase(RecordsCollectionName) }

//FIREBASE --> UPDATES
export const EditUserInFirebase = (Item) => UpdateInFirebase(UsersCollectionName, Item)
export const EditAssetInFirebase = (Item) => UpdateInFirebase(AssetsCollectionName, Item)
export const EditAssetTypeInFirebase = (Item) => UpdateInFirebase(AssetTypesCollectionName, Item)
export const EditSectorInFirebase = (Item) => UpdateInFirebase(SectorsCollectionName, Item)
export const EditUserTypeInFirebase = (Item) => UpdateInFirebase(UserTypesCollectionName, Item)
export const EditStorageLocationInFirebase = (Item) => UpdateInFirebase(StorageLocationsCollectionName, Item)
export const EditAssetStatuInFirebase = (Item) => UpdateInFirebase(AssetStatusCollectionName, Item)
export const EditUsageTypeInFirebase = (Item) => UpdateInFirebase(UsageTypesCollectionName, Item)
export const EditRecordInFirebase = (Item) => UpdateInFirebase(RecordsCollectionName, Item)

//FIREBASE --> ADD
export const AddUserToFirebase = (Item) => AddToFirebase(UsersCollectionName, Item)
export const AddAssetToFirebase = (Item) => AddToFirebase(AssetsCollectionName, Item)
export const AddAssetTypeToFirebase = (Item) => AddToFirebase(AssetTypesCollectionName, Item)
export const AddSectorToFirebase = (Item) => AddToFirebase(SectorsCollectionName, Item)
export const AddUserTypeToFirebase = (Item) => AddToFirebase(UserTypesCollectionName, Item)
export const AddStorageLocationToFirebase = (Item) => AddToFirebase(StorageLocationsCollectionName, Item)
export const AddAssetStatuToFirebase = (Item) => AddToFirebase(AssetStatusCollectionName, Item)
export const AddUsageTypeToFirebase = (Item) => AddToFirebase(UsageTypesCollectionName, Item)
export const AddRecordToFirebase = (Item) => AddToFirebase(RecordsCollectionName, Item)


//FIREBASE --> ADD
export const DeleteUserFromFirebase = (Item) => DeleteFromFirebase(UsersCollectionName, Item)
export const DeleteAssetFromFirebase = (Item) => DeleteFromFirebase(AssetsCollectionName, Item)
export const DeleteAssetTypeFromFirebase = (Item) => DeleteFromFirebase(AssetTypesCollectionName, Item)
export const DeleteSectorFromFirebase = (Item) => DeleteFromFirebase(SectorsCollectionName, Item)
export const DeleteUserTypeFromFirebase = (Item) => DeleteFromFirebase(UserTypesCollectionName, Item)
export const DeleteStorageLocationFromFirebase = (Item) => DeleteFromFirebase(StorageLocationsCollectionName, Item)
export const DeleteAssetStatuFromFirebase = (Item) => DeleteFromFirebase(AssetStatusCollectionName, Item)
export const DeleteUsageTypeFromFirebase = (Item) => DeleteFromFirebase(UsageTypesCollectionName, Item)
export const DeleteRecordFromFirebase = (Item) => DeleteFromFirebase(RecordsCollectionName, Item)















////////// STORE ////////////


//STORE EDIT
export const EditRecordStore = (Item) => Dispatch(EditRecordAction(Item))
export const EditAssetOnStore = (Item) => Dispatch(EditAtivoAction(Item))
export const EditUserOnStore = (Item) => Dispatch(EditUsuarioAction(Item))
//STORE SET
export const SetLoggedUserOnStore = (Item) => Dispatch(setLoggedUser(Item))
export const SetSidebarTagOnStore = (Item) => Dispatch(SetSidebarTag(Item))
export const SetCheckLoginOnStore = (Item) => Dispatch(SetCheckLogin())
export const SetUserTypesOnStore = (Itens) => Dispatch(SetTiposUsuarios(Itens))
export const SetUsersOnStore = (Itens) => Dispatch(SetUsuarios(Itens))
export const SetSectorsOnStore = (Itens) => Dispatch(SetSetores(Itens))
export const SetAssetTypesOnStore = (Itens) => Dispatch(SetTiposAtivos(Itens))
export const SetAssetsOnStore = (Itens) => Dispatch(SetAtivos(Itens))
export const SetStorageLocationsOnStore = (Itens) => Dispatch(SetStorageLocations(Itens))
export const SetAssetStatusOnStore = (Itens) => Dispatch(SetStatusAtivos(Itens))
export const SetUsageTypesOnStore = (Itens) => Dispatch(SetTiposDeUso(Itens))
export const SetRecordsOnStore = (Itens) => Dispatch(SetRecords(Itens))
export const ToggleSideBarVisibility = (Item) => Dispatch(ToggleSideBar())
//STORE ADD
export const AddAtivoStore = (Item) => Dispatch(AddAtivoAction(Item))
export const AddUserToStore = (Item) => Dispatch(AddUsuarioAction(Item))





//GET THEME
export async function GetTema() {
    if (!localStorage.getItem('AssetSenseTema')) {
        localStorage.setItem('AssetSenseTema', 'Claro')
        Dispatch(SetTemaAction("Claro"))
    } else {
        Dispatch(SetTemaAction(localStorage.getItem('AssetSenseTema')))
    }
}

//TOGGLE THEME
export async function ToggleTema() {
    const Tema = localStorage.getItem('AssetSenseTema')
    if (Tema === 'Escuro') {
        Dispatch(SetTemaAction("Claro"))
        localStorage.setItem('AssetSenseTema', 'Claro')
    }
    if (Tema === 'Claro') {
        Dispatch(SetTemaAction("Escuro"))
        localStorage.setItem('AssetSenseTema', 'Escuro')
    }
}

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
    const Users = [...GetFromStore('Usuarios')].filter(User => User.id !== Current.id)
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

    SetRecordsOnStore(Records)

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

    SetRecordsOnStore(Records)

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








export const SetInStoreFunctions = {
    "TiposAtivos": SetAssetTypesOnStore,
    "Setores": SetSectorsOnStore,
    "TiposUsuarios": SetUserTypesOnStore,
    "Locais": SetStorageLocationsOnStore,
    "StatusAtivos": SetAssetStatusOnStore,
    "TiposUso": SetUsageTypesOnStore
};

export const UpdateInFirebaseFunctions = {
    "TiposAtivos": (Item) => EditAssetTypeInFirebase(Item),
    "Setores": (Item) => EditSectorInFirebase(Item),
    "TiposUsuarios": (Item) => EditUserTypeInFirebase(Item),
    "Locais": (Item) => EditStorageLocationInFirebase(Item),
    "StatusAtivos": (Item) => EditAssetStatuInFirebase(Item),
    "TiposUso": (Item) => EditUsageTypeInFirebase(Item),
};

export const DeleteFromFirebaseFunctions = {
    "TiposAtivos": (Item) => DeleteAssetTypeFromFirebase(Item),
    "Setores": (Item) => DeleteSectorFromFirebase(Item),
    "TiposUsuarios": (Item) => DeleteUserTypeFromFirebase(Item),
    "Locais": (Item) => DeleteStorageLocationFromFirebase(Item),
    "StatusAtivos": (Item) => DeleteAssetStatuFromFirebase(Item),
    "TiposUso": (Item) => DeleteUsageTypeFromFirebase(Item),
};

export const AddToFirebaseFunctions = {
    "TiposAtivos": (Item) => AddAssetTypeToFirebase(Item),
    "Setores": (Item) => AddSectorToFirebase(Item),
    "TiposUsuarios": (Item) => AddUserTypeToFirebase(Item),
    "Locais": (Item) => AddStorageLocationToFirebase(Item),
    "StatusAtivos": (Item) => AddAssetStatuToFirebase(Item),
    "TiposUso": (Item) => AddUsageTypeToFirebase(Item),
};

export const GetFromStoreFunctions = {
    "TiposAtivos": () => GetFromStore('TiposAtivos'),
    "Setores": () => GetFromStore('Setores'),
    "TiposUsuarios": () => GetFromStore('TiposUsuarios'),
    "Locais": () => GetFromStore('StorageLocations'),
    "StatusAtivos": () => GetFromStore('StatusAtivos'),
    "TiposUso": () => GetFromStore('TiposDeUso')
};
