import React, { useState, useRef, useEffect } from 'react'
import './UserPhotoModal.css'
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux'
import UserPhoto from '../../../../assets/Images/SerranoLogoFuncoBranco.jpg'
import { UilCameraPlus, UilTimes, UilTrashAlt, UilCheck, UilBackward, UilPen } from '@iconscout/react-unicons'
import { NotificationErro, NotificationSucesso } from '../../../../NotificationUtils';
import { DeleteFile, GetUserUrlImage, ImageUpload, SetLoggedUserPhotoUrl } from '../../../../Functions/Middleware';
import LoadingSpiner from '../../../LoadingForTabs/Loading'


const UserPhotoModal = (props) => {

    const fileInputRef = useRef(null);
    const [imageUpload, setImageUpload] = useState(null);
    const [Loading, setLoading] = useState(false);
    const [ImageToShowUser, setImageToShowUser] = useState(null);

    useEffect(() => {
        setImageToShowUser(props.LoggedUser.PhotoUrl)
    }, [])



    const UploadFile = () => {
        if (imageUpload == null) return;
        setLoading(true)
        ImageUpload(`images/${props.LoggedUser.uid}`, imageUpload, props.LoggedUser.Email).then(() => {
            setLoading(false)
            NotificationSucesso("Foto de Perfil Atualizada!")
            GetUserUrlImage(`images/${props.LoggedUser.uid}`).then((url) => {
                SetLoggedUserPhotoUrl(url)

            })
        }).catch((erro) => {
            //COMENTADO  console.log(erro)
            setLoading(false)
            NotificationErro("Erro", "Aconteceu um problema, tente novamente mais tarde")
        })
    }


    const ApagarFotoDeUsuario = () => {
        setLoading(true)
        DeleteFile(`images/${props.LoggedUser.uid}`).then(() => {
            SetLoggedUserPhotoUrl('')
            NotificationSucesso("Exlusão", "Foto apagada com sucesso!")
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
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
        setImageToShowUser('')
        fileInputRef.current.value = ''
    }

    <img src={imageUpload} alt="User" />



    return (
        <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered fullscreen={'md-down'} className={props.Tema === 'Escuro' ? 'UserPhotoModal-ModalEscuro UserPhotoModal-Modal' : 'UserPhotoModal-ModalClaro UserPhotoModal-Modal'}>

            <Modal.Body closeButton className="UserPhotoModal-Body">

                <UilTimes className='UserPhotoModalHeader-Right-Close' onClick={props.onHide} />

                <h3 className='UserPhotoModal-Title'>
                    <UilCameraPlus />
                    Atualização de Foto de Perfil
                </h3>


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
