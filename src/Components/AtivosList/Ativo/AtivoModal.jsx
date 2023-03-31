import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react'
import './AtivoModal.css'
import UserPhoto from '../../../assets/Images/SerranoLogoFuncoBranco.jpg'
import { UilUserCircle, UilClipboardNotes, UilLabel, UilLabelAlt, UilBox, UilSave, UilTag, UilTimes, UilBuilding, UilCircleLayer, UilPlay, UilWrench, UilCheck, UilBackward, UilTrash, UilArrow } from '@iconscout/react-unicons'
import { AddAtivo, AddAtivoFirebase, DeleteAtivo, EditAtivo,  GetAtivoStatusWithIdFromStore, GetAtivoTypeWithIdFromStore, GetAtivoWithIdFromStore, GetCurrentUserTypeFromStore, GetLocaisArmazenamentoFromStore, GetLocalArmazenamentoNameWithIdFromStore, GetLocalArmazenamentoWithIdFromStore, GetStatusAtivosFromStore, GetTakesOfAtivo, GetTipoAtivoNameWithIdFromStore, GetTipoDeUsoWithIdFromStore, GetTiposAtivosFromStore, GetTiposDeUsoFromStore, ReturnAllRecordOfAtivowithId } from '../../../Functions/Middleware'
import { DefaultAtivo, DefaultAtivosType, DefaultLocal, } from '../../../Data/Items';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import { NotificationAlerta, NotificationErro, NotificationSucesso } from '../../../NotificationUtils';
import 'react-phone-input-2/lib/style.css'
import Select from "react-select";
import { PermitIndexs } from '../../../GlobalVars'
import { noOptionsMessage, AtivoModalSelectcustomStyles } from './AtivoModalUtils';
import { v4 } from 'uuid';
import AtivoTakeReturn from './AtivoTakeReturn/AtivoTakeReturn';
import AtivoRecords from './AtivoRecords/AtivoRecords';



