
import { db } from '../firebase/index'
import { collection, query } from "firebase/firestore";
import { getDocs, addDoc, updateDoc, deleteDoc, doc, where } from "firebase/firestore";

//COLLECTIONS NAMES   
export const SectorsCollectionName = 'Setores'
export const UserTypesCollectionName = 'TiposUsuarios'
export const AssetTypesCollectionName = 'TiposAtivo'
export const StorageLocationsCollectionName = 'LocaisArmazenamento'
export const AssetStatusCollectionName = 'StatusAtivos'
export const UsageTypesCollectionName = 'TiposUso'
export const UsersCollectionName = 'Usuarios'
export const AssetsCollectionName = 'Ativos'
export const RecordsCollectionName = 'Records'
 

//GET   
export const FIREBASE_Get = async (Collection) => {
  var CollectionRef = collection(db, Collection)
  const data = await getDocs(CollectionRef)
  const DocsList = data.docs.map((doc) => ({ ...doc.data(), docID: doc.id }))
  return DocsList
}

//ADD   
export const FIREBASE_Add = async (Collection, Item) => {
  var CollectionRef = collection(db, Collection)
  return addDoc(CollectionRef, Item);
}

//UPDATE   
export const FIREBASE_Update = async (Collection, Item) => {
  if (!Item.docID) {
    FIREBASE_GetDocIDById(Collection, Item.id).then((docID) => {
      const Doc = doc(db, Collection, docID);
      Item.docID = docID
      return updateDoc(Doc, Item);
    })
  } else {
    const Doc = doc(db, Collection, Item.docID);
    return updateDoc(Doc, Item);
  }
} 

//DELETE   
export const FIREBASE_Delete = async (Collection, Item) => {
  if (!Item.docID) {
    FIREBASE_GetDocIDById(Collection, Item.id).then((docID) => {
      const Doc = doc(db, Collection, docID);
      Item.docID = docID
      return deleteDoc(Doc, Item);
    })
  } else {
    const Doc = doc(db, Collection, Item.docID);
    return deleteDoc(Doc, Item);
  }
}


export const FIREBASE_GetDocIDById = async (Collection, ID) => {
  var CollectionRef = collection(db, Collection)
  const Query = query(CollectionRef, where('id', '==', ID));
  const querySnapshot = await getDocs(Query);
  const matchedDocs = querySnapshot.docs.map((doc) => ({ ...doc.data(), docID: doc.id }));
  const matchedDoc = matchedDocs[0];
  return matchedDoc.docID;
};



export const FIREBASE_GetRecordsNotReturnByAsset = async (ativoId) => {

  var CollectionRef = collection(db, RecordsCollectionName)

  const Query = query(
    CollectionRef,
    where('ReturnDate', '==', ''),
    where('AtivoId', '==', ativoId)
  );
  const data = await getDocs(Query);
  const dados = data.docs.map((doc) => ({ ...doc.data(), docID: doc.id }));

  return dados.length;
};
















