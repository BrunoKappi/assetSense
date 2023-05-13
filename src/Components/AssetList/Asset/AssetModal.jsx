import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react'
//CSS
import './AssetModal.css'
//COMPONENTS
import AssetPhotoModal from './AssetPhotoModal/AssetPhotoModal'
import AssetTakeReturn from './AssetTakeReturn/AssetTakeReturn';
import AssetRecords from './AssetRecords/AssetRecords';
import Loading from '../../LoadingForTabs/Loading';
//ICONS
import {
    UilUserCircle,
    UilImages,
    UilInvoice,
    UilClipboardNotes,
    UilLabel,
    UilLabelAlt,
    UilCog,
    UilBox,
    UilSave,
    UilPostcard,
    UilUsersAlt,
    UilCommentAltChartLines,
    UilTag,
    UilTimes,
    UilBuilding,
    UilCircleLayer,
    UilPlay,
    UilWrench,
    UilTrash,
    UilArrow
} from '@iconscout/react-unicons'
//FUNCTIONS
import {
    NotificationAlerta,
    NotificationErro,
    NotificationSucesso
} from '../../../NotificationUtils';

import {
    EditAssetOnStore,
    GetNameFromStoreWithId,
    AddAssetStore,
    GetFromStoreWithId,
} from '../../../Functions/StoreMiddleware';
import {
    AddToFirebaseFunctions,
    DeleteFromFirebaseFunctions,
    ReturnAllRecordOfAssetwithId,
    UpdateInFirebaseFunctions
} from '../../../Functions/DatabaseMiddleware'


//VARIABLES
import { DefaultAsset, DefaultAssetsType, DefaultLocal, } from '../../../Data/Items';
//LIBRARIES 
import 'react-phone-input-2/lib/style.css'
import { PermitIndexs } from '../../../GlobalVars'
import { v4 } from 'uuid';
import { connect } from 'react-redux'
//TOOLTIP
import { Tooltip } from 'react-tippy';
//LAYOUT COMPONENTS
import TwoColumns from '../../LayoutComponents/TwoColumns/TwoColumns';
import FormGroup from '../../LayoutComponents/FormGroup/FormGroup';
import FormGroupLabel from '../../LayoutComponents/FormGroupLabel/FormGroupLabel';
import Stack from '../../LayoutComponents/Stack/Stack';
import SidebarItem from '../../LayoutComponents/SidebarItem/SidebarItem';
import Show from '../../LayoutComponents/Show/Show';
import FormInput from '../../LayoutComponents/FormInput/FormInput';
import EditList from '../../LayoutComponents/EditList/EditList';
import CustomFields from '../../LayoutComponents/CustomFields/CustomFields';
import ConfirmTab from '../../LayoutComponents/ConfirmTab/ConfirmTab';
import CustomSelect from '../../LayoutComponents/CustomSelect/CustomSelect'
import moment from 'moment';




