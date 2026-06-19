import React, { useState, useRef } from 'react'
import './AssetPhotoModal.css'
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux'
import { env } from '../../../../Config/env';
import { NotificationErro, NotificationSucesso } from '../../../../NotificationUtils';
import { UilTimes, UilTrashAlt, UilCheck, UilBackward, UilPen } from '@iconscout/react-unicons'
import { DeleteFile, GetUserUrlImage, ImageUpload } from '../../../../Functions/StorageMiddleware';
import LoadingSpiner from '../../../LoadingForTabs/Loading'
import { v4 } from 'uuid';
import Show from '../../../LayoutComponents/Show/Show'
import { SetAssetPhotoUrl } from '../../../../Functions/DatabaseMiddleware';

const AssetPhotoModal = (props) => {

    // REFS
    const fileInputRef = useRef(null)

    //STATES
    const [Loading, setLoading] = useState(false);
    const [imageUpload, setImageUpload] = useState(null);
    const [ImageToShowUser, setImageToShowUser] = useState(props?.Asset?.PhotoUrl);

    //const [ImageToShowUser] = useState(props?.Asset?.PhotoUrl);



    // HANDLE ERROR
    const HandleError = (Erro) => {
        //console.log(Erro)
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
            path = `${env.VITE_REACT_TENANT_NAME}/${env.VITE_REACT_ASSETS_PHOTOS_DIRECTORY}/${IdToUseToAdd}`
        } else {
            path = `${env.VITE_REACT_TENANT_NAME}/${env.VITE_REACT_ASSETS_PHOTOS_DIRECTORY}/${props.Asset.id}`
        }

        //console.log(path)


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
                SetAssetPhotoUrl(url, props.Asset.id)
            })
        }).catch(HandleError)
    }

    const PhotoRefs = {
        "SerranoLogo2.png": "NavLogo",
        "SerranoLogo.png": "LoginLogo",
        "SerranoLogoFuncoBranco.jpg": "MainLogo",
        "SerranoLogoBranco.png": "NavSidebarLogo",
        "SerranoNomeBranco.png": "NavNameLogo",
    }

    // DELETE PHOTO
    const ApagarFotoDoAsset = () => {
        setLoading(true)



        DeleteFile(`${env.VITE_REACT_TENANT_NAME}/${env.VITE_REACT_ASSETS_PHOTOS_DIRECTORY}/${props.Asset.id}`).then(() => {
            SetAssetPhotoUrl('', props.Asset.id)
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
        <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered fullscreen={'md-down'} className={props.Tema === 'Dark' ? 'AssetPhotoModal-ModalDark AssetPhotoModal-Modal' : 'AssetPhotoModal-ModalLightTheme AssetPhotoModal-Modal'}>

            <Modal.Body closeButton className="AssetPhotoModal-Body">

                <UilTimes className='AssetPhotoModalHeader-Right-Close' onClick={props.onHide} />

                <h3 className='AssetPhotoModal-Title'>
                    {props.CanEdit ? 'Atualização de Foto do Ativo' : 'Foto do Ativo'}
                </h3>


                <div className={'AssetPhotoModal' + (props.CanEdit ? '' : ' OnlyView')}>

                    {!Loading &&
                        <div className={'AssetPhotoModal-ImageColumn '}>
                            <img src={ImageToShowUser || props.TenantPhotos.MainLogo} alt="Asset" />
                        </div>
                    }

                    {props.CanEdit && !Loading &&
                        <div className='AssetPhotoModal-OptionsColumn'>
                            <button className={'AssetPhotoModal-ChangePhotoButton ' + (imageUpload ? ' AssetPhotoModal-ChangePhotoButton-Ready' : '')} onClick={handleButtonClick}>
                                {imageUpload ? <UilCheck /> : <UilPen />}
                                {imageUpload ? 'Definir Imagem' : 'Trocar de Foto'}
                                <input ref={fileInputRef} accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp" type="file" onChange={handleChangePicture} />
                            </button>

                            <Show Show={!imageUpload}>
                                <button onClick={ApagarFotoDoAsset} className='AssetPhotoModal-DeletePhoto'>
                                    <UilTrashAlt />
                                    Remover Foto
                                </button>
                            </Show>

                            <Show Show={imageUpload}>
                                <button className='AssetPhotoModal-CancelChangePhoto' onClick={Cancel}>
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
                        <span className='AssetPhotoModal-Warning'>Você não possui permissão para editar, somente visualização</span>
                    </Show>

                </div>

            </Modal.Body >

        </Modal >
    )
}


const ConnectedAssetPhotoModal = connect((state) => {
    return {
        Tema: state.Tema,
        LoggedUser: state.LoggedUser,
        TenantPhotos: state.TenantPhotos
    }
})(AssetPhotoModal)

export default ConnectedAssetPhotoModal
