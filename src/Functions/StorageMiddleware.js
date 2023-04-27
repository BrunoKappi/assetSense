import {
    deleteObject,
    getDownloadURL,
    ref, uploadBytes
} from "firebase/storage"

import { storage } from "../Config/firebase"


//UPLOAD IMAGE TO FIREBASE STORAGE
export const ImageUpload = (ImagePath, ImageToUpload) => {
    const imageRef = ref(storage, ImagePath);
    return uploadBytes(imageRef, ImageToUpload)
}

//GET IMG URL FROM FIREBASE STORAGE
export const GetUserUrlImage = (path) => {
    return getDownloadURL(ref(storage, path))
}

//DELETE FILE FROM FIREBASE STORAGE
export const DeleteFile = (path) => {
    const desertRef = ref(storage, path);
    return deleteObject(desertRef)
}
 