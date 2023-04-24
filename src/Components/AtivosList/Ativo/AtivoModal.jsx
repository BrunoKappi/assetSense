import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react'
//CSS
import './AtivoModal.css'
//COMPONENTS
import UserPhoto from '../../../assets/Images/SerranoLogoFuncoBranco.jpg'
import AtivoPhotoModal from './AtivoPhotoModal/AtivoPhotoModal'
import AtivoTakeReturn from './AtivoTakeReturn/AtivoTakeReturn';
import AtivoRecords from './AtivoRecords/AtivoRecords';
import Loading from '../../LoadingForTabs/Loading';
//ICONS
import { UilUserCircle, UilClipboardNotes, UilLabel, UilLabelAlt, UilCog, UilBox, UilSave, UilPostcard, UilUsersAlt, UilCommentAltChartLines, UilTag, UilTimes, UilBuilding, UilCircleLayer, UilPlay, UilWrench, UilCheck, UilBackward, UilTrash, UilArrow } from '@iconscout/react-unicons'
//FUNCTIONS
import { NotificationAlerta, NotificationErro, NotificationSucesso } from '../../../NotificationUtils';
import { GetFromStore, GetNameFromStoreWithId } from '../../../Functions/Middleware';
import { AddAtivo, AddAtivoFirebase, DeleteAtivo, EditAtivo,  GetFromStoreWithId, ReturnAllRecordOfAtivowithId } from '../../../Functions/Middleware'
//VARIABLES
import { DefaultAtivo, DefaultAtivosType, DefaultLocal, } from '../../../Data/Items';
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


