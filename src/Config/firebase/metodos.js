
import { db } from '../firebase/index'
import { collection, query } from "firebase/firestore";
import { getDocs, addDoc, updateDoc, deleteDoc, doc, where } from "firebase/firestore";

///////////////////************    COLLECTIONS NAMES   *************//////////////////////////

export const SectorsCollectionName = 'Setores'
export const UserTypesCollectionName = 'TiposUsuarios'
export const AssetTypesCollectionName = 'TiposAtivo'
export const StorageLocationsCollectionName = 'LocaisArmazenamento'
export const AssetStatusCollectionName = 'StatusAtivos'
export const UsageTypesCollectionName = 'TiposUso'
export const UsersCollectionName = 'Usuarios'
export const AssetsCollectionName = 'Ativos'
export const RecordsCollectionName = 'Records'


///////////////////************    GET   *************//////////////////////////

export const FIREBASE_Get = async (Collection) => {
  var CollectionRef = collection(db, Collection)
  const data = await getDocs(CollectionRef)
  const dados = data.docs.map((doc) => ({ ...doc.data(), docID: doc.id }))
  return dados
}


///////////////////************   ADD   *************//////////////////////////

export const FIREBASE_Add = async (Collection, ItemToAdd) => {
  var CollectionRef = collection(db, Collection)
  return addDoc(CollectionRef, ItemToAdd);
}



///////////////////************   UPDATE   *************//////////////////////////

export const FIREBASE_Update = async (Collection, EditedItem) => {
  const Doc = doc(db, Collection, EditedItem.docID);
  const NewItem = { ...EditedItem };
  return updateDoc(Doc, NewItem);
}


///////////////////************   DELETE   *************//////////////////////////

export const FIREBASE_Delete = async (Collection, Todelete) => {
  const Doc = doc(db, Collection, Todelete.docID);
  const DeleteDoc = { ...Todelete };
  return deleteDoc(Doc, DeleteDoc);
}










///////////////// SETORES /////////////////////
export var SetoresCollectionRef = collection(db, "Setores")


export const FIREBASE_AddSetor = async (ItemToAdd) => {
  return addDoc(SetoresCollectionRef, ItemToAdd);
};

export const FIREBASE_DeleteSetor = (Todelete) => {
  const Doc = doc(db, "Setores", Todelete.docID);
  const DeleteDoc = { ...Todelete };
  return deleteDoc(Doc, DeleteDoc);
};






///////////////// TIPOS DE USUARIOS /////////////////////
export var TiposUsuarios = collection(db, "TiposUsuarios")


export const FIREBASE_AddTipoUsuario = async (ItemToAdd) => {
  return addDoc(TiposUsuarios, ItemToAdd);
};


export const FIREBASE_DeleteTipoDeUsuario = (Todelete) => {
  const Doc = doc(db, "TiposUsuarios", Todelete.docID);
  const DeleteDoc = { ...Todelete };
  return deleteDoc(Doc, DeleteDoc);
};



///////////////// TIPOS DE ATIVOS /////////////////////
export var TiposAtivo = collection(db, "TiposAtivo")


export const FIREBASE_AddTipoAtivo = async (ItemToAdd) => {
  return addDoc(TiposAtivo, ItemToAdd);
};

export const FIREBASE_DeleteTipoAtivo = (Todelete) => {
  const Doc = doc(db, "TiposAtivo", Todelete.docID);
  const DeleteDoc = { ...Todelete };
  return deleteDoc(Doc, DeleteDoc);
};





///////////////// LOCAIS ARMAZENAMENTO /////////////////////
export var StorageLocations = collection(db, "LocaisArmazenamento")


export const FIREBASE_AddLocalArmazenamento = async (ItemToAdd) => {
  return addDoc(StorageLocations, ItemToAdd);
};


export const FIREBASE_DeleteLocalArmazenamento = (Todelete) => {
  const Doc = doc(db, "LocaisArmazenamento", Todelete.docID);
  const DeleteDoc = { ...Todelete };
  return deleteDoc(Doc, DeleteDoc);
};





///////////////// STATUS DE ATIVOS /////////////////////
export var StatusAtivos = collection(db, "StatusAtivos")


export const FIREBASE_AddStatusAtivo = async (ItemToAdd) => {
  return addDoc(StatusAtivos, ItemToAdd);
};

export const FIREBASE_DeleteStatusAtivo = (Todelete) => {
  const Doc = doc(db, "StatusAtivos", Todelete.docID);
  const DeleteDoc = { ...Todelete };
  return deleteDoc(Doc, DeleteDoc);
};










///////////////// TIPOS DE USO /////////////////////
export var TiposUso = collection(db, "TiposUso")


export const FIREBASE_AddTipoUso = async (ItemToAdd) => {
  return addDoc(TiposUso, ItemToAdd);
};

export const FIREBASE_DeleteTipoUso = (Todelete) => {
  const Doc = doc(db, "TiposUso", Todelete.docID);
  const DeleteDoc = { ...Todelete };
  return deleteDoc(Doc, DeleteDoc);
};








///////////////// ATIVOS /////////////////////
export var Ativos = collection(db, "Ativos")


export const FIREBASE_AddAtivo = async (ItemToAdd) => {
  return addDoc(Ativos, ItemToAdd);
};









///////////////// USUARIOS /////////////////////
export var Usuarios = collection(db, "Usuarios")


export const FIREBASE_AddUsuario = async (ItemToAdd) => {
  return addDoc(Usuarios, ItemToAdd);
};

export const FIREBASE_GetUserDocIDById = async (id) => {
  const Query = query(Usuarios, where('id', '==', id));
  const data = await getDocs(Query);
  const dados = data.docs.map((doc) => ({ ...doc.data(), docID: doc.id }))

  return dados[0].docID;
};










///////////////// RECORDS /////////////////////
export var Records = collection(db, "Records")


export const FIREBASE_AddRecord = async (ItemToAdd) => {
  return addDoc(Records, ItemToAdd)
};


export const FIREBASE_GetRecordsPendentesDeUmAtivo = async (ativoId) => {
  const Query = query(
    Records,
    where('ReturnDate', '==', ''),
    where('AtivoId', '==', ativoId)
  );
  const data = await getDocs(Query);
  const dados = data.docs.map((doc) => ({ ...doc.data(), docID: doc.id }));

  return dados.length;
};







export const FIREBASE_GetRecordDocIDById = async (id) => {
  const Query = query(Records, where('id', '==', id));
  const data = await getDocs(Query);
  const dados = data.docs.map((doc) => ({ ...doc.data(), docID: doc.id }))

  return dados[0].docID;
};















