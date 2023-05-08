import { combineReducers, createStore } from 'redux'
import LoggedUser from './reducers/LoggedUser'
import Sectors from './reducers/Sectors'
import UserTypes from './reducers/UserTypes'
import Users from './reducers/Users'
import AssetTypes from './reducers/AssetTypes'
import Assets from './reducers/Assets'
import Tema from './reducers/Theme'
import Tenant from './reducers/Tenant'
import AssetsStatus from './reducers/AssetsStatus'
import UsageTypes from './reducers/UsageTypes'
import TenantPhotos from './reducers/TenantPhotos'
import RecordsAssets from './reducers/Records'
import Requests from './reducers/Requests'
import CurrentUser from './reducers/CurrentUser'
import RequestsStatus from './reducers/RequestsStatus'
import RequestsTypes from './reducers/RequestsTypes'
import StorageLocations from './reducers/StorageLocations'

import {
    SetAssetStatusOnStore,
    SetAssetTypesOnStore,
    SetAssetsOnStore,
    SetRecordsOnStore,
    SetRequestsOnStore,
    SetRequestsStatusOnStore,
    SetRequestsTypesOnStore,
    SetSectorsOnStore,
    SetStorageLocationsOnStore,
    SetUsageTypesOnStore,
    SetUserTypesOnStore,
    SetUsersOnStore,

} from '../../Functions/StoreMiddleware'




import { GetFromFirebaseFunctions } from '../../Functions/DatabaseMiddleware'


export const FillStore = () => {
    GetFromFirebaseFunctions["UserTypes"]().then((Itens) => {
        SetUserTypesOnStore(Itens)
    })

    GetFromFirebaseFunctions["Users"]().then((Itens) => {
        SetUsersOnStore(Itens)
    })

    GetFromFirebaseFunctions["Sectors"]().then((Itens) => {
        SetSectorsOnStore(Itens)
    })

    GetFromFirebaseFunctions["AssetTypes"]().then((Itens) => {
        SetAssetTypesOnStore(Itens)
    })

    GetFromFirebaseFunctions["Assets"]().then((Itens) => {
        SetAssetsOnStore(Itens)
    })

    GetFromFirebaseFunctions["StorageLocations"]().then((Itens) => {
        SetStorageLocationsOnStore(Itens)
    })

    GetFromFirebaseFunctions["AssetsStatus"]().then((Itens) => {
        SetAssetStatusOnStore(Itens)
    })

    GetFromFirebaseFunctions["UsageTypes"]().then((Itens) => {
        SetUsageTypesOnStore(Itens)
    })

    GetFromFirebaseFunctions["Records"]().then((Itens) => {
        SetRecordsOnStore(Itens)
    })

    GetFromFirebaseFunctions["Requests"]().then((Itens) => {
        SetRequestsOnStore(Itens)
    })

    GetFromFirebaseFunctions["RequestsTypes"]().then((Itens) => {
        SetRequestsTypesOnStore(Itens)
    })

    GetFromFirebaseFunctions["RequestsStatus"]().then((Itens) => {
        SetRequestsStatusOnStore(Itens)
    })
}






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
        Tema,
        Requests,
        RequestsStatus,
        RequestsTypes,
        Tenant,
        TenantPhotos,
        CurrentUser

    }),
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => {
    localStorage.setItem("AssetSense", JSON.stringify(store.getState()))
    //console.log("Store Changed", store.getState())
    //console.log("Tenant ==>", store.getState() || 'VAZIO')
})


export default store





