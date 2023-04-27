import React, { useState, useRef, useEffect } from 'react'
import './UserPhotoModal.css'
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux'
import UserPhoto from '../../../../assets/Images/SerranoLogoFuncoBranco.jpg'
import { UilTimes, UilTrashAlt, UilCheck, UilBackward, UilPen } from '@iconscout/react-unicons'
import { NotificationErro, NotificationSucesso } from '../../../../NotificationUtils';
import { DeleteFile, GetUserUrlImage, ImageUpload } from '../../../../Functions/StorageMiddleware';
import LoadingSpiner from '../../../LoadingForTabs/Loading'
import { v4 } from 'uuid';
import Show from '../../../LayoutComponents/Show/Show';
import { SetOtherUserPhotoUrl, SetLoggedUserPhotoUrl } from '../../../../Functions/DatabaseMiddleware';


const UserPhotoModal = (props) => {

    const fileInputRef = useRef(null);
    const [imageUpload, setImageUpload] = useState(null);
    const [Uploading, setUploading] = useState(false);
    const [LastUserUrlImage, setLastUserUrlImage] = useState(null);
    const [Loading, setLoading] = useState(false);
    const [ImageToShowUser, setImageToShowUser] = useState(null);


    // HANDLE ERROR
    const HandleError = (Erro) => {
        console.log(Erro)
        setLoading(false)
        setUploading(false)
        NotificationErro("Erro", "Aconteceu um problema, tente novamente mais tarde")
    }


    useEffect(() => {
        if (props.IsCurrentUser === true) {
            setImageToShowUser(props.LoggedUser.PhotoUrl)
            setLastUserUrlImage(props.LoggedUser.PhotoUrl)
        } else {
            if (props.Add) {
                setImageToShowUser('')
                setLastUserUrlImage('')
            } else {
                setImageToShowUser(props.User?.PhotoUrl)
                setLastUserUrlImage(props.User?.PhotoUrl)
            }
        }

    }, [props.IsCurrentUser, props.User])



    const UploadFile = () => {
        if (imageUpload == null) return;
        setLoading(true)
        setUploading(true)

        var path
        const IdToUseToAdd = v4()

        if (props.Add) {
            path = `images/${IdToUseToAdd}`
        } else {
            path = `images/${props.User?.id}`
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
                        SetLoggedUserPhotoUrl(url)
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
        const path = `images/${props.User?.id}`

        DeleteFile(path).then(() => {
            setUploading(false)
            if (props.IsCurrentUser)
                SetLoggedUserPhotoUrl('')
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
        <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered fullscreen={'md-down'} className={props.Tema === 'Escuro' ? 'UserPhotoModal-ModalEscuro UserPhotoModal-Modal' : 'UserPhotoModal-ModalClaro UserPhotoModal-Modal'}>

            <Modal.Body closeButton className="UserPhotoModal-Body">

                <UilTimes className='UserPhotoModalHeader-Right-Close' onClick={closeModal} />

                <h3 className='UserPhotoModal-Title'>
                    Atualização de Foto de Perfil
                </h3>

                <Show Show={!Loading}>
                    <div className='UserPhotoModal'>

                        <div className='UserPhotoModal-ImageColumn'>
                            <img src={ImageToShowUser || UserPhoto} alt="User" />
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
        LoggedUser: state.LoggedUser
    }
})(UserPhotoModal)

export default ConnectedUserPhotoModal