const AtivoModal = (props) => {

    const [Tab, setTab] = useState('AtivoInfo')


    const [AtivoType, setAtivoType] = useState({ ...DefaultAtivosType })
    const [AtivoLocalArmazenamento, setAtivoLocalArmazenamento] = useState({ ...DefaultLocal })
    const [Ativo, setAtivo] = useState({ ...DefaultAtivo })
    const [LocaisArmazenamento] = useState(GetLocaisArmazenamentoFromStore())
    const [TiposAtivos] = useState(GetTiposAtivosFromStore())

    const QuantidadeRetirada = GetTakesOfAtivo(props.Ativo?.id)


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




    //PERMISSOES
    IsAdmin = CurrentUserType?.IsAdmin
    var PermitToEditAtivos = CurrentUserType?.Permits[PermitIndexs['EDITAR_ATIVOS']]
    var PermitToDeleteAtivos = CurrentUserType?.Permits[PermitIndexs['EXCLUIR_ATIVOS']]
    var PermitToTakeAtivos = CurrentUserType?.Permits[PermitIndexs['RETIRAR_ATIVOS']]
    CanEdit = IsAdmin || PermitToEditAtivos
    //PERMISSOES 

    const FillCopyes = (AtivoCopy) => {
        setCopyAtivoName(AtivoCopy?.Item)
        setCopyAtivoLocalArmazenamento(AtivoCopy?.StorageLocation)
        setCopyAtivoType(AtivoCopy?.Type)
        setCopyAtivoStatus(GetAtivoStatusWithIdFromStore(AtivoCopy?.Status.id))
        setCopyAtivoTipoDeUso(GetTipoDeUsoWithIdFromStore(AtivoCopy?.Usage.id))
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
                setCopyAtivoLocalArmazenamento({ id: Value })
            else if (Info === 'Type')
                setCopyAtivoType({ id: Value })
        }
    }



    // QUANDO TEM UM ATIVO VALIDO PASSADO PELA PROP
    useEffect(() => {
        if (!props.Ativo?.Item) return
        setAtivo(GetAtivoWithIdFromStore(props.Ativo?.id))
        FillCopyes(GetAtivoWithIdFromStore(props.Ativo?.id))
        setIsEdited(false)
        setTab('AtivoInfo')
    }, [props.Ativo, props.CurrentUser, CurrentUserType])


    // QUANDO ALGUMA INFORMAÇÂO MUDA
    useEffect(() => {
        if (CopyAtivoName !== Ativo?.Item || CopyAtivoBrand !== Ativo?.Brand || CopyAtivoQtd !== Ativo?.Qtd || CopyAtivoLocalArmazenamento?.id !== Ativo?.StorageLocation?.id || CopyAtivoStatus?.id !== Ativo?.Status?.id || CopyAtivoTipoDeUso?.id !== Ativo?.Usage?.id || CopyAtivoType?.id !== Ativo?.Type?.id)
            setIsEdited(true)
        else
            setIsEdited(false)
    }, [CopyAtivoName, CopyAtivoBrand, CopyAtivoQtd, CopyAtivoLocalArmazenamento, CopyAtivoStatus, CopyAtivoTipoDeUso, CopyAtivoType, Ativo])

    useEffect(() => {
        setAtivoType(GetAtivoTypeWithIdFromStore(Ativo?.Type?.id))
        setAtivoLocalArmazenamento(GetLocalArmazenamentoWithIdFromStore(Ativo?.StorageLocation?.id))
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
            else if (CopyAtivoQtd < QuantidadeRetirada)
                NotificationAlerta('Preenchimento inválido', 'Não é possível alterar a quantidade para ' + CopyAtivoQtd + ' pois existem ' + QuantidadeRetirada + ' usuários atualmente em posse de Ativos deste tipo')
            else if (CopyAtivoQtd === '0')
                NotificationAlerta('Preenchimento inválido', 'A quantidade não pode ser 0')
            else if (!CopyAtivoLocalArmazenamento?.id)
                NotificationAlerta('Preenchimento inválido', 'O Local de Armazenamento não pode ser vazio')
            else if (!CopyAtivoStatus?.id)
                NotificationAlerta('Preenchimento inválido', 'O Status não pode ser vazio')
            else if (!CopyAtivoTipoDeUso?.id)
                NotificationAlerta('Preenchimento inválido', 'Selecione um Tipo de Uso')
            else if (!CopyAtivoType?.id)
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

            NewAtivo.id = v4()
            NewAtivo.Item = CopyAtivoName
            NewAtivo.Brand = CopyAtivoBrand ? CopyAtivoBrand : ''
            NewAtivo.Qtd = CopyAtivoQtd
            NewAtivo.Status = CopyAtivoStatus
            NewAtivo.Usage = CopyAtivoTipoDeUso
            NewAtivo.Type = CopyAtivoType
            NewAtivo.Deleted = false
            NewAtivo.StorageLocation = CopyAtivoLocalArmazenamento

            setAtivo({ ...NewAtivo })
            console.log(NewAtivo)
            AddAtivo(NewAtivo).then(() => {
                AddAtivoFirebase(NewAtivo)
                CancelEditions()
                props.onHide()
                NotificationSucesso('Adição', 'Ativo Adicionado com Sucesso!')
            }).catch((erro)=>{
                console.log(erro)
            })
            EndConfirming()
        } else if (ConfirmAction === 'Delete') {
            const AtivoToDelete = { ...Ativo }
            EndConfirming()
            props.onDelete()
            DeleteAtivo(AtivoToDelete).then(() => {
                ReturnAllRecordOfAtivowithId(AtivoToDelete.id)
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





    const HandleSetTab = (TabToChange) => {
        if (TabToChange === 'RetirarDevolver' && !PermitToTakeAtivos)
            NotificationErro("Permissão", "Você não tem permissão para acessar essa área, solicite autorização para seu Administrador")
        else
            setTab(TabToChange)
    }



    return (


        <>

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
                                    <UilBox />
                                    {props.Function === 'Add' ? GetLocalArmazenamentoNameWithIdFromStore(CopyAtivoLocalArmazenamento?.id) : AtivoLocalArmazenamento?.Value}
                                </div>
                                <div className='AtivoModalHeader-Right-Tipo'>
                                    <UilLabel />
                                    {props.Function === 'Add' ? GetTipoAtivoNameWithIdFromStore(CopyAtivoType?.id) : AtivoType?.Value}
                                </div>
                            </div>

                        </div>
                        <div className='AtivoModalBody'>
                            <div className='AtivoModalBody-Sidebar'>
                                <div className={Tab === 'AtivoInfo' ? 'AtivoModalBody-Sidebar-ActiveItem' : 'AtivoModalBody-Sidebar-Item'} onClick={e => HandleSetTab('AtivoInfo')}>
                                    <UilUserCircle />
                                    Informações Cadastrais
                                </div>

                                {props.Function !== 'Add' &&
                                    <div className={Tab === 'RetirarDevolver' ? 'AtivoModalBody-Sidebar-ActiveItem' : 'AtivoModalBody-Sidebar-Item'} onClick={e => HandleSetTab('RetirarDevolver')}>
                                        <UilArrow />
                                        Retirar/Devolver
                                    </div>
                                }
                                {props.Function !== 'Add' &&
                                    <div className={Tab === 'Registros' ? 'AtivoModalBody-Sidebar-ActiveItem' : 'AtivoModalBody-Sidebar-Item'} onClick={e => HandleSetTab('Registros')}>
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
                                                                return <div key={v4()} className={'AtivoModalBody-AtivoInfoForm-LocalList-Item'} onClick={e => HandleChangeInfo('Local', Local?.id)}>
                                                                    {CopyAtivoLocalArmazenamento?.id === Local?.id ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
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
                                                                return <div key={v4()} className={'AtivoModalBody-AtivoInfoForm-TiposAtivosList-Item'} onClick={e => HandleChangeInfo('Type', TipoAtivo?.id)}>
                                                                    {CopyAtivoType?.id === TipoAtivo?.id ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
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

                                    {Tab === 'RetirarDevolver' &&
                                        <AtivoTakeReturn Ativo={Ativo} />
                                    }

                                    {Tab === 'Registros' &&
                                        <AtivoRecords Ativo={Ativo} FromModal={props.FromModal} />
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

        </>

    );
}





export default AtivoModal