import React, { useState, useRef, useEffect } from 'react'
import './AtivoPhotoModal.css'
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux'
import UserPhoto from '../../../../assets/Images/SerranoLogoFuncoBranco.jpg'
import { NotificationErro, NotificationSucesso } from '../../../../NotificationUtils';
import { UilTimes, UilTrashAlt, UilCheck, UilBackward, UilPen } from '@iconscout/react-unicons'
import { DeleteFile, GetUserUrlImage, ImageUpload, SetAtivoPhotoUrl } from '../../../../Functions/Middleware';
import LoadingSpiner from '../../../LoadingForTabs/Loading'
import { v4 } from 'uuid';
import Show from '../../../LayoutComponents/Show/Show'

const AtivoPhotoModal = (props) => {

    // REFS
    const fileInputRef = useRef(null)

    //STATES
    const [Loading, setLoading] = useState(false);
    const [imageUpload, setImageUpload] = useState(null);
    const [ImageToShowUser, setImageToShowUser] = useState(props?.Ativo?.PhotoUrl);


    // WHEN THERE IS ATIVO, GET ITS PHOTO URL
    useEffect(() => {
        setImageToShowUser(props?.Ativo?.PhotoUrl)
    }, [props.Ativo])


    // HANDLE ERROR
    const HandleError = (Erro) => {
        console.log(Erro)
        setLoading(false)
        NotificationErro("Erro", "Aconteceu um problema, tente novamente mais tarde")
    }

    // UPLOAD FILE TO FIREBASE
    const UploadFile = () => {
        if (imageUpload == null) return;
        setLoading(true)

        var path
        const IdToUseToAdd = v4()

        if (props.Add) {
            path = `images/${IdToUseToAdd}`
        } else {
            path = `images/${props.Ativo.id}`
        }

        ImageUpload(path, imageUpload, props.LoggedUser.Email).then(() => {
            NotificationSucesso("Foto do Ativo Atualizada!")
            setImageUpload('')
            GetUserUrlImage(path).then((url) => {
                props.OnChange(url, IdToUseToAdd)
                setTimeout(() => {
                    setLoading(false)
                    setImageToShowUser(url)
                    props.OnChange(url, IdToUseToAdd)
                }, 1500);
                SetAtivoPhotoUrl(url, props.Ativo.id)
            })
        }).catch(HandleError)
    }

    // DELETE PHOTO
    const ApagarFotoDoAtivo = () => {
        setLoading(true)
        DeleteFile(`images/${props.Ativo.id}`).then(() => {
            SetAtivoPhotoUrl('', props.Ativo.id)
            NotificationSucesso("Exlusão", "Foto apagada com sucesso!")
            setLoading(false)
            props.OnChange('')
        }).catch(HandleError)
    }

    // GET UPLOADED FILE
    const handleChangePicture = (e) => {
        const imageFile = e.target.files[0]
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

    // CANCEL 
    const Cancel = () => {
        setImageUpload('')
        setImageToShowUser('')
        fileInputRef.current.value = ''
    }


    return (
        <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered fullscreen={'md-down'} className={props.Tema === 'Escuro' ? 'AtivoPhotoModal-ModalEscuro AtivoPhotoModal-Modal' : 'AtivoPhotoModal-ModalClaro AtivoPhotoModal-Modal'}>

            <Modal.Body closeButton className="AtivoPhotoModal-Body">

                <UilTimes className='AtivoPhotoModalHeader-Right-Close' onClick={props.onHide} />

                <h3 className='AtivoPhotoModal-Title'>
                    {props.CanEdit ? 'Atualização de Foto do Ativo' : 'Foto do Ativo'}
                </h3>


                <div className={'AtivoPhotoModal' + (props.CanEdit ? '' : ' OnlyView')}>

                    {!Loading &&
                        <div className={'AtivoPhotoModal-ImageColumn '}>
                            <img src={ImageToShowUser || UserPhoto} alt="Ativo" />
                        </div>
                    }

                    {props.CanEdit && !Loading &&
                        <div className='AtivoPhotoModal-OptionsColumn'>
                            <button className={'AtivoPhotoModal-ChangePhotoButton ' + (imageUpload ? ' AtivoPhotoModal-ChangePhotoButton-Ready' : '')} onClick={handleButtonClick}>
                                {imageUpload ? <UilCheck /> : <UilPen />}
                                {imageUpload ? 'Definir Imagem' : 'Trocar de Foto'}
                                <input ref={fileInputRef} accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp" type="file" onChange={handleChangePicture} />
                            </button>

                            <Show Show={!imageUpload}>
                                <button onClick={ApagarFotoDoAtivo} className='AtivoPhotoModal-DeletePhoto'>
                                    <UilTrashAlt />
                                    Remover Foto
                                </button>
                            </Show>

                            <Show Show={imageUpload}>
                                <button className='AtivoPhotoModal-CancelChangePhoto' onClick={Cancel}>
                                    <UilBackward />
                                    Cancelar
                                </button>
                            </Show>

                        </div>
                    }


                    <Show Show={Loading}>
                        <LoadingSpiner />
                    </Show>

                    <Show Show={!props.CanEdit}>
                        <span className='AtivoPhotoModal-Warning'>Você não possui permissão para editar, somente visualização</span>
                    </Show>

                </div>

            </Modal.Body >

        </Modal >
    )
}


const ConnectedAtivoPhotoModal = connect((state) => {
    return {
        Tema: state.Tema,
        LoggedUser: state.LoggedUser
    }
})(AtivoPhotoModal)

export default ConnectedAtivoPhotoModal