const AssetModal = (props) => {

    //DEPENDENCIAS 
    const StatusAsset = props.AssetsStatus.find(U => U.id === props?.Asset?.Status?.id)
    const [ProfileImageUrl, setProfileImageUrl] = useState('')
    const [AssetType, setAssetType] = useState({ ...DefaultAssetsType })
    //const [AssetTypeCustomFields, setAssetTypeCustomFields] = useState([])
    const AssetTypeCustomFields = AssetType?.CustomFields?.length > 0 ? [...AssetType?.CustomFields] : []
    const [AssetStorageLocation, setAssetStorageLocation] = useState({ ...DefaultLocal })
    const [Asset, setAsset] = useState({ ...DefaultAsset })
    const QuantidadeRetirada = props.Asset?.QtdInUse

    //FUNCIONALIDADE 
    const [Tab, setTab] = useState('AssetInfo')
    const [IdToUse, setIdToUse] = useState('')
    const [IsEdited, setIsEdited] = useState(false)
    const [LoadingAction, setLoadingAction] = useState(false)

    //CURRENT ASSET AND PERMITS
    const [CurrentUserType] = useState(props.UserTypes.find(Type => Type.id === props.CurrentUser.Type.id))

    //CONFIRM 
    const [ConfirmAction, SetConfirmAction] = useState('')
    const [Confirm, SetConfirm] = useState(false)
    const [ConfirmMessage, SetConfirmMessage] = useState('')
    const [ConfirmBtAction, SetConfirmBtAction] = useState('')
    const [ConfirmBtBack, SetConfirmBtBack] = useState('')
    const [ShowPhotoModal, setShowPhotoModal] = useState(false)


    //PERMISSOES
    var IsCurrentUser = false
    var IsAdmin = CurrentUserType?.IsAdmin
    var PermitToEditAssets = CurrentUserType?.Permits[PermitIndexs['EDIT_ASSETS']]
    var PermitToDeleteAssets = CurrentUserType?.Permits[PermitIndexs['DELETE_ASSETS']]
    var PermitToTakeAssets = CurrentUserType?.Permits[PermitIndexs['RETIRAR_ASSETS']]
    var CanEdit = IsAdmin || PermitToEditAssets


    // CANCEL EDITIONS
    const CancelEditions = () => {
        setIsEdited(false)
        return
    }


    // GERENCIAMENTO DE ALTERAÇÕES DE INFORMAÇÔES
    const HandleChangeInfo = (Info, Value) => {
        if (!CanEdit) return

        const newAsset = { ...Asset }
        switch (Info) {
            case 'Type':
                newAsset.Type = { id: Value }
                const GotAssetType = props.AssetTypes.find(U => U.id === Value)
                setAssetType(GotAssetType)
                break
            case 'Status':
                newAsset.Status = { id: Value }
                break
            case 'Usage':
                newAsset.Usage = { id: Value }
                break
            case 'StorageLocation':
                newAsset.StorageLocation = { id: Value }
                break
            default:
                newAsset[Info] = Value
                break
        }

        setAsset(newAsset)
        setIsEdited(true)
    }


    // QUANDO TEM UM ASSET VALIDO PASSADO PELA PROP
    useEffect(() => {

        if (props.Function === 'Add')
            setAsset({ ...DefaultAsset })

        if (!props.Asset?.Item) return

        setAsset({ ...props.Asset })
        setIsEdited(false)
        setTab('AssetInfo')
        if (props.Asset?.PhotoUrl) {
            setProfileImageUrl(props.Asset?.PhotoUrl)
        } else {
            setProfileImageUrl('')
        }
    }, [props.Asset, props.CurrentUser, CurrentUserType])


    // PHOTO URL FROM PHOTO MODAL
    const SetAssetUrl = (url, Id) => {
        HandleChangeInfo('PhotoUrl', url)
        setProfileImageUrl(url)
        setTimeout(() => {
            setProfileImageUrl(url)
        }, 3000);
        setShowPhotoModal(false)

        const EditedAsset = { ...Asset }
        EditedAsset.PhotoUrl = url

        // SE NÃO ESTIVER ADICIONANDO E COLOCAR UMA FOTO 
        if (props.Function !== 'Add') {
            UpdateInFirebaseFunctions["Asset"](EditedAsset).then(() => {
                EditAssetOnStore(Asset)
            }).catch(HandleError)
        }

        // SE ESTIVER ADICIONANDO E COLOCAR UMA FOTO, SET EM UM ID
        if (props.Function === 'Add') {
            setIdToUse(Id)
        }
    }



    //QUANDO O ASSET TYPE MUDA, PEGA O NOVO TYPE
    useEffect(() => {
        setAssetType(props.AssetTypes.find(U => U.id === Asset?.Type?.id))
        setAssetStorageLocation(props.StorageLocations.find(U => U.id === Asset?.StorageLocation?.id))
    }, [Asset, props.CurrentUser])





    // HANDLE ERROR
    const HandleError = (Erro) => {
        //console.log(Erro)
        NotificationErro("Erro", "Ocorreu um problema, tente novamente")
        setLoadingAction(false)
    }


    // INIT CONFIRMING
    const InitConfirm = (Action) => {
        //ADD AND EDIT
        if (Action !== 'Delete') {
            if (Asset?.Item.length === 0)
                NotificationAlerta('Preenchimento inválido', 'O Item não pode ser vazio')
            else if (!Asset?.Qtd)
                NotificationAlerta('Preenchimento inválido', 'A quantidade não pode ser vazia')
            else if (Asset?.Qtd < QuantidadeRetirada)
                NotificationAlerta('Preenchimento inválido', 'Não é possível alterar a quantidade para ' + Asset?.Qtd + ' pois existem ' + QuantidadeRetirada + ' usuários atualmente em posse de Ativos deste tipo')
            else if (Asset?.Qtd === '0')
                NotificationAlerta('Preenchimento inválido', 'A quantidade não pode ser 0')
            else if (!Asset?.QtdPerUser)
                NotificationAlerta('Preenchimento inválido', 'A quantidade por usuário não pode ser vazia')
            else if (Asset?.QtdPerUser === '0')
                NotificationAlerta('Preenchimento inválido', 'A quantidade por usuário não pode ser 0')
            else if (!Asset?.StorageLocation?.id)
                NotificationAlerta('Preenchimento inválido', 'O Local de Armazenamento não pode ser vazio')
            else if (!Asset?.Status?.id)
                NotificationAlerta('Preenchimento inválido', 'O Status não pode ser vazio')
            else if (!Asset?.Usage?.id)
                NotificationAlerta('Preenchimento inválido', 'Selecione um Tipo de Uso')
            else if (!Asset?.Type?.id)
                NotificationAlerta('Preenchimento inválido', 'Selecione um Tipo de Ativo')
            else {
                SetConfirm(true)
                if (Action === 'Add') {
                    SetConfirmAction(Action)
                    SetConfirmMessage('Tem certeza que quer adicionar este Ativo?')
                    SetConfirmBtAction('Adicionar')
                    SetConfirmBtBack('Voltar')
                }
                if (Action === 'Edit') {
                    SetConfirmAction(Action)
                    if (IsCurrentUser)
                        SetConfirmMessage('Tem certeza que quer alterar as suas informações?')
                    else
                        SetConfirmMessage('Tem certeza que quer alterar as informações deste Ativo?')
                    SetConfirmBtAction('Alterar')
                    SetConfirmBtBack('Voltar')
                }

            }
        }
        //DELETE
        else {
            SetConfirm(true)
            SetConfirmAction(Action)
            SetConfirmMessage('Tem certeza que quer deletar este Ativo?')
            SetConfirmBtAction('Deletar')
            SetConfirmBtBack('Voltar')
        }
    }


    // SUBMIT FINAL ACTION
    const Submit = () => {
        setLoadingAction(true)
        //EDIT ASSET
        if (ConfirmAction === 'Edit') {

            const EditedAsset = { ...Asset }

            EditedAsset.CustomFieldsValues = EditedAsset.CustomFieldsValues.filter(Boolean)

            UpdateInFirebaseFunctions["Asset"](EditedAsset).then(() => {
                EditAssetOnStore(Asset)
                setLoadingAction(false)
                NotificationSucesso('Alteração', 'Alterações salvas com sucesso!')
            }).catch(HandleError)
            EndConfirming()
        }
        // ADD ASSET
        else if (ConfirmAction === 'Add') {
            const NewAsset = { ...Asset }
            NewAsset.id = IdToUse ? IdToUse : v4()


            NewAsset.CustomFieldsValues = NewAsset.CustomFieldsValues.filter(Boolean)


            AddToFirebaseFunctions["Asset"](NewAsset).then((AddedRecordDoc) => {
                NewAsset.docID = AddedRecordDoc?.id
                setAsset({ ...NewAsset })
                setLoadingAction(false)
                AddAssetStore(NewAsset)
                CancelEditions()
                props.onHide()
                NotificationSucesso('Adição', 'Ativo Adicionado com Sucesso!')
            }).catch(HandleError)
            EndConfirming()
        }
        // DELETE ASSET
        else if (ConfirmAction === 'Delete') {
            setLoadingAction(false)
            EndConfirming()
            props.onDelete()
            DeleteFromFirebaseFunctions["Asset"](Asset).then(() => {
                setLoadingAction(false)
                NotificationSucesso('Exclusão', 'Ativo Deletado com Sucesso!')
                ReturnAllRecordOfAssetwithId(Asset.id)
            }).catch(HandleError)
        }
    }

    // END CONFIRMING
    const EndConfirming = () => {
        SetConfirm(false)
        SetConfirmMessage('')
        SetConfirmBtAction('')
        SetConfirmBtBack('')
        SetConfirmAction('')
    }


    // HANDLE SET TAB
    const HandleSetTab = (TabToChange) => {
        if (TabToChange === 'RetirarDevolver' && !PermitToTakeAssets)
            NotificationErro("Permissão", "Você não tem permissão para acessar essa área, solicite autorização para seu Administrador")
        else if (TabToChange === 'RetirarDevolver' && StatusAsset?.CanTake === false)
            NotificationAlerta("Não permitido", "Este Ativo está com o Status '" + StatusAsset?.Value + "' , sendo este status confiigurado para não aceitar retiradas")
        else if (TabToChange === 'Invoice')
            NotificationAlerta("Ainda não", "Esta Tela ainda está em dsenvolvimento, logo estará disponível")
        else if (TabToChange === 'Photos')
            NotificationAlerta("Ainda não", "Esta Tela ainda está em dsenvolvimento, logo estará disponível")
        else
            setTab(TabToChange)
    }


    // SHOW PHOTO MODAL
    const handleShowPhotoModal = () => {
        setShowPhotoModal(true)
    }


    // CHANGE CUSTOM FIELDS VALUES
    const handleChangeCustomField = (TypedValue, Index, CustomFieldId) => {



        const NewAssetCustomFieldsValues = [...Asset?.CustomFieldsValues]




        NewAssetCustomFieldsValues[Index] = {
            id: CustomFieldId,
            Value: TypedValue
        }

        //console.log(NewAssetCustomFieldsValues)

        HandleChangeInfo('CustomFieldsValues', NewAssetCustomFieldsValues)
        setIsEdited(true)
    }




    return (


        <>

            {props.Asset &&
                <AssetPhotoModal
                    Add={props.Function === 'Add'}
                    CanEdit={PermitToEditAssets}
                    OnChange={SetAssetUrl}
                    Asset={props.Asset}
                    show={ShowPhotoModal}
                    onHide={() => setShowPhotoModal(false)}
                />
            }

            <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered fullscreen={'md-down'} className={props.Tema === 'Dark' ? 'AssetModal-ModalDark AssetModal-Modal' : 'AssetModal-ModalLightTheme AssetModal-Modal'}>

                <Modal.Body closeButton className="AssetModal-Body">

                    <span className='AssetModal-LastEditedAt'>Última Edição em {moment(Asset.LastEditedAt).format("DD/MM/YY")}</span>


                    <div className='AssetModal'>
                        <div className='AssetModalHeader'>
                            <div className='AssetModalHeader-Left'>
                                <Tooltip title="Ver/Alterar Foto" position="bottom" >
                                    <div className='AssetModalHeader-Left-Photo'>
                                        <img onClick={handleShowPhotoModal} src={ProfileImageUrl || props.TenantPhotos.MainLogo} alt="Item" />
                                    </div>
                                </Tooltip>
                            </div>
                            <div className='AssetModalHeader-Right'>
                                <div className='AssetModalHeader-Right-Name'>
                                    <Show Show={props.Function === 'Add'}>
                                        {(props.Function === 'Add' && (!Asset?.Item)) ? 'Nome do Item ' : Asset?.Item}
                                    </Show>
                                    <Show Show={props.Function !== 'Add'}>
                                        {Asset?.Item}
                                    </Show>
                                    <UilTimes className='AssetModalHeader-Right-Close' onClick={props.onHide} />
                                </div>


                                <div className='AssetModalHeader-Right-Sector'>
                                    <UilBox />
                                    <span>{props.Function === 'Add' ? GetNameFromStoreWithId('StorageLocations', Asset?.StorageLocation?.id) : AssetStorageLocation?.Value}</span>
                                </div>
                                <div className='AssetModalHeader-Right-Type'>
                                    <UilLabel />

                                    <span>{props.Function === 'Add' ? GetNameFromStoreWithId('AssetTypes', Asset?.Type?.id) : AssetType?.Value}</span>
                                </div>
                            </div>
                        </div>


                        <Show Show={!LoadingAction} Width='100%'>
                            <div className='AssetModalBody'>
                                <Stack className='AssetModalBody-Sidebar' Gap={'.5rem'} >
                                    <SidebarItem Active={Tab === 'AssetInfo'}
                                        onClick={e => HandleSetTab('AssetInfo')}>
                                        <UilUserCircle />
                                        Informações Cadastrais
                                    </SidebarItem>

                                    <Show Show={props.Function !== 'Add'}>
                                        <SidebarItem Active={Tab === 'RetirarDevolver'}
                                            onClick={e => HandleSetTab('RetirarDevolver')}>
                                            <UilArrow />
                                            Retirar/Devolver
                                        </SidebarItem>
                                    </Show>

                                    <Show Show={props.Function !== 'Add'}>
                                        <SidebarItem Active={Tab === 'Registros'}
                                            onClick={e => HandleSetTab('Registros')}>
                                            <UilClipboardNotes />
                                            Registros
                                        </SidebarItem>
                                    </Show>


                                    <Show Show={props.Function !== 'Add'}>
                                        <SidebarItem Active={Tab === 'Invoice'}
                                            onClick={e => HandleSetTab('Invoice')}>
                                            <UilInvoice />
                                            Nota Fiscal
                                        </SidebarItem>
                                    </Show>

                                    <Show Show={props.Function !== 'Add'}>
                                        <SidebarItem Active={Tab === 'Photos'}
                                            onClick={e => HandleSetTab('Photos')}>
                                            <UilImages />
                                            Imagens
                                        </SidebarItem>
                                    </Show>



                                </Stack>


                                <Show Show={!Confirm} Width={'100%'}>
                                    <div className='AssetModalBody-AssetInfo'>

                                        <Show Show={Tab === 'AssetInfo'}>

                                            <div className='AssetModalBody-AssetInfoForm'>

                                                <Stack Gap={'.8rem'}>

                                                    <h4 className='AssetModalBody-AssetInfoForm-SectionTitle'>Dados Cadastrais</h4>

                                                    <FormGroup>
                                                        <FormGroupLabel>
                                                            <UilWrench />
                                                            Item
                                                        </FormGroupLabel>
                                                        <FormInput
                                                            placeholder='Digite o Item'
                                                            value={Asset?.Item}
                                                            onChange={e => HandleChangeInfo('Item', e.target.value)}
                                                        />
                                                    </FormGroup>


                                                    <TwoColumns>
                                                        <FormGroup>
                                                            <FormGroupLabel>
                                                                <UilBuilding />
                                                                Marca
                                                            </FormGroupLabel>
                                                            <FormInput
                                                                placeholder='Opcional'
                                                                disabled={!CanEdit}
                                                                value={Asset?.Brand}
                                                                onChange={e => HandleChangeInfo('Brand', e.target.value)}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <FormGroupLabel>
                                                                <UilCircleLayer />
                                                                Quantidade
                                                            </FormGroupLabel>
                                                            <FormInput
                                                                placeholder='Digite a Quantidade'
                                                                min='1'
                                                                disabled={!CanEdit}
                                                                value={Asset?.Qtd}
                                                                type="number"
                                                                onChange={e => HandleChangeInfo('Qtd', e.target.value)}
                                                            />
                                                        </FormGroup>
                                                    </TwoColumns>


                                                    <FormGroup>
                                                        <FormGroupLabel>
                                                            <UilCommentAltChartLines />
                                                            Descrição
                                                        </FormGroupLabel>
                                                        <FormInput
                                                            value={Asset?.Description}
                                                            placeholder='Opcional'
                                                            onChange={e => HandleChangeInfo('Description', e.target.value)}
                                                        />
                                                    </FormGroup>



                                                    <TwoColumns>
                                                        <FormGroup>
                                                            <FormGroupLabel>
                                                                <UilCog />
                                                                Fabricante
                                                            </FormGroupLabel>
                                                            <FormInput
                                                                placeholder='Opcional'
                                                                disabled={!CanEdit}
                                                                value={Asset?.Manufacturer}
                                                                onChange={e => HandleChangeInfo('Manufacturer', e.target.value)}
                                                            />

                                                        </FormGroup>
                                                        <FormGroup>
                                                            <FormGroupLabel>
                                                                <UilLabelAlt />
                                                                Modelo
                                                            </FormGroupLabel>
                                                            <FormInput
                                                                placeholder='Opcional'
                                                                min='1' disabled={!CanEdit}
                                                                value={Asset?.Model}
                                                                onChange={e => HandleChangeInfo('Model', e.target.value)}
                                                            />

                                                        </FormGroup>
                                                    </TwoColumns>



                                                    <TwoColumns>
                                                        <FormGroup>
                                                            <FormGroupLabel>
                                                                <UilTag />
                                                                Status do Ativo
                                                            </FormGroupLabel>
                                                            <CustomSelect
                                                                placeholder="Selecione o Status"
                                                                options={props.AssetsStatus}
                                                                getOptionLabel={(options) => { return options["Value"]; }}
                                                                getOptionValue={(options) => { return options["id"]; }}
                                                                value={{
                                                                    id: Asset?.Status?.id,
                                                                    Value: GetNameFromStoreWithId('AssetsStatus', Asset?.Status?.id)
                                                                }}
                                                                isDisabled={!CanEdit}
                                                                onChange={(item) => { HandleChangeInfo('Status', item.id); }}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <FormGroupLabel>
                                                                <UilPlay />
                                                                Tipo de Uso
                                                            </FormGroupLabel>
                                                            <CustomSelect
                                                                placeholder="Selecione o Tipo de Uso"
                                                                options={props.UsageTypes}
                                                                getOptionLabel={(options) => { return options["Value"]; }}
                                                                getOptionValue={(options) => { return options["id"]; }}
                                                                value={{
                                                                    id: Asset?.Usage?.id,
                                                                    Value: GetNameFromStoreWithId('UsageTypes', Asset?.Usage?.id)
                                                                }}
                                                                isDisabled={!CanEdit}
                                                                onChange={(item) => { HandleChangeInfo('Usage', item.id); }}
                                                            />
                                                        </FormGroup>
                                                    </TwoColumns>

                                                    <TwoColumns>
                                                        <FormGroup>
                                                            <FormGroupLabel>
                                                                <UilUsersAlt />
                                                                Retiradas Simultâneas por Usuário
                                                            </FormGroupLabel>
                                                            <FormInput
                                                                value={Asset?.QtdPerUser}
                                                                type="number"
                                                                min={1}
                                                                placeholder='Quantidade de Retiradas simultâneas por usuário'
                                                                onChange={e => HandleChangeInfo('QtdPerUser', e.target.value)}
                                                            />

                                                        </FormGroup>
                                                        <FormGroup>
                                                            <FormGroupLabel>
                                                                <UilPostcard />
                                                                Número de Série
                                                            </FormGroupLabel>
                                                            <FormInput
                                                                placeholder='Opcional'
                                                                min='1'
                                                                disabled={!CanEdit}
                                                                value={Asset?.SerialNumber}
                                                                type="text"
                                                                onChange={e => HandleChangeInfo('SerialNumber', e.target.value)}
                                                            />

                                                        </FormGroup>
                                                    </TwoColumns>





                                                    <TwoColumns>
                                                        <EditList
                                                            Item={Asset}
                                                            List={props.StorageLocations}
                                                            Icon={<UilBox />}
                                                            Title="Local de Armazenamento"
                                                            Key='StorageLocation'
                                                            Handle={HandleChangeInfo} />

                                                        <EditList
                                                            Item={Asset}
                                                            List={props.AssetTypes}
                                                            Icon={<UilLabelAlt />}
                                                            Title="Tipo de Ativo"
                                                            Key='Type'
                                                            Handle={HandleChangeInfo} />
                                                    </TwoColumns>



                                                    <CustomFields
                                                        Container={AssetTypeCustomFields}
                                                        CanEdit={CanEdit}
                                                        Item={Asset}
                                                        Handle={handleChangeCustomField}
                                                    />





                                                </Stack>


                                                <div className='AssetModalBody-AssetInfoForm-Button'>


                                                    <Show Show={!IsEdited && !IsCurrentUser && PermitToDeleteAssets && (props.Function !== 'Add')}>
                                                        <button className='AssetModalBody-AssetInfoForm-Button-Delete' onClick={e => InitConfirm('Delete')}>
                                                            <UilTrash />
                                                            Excluir Ativo
                                                        </button>
                                                    </Show>

                                                    <Show Show={IsEdited && false}>
                                                        <button onClick={CancelEditions}>
                                                            <UilTimes />
                                                            {props.Function === 'Add' ? 'Limpar Campos' : 'Cancelar'}
                                                        </button>
                                                    </Show>

                                                    <Show Show={IsEdited && props.Function === 'Add'}>
                                                        <button onClick={e => InitConfirm('Add')}>
                                                            <UilSave />
                                                            Adicionar
                                                        </button>
                                                    </Show>

                                                    <Show Show={IsEdited && props.Function !== 'Add'}>
                                                        <button onClick={e => InitConfirm('Edit')}>
                                                            <UilSave />
                                                            Salvar
                                                        </button>
                                                    </Show>



                                                </div>


                                            </div>

                                        </Show>

                                        {Tab === 'RetirarDevolver' &&
                                            <AssetTakeReturn Asset={Asset} OnTake={setTab} />
                                        }

                                        <Show Show={Tab === 'Registros'}>
                                            <AssetRecords Asset={Asset} FromModal={props.FromModal} />
                                        </Show>

                                    </div>
                                </Show>




                                <Show Show={Confirm} Width='100%'>
                                    <ConfirmTab
                                        ConfirmMessage={ConfirmMessage}
                                        ConfirmBtBack={ConfirmBtBack}
                                        ConfirmBtAction={ConfirmBtAction}
                                        EndConfirming={EndConfirming}
                                        setIsEdited={setIsEdited}
                                        Submit={Submit}
                                    />
                                </Show>




                            </div>
                        </Show>

                        <Show Show={LoadingAction}>
                            <Loading />
                        </Show>


                    </div>


                </Modal.Body >

            </Modal >




        </>

    );
}


const ConnectedAssetModal = connect((state) => {
    return {
        Tema: state.Tema,
        RecordsAssets: state.RecordsAssets,
        TenantPhotos: state.TenantPhotos,
        AssetTypes: state.AssetTypes,
        StorageLocations: state.StorageLocations,
        AssetsStatus: state.AssetsStatus,
        UsageTypes: state.UsageTypes,
        UserTypes: state.UserTypes,
        CurrentUser: state.CurrentUser
    }
})(AssetModal)

export default ConnectedAssetModal



