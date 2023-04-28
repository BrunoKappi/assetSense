import { combineReducers, createStore } from 'redux'
import LoggedUser from './reducers/LoggedUser'
import Sectors from './reducers/Sectors'
import UserTypes from './reducers/UserTypes'
import Users from './reducers/Users'
import AssetTypes from './reducers/AssetTypes'
import Assets from './reducers/Assets'
import Tema from './reducers/Theme'
import AssetsStatus from './reducers/AssetsStatus'
import UsageTypes from './reducers/UsageTypes'
import RecordsAssets from './reducers/Records'
import StorageLocations from './reducers/StorageLocations'

import {
    SetAssetStatusOnStore,
    SetAssetTypesOnStore,
    SetAssetsOnStore,
    SetRecordsOnStore,
    SetSectorsOnStore,
    SetStorageLocationsOnStore,
    SetUsageTypesOnStore,
    SetUserTypesOnStore,
    SetUsersOnStore
} from '../../Functions/StoreMiddleware'



//TO INITIATE COLLECTIONS NAMES
import { AssetsCollectionName } from '../firebase/metodos'
import { GetFromFirebaseFunctions } from '../../Functions/DatabaseMiddleware'



GetFromFirebaseFunctions["UserTypes"]().then((Itens) => SetUserTypesOnStore(Itens))

GetFromFirebaseFunctions["Users"]().then((Itens) => SetUsersOnStore(Itens))

GetFromFirebaseFunctions["Sectors"]().then((Itens) => SetSectorsOnStore(Itens))

GetFromFirebaseFunctions["AssetTypes"]().then((Itens) => SetAssetTypesOnStore(Itens))

GetFromFirebaseFunctions["Assets"]().then((Itens) => SetAssetsOnStore(Itens))

GetFromFirebaseFunctions["StorageLocations"]().then((Itens) => SetStorageLocationsOnStore(Itens))

GetFromFirebaseFunctions["AssetsStatus"]().then((Itens) => SetAssetStatusOnStore(Itens))

GetFromFirebaseFunctions["UsageTypes"]().then((Itens) => SetUsageTypesOnStore(Itens))

GetFromFirebaseFunctions["Records"]().then((Itens) => SetRecordsOnStore(Itens))





const store = createStore(
    combineReducers({
        LoggedUser,
        Sectors,
        UserTypes,
        Users,
        AssetTypes,
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
    //console.log("Store Changed", store.getState())
})


export default store





