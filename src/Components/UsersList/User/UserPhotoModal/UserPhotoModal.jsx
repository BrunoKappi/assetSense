import React, { useState, useRef, useEffect } from 'react'
import './UserPhotoModal.css'
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux'
import { env } from '../../../../Config/env';

import { UilTimes, UilTrashAlt, UilCheck, UilBackward, UilPen } from '@iconscout/react-unicons'
import { NotificationErro, NotificationSucesso } from '../../../../NotificationUtils';
import { DeleteFile, GetUserUrlImage, ImageUpload } from '../../../../Functions/StorageMiddleware';
import LoadingSpiner from '../../../LoadingForTabs/Loading'
import { v4 } from 'uuid';
import Show from '../../../LayoutComponents/Show/Show';
import { SetOtherUserPhotoUrl, SetLoggedUserPhotoUrl } from '../../../../Functions/DatabaseMiddleware';
import { User as UserIcon } from "lucide-react";




const UserPhotoModal = (props) => {



    const fileInputRef = useRef(null);
    const [imageUpload, setImageUpload] = useState(null);
    const [Uploading, setUploading] = useState(false);
    const [LastUserUrlImage, setLastUserUrlImage] = useState('');
    const [Loading, setLoading] = useState(false);
    const [ImageToShowUser, setImageToShowUser] = useState('');

    // HANDLE ERROR
    const HandleError = (Erro) => {
        //console.log(Erro)
        setLoading(false)
        setUploading(false)
        NotificationErro("Erro", "Aconteceu um problema, tente novamente mais tarde")
    }


    useEffect(() => {
        if (props.IsCurrentUser === true) {
            setImageToShowUser(props.CurrentUser.PhotoUrl)
            setLastUserUrlImage(props.CurrentUser.PhotoUrl)
        } else if (!props.Add) {
            setImageToShowUser(props.User?.PhotoUrl)
            setLastUserUrlImage(props.User?.PhotoUrl)
        }
    }, [props.IsCurrentUser, props.User])



    const UploadFile = () => {
        if (imageUpload == null) return;
        setLoading(true)
        setUploading(true)

        var path
        const IdToUseToAdd = v4()

        if (props.Add) {
            path = `${env.VITE_REACT_TENANT_NAME}/${env.VITE_REACT_USERS_PHOTOS_DIRECTORY}/${IdToUseToAdd}`
        } else {
            path = `${env.VITE_REACT_TENANT_NAME}/${env.VITE_REACT_USERS_PHOTOS_DIRECTORY}/${props.User.id}`
        }


        ImageUpload(path, imageUpload, props.LoggedUser.Email).then(() => {
            GetUserUrlImage(path).then((url) => {
                setLoading(false)
                NotificationSucesso("Foto de Perfil Atualizada!")
                setTimeout(() => {
                    setLastUserUrlImage(url)
                    setImageUpload('')
                    fileInputRef.current.value = ''
                    setUploading(false)
                    props.OnChangePhoto(url, IdToUseToAdd)
                    if (props.IsCurrentUser) {

                        SetLoggedUserPhotoUrl(url, props.CurrentUser)
                    } else {
                        SetOtherUserPhotoUrl(url, props.User?.id)
                    }
                }, 2000)
            })
        }).catch(HandleError)
    }


    const ApagarFotoDeUser = () => {
        setUploading(false)
        setLoading(true)
        const path = `${env.VITE_REACT_TENANT_NAME}/${env.VITE_REACT_USERS_PHOTOS_DIRECTORY}/${props.User?.id}`

        DeleteFile(path).then(() => {
            setUploading(false)
            if (props.IsCurrentUser)
                SetLoggedUserPhotoUrl('', props.CurrentUser)
            else
                SetOtherUserPhotoUrl('', props.User?.id)
            NotificationSucesso("Exlusão", "Foto apagada com sucesso!")
            setLastUserUrlImage('')
            setLoading(false)
            props.OnChangePhoto('')
        }).catch(HandleError)

    }


    const handleChangePicture = (e) => {

        const imageFile = e.target.files[0];

        if (imageFile.type.includes("image") && imageFile.size <= 10148205) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageToShowUser(reader.result)
                setImageUpload(imageFile)
            };
            reader.readAsDataURL(imageFile);
        } else if (!imageFile.type.includes("image"))
            NotificationErro("Apenas formatos de Imagens")
        else
            NotificationErro("O arquivo deve ter no máximo 10MB")

    }




    const handleButtonClick = () => {
        if (!imageUpload)
            fileInputRef.current.click()
        else
            UploadFile()
    }

    const Cancel = () => {
        setImageUpload('')
        setImageToShowUser(LastUserUrlImage)
        fileInputRef.current.value = ''
    }



    const closeModal = () => {
        if (!Uploading) {
            props.onHide()
        }
    }


    return (
        <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered fullscreen={'md-down'} className={props.Tema === 'Dark' ? 'UserPhotoModal-ModalDark UserPhotoModal-Modal' : 'UserPhotoModal-ModalLightTheme UserPhotoModal-Modal'}>

            <Modal.Body closeButton className="UserPhotoModal-Body">

                <UilTimes className='UserPhotoModalHeader-Right-Close' onClick={closeModal} />

                <h3 className='UserPhotoModal-Title'>
                    Atualização de Foto de Perfil
                </h3>

                <Show Show={!Loading}>
                    <div className='UserPhotoModal'>

                        <div className='UserPhotoModal-ImageColumn'>
                            {ImageToShowUser ? (
                                <img src={ImageToShowUser} alt="User" />
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '250px', height: '250px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.1)', boxShadow: '4px 6px 14px -5px rgba(0, 0, 0, 0.75)' }}>
                                    <UserIcon size={120} color="var(--PrimaryColor)" />
                                </div>
                            )}
                        </div>


                        <div className='UserPhotoModal-OptionsColumn'>
                            <button className={'UserPhotoModal-ChangePhotoButton ' + (imageUpload ? ' UserPhotoModal-ChangePhotoButton-Ready' : '')} onClick={handleButtonClick}>
                                {imageUpload ? <UilCheck /> : <UilPen />}
                                {imageUpload ? 'Definir Imagem' : 'Trocar de Foto'}
                                <input ref={fileInputRef} accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp" type="file" onChange={handleChangePicture} />
                            </button>

                            <Show Show={!imageUpload && ImageToShowUser}>
                                <button onClick={ApagarFotoDeUser} className='UserPhotoModal-DeletePhoto'>
                                    <UilTrashAlt />
                                    Remover Foto
                                </button>
                            </Show>

                            <Show Show={imageUpload}>
                                <button className='UserPhotoModal-CancelChangePhoto' onClick={Cancel}>
                                    <UilBackward />
                                    Cancelar
                                </button>
                            </Show>

                        </div>


                    </div>
                </Show>

                <Show Show={Loading}>
                    <div className='UserPhotoModal'>
                        <LoadingSpiner />
                    </div>
                </Show>

            </Modal.Body >

        </Modal >
    )
}


const ConnectedUserPhotoModal = connect((state) => {
    return {
        Tema: state.Tema,
        LoggedUser: state.LoggedUser,
        TenantPhotos: state.TenantPhotos,
        CurrentUser: state.CurrentUser
    }
})(UserPhotoModal)

export default ConnectedUserPhotoModal
