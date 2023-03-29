import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react'
import './AtivoModal.css'
import UserPhoto from '../../../Images/SerranoLogoFuncoBranco.jpg'
import { UilUserCircle, UilClipboardNotes, UilLabelAlt, UilBox, UilSave, UilTag, UilTimes, UilBuilding, UilCircleLayer, UilPlay, UilWrench, UilCheck, UilBackward, UilTrash } from '@iconscout/react-unicons'
import { AddAtivo, DeleteAtivo, EditAtivo,  GetAtivoStatusWithIdFromStore, GetAtivoTypeWithIdFromStore, GetAtivoWithIdFromStore, GetCurrentUserTypeFromStore, GetLocaisArmazenamentoFromStore, GetLocalArmazenamentoNameWithIdFromStore, GetLocalArmazenamentoWithIdFromStore, GetStatusAtivosFromStore, GetTipoAtivoNameWithIdFromStore, GetTipoDeUsoWithIdFromStore, GetTiposAtivosFromStore, GetTiposDeUsoFromStore } from '../../../Functions/Middleware'
import { DefaultAtivo, DefaultAtivosType, DefaultLocal, } from '../../../Data/Items';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import { NotificationAlerta, NotificationSucesso } from '../../../NotificationUtils';
import 'react-phone-input-2/lib/style.css'
import Select from "react-select";
import { PermitIndexs } from '../../../GlobalVars'
import { noOptionsMessage, AtivoModalSelectcustomStyles } from './AtivoModalUtils';
import { v4 } from 'uuid';