const AtivoModal = (props) => {

    //DEPENDENCIAS 
    const StatusAtivo = GetFromStoreWithId('StatusAtivos', props?.Ativo?.Status?.id)
    const [ProfileImageUrl, setProfileImageUrl] = useState('')
    const [AtivoType, setAtivoType] = useState({ ...DefaultAtivosType })
    const [AtivoTypeCustomFields, setAtivoTypeCustomFields] = useState([])
    const [AtivoLocalArmazenamento, setAtivoLocalArmazenamento] = useState({ ...DefaultLocal })
    const [Ativo, setAtivo] = useState({ ...DefaultAtivo })
    const [StorageLocations] = useState(GetFromStore('StorageLocations'))
    const [TiposAtivos] = useState(GetFromStore('TiposAtivos'))
    const QuantidadeRetirada = props.Ativo?.QtdInUse


    //FUNCIONALIDADE 
    const [Tab, setTab] = useState('AtivoInfo')
    const [IdToUse, setIdToUse] = useState('')
    const [IsEdited, setIsEdited] = useState(false)
    const [LoadingAction, setLoadingAction] = useState(false)

    //CURRENT ATIVO AND PERMITS
    const [CurrentUserType] = useState(GetFromStore('CurrentUserType'))


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
    var PermitToEditAtivos = CurrentUserType?.Permits[PermitIndexs['EDITAR_ATIVOS']]
    var PermitToDeleteAtivos = CurrentUserType?.Permits[PermitIndexs['EXCLUIR_ATIVOS']]
    var PermitToTakeAtivos = CurrentUserType?.Permits[PermitIndexs['RETIRAR_ATIVOS']]
    var CanEdit = IsAdmin || PermitToEditAtivos



    // CANCEL EDITIONS
    const CancelEditions = () => {
        setIsEdited(false)
        return
    }


    // GERENCIAMENTO DE ALTERAÇÕES DE INFORMAÇÔES
    const HandleChangeInfo = (Info, Value) => {
        if (!CanEdit) return

        const newAtivo = { ...Ativo }
        switch (Info) {
            case 'Type':
                newAtivo.Type = { id: Value }
                const GotAtivoType = GetFromStoreWithId('TiposAtivos', Value)
                setAtivoType(GotAtivoType)
                break
            case 'Status':
                newAtivo.Status = { id: Value }
                break
            case 'Usage':
                newAtivo.Usage = { id: Value }
                break
            case 'StorageLocation':
                newAtivo.StorageLocation = { id: Value }
                break
            default:
                newAtivo[Info] = Value
                break
        }

        setAtivo(newAtivo)
        setIsEdited(true)
    }


    // QUANDO TEM UM ATIVO VALIDO PASSADO PELA PROP
    useEffect(() => {
        if (!props.Ativo?.Item) return
        setAtivo(GetFromStoreWithId('AtivosWithDeleted', props.Ativo?.id))
        setIsEdited(false)
        setTab('AtivoInfo')
        if (props.Ativo?.PhotoUrl) {
            setProfileImageUrl(props.Ativo?.PhotoUrl)
        } else {
            setProfileImageUrl('')
        }


    }, [props.Ativo, props.CurrentUser, CurrentUserType])


    // PHOTO URL FROM PHOTO MODAL
    const SetAtivoUrl = (url, Id) => {
        HandleChangeInfo('PhotoUrl', url)
        setProfileImageUrl(url)
        setTimeout(() => {
            setProfileImageUrl(url)
        }, 3000);
        setShowPhotoModal(false)

        // SE ESTIVER ADICIONANDO E COLOCAR UMA FOTO, SET EM UM ID
        if (props.Function === 'Add') {
            setIdToUse(Id)
        }
    }



    //QUANDO O ATIVO TYPE MUDA, PEGA O NOVO TYPE
    useEffect(() => {
        setAtivoType(GetFromStoreWithId('TiposAtivos', Ativo?.Type?.id))
        setAtivoLocalArmazenamento(GetFromStoreWithId('StorageLocations', Ativo?.StorageLocation?.id))
    }, [Ativo, props.CurrentUser])


    //QUANDO O ATIVOTYPE MUDA, PEGA OS CUSTOMS FIELDS
    useEffect(() => {
        if (AtivoType?.CustomFields?.length > 0) {
            setAtivoTypeCustomFields([...AtivoType?.CustomFields])
        } else {
            setAtivoTypeCustomFields([])
        }

    }, [AtivoType])


    // HANDLE ERROR
    const HandleError = (Erro) => {
        console.log(Erro)
        NotificationErro("Erro", "Ocorreu um problema, tente novamente")
        setLoadingAction(false)
    }


    // INIT CONFIRMING
    const InitConfirm = (Action) => {
        //ADD AND EDIT
        if (Action !== 'Delete') {
            if (Ativo?.Item.length === 0)
                NotificationAlerta('Preenchimento inválido', 'O Item não pode ser vazio')
            else if (!Ativo?.Qtd)
                NotificationAlerta('Preenchimento inválido', 'A quantidade não pode ser vazia')
            else if (Ativo?.Qtd < QuantidadeRetirada)
                NotificationAlerta('Preenchimento inválido', 'Não é possível alterar a quantidade para ' + Ativo?.Qtd + ' pois existem ' + QuantidadeRetirada + ' usuários atualmente em posse de Ativos deste tipo')
            else if (Ativo?.Qtd === '0')
                NotificationAlerta('Preenchimento inválido', 'A quantidade não pode ser 0')
            else if (!Ativo?.QtdPerUser)
                NotificationAlerta('Preenchimento inválido', 'A quantidade por usuário não pode ser vazia')
            else if (Ativo?.QtdPerUser === '0')
                NotificationAlerta('Preenchimento inválido', 'A quantidade por usuário não pode ser 0')
            else if (!Ativo?.StorageLocation?.id)
                NotificationAlerta('Preenchimento inválido', 'O Local de Armazenamento não pode ser vazio')
            else if (!Ativo?.Status?.id)
                NotificationAlerta('Preenchimento inválido', 'O Status não pode ser vazio')
            else if (!Ativo?.Usage?.id)
                NotificationAlerta('Preenchimento inválido', 'Selecione um Tipo de Uso')
            else if (!Ativo?.Type?.id)
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
        //EDIT ATIVO
        if (ConfirmAction === 'Edit') {
            EditAtivo(Ativo).then(() => {
                setLoadingAction(false)
                NotificationSucesso('Alteração', 'Alterações salvas com sucesso!')
            }).catch(HandleError)
            EndConfirming()
        }
        // ADD ATIVO
        else if (ConfirmAction === 'Add') {
            const NewAtivo = { ...Ativo }
            NewAtivo.id = IdToUse ? IdToUse : v4()
            AddAtivo(NewAtivo).then((AddedRecordDoc) => {
                NewAtivo.docID = AddedRecordDoc?.id
                setAtivo({ ...NewAtivo })
                setLoadingAction(false)
                AddAtivoFirebase(NewAtivo)
                CancelEditions()
                props.onHide()
                NotificationSucesso('Adição', 'Ativo Adicionado com Sucesso!')
            }).catch(HandleError)
            EndConfirming()
        }
        // DELETE ATIVO
        else if (ConfirmAction === 'Delete') {
            setLoadingAction(false)
            EndConfirming()
            props.onDelete()
            DeleteAtivo(Ativo).then(() => {
                setLoadingAction(false)
                ReturnAllRecordOfAtivowithId(Ativo.id)
                NotificationSucesso('Exclusão', 'Ativo Deletado com Sucesso!')
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
        if (TabToChange === 'RetirarDevolver' && !PermitToTakeAtivos)
            NotificationErro("Permissão", "Você não tem permissão para acessar essa área, solicite autorização para seu Administrador")
        else if (TabToChange === 'RetirarDevolver' && StatusAtivo?.CanTake === false)
            NotificationAlerta("Não permitido", "Este Ativo está com o Status '" + StatusAtivo?.Value + "' , sendo este status confiigurado para não aceitar retiradas")
        else
            setTab(TabToChange)
    }


    // SHOW PHOTO MODAL
    const handleShowPhotoModal = () => {
        setShowPhotoModal(true)
    }


    // CHANGE CUSTOM FIELDS VALUES
    const handleChangeCustomField = (TypedValue, Index, CustomFieldId) => {
        const NewAtivoCustomFieldsValues = [...Ativo?.CustomFieldsValues]
        NewAtivoCustomFieldsValues[Index] = {
            id: CustomFieldId,
            Value: TypedValue
        }
        HandleChangeInfo('CustomFieldsValues', NewAtivoCustomFieldsValues)
        setIsEdited(true)
    }




    return (


        <>
            <AtivoPhotoModal Add={props.Function === 'Add'} CanEdit={PermitToEditAtivos} OnChange={SetAtivoUrl} Ativo={props.Ativo} show={ShowPhotoModal} onHide={() => setShowPhotoModal(false)} />

            <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered fullscreen={'md-down'} className={props.Tema === 'Escuro' ? 'AtivoModal-ModalEscuro AtivoModal-Modal' : 'AtivoModal-ModalClaro AtivoModal-Modal'}>

                <Modal.Body closeButton className="AtivoModal-Body">




                    <div className='AtivoModal'>
                        <div className='AtivoModalHeader'>
                            <div className='AtivoModalHeader-Left'>
                                <Tooltip title="Ver/Alterar Foto" position="bottom" >
                                    <div className='AtivoModalHeader-Left-Photo'>
                                        <img onClick={handleShowPhotoModal} src={ProfileImageUrl || UserPhoto} alt="Item" />
                                    </div>
                                </Tooltip>
                            </div>
                            <div className='AtivoModalHeader-Right'>
                                <div className='AtivoModalHeader-Right-Name'>
                                    <Show Show={props.Function === 'Add'}>
                                        {(props.Function === 'Add' && (!Ativo?.Item)) ? 'Nome do Item ' : Ativo?.Item}
                                    </Show>
                                    <Show Show={props.Function !== 'Add'}>
                                        {Ativo?.Item}
                                    </Show>
                                    <UilTimes className='AtivoModalHeader-Right-Close' onClick={props.onHide} />
                                </div>


                                <div className='AtivoModalHeader-Right-Setor'>
                                    <UilBox />
                                    {props.Function === 'Add' ? GetNameFromStoreWithId('StorageLocations', Ativo?.StorageLocation?.id) : AtivoLocalArmazenamento?.Value}
                                </div>
                                <div className='AtivoModalHeader-Right-Tipo'>
                                    <UilLabel />
                                    {props.Function === 'Add' ? GetNameFromStoreWithId('TiposAtivos', Ativo?.Type?.id) : AtivoType?.Value}
                                </div>

                            </div>

                        </div>


                        <Show Show={!LoadingAction} Width='100%'>
                            <div className='AtivoModalBody'>
                                <Stack className='AtivoModalBody-Sidebar' Gap={'.5rem'} >
                                    <SidebarItem Active={Tab === 'AtivoInfo'}
                                        onClick={e => HandleSetTab('AtivoInfo')}>
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


                                </Stack>


                                <Show Show={!Confirm} Width={'100%'}>
                                    <div className='AtivoModalBody-AtivoInfo'>

                                        <Show Show={Tab === 'AtivoInfo'}>

                                            <div className='AtivoModalBody-AtivoInfoForm'>

                                                <Stack Gap={'.8rem'}>

                                                    <h4 className='AtivoModalBody-AtivoInfoForm-SectionTitle'>Dados Cadastrais</h4>

                                                    <FormGroup>
                                                        <FormGroupLabel>
                                                            <UilWrench />
                                                            Item
                                                        </FormGroupLabel>
                                                        <FormInput
                                                            placeholder='Digite o Item'
                                                            value={Ativo?.Item}
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
                                                                value={Ativo?.Brand}
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
                                                                value={Ativo?.Qtd}
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
                                                            value={Ativo?.Description}
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
                                                                value={Ativo?.Manufacturer}
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
                                                                value={Ativo?.Model}
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
                                                                options={GetFromStore('StatusAtivos')}
                                                                getOptionLabel={(options) => { return options["Value"]; }}
                                                                getOptionValue={(options) => { return options["id"]; }}
                                                                value={{
                                                                    id: Ativo?.Status?.id,
                                                                    Value: GetNameFromStoreWithId('StatusAtivos', Ativo?.Status?.id)
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
                                                                options={GetFromStore('TiposDeUso')}
                                                                getOptionLabel={(options) => { return options["Value"]; }}
                                                                getOptionValue={(options) => { return options["id"]; }}
                                                                value={{
                                                                    id: Ativo?.Usage?.id,
                                                                    Value: GetNameFromStoreWithId('TiposDeUso', Ativo?.Usage?.id)
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
                                                                value={Ativo?.QtdPerUser}
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
                                                                value={Ativo?.SerialNumber}
                                                                type="text"
                                                                onChange={e => HandleChangeInfo('SerialNumber', e.target.value)}
                                                            />

                                                        </FormGroup>
                                                    </TwoColumns>





                                                    <TwoColumns>
                                                        <EditList
                                                            Item={Ativo}
                                                            List={StorageLocations}
                                                            Icon={<UilBox />}
                                                            Title="Local de Armazenamento"
                                                            Key='StorageLocation'
                                                            Handle={HandleChangeInfo} />

                                                        <EditList
                                                            Item={Ativo}
                                                            List={TiposAtivos}
                                                            Icon={<UilLabelAlt />}
                                                            Title="Tipo de Ativo"
                                                            Key='Type'
                                                            Handle={HandleChangeInfo} />
                                                    </TwoColumns>



                                                    <CustomFields
                                                        Container={AtivoTypeCustomFields}
                                                        CanEdit={CanEdit}
                                                        Item={Ativo}
                                                        Handle={handleChangeCustomField}
                                                    />





                                                </Stack>


                                                <div className='AtivoModalBody-AtivoInfoForm-Button'>


                                                    <Show Show={!IsEdited && !IsCurrentUser && PermitToDeleteAtivos && (props.Function !== 'Add')}>
                                                        <button className='AtivoModalBody-AtivoInfoForm-Button-Delete' onClick={e => InitConfirm('Delete')}>
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

                                        <Show Show={Tab === 'RetirarDevolver'}>
                                            <AtivoTakeReturn Ativo={Ativo} OnTake={setTab} />
                                        </Show>

                                        <Show Show={Tab === 'Registros'}>
                                            <AtivoRecords Ativo={Ativo} FromModal={props.FromModal} />
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


const ConnectedAtivoModal = connect((state) => {
    return {
        Tema: state.Tema,
        RecordsAtivos: state.RecordsAtivos
    }
})(AtivoModal)

export default ConnectedAtivoModal



