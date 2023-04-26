import { combineReducers, createStore } from 'redux'
import LoggedUser from './reducers/LoggedUser'
import Sectors from './reducers/Sectors'
import UserTypes from './reducers/UserTypes'
import Users from './reducers/Users'
import AssetTypess from './reducers/AssetTypes'
import Assets from './reducers/Assets'
import Tema from './reducers/Theme'
import AssetsStatus from './reducers/AssetsStatus'
import UsageTypes from './reducers/UsageTypes'
import RecordsAssets from './reducers/Records'
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
        Sectors,
        UserTypes,
        Users,
        AssetTypess,
        Assets,
        StorageLocations,
        AssetsStatus,
        UsageTypes,
        RecordsAssets,
        Tema
    }),
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => {
    localStorage.setItem("AssetSense", JSON.stringify(store.getState()))
    console.log("Store Changed", store.getState())
})


export default store





