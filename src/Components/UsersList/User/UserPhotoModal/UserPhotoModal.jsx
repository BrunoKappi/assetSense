import React, { useState, useRef, useEffect } from 'react'
import './UserPhotoModal.css'
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux'
import UserPhoto from '../../../../assets/Images/SerranoLogoFuncoBranco.jpg'
import { UilCameraPlus, UilTimes, UilTrashAlt, UilCheck, UilBackward, UilPen } from '@iconscout/react-unicons'
import { NotificationErro, NotificationSucesso } from '../../../../NotificationUtils';
import { DeleteFile, GetCurrentUserFromStore, GetUserUrlImage, ImageUpload, SetLoggedUserPhotoUrl, SetOtherUserPhotoUrl } from '../../../../Functions/Middleware';
import LoadingSpiner from '../../../LoadingForTabs/Loading'
import { v4 } from 'uuid';


const UserPhotoModal = (props) => {


    const fileInputRef = useRef(null);
    const [imageUpload, setImageUpload] = useState(null);
    const [Uploading, setUploading] = useState(false);
    const [CurrentUserObjet, setCurrentUserObjet] = useState(null);
    const [LastUserUrlImage, setLastUserUrlImage] = useState(null);
    const [Loading, setLoading] = useState(false);
    const [ImageToShowUser, setImageToShowUser] = useState(null);

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

        var path


        if (props.Add) {
            const IdToUseToAdd = v4()
            path = `images/${IdToUseToAdd}`
            console.log("ADD PATH", path)
        } else {
            path = props.IsCurrentUser ? `images/${props.LoggedUser.uid}` : `images/${props.User?.id}`
        }

        setUploading(true)
        ImageUpload(path, imageUpload, props.LoggedUser.Email).then(() => {
            GetUserUrlImage(path).then((url) => {
                setLoading(false)
                NotificationSucesso("Foto de Perfil Atualizada!")
                setTimeout(() => {
                    setLastUserUrlImage(url)
                    setImageUpload('')
                    fileInputRef.current.value = ''
                    setUploading(false)
                    props.OnChangePhoto(url)
                    if (props.IsCurrentUser) {
                        SetLoggedUserPhotoUrl(url)
                    } else {
                        SetOtherUserPhotoUrl(url, props.User?.id)
                    }
                }, 2000)
            })
        }).catch((erro) => {
            //COMENTADO  console.log(erro)
            setUploading(false)
            setLoading(false)
            NotificationErro("Erro", "Aconteceu um problema, tente novamente mais tarde")
        })
    }


    const ApagarFotoDeUsuario = () => {
        setUploading(false)
        setLoading(true)
        const UserAtual = GetCurrentUserFromStore()
        const path = props.IsCurrentUser ? `images/${props.LoggedUser.uid}` : `images/${props.User?.id}`

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
        }).catch((error) => {
            setLoading(false)
            setUploading(false)
            NotificationErro("Erro", "Aconteceu um problema, tente novamente mais tarde")
        })

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

    <img src={imageUpload} alt="User" />

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
                    <UilCameraPlus />
                    Atualização de Foto de Perfil
                </h3>

                {props.Add && <h3>Add</h3>}


                <div className='UserPhotoModal'>
                    {!Loading &&
                        <>
                            <div className='UserPhotoModal-ImageColumn'>
                                <img src={ImageToShowUser || UserPhoto} alt="User" />



                            </div>

                            <div className='UserPhotoModal-OptionsColumn'>
                                <button className={'UserPhotoModal-ChangePhotoButton ' + (imageUpload ? ' UserPhotoModal-ChangePhotoButton-Ready' : '')} onClick={handleButtonClick}>
                                    {imageUpload ? <UilCheck /> : <UilPen />}
                                    {imageUpload ? 'Definir Imagem' : 'Trocar de Foto'}
                                    <input ref={fileInputRef} accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp" type="file" onChange={handleChangePicture} />
                                </button>
                                {!imageUpload && <button onClick={ApagarFotoDeUsuario} className='UserPhotoModal-DeletePhoto'>
                                    <UilTrashAlt />
                                    Remover Foto
                                </button>}
                                {imageUpload && <button className='UserPhotoModal-CancelChangePhoto' onClick={Cancel}>
                                    <UilBackward />
                                    Cancelar
                                </button>}
                            </div>
                        </>
                    }
                    {Loading && <LoadingSpiner />}
                </div>





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
