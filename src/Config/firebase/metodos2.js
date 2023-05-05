
import { db } from '../firebase/index'
import { collection, collectionGroup, getDoc, query, setDoc } from "firebase/firestore";
import { getDocs, addDoc, updateDoc, deleteDoc, doc, where } from "firebase/firestore";

//TENANT E DATABASE
export const TenantName = "Serrano"
export const DatabaseName = "Dados"

//COLLECTIONS NAMES   
export const SectorsCollectionName = 'Departments'
export const UserTypesCollectionName = 'UserTypes'
export const AssetTypesCollectionName = 'AssetTypes'
export const StorageLocationsCollectionName = 'StorageLocations'
export const AssetStatusCollectionName = 'AssetStatus'
export const UsageTypesCollectionName = 'UsageTypes'
export const UsersCollectionName = 'Users'
export const AssetsCollectionName = 'Assets'
export const RecordsCollectionName = 'AssetTransactions'
export const RequestsCollectionName = 'Requests'
export const RequestsStatusCollectionName = 'RequestStatus'
export const RequestsTypesCollectionName = 'RequestTypes'


export const CreateTenant = async (TenantName, DatabaseName) => {
  const docRef = doc(db, TenantName, DatabaseName);
  await setDoc(docRef, {});
  console.log('Tenant Adicionado com sucesso!');
}


//ADD   
export const FIREBASE_Add = async (Collection, Item) => {
  const ParentDocRef = doc(collection(db, TenantName), DatabaseName);
  const NestedCollectionName = collection(ParentDocRef, Collection);
  return addDoc(NestedCollectionName, Item)
}

//GET   
export const FIREBASE_Get = async (Collection) => {
  const Tenant = collection(db, TenantName)
  const DatabaseDoc = doc(Tenant, DatabaseName)
  const CollectionRef = collection(DatabaseDoc, Collection)
  const data = await getDocs(CollectionRef)
  const DocsList = data.docs.map((doc) => ({ ...doc.data(), docID: doc.id }))
  return DocsList
}


//UPDATE   
export const FIREBASE_Update = async (Collection, Item) => {

  const Tenant = collection(db, TenantName)
  const DatabaseDoc = doc(Tenant, DatabaseName)
  const collectionRef = collection(DatabaseDoc, Collection)

  if (!Item.docID) {
    FIREBASE_GetDocIDById(Collection, Item.id).then((docID) => {
      const Doc = doc(collectionRef, docID)
      Item.docID = docID
      return updateDoc(Doc, Item);
    })
  } else {
    const docRef = doc(collectionRef, Item.docID)
    return updateDoc(docRef, Item)
  }

}


//DELETE   
export const FIREBASE_Delete = async (Collection, Item) => {

  const Tenant = collection(db, TenantName)
  const DatabaseDoc = doc(Tenant, DatabaseName)
  const collectionRef = collection(DatabaseDoc, Collection)

  if (!Item.docID) {
    FIREBASE_GetDocIDById(Collection, Item.id).then((docID) => {
      const Doc = doc(collectionRef, docID)
      Item.docID = docID
      return deleteDoc(Doc, Item);
    })
  } else {
    const docRef = doc(collectionRef, Item.docID)
    return deleteDoc(docRef, Item)
  }

}


export const FIREBASE_GetDocIDById = async (Collection, id) => {
  const Tenant = collection(db, TenantName)
  const DatabaseDoc = doc(Tenant, DatabaseName)
  const CollectionRef = collection(DatabaseDoc, Collection)

  // Adiciona a query para buscar documentos com o campo "id" igual a "id"
  const Query = query(CollectionRef, where("id", "==", id));

  const data = await getDocs(Query);

  const DocsList = data.docs.map((doc) => ({ ...doc.data(), docID: doc.id }))
  const matchedDoc = DocsList[0];
  return matchedDoc.docID;
}


export const FIREBASE_GetRecordsNotReturnByAsset = async (assetId) => {

  const Tenant = collection(db, TenantName)
  const DatabaseDoc = doc(Tenant, DatabaseName)
  const CollectionRef = collection(DatabaseDoc, RecordsCollectionName)

  const Query = query(
    CollectionRef,
    where('ReturnDate', '==', ''),
    where('AssetId', '==', assetId)
  );
  const data = await getDocs(Query);
  const dados = data.docs.map((doc) => ({ ...doc.data(), docID: doc.id }));

  return dados.length;
};