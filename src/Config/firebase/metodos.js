
import { db } from '../firebase/index'
import { collection, query } from "firebase/firestore";
import { getDocs, addDoc, updateDoc, deleteDoc, doc, where } from "firebase/firestore";





///////////////// SETORES /////////////////////
export var SetoresCollectionRef = collection(db, "Setores")


export const FIREBASE_AddSetor = async (ItemToAdd) => {
  return addDoc(SetoresCollectionRef, ItemToAdd);
};

export const FIREBASE_GetSetores = async () => {
  const data = await getDocs(SetoresCollectionRef);
  const dados = data.docs.map((doc) => ({ ...doc.data(), docID: doc.id }))
  return dados
}

export const FIREBASE_UpdateSetor = (EditedItem) => {
  const Doc = doc(db, "Setores", EditedItem.docID);
  const NewItem = { ...EditedItem };
  return updateDoc(Doc, NewItem);
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

export const FIREBASE_GetTiposUsuarios = async () => {
  const data = await getDocs(TiposUsuarios);
  const dados = data.docs.map((doc) => ({ ...doc.data(), docID: doc.id }))
  return dados
}

export const FIREBASE_UpdateTipoDeUsuario = (EditedItem) => {
  const Doc = doc(db, "TiposUsuarios", EditedItem.docID);
  const NewItem = { ...EditedItem };
  return updateDoc(Doc, NewItem);
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

export const FIREBASE_GetTiposAtivo = async () => {
  const data = await getDocs(TiposAtivo);
  const dados = data.docs.map((doc) => ({ ...doc.data(), docID: doc.id }))
  return dados
}

export const FIREBASE_UpdateTipoAtivo = (EditedItem) => {
  const Doc = doc(db, "TiposAtivo", EditedItem.docID);
  const NewItem = { ...EditedItem };
  return updateDoc(Doc, NewItem);
};

export const FIREBASE_DeleteTipoAtivo = (Todelete) => {
  const Doc = doc(db, "TiposAtivo", Todelete.docID);
  const DeleteDoc = { ...Todelete };
  return deleteDoc(Doc, DeleteDoc);
};






///////////////// LOCAIS ARMAZENAMENTO /////////////////////
export var LocaisArmazenamento = collection(db, "LocaisArmazenamento")


export const FIREBASE_AddLocalArmazenamento = async (ItemToAdd) => {
  return addDoc(LocaisArmazenamento, ItemToAdd);
};

export const FIREBASE_GetLocaisArmazenamento = async () => {
  const data = await getDocs(LocaisArmazenamento);
  const dados = data.docs.map((doc) => ({ ...doc.data(), docID: doc.id }))
  return dados
}

export const FIREBASE_UpdateLocalArmazenamento = (EditedItem) => {
  const Doc = doc(db, "LocaisArmazenamento", EditedItem.docID);
  const NewItem = { ...EditedItem };
  return updateDoc(Doc, NewItem);
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

export const FIREBASE_GetStatusAtivos = async () => {
  const data = await getDocs(StatusAtivos);
  const dados = data.docs.map((doc) => ({ ...doc.data(), docID: doc.id }))
  return dados
}

export const FIREBASE_UpdateStatusAtivo = (EditedItem) => {
  const Doc = doc(db, "StatusAtivos", EditedItem.docID);
  const NewItem = { ...EditedItem };
  return updateDoc(Doc, NewItem);
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

export const FIREBASE_GetTiposUso = async () => {
  const data = await getDocs(TiposUso);
  const dados = data.docs.map((doc) => ({ ...doc.data(), docID: doc.id }))
  return dados
}

export const FIREBASE_UpdateTipoUso = (EditedItem) => {
  const Doc = doc(db, "TiposUso", EditedItem.docID);
  const NewItem = { ...EditedItem };
  return updateDoc(Doc, NewItem);
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

export const FIREBASE_GetAtivos = async () => {
  const data = await getDocs(Ativos);
  const dados = data.docs.map((doc) => ({ ...doc.data(), docID: doc.id }))
  return dados
}

export const FIREBASE_UpdateAtivo = (EditedItem) => {
  const Doc = doc(db, "Ativos", EditedItem.docID);
  const NewItem = { ...EditedItem };
  return updateDoc(Doc, NewItem);
};









///////////////// USUARIOS /////////////////////
export var Usuarios = collection(db, "Usuarios")


export const FIREBASE_AddUsuario = async (ItemToAdd) => {
  return addDoc(Usuarios, ItemToAdd);
};

export const FIREBASE_GetUsuarios = async () => {
  const data = await getDocs(Usuarios);
  const dados = data.docs.map((doc) => ({ ...doc.data(), docID: doc.id }))
  return dados
}

export const FIREBASE_GetUserDocIDById = async (id) => {
  const Query = query(Usuarios, where('id', '==', id));
  const data = await getDocs(Query);
  const dados = data.docs.map((doc) => ({ ...doc.data(), docID: doc.id }))

  return dados[0].docID;
};

export const FIREBASE_UpdateUsuario = (EditedItem) => {
  const Doc = doc(db, "Usuarios", EditedItem.docID);
  const NewItem = { ...EditedItem };
  return updateDoc(Doc, NewItem);
};








///////////////// RECORDS /////////////////////
export var Records = collection(db, "Records")


export const FIREBASE_AddRecord = async (ItemToAdd) => {
  return addDoc(Records, ItemToAdd)
};

export const FIREBASE_GetRecords = async () => {
  const data = await getDocs(Records);
  const dados = data.docs.map((doc) => ({ ...doc.data(), docID: doc.id }))
  return dados
}

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

export const FIREBASE_GetRecordsOfRange = async (StartDate, EndDate) => {
  const Query = query(
    Records,
    where('TakeDate', '>=', StartDate),
    where('TakeDate', '<=', EndDate)
  );
  const data = await getDocs(Query);
  const dados = data.docs.map((doc) => ({ ...doc.data(), docID: doc.id }));

  return dados;
};









export const FIREBASE_GetRecordDocIDById = async (id) => {
  const Query = query(Records, where('id', '==', id));
  const data = await getDocs(Query);
  const dados = data.docs.map((doc) => ({ ...doc.data(), docID: doc.id }))

  return dados[0].docID;
};


export const FIREBASE_UpdateRecord = (EditedItem) => {
  const Doc = doc(db, "Records", EditedItem.docID);
  const NewItem = { ...EditedItem };
  return updateDoc(Doc, NewItem);
};