const AtivoModal = (props) => {

    const [Tab, setTab] = useState('AtivoInfo')


    const [AtivoType, setAtivoType] = useState({ ...DefaultAtivosType })
    const [AtivoLocalArmazenamento, setAtivoLocalArmazenamento] = useState({ ...DefaultLocal })
    const [Ativo, setAtivo] = useState({ ...DefaultAtivo })
    const [LocaisArmazenamento] = useState(GetLocaisArmazenamentoFromStore())
    const [TiposAtivos] = useState(GetTiposAtivosFromStore())


    //CURRENT ATIVO AND PERMITS
    const [CurrentUserType] = useState(GetCurrentUserTypeFromStore())
    var IsCurrentUser = false
    var IsAdmin = false
    var CanEdit = false

    //Confirm 
    const [ConfirmAction, SetConfirmAction] = useState('')
    const [Confirm, SetConfirm] = useState(false)
    const [ConfirmMessage, SetConfirmMessage] = useState('')
    const [ConfirmBtAction, SetConfirmBtAction] = useState('')
    const [ConfirmBtBack, SetConfirmBtBack] = useState('')

    //COPIAS DAS INFORMAÇÔES DO ATIVO
    const [CopyAtivoName, setCopyAtivoName] = useState('')
    const [CopyAtivoType, setCopyAtivoType] = useState({})
    const [CopyAtivoLocalArmazenamento, setCopyAtivoLocalArmazenamento] = useState({})
    const [CopyAtivoStatus, setCopyAtivoStatus] = useState()
    const [CopyAtivoTipoDeUso, setCopyAtivoTipoDeUso] = useState()
    const [CopyAtivoBrand, setCopyAtivoBrand] = useState()
    const [CopyAtivoQtd, setCopyAtivoQtd] = useState()
    //COPIAS DAS INFORMAÇÔES DO ATIVO

    const [IsEdited, setIsEdited] = useState(false)


    console.log(CopyAtivoStatus)


    //PERMISSOES
    IsAdmin = CurrentUserType?.IsAdmin
    var PermitToEditAtivos = CurrentUserType?.Permits[PermitIndexs['EDITAR_ATIVOS']]
    var PermitToDeleteAtivos = CurrentUserType?.Permits[PermitIndexs['EXCLUIR_ATIVOS']]
    CanEdit = IsAdmin || PermitToEditAtivos
    //PERMISSOES

    const FillCopyes = (AtivoCopy) => {
        setCopyAtivoName(AtivoCopy?.Item)
        setCopyAtivoLocalArmazenamento(AtivoCopy?.StorageLocation)
        setCopyAtivoType(AtivoCopy?.Type)
        setCopyAtivoStatus(GetAtivoStatusWithIdFromStore(AtivoCopy?.Status.Id))
        setCopyAtivoTipoDeUso(GetTipoDeUsoWithIdFromStore(AtivoCopy?.Usage.Id))
        setCopyAtivoBrand(AtivoCopy?.Brand)
        setCopyAtivoQtd(AtivoCopy?.Qtd)
    }

    const CancelEditions = () => {
        FillCopyes(Ativo)
    }

    const HandleChangeInfo = (Info, Value) => {
        if (CanEdit) {
            if (Info === 'Item')
                setCopyAtivoName(Value)
            if (Info === 'Quantidade')
                setCopyAtivoQtd(Value)
            if (Info === 'Marca')
                setCopyAtivoBrand(Value)
        }
        if ((CanEdit || IsAdmin) || PermitToEditAtivos) {
            if (Info === 'Local')
                setCopyAtivoLocalArmazenamento({ Id: Value })
            else if (Info === 'Type')
                setCopyAtivoType({ Id: Value })
        }
    }



    // QUANDO TEM UM ATIVO VALIDO PASSADO PELA PROP
    useEffect(() => {
        if (!props.Ativo?.Item) return
        setAtivo(GetAtivoWithIdFromStore(props.Ativo?.Id))
        FillCopyes(GetAtivoWithIdFromStore(props.Ativo?.Id))
        setIsEdited(false)
        setTab('AtivoInfo')
    }, [props.Ativo, props.CurrentUser, CurrentUserType])


    // QUANDO ALGUMA INFORMAÇÂO MUDA
    useEffect(() => {
        if (CopyAtivoName !== Ativo?.Item || CopyAtivoBrand !== Ativo?.Brand || CopyAtivoQtd !== Ativo?.Qtd || CopyAtivoLocalArmazenamento?.Id !== Ativo?.StorageLocation?.Id || CopyAtivoStatus?.Id !== Ativo?.Status?.Id || CopyAtivoTipoDeUso?.Id !== Ativo?.Usage?.Id || CopyAtivoType?.Id !== Ativo?.Type?.Id)
            setIsEdited(true)
        else
            setIsEdited(false)
    }, [CopyAtivoName, CopyAtivoBrand, CopyAtivoQtd, CopyAtivoLocalArmazenamento, CopyAtivoStatus, CopyAtivoTipoDeUso, CopyAtivoType, Ativo])

    useEffect(() => {
        setAtivoType(GetAtivoTypeWithIdFromStore(Ativo?.Type?.Id))
        setAtivoLocalArmazenamento(GetLocalArmazenamentoWithIdFromStore(Ativo?.StorageLocation?.Id))
    }, [Ativo, props.CurrentUser])


    const GetAtivoSubmit = (e) => {
        e.preventDefault()
    }


    const InitConfirm = (Action) => {
        if (Action !== 'Delete') {
            //ADD AND EDIT
            if (CopyAtivoName.length === 0)
                NotificationAlerta('Preenchimento inválido', 'O Item não pode ser vazio')
            else if (!CopyAtivoQtd)
                NotificationAlerta('Preenchimento inválido', 'A quantidade não pode ser vazia')
            else if (CopyAtivoQtd === '0')
                NotificationAlerta('Preenchimento inválido', 'A quantidade não pode ser 0')
            else if (!CopyAtivoLocalArmazenamento?.Id)
                NotificationAlerta('Preenchimento inválido', 'O Local de Armazenamento não pode ser vazio')
            else if (!CopyAtivoStatus?.Id)
                NotificationAlerta('Preenchimento inválido', 'O Status não pode ser vazio')
            else if (!CopyAtivoTipoDeUso?.Id)
                NotificationAlerta('Preenchimento inválido', 'Selecione um Tipo de Uso')
            else if (!CopyAtivoType?.Id)
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
        } else {
            //DELETE
            SetConfirm(true)
            SetConfirmAction(Action)
            SetConfirmMessage('Tem certeza que quer deletar este Ativo?')
            SetConfirmBtAction('Deletar')
            SetConfirmBtBack('Voltar')
        }
    }


    const Submit = () => {
        if (ConfirmAction === 'Edit') {
            if (((CanEdit || IsAdmin) || PermitToEditAtivos)) {

                const EditedAtivo = { ...Ativo }

                EditedAtivo.Item = CopyAtivoName
                EditedAtivo.Brand = CopyAtivoBrand
                EditedAtivo.Qtd = CopyAtivoQtd
                EditedAtivo.Status = CopyAtivoStatus
                EditedAtivo.Usage = CopyAtivoTipoDeUso
                EditedAtivo.Type = CopyAtivoType
                EditedAtivo.StorageLocation = CopyAtivoLocalArmazenamento


                setAtivo({ ...EditedAtivo })
                EditAtivo(EditedAtivo).then(() => {
                    FillCopyes(EditedAtivo)
                    NotificationSucesso('Alteração', 'Alterações salvas com sucesso!')
                })

                EndConfirming()

            }
        } else if (ConfirmAction === 'Add') {
            const NewAtivo = { ...Ativo }

            NewAtivo.Id = v4()
            NewAtivo.Item = CopyAtivoName
            NewAtivo.Brand = CopyAtivoBrand
            NewAtivo.Qtd = CopyAtivoQtd
            NewAtivo.Status = CopyAtivoStatus
            NewAtivo.Usage = CopyAtivoTipoDeUso
            NewAtivo.Type = CopyAtivoType
            NewAtivo.StorageLocation = CopyAtivoLocalArmazenamento

            setAtivo({ ...NewAtivo })
            AddAtivo(NewAtivo).then(() => {
                CancelEditions()
                props.onHide()
                NotificationSucesso('Adição', 'Ativo Adicionado com Sucesso!')
            })
            EndConfirming()
        } else if (ConfirmAction === 'Delete') {
            const AtivoToDelete = { ...Ativo }
            EndConfirming()
            props.onDelete()
            DeleteAtivo(AtivoToDelete).then(() => {
                NotificationSucesso('Exclusão', 'Ativo Deletado com Sucesso!')

            })
        }
    }

    const EndConfirming = () => {
        SetConfirm(false)
        SetConfirmMessage('')
        SetConfirmBtAction('')
        SetConfirmBtBack('')
        SetConfirmAction('')
    }









    return (
        <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered fullscreen={'md-down'} className={localStorage.getItem('AssetSenseTema') === 'Escuro' ? 'AtivoModal-ModalEscuro AtivoModal-Modal' : 'AtivoModal-ModalClaro AtivoModal-Modal'}>

            <Modal.Body closeButton className="AtivoModal-Body">




                <div className='AtivoModal'>
                    <div className='AtivoModalHeader'>
                        <div className='AtivoModalHeader-Left'>
                            <div className='AtivoModalHeader-Left-Photo'>
                                <img src={UserPhoto} alt="Item" />
                            </div>
                        </div>
                        <div className='AtivoModalHeader-Right'>
                            <div className='AtivoModalHeader-Right-Name'>

                                {props.Function === 'Add' && <span>
                                    {(props.Function === 'Add' && (!CopyAtivoName)) ? 'Nome do Item ' : CopyAtivoName}
                                </span>
                                }

                                {(props.Function !== 'Add') ? Ativo?.Item : ''}
                                <UilTimes className='AtivoModalHeader-Right-Close' onClick={props.onHide} />
                            </div>
                            <div className='AtivoModalHeader-Right-Setor'>
                                {props.Function === 'Add' ? GetLocalArmazenamentoNameWithIdFromStore(CopyAtivoLocalArmazenamento?.Id) : AtivoLocalArmazenamento?.Value}
                            </div>
                            <div className='AtivoModalHeader-Right-Tipo'>
                                {props.Function === 'Add' ? GetTipoAtivoNameWithIdFromStore(CopyAtivoType?.Id) : AtivoType?.Value}
                            </div>
                        </div>

                    </div>
                    <div className='AtivoModalBody'>
                        <div className='AtivoModalBody-Sidebar'>
                            <div className={Tab === 'AtivoInfo' ? 'AtivoModalBody-Sidebar-ActiveItem' : 'AtivoModalBody-Sidebar-Item'} onClick={e => setTab('AtivoInfo')}>
                                <UilUserCircle />
                                Informações Cadastrais
                            </div>

                            {props.Function !== 'Add' &&
                                <div className={Tab === 'Registros' ? 'AtivoModalBody-Sidebar-ActiveItem' : 'AtivoModalBody-Sidebar-Item'} onClick={e => setTab('Registros')}>
                                    <UilClipboardNotes />
                                    Registros
                                </div>
                            }
                        </div>

                        {!Confirm &&
                            <div className='AtivoModalBody-AtivoInfo'>
                                {Tab === 'AtivoInfo' && <div className='AtivoModalBody-AtivoInfoForm'>
                                    <form onSubmit={GetAtivoSubmit}>

                                        <h4 className='AtivoModalBody-AtivoInfoForm-SectionTitle'>Dados Cadastrais</h4>


                                        <div className='AtivoModalBody-AtivoInfoForm-OneLine'>
                                            <div className='AtivoModalBody-AtivoInfoForm-Group'>
                                                <span>
                                                    <UilWrench />
                                                    Item
                                                </span>
                                                <input value={CopyAtivoName} type="text" placeholder='Digite o Item' onChange={e => HandleChangeInfo('Item', e.target.value)} />

                                            </div>
                                        </div>

                                        <div className='AtivoModalBody-AtivoInfoForm-TwoLine'>
                                            <div className='AtivoModalBody-AtivoInfoForm-Group'>
                                                <span>
                                                    <UilBuilding />
                                                    Marca
                                                </span>
                                                <input placeholder='Digite a Marca (Opcional)' disabled={!CanEdit} value={CopyAtivoBrand} type="text" onChange={e => HandleChangeInfo('Marca', e.target.value)} />
                                            </div>
                                            <div className='AtivoModalBody-AtivoInfoForm-Group'>
                                                <span>
                                                    <UilCircleLayer />
                                                    Quantidade
                                                </span>
                                                <input placeholder='Digite a Quantidade' min='1' disabled={!CanEdit} value={CopyAtivoQtd} type="number" onChange={e => HandleChangeInfo('Quantidade', e.target.value)} />
                                            </div>
                                        </div>



                                        <div className='AtivoModalBody-AtivoInfoForm-TwoLine'>
                                            <div className='AtivoModalBody-AtivoInfoForm-Group'>
                                                <span>
                                                    <UilTag />
                                                    Status do Ativo
                                                </span>
                                                <Select
                                                    className='AtivoModalBody-AtivoInfoForm-LocationSelect'
                                                    placeholder="Selecione o Status"
                                                    noOptionsMessage={noOptionsMessage}
                                                    options={GetStatusAtivosFromStore()}
                                                    getOptionLabel={(options) => { return options["Value"]; }}
                                                    getOptionValue={(options) => { return options["Id"]; }}
                                                    styles={AtivoModalSelectcustomStyles}
                                                    value={CopyAtivoStatus}
                                                    isDisabled={!CanEdit}
                                                    onChange={(item) => { setCopyAtivoStatus(item); }}
                                                />
                                            </div>
                                            <div className='AtivoModalBody-AtivoInfoForm-Group'>
                                                <span>
                                                    <UilPlay />
                                                    Tipo de Uso
                                                </span>
                                                <Select
                                                    className='AtivoModalBody-AtivoInfoForm-LocationSelect'
                                                    placeholder="Selecione o Tipo de Uso"
                                                    noOptionsMessage={noOptionsMessage}
                                                    options={GetTiposDeUsoFromStore()}
                                                    getOptionLabel={(options) => { return options["Value"]; }}
                                                    getOptionValue={(options) => { return options["Id"]; }}
                                                    styles={AtivoModalSelectcustomStyles}
                                                    value={CopyAtivoTipoDeUso}
                                                    isDisabled={!CanEdit}
                                                    onChange={(item) => { setCopyAtivoTipoDeUso(item); }}
                                                />
                                            </div>
                                        </div>


                                        <div className='AtivoModalBody-AtivoInfoForm-TwoLine'>
                                            <div className='AtivoModalBody-AtivoInfoForm-Group'>

                                                <div className='AtivoModalBody-AtivoInfoForm-LocalList'>
                                                    <div className='AtivoModalBody-AtivoInfoForm-LocalList-Title'>
                                                        <UilBox />
                                                        Local de Armazenamento
                                                    </div>
                                                    <div className='AtivoModalBody-AtivoInfoForm-LocalList-Itens'>
                                                        {LocaisArmazenamento.map(Local => {
                                                            return <div className={'AtivoModalBody-AtivoInfoForm-LocalList-Item'} onClick={e => HandleChangeInfo('Local', Local?.Id)}>
                                                                {CopyAtivoLocalArmazenamento?.Id === Local?.Id ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                                                                {Local?.Value}
                                                            </div>
                                                        })}
                                                    </div>
                                                </div>

                                            </div>

                                            <div className='AtivoModalBody-AtivoInfoForm-Group'>
                                                <div className='AtivoModalBody-AtivoInfoForm-TiposAtivosList'>
                                                    <div className='AtivoModalBody-AtivoInfoForm-TiposAtivosList-Title'>
                                                        <UilLabelAlt />
                                                        Tipo do Ativo
                                                    </div>
                                                    <div className='AtivoModalBody-AtivoInfoForm-TiposAtivosList-Itens'>
                                                        {TiposAtivos.map(TipoAtivo => {
                                                            return <div className={'AtivoModalBody-AtivoInfoForm-TiposAtivosList-Item'} onClick={e => HandleChangeInfo('Type', TipoAtivo?.Id)}>
                                                                {CopyAtivoType?.Id === TipoAtivo?.Id ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                                                                {TipoAtivo?.Value}
                                                            </div>
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </form>


                                    <div className='AtivoModalBody-AtivoInfoForm-Button'>
                                        {!IsEdited && !IsCurrentUser && PermitToDeleteAtivos && (props.Function !== 'Add') &&
                                            <button className='AtivoModalBody-AtivoInfoForm-Button-Delete' onClick={e => InitConfirm('Delete')}>
                                                <UilTrash />
                                                Excluir Ativo
                                            </button>
                                        }
                                        {IsEdited &&
                                            <>
                                                <button onClick={CancelEditions}>
                                                    <UilTimes />
                                                    {props.Function === 'Add' ? 'Limpar Campos' : 'Cancelar'}
                                                </button>

                                                {props.Function === 'Add' &&
                                                    <button onClick={e => InitConfirm('Add')}>
                                                        <UilSave />
                                                        Adicionar
                                                    </button>
                                                }

                                                {props.Function !== 'Add' &&
                                                    <button onClick={e => InitConfirm('Edit')}>
                                                        <UilSave />
                                                        Salvar
                                                    </button>
                                                }


                                            </>

                                        }
                                    </div>


                                </div>
                                }

                            </div>
                        }

                        {Confirm && <div className='AtivoModalBody-AtivoInfo'>
                            <h4 className='AtivoModalBody-AtivoInfoForm-ConfirMessage'>{ConfirmMessage}</h4>
                            <div className='AtivoModalBody-AtivoInfoForm-Button'>
                                <button className='AtivoModalBody-AtivoInfoForm-Button-Secondary' onClick={EndConfirming}>
                                    <UilBackward />
                                    {ConfirmBtBack}
                                </button>
                                <button onClick={Submit}>
                                    <UilCheck />
                                    {ConfirmBtAction}
                                </button>
                            </div>
                        </div>
                        }








                    </div>

                </div>


            </Modal.Body >

        </Modal >
    );
}





export default AtivoModal