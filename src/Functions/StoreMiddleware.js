import store from "../Config/store/store"

import { SetAssetTypes } from "../Config/store/actions/AssetTypesActions"
import { SetSectors } from "../Config/store/actions/SectorsActions"
import { SetUserTypes } from "../Config/store/actions/UserTypesActions"
import { SetStorageLocations } from "../Config/store/actions/StorageLocationsActions"
import { SetAssetsStatus } from "../Config/store/actions/AssetsStatusActions"
import { SetUsageTypes } from "../Config/store/actions/UsageTypesActions"
import { AddAssetAction, EditAssetAction, SetAssets } from "../Config/store/actions/AssetsActions"
import { AddUserAction, EditUserAction, SetUsers } from "../Config/store/actions/UsersActions"
import { PermitIndexs } from "../GlobalVars"
import { EditRecordAction, SetRecords } from "../Config/store/actions/RecordsActions"
import { DefaultUserRole } from "../Data/Items"
import { SetTemaAction } from "../Config/store/actions/ThemeActions"
import { SetCheckLogin, SetLoggedUserPhotoUrlAction, SetSidebarTag, ToggleSideBar, setLoggedUser } from "../Config/store/actions/LoggedUserActions"

//UTILS

//DISPATCH TO STORE
export const Dispatch = store.dispatch



//SET LOGGED USER PHOTO URL IN STORE
export const SetLoggedUserPhotoUrlJustStore = (URL) => {
    Dispatch(SetLoggedUserPhotoUrlAction(URL))
}


//STORE EDIT
export const EditRecordStore = (Item) => Dispatch(EditRecordAction(Item))
export const EditAssetOnStore = (Item) => Dispatch(EditAssetAction(Item))
export const EditUserOnStore = (Item) => Dispatch(EditUserAction(Item))
//STORE SET
export const SetLoggedUserOnStore = (Item) => Dispatch(setLoggedUser(Item))
export const SetSidebarTagOnStore = (Item) => Dispatch(SetSidebarTag(Item))
export const SetCheckLoginOnStore = (Item) => Dispatch(SetCheckLogin())
export const SetUserTypesOnStore = (Itens) => Dispatch(SetUserTypes(Itens))
export const SetUsersOnStore = (Itens) => Dispatch(SetUsers(Itens))
export const SetSectorsOnStore = (Itens) => Dispatch(SetSectors(Itens))
export const SetAssetTypesOnStore = (Itens) => Dispatch(SetAssetTypes(Itens))
export const SetAssetsOnStore = (Itens) => Dispatch(SetAssets(Itens))
export const SetStorageLocationsOnStore = (Itens) => Dispatch(SetStorageLocations(Itens))
export const SetAssetStatusOnStore = (Itens) => Dispatch(SetAssetsStatus(Itens))
export const SetUsageTypesOnStore = (Itens) => Dispatch(SetUsageTypes(Itens))
export const SetRecordsOnStore = (Itens) => Dispatch(SetRecords(Itens))
export const ToggleSideBarVisibility = (Item) => Dispatch(ToggleSideBar())
//STORE ADD
export const AddAssetStore = (Item) => Dispatch(AddAssetAction(Item))
export const AddUserToStore = (Item) => Dispatch(AddUserAction(Item))





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

    if (Key === 'Assets' || Key === 'Users')
        return StoreList[Key].filter(Item => Item.Deleted === false)
    else if (Key === 'AssetsWithDeleted' || Key === 'UsersWithDeleted')
        return StoreList[Key.replace(/WithDeleted/g, "")]
    else if (Key === 'CurrentUser')
        return StoreList.Users.find(U => U.Email === GetLoggedUserInfo('Email'))
    else if (Key === 'CurrentUserType') {
        const CurrentUser = StoreList.Users.find(U => U.Email === GetLoggedUserInfo('Email'))
        const CurrentUserType = GetFromStore('UserTypes').find(U => U.id === CurrentUser?.Type?.id)
        return CurrentUserType ? CurrentUserType : DefaultUserRole
    }
    else
        return StoreList[Key]
}


// USERS THAT TOOK AN ASSET / NO CURRENT USER 
export const GetUsersThatNotTookAsset = (AssetId) => {
    const Current = GetFromStore('CurrentUser')
    const UsersThatTook = GetUsersThatTookAsset(AssetId)
    const Users = [...GetFromStore('Users')].filter(User => User.id !== Current.id)
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
    const Users = GetFromStore('UsersWithDeleted')
    const User = Users.find(U => U.Email === Email)
    return User
}

//GET NAME FROM STORE WITH ID
export const GetNameFromStoreWithId = (Reducer, Id) => {
    const StoreList = store.getState()
    const List = StoreList[Reducer.replace(/WithDeleted/g, "")]

    if (Reducer === 'AssetsWithDeleted' || Reducer === 'Assets')
        return List.find(U => U.id === Id)?.Item || ''
    if (Reducer === 'UsersWithDeleted' || Reducer === 'Users') {
        const User = List.find(User => User.id === Id)
        const Name = User?.Name + ' ' + User?.LastName
        return Name
    }
    else
        return List.find(U => U.id === Id)?.Value || ''
}

