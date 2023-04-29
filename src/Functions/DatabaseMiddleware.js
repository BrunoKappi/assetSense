
import moment from "moment"
import {
    FIREBASE_Get, FIREBASE_Update,
    AssetTypesCollectionName,
    SectorsCollectionName,
    UserTypesCollectionName,
    StorageLocationsCollectionName,
    RecordsCollectionName,
    UsageTypesCollectionName,
    AssetStatusCollectionName,
    AssetsCollectionName,
    UsersCollectionName,
    FIREBASE_Add,
    FIREBASE_Delete
} from "../Config/firebase/metodos"
import { SetLoggedUserPhotoUrlAction } from "../Config/store/actions/LoggedUserActions"
import { Dispatch, GetFromStore, GetFromStoreWithId, SetRecordsOnStore } from "./StoreMiddleware"


//DATABASE COLLECTIONS
const Collections = {
    "AssetType": AssetTypesCollectionName,
    "Sector": SectorsCollectionName,
    "UserType": UserTypesCollectionName,
    "StorageLocation": StorageLocationsCollectionName,
    "AssetsStatus": AssetStatusCollectionName,
    "UsageType": UsageTypesCollectionName,
    "User": UsersCollectionName,
    "Asset": AssetsCollectionName,
    "Record": RecordsCollectionName,
}


//SET LOGGED USER PHOTO URL
export const SetLoggedUserPhotoUrl = (URL) => {
    const User = GetFromStore('CurrentUser')
    User.PhotoUrl = URL
    UpdateInFirebaseFunctions["User"](User)
    Dispatch(SetLoggedUserPhotoUrlAction(URL))
}

//SET USER PHOTO URL
export const SetOtherUserPhotoUrl = (URL, ID) => {
    const User = GetFromStoreWithId('UsersWithDeleted', ID)
    User.PhotoUrl = URL
    UpdateInFirebaseFunctions["User"](User)
}

//SET ASSET PHOTO URL
export const SetAssetPhotoUrl = (URL, AssetId) => {
    const Asset = GetFromStoreWithId('AssetsWithDeleted', AssetId)
    Asset.PhotoUrl = URL
    Asset.LastEditedAt = moment().valueOf()
    Edit("Asset", Asset)
}


//////////CRUD

//GET
export const GetFromDatabase = (What) => {
    const Collection = Collections[What]
    return FIREBASE_Get(Collection)
}

//EDIT
export const EditInDatabase = (What, Item) => {
    const Collection = Collections[What]
    return FIREBASE_Update(Collection, { ...Item, LastEditedAt: moment().valueOf() })
}

//ADD
export const AddToDatabase = (What, Item) => {
    const Collection = Collections[What]
    return FIREBASE_Add(Collection, {
        ...Item,
        CreatedAt: moment().valueOf(),
        LastEditedAt: moment().valueOf()
    })
}

//DELETE
export const DeleteFromDatabase = (What, Item) => {
    const Collection = Collections[What]
    if (What !== "User" && What !== "Asset")
        return FIREBASE_Delete(Collection, Item)
    else
        FIREBASE_Update(Collection, { ...Item, Deleted: true, LastEditedAt: moment().valueOf() })
}




//VERIFICA SE  ALGUM ASSET DO TYPE FOI RETIRADO
export const ReturnAllAssetsOfUserWithId = (UserId) => {
    const Records = GetFromStore('RecordsAssets')

    Records.forEach(Record => {
        if (Record.TakenFor.id === UserId) {
            Record.ReturnDate = moment().valueOf()
            Record.Duration = moment().valueOf() - Record.TakeDate
            Record.TakenForDeleted = true
            if (Record.TakenBy.id === UserId)
                Record.TakenByDeleted = true
            Edit("Record", Record)

        }
        else if (Record.TakenBy.id === UserId) {
            Record.TakenByDeleted = true
            Edit("Record", Record)
        }


    })

    SetRecordsOnStore(Records)

}



//VERIFICA SE  ALGUM ASSET DO TYPE FOI RETIRADO
export const ReturnAllRecordOfAssetwithId = (AssetId) => {
    const Records = GetFromStore('RecordsAssets')

    Records.forEach(Record => {
        if (Record.AtivoId === AssetId) {
            Record.ReturnDate = moment().valueOf()
            Record.Duration = moment().valueOf() - Record.TakeDate
            Record.AssetDeleted = true
            Edit("Record", Record)
        }
    })

    SetRecordsOnStore(Records)

}




 

export const GetFromFirebaseFunctions = {
    "AssetTypes": () => GetFromDatabase("AssetType"),
    "Sectors": () => GetFromDatabase("Sector"),
    "UserTypes": () => GetFromDatabase("UserType"),
    "StorageLocations": () => GetFromDatabase("StorageLocation"),
    "AssetsStatus": () => GetFromDatabase("AssetsStatus"),
    "UsageTypes": () => GetFromDatabase("UsageType"),
    "Users": () => GetFromDatabase("User"),
    "Assets": () => GetFromDatabase("Asset"),
    "Records": () => GetFromDatabase("Record"),
};


export const UpdateInFirebaseFunctions = {
    "AssetTypes": (Item) => EditInDatabase("AssetType", Item),
    "Sectors": (Item) => EditInDatabase("Sector", Item),
    "UserTypes": (Item) => EditInDatabase("UserType", Item),
    "StorageLocations": (Item) => EditInDatabase("StorageLocation", Item),
    "AssetsStatus": (Item) => EditInDatabase("AssetsStatus", Item),
    "UsageTypes": (Item) => EditInDatabase("UsageType", Item),
    "User": (Item) => EditInDatabase("User", Item),
    "Asset": (Item) => EditInDatabase("Asset", Item),
    "Record": (Item) => EditInDatabase("Record", Item),
};

export const DeleteFromFirebaseFunctions = {
    "AssetTypes": (Item) => DeleteFromDatabase("AssetType", Item),
    "Sectors": (Item) => DeleteFromDatabase("Sector", Item),
    "UserTypes": (Item) => DeleteFromDatabase("UserType", Item),
    "StorageLocations": (Item) => DeleteFromDatabase("StorageLocation", Item),
    "AssetsStatus": (Item) => DeleteFromDatabase("AssetsStatus", Item),
    "UsageTypes": (Item) => DeleteFromDatabase("UsageType", Item),
    "User": (Item) => DeleteFromDatabase("User", Item),
    "Asset": (Item) => DeleteFromDatabase("Asset", Item),
};


export const AddToFirebaseFunctions = {
    "AssetTypes": (Item) => AddToDatabase("AssetType", Item),
    "Sectors": (Item) => AddToDatabase("Sector", Item),
    "UserTypes": (Item) => AddToDatabase("UserType", Item),
    "StorageLocations": (Item) => AddToDatabase("StorageLocation", Item),
    "AssetsStatus": (Item) => AddToDatabase("AssetsStatus", Item),
    "UsageTypes": (Item) => AddToDatabase("UsageType", Item),
    "User": (Item) => AddToDatabase("User", Item),
    "Asset": (Item) => AddToDatabase("Asset", Item),
    "Record": (Item) => AddToDatabase("Record", Item),
};

