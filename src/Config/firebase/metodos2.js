
import { env } from '../env';
import { db } from '../firebase/index'
import { collection, getDoc, query, setDoc } from "firebase/firestore";
import { getDocs, addDoc, updateDoc, deleteDoc, doc, where } from "firebase/firestore";


const Version = 'OLD'

function getTenantNameFromUrl() {
  const path = window.location.pathname;
  const parts = path.split("/");
  // O nome do tenant é o segundo elemento do array parts, após a primeira barra vazia.
  return parts[1];
}



export const CreateTenant = async (NameTenant, NameDatabase) => {
  const docRef = doc(db, NameTenant, NameDatabase);
  await setDoc(docRef, {});
  //console.log('Tenant Adicionado com sucesso!');
}


//ADD   
export const FIREBASE_Add = async (Collection, Item) => {
  const ParentDocRef = doc(collection(db, env.VITE_REACT_TENANT_NAME), env.VITE_REACT_DATABASE_NAME
  );
  const NestedCollectionName = collection(ParentDocRef, Collection);
  return addDoc(NestedCollectionName, Item)
}

//GET   
export const FIREBASE_Get = async (Collection) => {

  //OLD IN FRONT
  const TenantName = getTenantNameFromUrl()
  const Tenant = collection(db, env.VITE_REACT_TENANT_NAME)


  const DatabaseDoc = doc(Tenant, env.VITE_REACT_DATABASE_NAME)
  const CollectionRef = collection(DatabaseDoc, Collection)
  const data = await getDocs(CollectionRef)
  const DocsList = data.docs.map((doc) => ({ ...doc.data(), docID: doc.id }))
  return DocsList

}



//GET   
export const FIREBASE_GetUserByEmail = async (Collection, Email, TenantName) => {
  const Tenant = collection(db, env.VITE_REACT_TENANT_NAME)
  const DatabaseDoc = doc(Tenant, env.VITE_REACT_DATABASE_NAME)
  const CollectionRef = collection(DatabaseDoc, Collection)
  const querySnapshot = await getDocs(query(CollectionRef, where("Email", "==", Email)))
  const DocsList = querySnapshot.docs.map((doc) => ({ ...doc.data(), docID: doc.id }))
  return DocsList
}


//UPDATE   
export const FIREBASE_Update = async (Collection, Item) => {

  const Tenant = collection(db, env.VITE_REACT_TENANT_NAME)
  const DatabaseDoc = doc(Tenant, env.VITE_REACT_DATABASE_NAME
  )
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

  const Tenant = collection(db, env.VITE_REACT_TENANT_NAME)
  const DatabaseDoc = doc(Tenant, env.VITE_REACT_DATABASE_NAME
  )
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
  const Tenant = collection(db, env.VITE_REACT_TENANT_NAME)
  const DatabaseDoc = doc(Tenant, env.VITE_REACT_DATABASE_NAME
  )
  const CollectionRef = collection(DatabaseDoc, Collection)

  // Adiciona a query para buscar documentos com o campo "id" igual a "id"
  const Query = query(CollectionRef, where("id", "==", id));

  const data = await getDocs(Query);

  const DocsList = data.docs.map((doc) => ({ ...doc.data(), docID: doc.id }))
  const matchedDoc = DocsList[0];
  return matchedDoc.docID;
}


export const FIREBASE_GetRecordsNotReturnByAsset = async (assetId) => {

  const Tenant = collection(db, env.VITE_REACT_TENANT_NAME)
  const DatabaseDoc = doc(Tenant, env.VITE_REACT_DATABASE_NAME
  )
  const CollectionRef = collection(DatabaseDoc, env.VITE_REACT_RECORDS_COLLECTIONNAME)

  const Query = query(
    CollectionRef,
    where('ReturnDate', '==', ''),
    where('AssetId', '==', assetId)
  );
  const data = await getDocs(Query);
  const dados = data.docs.map((doc) => ({ ...doc.data(), docID: doc.id }));

  return dados.length;
};



