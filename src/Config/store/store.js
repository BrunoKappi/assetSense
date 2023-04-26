import { combineReducers, createStore } from 'redux'
import LoggedUser from './reducers/LoggedUser'
import Setores from './reducers/Sectors'
import TiposUsuarios from './reducers/UserTypes'
import Usuarios from './reducers/Users'
import TiposAtivos from './reducers/AssetTypes'
import Ativos from './reducers/Assets'
import Tema from './reducers/Theme'
import StatusAtivos from './reducers/AssetsStatus'
import TiposDeUso from './reducers/UsageTypes'
import RecordsAtivos from './reducers/Records'
import StorageLocations from './reducers/StorageLocations'

import {
    GetAssetStatusFromFirebase,
    GetAssetTypesFromFirebase,
    GetAssetsFromFirebase,
    GetRecordsFromFirebase,
    GetSectorsFromFirebase,
    GetStorageLocationsFromFirebase,
    GetUsageTypesFromFirebase,
    GetUserTypesFromFirebase,
    GetUsersFromFirebase,
    SetAssetStatusOnStore,
    SetAssetTypesOnStore,
    SetAssetsOnStore,
    SetRecordsOnStore,
    SetSectorsOnStore,
    SetStorageLocationsOnStore,
    SetUsageTypesOnStore,
    SetUserTypesOnStore,
    SetUsersOnStore
} from '../../Functions/Middleware'

//TO INITIATE COLLECTIONS NAMES
import { AssetsCollectionName } from '../firebase/metodos'



GetUserTypesFromFirebase().then((Itens) => SetUserTypesOnStore(Itens))

GetUsersFromFirebase().then((Itens) => SetUsersOnStore(Itens))

GetSectorsFromFirebase().then((Itens) => SetSectorsOnStore(Itens))

GetAssetTypesFromFirebase().then((Itens) => SetAssetTypesOnStore(Itens))

GetAssetsFromFirebase().then((Itens) => SetAssetsOnStore(Itens))

GetStorageLocationsFromFirebase().then((Itens) => SetStorageLocationsOnStore(Itens))

GetAssetStatusFromFirebase().then((Itens) => SetAssetStatusOnStore(Itens))

GetUsageTypesFromFirebase().then((Itens) => SetUsageTypesOnStore(Itens))

GetRecordsFromFirebase().then((Itens) => SetRecordsOnStore(Itens))






const store = createStore(
    combineReducers({
        LoggedUser,
        Setores,
        TiposUsuarios,
        Usuarios,
        TiposAtivos,
        Ativos,
        StorageLocations,
        StatusAtivos,
        TiposDeUso,
        RecordsAtivos,
        Tema
    }),
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => {
    localStorage.setItem("AssetSense", JSON.stringify(store.getState()))
    console.log("Store Changed", store.getState())
})


export default store