// GET NAME WITH ID
export const GetCurrentUserSectorNameWithIdFromStore = (Id) => {
    if (!Id) return 'Selecione um Sector'
    const Sectors = GetFromStore('Sectors')
    const Name = Sectors.find(Sector => Sector.id === Id).Value
    return Name ? Name : ''
}

export const GetCurrentUserTypeNameWithIdFromStore = (Id) => {
    if (!Id) return 'Selecione um Tipo de Usuário'
    const Types = GetFromStore('UserTypes')
    const Name = Types.find(Type => Type.id === Id).Value
    return Name
}


//VERIFICA SE  ALGUM ASSET DO TYPE FOI RETIRADO
export const CheckIfAnyAssetOfStatusTaken2 = (StatusId) => {
    const Assets = GetFromStore('Assets')
    const AssetsOfStatus = Assets.filter(Asset => Asset.Status.id === StatusId)
    const AssetsTaken = AssetsOfStatus.filter(Asset => Asset.QtdInUse > 0);
    return AssetsTaken?.length > 0 ? true : false
}



// OTHER GETTERS 
export const GetCurrentUserTypePermitFromStore = (Permit) => {
    const CurrentUserType = GetFromStore('CurrentUserType')
    return CurrentUserType?.Permits[PermitIndexs[Permit]]
}

//Quantidade Retirada sem devolução de um determinado Ativo 
export const GetTakesOfAsset = (ID) => {
    var Records1 = [...GetFromStore('RecordsAssets')]
    const Qtd = Records1.filter(Record => Record.AtivoId === ID && !Record.ReturnDate)
    return Qtd ? Qtd.length : 0
}

//Quantidade Retirada sem devolução de um determinado Ativo 
export const GetRecordsOfAsset = (ID) => {
    var Records1 = [...GetFromStore('RecordsAssets')]
    return Records1.filter(Record => Record.AtivoId === ID)
}
//REGISTROS DE UM USER
export const GetRecordsOfUser = (ID) => {
    var Records1 = [...GetFromStore('RecordsAssets')]
    return Records1.filter(Record => Record.TakenFor.id === ID)
}

//Quantidade Retirada sem devolução de um determinado Ativo pelo CurrentUser
export const GetTakesOfAssetOfCurrentUser = (ID) => {
    const CurrentUser = GetFromStore('CurrentUser')
    var Records2 = [...GetFromStore('RecordsAssets')]
    const Qtd = Records2.filter(Record => Record.AtivoId === ID && !Record.ReturnDate && Record.TakenFor.id === CurrentUser.id)
    return Qtd ? Qtd.length : 0
}

//Quantidade Retirada DE UM ASSET PELO ID
export const GetQtdInUseOfAssetWithId = (ID) => {
    const Asset = GetFromStoreWithId('AssetsWithDeleted', ID)
    return Asset?.QtdInUse ? Asset?.QtdInUse : 0
}

//Users que Pegaram um determinado Ativo, menos o currentuser
export const GetUsersThatTookAsset = (ID) => {
    const CurrentUser = GetFromStore('CurrentUser')
    var Records3 = [...GetFromStore('RecordsAssets')]
    const AssetsPegos = Records3.filter(Record => Record.AtivoId === ID && !Record.ReturnDate)

    const Users = GetFromStore('Users')
    const UsersThatTook = Users.filter(user => AssetsPegos.some(AssetPego => AssetPego.TakenFor.id === user.id && user.id !== CurrentUser.id));

    return UsersThatTook
}


//Users que Pegaram um determinado Ativo, menos o currentuser
export const GetAllUsersThatTookAsset = (ID) => {
    var Records3 = [...GetFromStore('RecordsAssets')]
    const AssetsPegos = Records3.filter(Record => Record.AtivoId === ID && !Record.ReturnDate)

    const Users = GetFromStore('Users')
    const UsersThatTook = Users.filter(user => AssetsPegos.some(AssetPego => AssetPego.TakenFor.id === user.id));

    return UsersThatTook
}

//GET ALL NAMES OF USERS THAT TOOK ASSETS
export const GetNamesOfUsersThatTookAsset = (AssetId) => {
    const UsersThatTook = GetAllUsersThatTookAsset(AssetId)
    const UserNames = UsersThatTook.map(User => {
        return User.Name
    })
    
    return UserNames ? UserNames.join() : ''
}

export const GetRecordByAssetIdAndUserId = (AssetId, UserId) => {
    var Records4 = [...GetFromStore('RecordsAssets')]
    const Record = Records4.filter(Record => Record.AtivoId === AssetId && Record.TakenFor.id === UserId && !Record.ReturnDate)[0]
    return Record
}




export const SetInStoreFunctions = {
    "AssetTypes": SetAssetTypesOnStore,
    "Sectors": SetSectorsOnStore,
    "UserTypes": SetUserTypesOnStore,
    "StorageLocations": SetStorageLocationsOnStore,
    "AssetsStatus": SetAssetStatusOnStore,
    "UsageTypes": SetUsageTypesOnStore
};


export const GetFromStoreFunctions = {
    "AssetTypes": () => GetFromStore('AssetTypes'),
    "Sectors": () => GetFromStore('Sectors'),
    "UserTypes": () => GetFromStore('UserTypes'),
    "StorageLocations": () => GetFromStore('StorageLocations'),
    "AssetsStatus": () => GetFromStore('AssetsStatus'),
    "UsageTypes": () => GetFromStore('UsageTypes')
};
