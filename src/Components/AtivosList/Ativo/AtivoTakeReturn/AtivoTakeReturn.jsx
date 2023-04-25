import React, { useState, useEffect } from 'react'
import './AtivoTakeReturn.css'
import { DevolverTabTitle, RetirarTabTitle } from './AtivoTakeReturnUtils';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import { UilUser, UilEnvelope, UilBookmark, UilCalendarAlt, UilArchive, UilArrowUp, UilComment, UilArrowDown, UilCommentInfoAlt } from '@iconscout/react-unicons'
import { AddRecord,  EditRecordStore, GetFromStore, GetQtdInUseOfAtivoWithId, GetRecordByAtivoIdAndUserId, GetTakesOfAtivoOfCurrentUser, GetUsersThatTookAsset, GetUsersThatTookAtivo, SaveRecords, UpdateInFirebase } from '../../../../Functions/Middleware';
import { NotificationErro, NotificationSucesso } from '../../../../NotificationUtils';
import { DefaultRecord } from '../../../../Data/Items';
import { v4 } from 'uuid';
import moment from 'moment'
import { Tooltip } from 'react-tippy';
import { connect } from 'react-redux'
import { AssetsCollectionName, FIREBASE_GetRecordDocIDById, FIREBASE_GetRecordsPendentesDeUmAtivo, RecordsCollectionName } from '../../../../Config/firebase/metodos';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loading from '../../../LoadingForTabs/Loading'
import TwoColumns from '../../../LayoutComponents/TwoColumns/TwoColumns';
import FormGroupLabel from '../../../LayoutComponents/FormGroupLabel/FormGroupLabel';
import Show from '../../../LayoutComponents/Show/Show';
import ConfirmTab from '../../../LayoutComponents/ConfirmTab/ConfirmTab';
import SidebarItem from '../../../LayoutComponents/SidebarItem/SidebarItem';
import Warning from '../../../LayoutComponents/Warning/Warning';
import CustomSelect from '../../../LayoutComponents/CustomSelect/CustomSelect'

const AtivoTakeReturn = (props) => {

    // FUNCIONALIDADE
    const [CurrentUser,] = useState(GetFromStore('CurrentUser'))
    const [key, setKey] = useState('');
    const [ActionFor, setActionFor] = useState('Me');
    const [TakenFor, setTakenFor] = useState();
    const [ReturnFor, setReturnFor] = useState();
    const [Obs, setObs] = useState('');
    const [EventDate, setEventDate] = useState(new Date());
    const [LoadingAction, setLoadingAction] = useState(false);

    //QUANTIDADES
    const QuantidadeDoAtivo = props.Ativo?.Qtd
    const [QuantidadeRetirada, SetQuantidadeRetirada] = useState()
    const [QuantidadeRetiradaPeloCurrentUser, SetQuantidadeRetiradaPeloCurrentUser] = useState(GetTakesOfAtivoOfCurrentUser(props.Ativo?.id))

    //CONFIRM 
    const [Confirm, SetConfirm] = useState(false)
    const [ConfirmMessage, SetConfirmMessage] = useState('')
    const [ConfirmBtAction, SetConfirmBtAction] = useState('')
    const [ConfirmBtBack, SetConfirmBtBack] = useState('')

    //UPDATE QUANTIDADES
    useEffect(() => {
        SetQuantidadeRetirada(GetQtdInUseOfAtivoWithId(props.Ativo?.id))
    }, [props.Ativos])

    // HANDLE ERROR
    const HandleError = (Erro) => {
        console.log(Erro)
        setLoadingAction(false)
        NotificationErro("Erro", "Ocorreu um problema, tente novamente")
    }

    //UPDATE QUANTIDADES
    useEffect(() => {
        SetQuantidadeRetirada(GetQtdInUseOfAtivoWithId(props.Ativo?.id))
        SetQuantidadeRetiradaPeloCurrentUser(GetTakesOfAtivoOfCurrentUser(props.Ativo?.id))
    }, [props.Ativo?.id, props.RecordsAtivos])


    //TOGGLE TARGET OF ACTION
    const ToggleActionFor = () => {
        if (key === 'Devolver' && QuantidadeRetiradaPeloCurrentUser === 0)
            setActionFor('Other')
        else if (key === 'Retirar' && (QuantidadeRetiradaPeloCurrentUser >= props.Ativo?.QtdPerUser))
            setActionFor('Other')
        else
            setActionFor(ActionFor === 'Me' ? 'Other' : 'Me')
    }

    // END CONFIRMMING
    const EndConfirming = () => {
        SetConfirm(false)
        SetConfirmMessage('')
        SetConfirmBtAction('')
        SetConfirmBtBack('')
        setTakenFor()
        SetKey('')
        setActionFor('Me')
        setObs('')
        setReturnFor()
        setTimeout(() => { SetQuantidadeRetirada(GetQtdInUseOfAtivoWithId(props.Ativo?.id)) }, 500);
        setTimeout(() => { SetQuantidadeRetiradaPeloCurrentUser(GetTakesOfAtivoOfCurrentUser(props.Ativo?.id)) }, 500);
    }


    // BACK CONFIRMING
    const BackConfirming = () => {
        SetConfirm(false)
    }

    // INIT ACTION
    const InitConfirm = () => {
        const SelectedDateTime = moment(EventDate).valueOf()
        const currentDateTime = moment().valueOf()
        // RETIRAR
        if (key === 'Retirar') {
            if (!EventDate) {
                NotificationErro("Preenchimento Inválido", "Selecione uma Data para registrar a retirada")
                return
            }
            if (SelectedDateTime > currentDateTime) {
                NotificationErro("Preenchimento Inválido", "A Data selecionada é maior que a data atual")
                return
            }
            if (ActionFor === 'Me') {
                SetConfirm(true)
                SetConfirmMessage('Gostaria de Registrar a retirada deste Item para seu Usuário?')
                SetConfirmBtAction('Sim')
                SetConfirmBtBack('Voltar')
            } else {
                if (TakenFor?.id) {
                    SetConfirm(true)
                    SetConfirmMessage('Gostaria de Registrar a retirada deste Item para ' + (TakenFor?.Name ? (TakenFor?.Name) : '') + ' ' + (TakenFor?.LastName ? TakenFor?.LastName : '') + '?')
                    SetConfirmBtAction('Sim')
                    SetConfirmBtBack('Voltar')
                } else {
                    NotificationErro("Preenchimento Inválido", "Selecione um Usuário para registrar a retirada")
                }
            }
        }
        // DEVOLVER
        else {
            var UserId = ActionFor === 'Me' ? CurrentUser.id : ReturnFor.id
            const RecordToEdit = GetRecordByAtivoIdAndUserId(props.Ativo?.id, UserId)

            if (!EventDate) {
                NotificationErro("Preenchimento Inválido", "Selecione uma Data para registrar a retirada")
                return
            }
            if (SelectedDateTime < RecordToEdit.TakeDate) {
                NotificationErro("Preenchimento Inválido", "A Data selecionada é menor que a data de Retirada")
                return
            }
            if (SelectedDateTime > currentDateTime) {
                NotificationErro("Preenchimento Inválido", "A Data Selecionada é maior que a data atual")
                return
            }

            if (ActionFor === 'Me') {
                SetConfirm(true)
                SetConfirmMessage('Gostaria de Registrar a devolução deste Item?')
                SetConfirmBtAction('Sim')
                SetConfirmBtBack('Voltar')
            } else {

                if (ReturnFor?.id) {
                    SetConfirm(true)
                    SetConfirmMessage('Gostaria de Registrar a devolução deste Item?')
                    SetConfirmBtAction('Sim')
                    SetConfirmBtBack('Voltar')
                } else {

                    NotificationErro("Preenchimento Inválido", "Selecione um Usuário para registrar a devolução")
                }

            }
        }
    }

    // SUBMIT FINAL ACTION
    const Submit = () => {
        setLoadingAction(true)
        const SelectedDateTime = moment(EventDate).valueOf()
        // RETIRAR
        if (key === 'Retirar') {
            var NewRecordToAdd = { ...DefaultRecord }

            var ForId
            if (ActionFor === 'Me')
                ForId = CurrentUser.id
            else
                ForId = TakenFor.id

            NewRecordToAdd.id = v4()
            NewRecordToAdd.AtivoId = props.Ativo?.id
            NewRecordToAdd.TakeDate = SelectedDateTime
            NewRecordToAdd.TakenBy.id = CurrentUser.id
            NewRecordToAdd.TakenFor.id = ForId
            NewRecordToAdd.Returned = false
            NewRecordToAdd.ReturnDate = ''
            NewRecordToAdd.Obs = Obs


            FIREBASE_GetRecordsPendentesDeUmAtivo(props.Ativo?.id).then(QuantidadeFirebaseRetirada => {

                if (QuantidadeDoAtivo <= QuantidadeFirebaseRetirada) {
                    NotificationErro("Ação negada", "Parece que alguém ja reitrou esse item, atualize sua página para infomações atualizadas")
                } else {

                    AddRecord(NewRecordToAdd).then((Record) => {

                        //ADD PLUS 1 RETIRADA 
                        const NewAtivo = { ...props.Ativo, QtdInUse: props.Ativo.QtdInUse + 1 }
                        UpdateInFirebase(AssetsCollectionName, NewAtivo)
                        SetQuantidadeRetirada(prev => prev + 1)


                        const Lista = GetFromStore('RecordsAtivos')

                        const Records = [...Lista]
                        NewRecordToAdd.docID = Record?.id
                        Records.push(NewRecordToAdd)
                        SaveRecords(Records)
                        EndConfirming()
                        NotificationSucesso('Registro', 'Registro de Retirada registrado com Sucesso!')
                        setLoadingAction(false)
                        props.OnTake('Registros')



                    }).catch(HandleError)
                }

            }).catch(HandleError)








        }
        // DEVOLVER
        else {
            var UserId = ActionFor === 'Me' ? CurrentUser.id : ReturnFor.id
            const RecordToEdit = GetRecordByAtivoIdAndUserId(props.Ativo?.id, UserId)

            RecordToEdit.ReturnDate = SelectedDateTime
            RecordToEdit.ReturnObs = Obs
            RecordToEdit.Duration = RecordToEdit.ReturnDate - RecordToEdit.TakeDate

            if (!RecordToEdit.docId) {
                FIREBASE_GetRecordDocIDById(RecordToEdit.id).then((docID) => {
                    RecordToEdit.docID = docID

                    //ADD MINUS 1 RETIRADA 
                    const NewAtivo = { ...props.Ativo, QtdInUse: props.Ativo.QtdInUse - 1 }
                    UpdateInFirebase(AssetsCollectionName, NewAtivo)
                    SetQuantidadeRetirada(prev => prev - 1)

                    UpdateInFirebase(RecordsCollectionName, RecordToEdit).then(() => {
                        EditRecordStore(RecordToEdit)
                        setLoadingAction(false)
                        NotificationSucesso('Registro', 'Registro de Devolução registrado com Sucesso!')
                        EndConfirming()
                        props.OnTake('Registros')
                    }).catch(HandleError)
                })
            } else {
                UpdateInFirebase(RecordsCollectionName, RecordToEdit).then(() => {
                    setLoadingAction(false)
                    NotificationSucesso('Registro', 'Registro de Devolução registrado com Sucesso!')
                    EndConfirming()
                    props.OnTake('Registros')
                }).catch(HandleError)
            }




        }
    }

    // SET KEY
    const SetKey = (Action) => {
        setActionFor('Me')
        if (Action === 'Devolver' && QuantidadeRetiradaPeloCurrentUser === 0) {
            setActionFor('Other')
            setKey(Action)
        } else if (Action === 'Retirar' && (QuantidadeRetiradaPeloCurrentUser >= props.Ativo?.QtdPerUser)) {
            setActionFor('Other')
            setKey(Action)
        } else
            setKey(Action)
    }




    return (
        <div className={props.Tema === 'Escuro' ? 'AtivoTakeReturn-ContainerEscuro AtivoTakeReturn-Container' : 'AtivoTakeReturn-ContainerClaro AtivoTakeReturn-Container'}>

            {/***********************   QUANTIDADES  **********************/}
            <Show Show={!Confirm && !LoadingAction}>
                <div className='AtivoTakeReturn-Quantidades'>
                    <div className='AtivoTakeReturn-Quantidades-Item'>
                        <UilArchive />
                        <span>Quantidade de Itens: {QuantidadeDoAtivo} </span>
                    </div>
                    <div className='AtivoTakeReturn-Quantidades-Item'>
                        <UilArrowUp />
                        <span>Itens Retirados: {QuantidadeRetirada} </span>
                    </div>
                    <div className='AtivoTakeReturn-Quantidades-Item'>
                        <UilArrowDown />
                        <span>Retirador por você: {QuantidadeRetiradaPeloCurrentUser} </span>
                    </div>
                </div>
            </Show>


            {/***********************   RETIRADA E DEVOLUÇÃO  **********************/}
            <Show Show={!Confirm && !LoadingAction}>
                <div>

                    <div className={props.Tema === 'Escuro' ? 'AtivoTRTabsContainerEscuro AtivoTRTabsContainer' : 'AtivoTRTabsContainerClaro AtivoTRTabsContainer'}>
                        <SidebarItem Active={key === 'Retirar'}
                            onClick={e => SetKey('Retirar')}>
                            {RetirarTabTitle()}
                        </SidebarItem>
                        <SidebarItem Active={key === 'Devolver'}
                            onClick={e => SetKey('Devolver')}>
                            {DevolverTabTitle()}
                        </SidebarItem>
                    </div>

                    {/*****************************    RETIRADA        *****************************/}
                    <Show Show={key === 'Retirar' && (QuantidadeDoAtivo > QuantidadeRetirada)}>
                        <div className='AtivoTakeReturn-TakeForm'>

                            <Show Show={ActionFor === 'Me'}>
                                <h4 className='AtivoModalBody-AtivoInfoForm-SectionTitle-TakeReturn'>Registro de Retirada de Ativo para {CurrentUser?.Name + ' ' + CurrentUser?.LastName} </h4>
                            </Show>

                            <Show Show={ActionFor !== 'Me'}>
                                <h4 className='AtivoModalBody-AtivoInfoForm-SectionTitle-TakeReturn'>Registro de Retirada de Ativo
                                    {(TakenFor?.Name ? (' para ' + TakenFor?.Name) : '') + ' ' + (TakenFor?.LastName ? TakenFor?.LastName : '')}
                                </h4>
                            </Show>

                            <div className='AtivoTakeReturn-TakeFor'>
                                {ActionFor === 'Me' ? <ImCheckboxUnchecked onClick={ToggleActionFor} /> : <ImCheckboxChecked onClick={ToggleActionFor} />}
                                Registrar para outra pessoa
                            </div>

                            <Show Show={QuantidadeRetiradaPeloCurrentUser >= props.Ativo?.QtdPerUser}>
                                <div className='AtivoTakeReturn-AvisoInfo'>
                                    <Tooltip title="Poderá apenas registrar uma retirada para outros usuários" position="bottom" >
                                        <Warning Text='Você já retirou a quantidade máxima permitida por usuário para este item' />
                                    </Tooltip>
                                </div>
                            </Show>

                            <div className='TakeForm'>

                                <Show Show={ActionFor !== 'Me'}>
                                    <>
                                        <TwoColumns>
                                            <div className='AtivoModalBody-AtivoInfoForm-Group'>
                                                <FormGroupLabel>
                                                    <UilEnvelope />
                                                    Email (Retirado para)
                                                </FormGroupLabel>
                                                <CustomSelect
                                                    placeholder="Digite o Email"
                                                    options={GetUsersThatTookAsset(props?.Ativo?.id)}
                                                    getOptionLabel={(options) => { return options["Email"]; }}
                                                    getOptionValue={(options) => { return options["Id"]; }}
                                                    value={TakenFor}
                                                    onChange={(item) => { setTakenFor(item); }}
                                                />
                                            </div>
                                            <div className='AtivoModalBody-AtivoInfoForm-Group'>
                                                <FormGroupLabel>
                                                    <UilUser />
                                                    Nome (Retirado para)
                                                </FormGroupLabel>
                                                <CustomSelect
                                                    placeholder="Digite o Nome"
                                                    options={GetUsersThatTookAsset(props?.Ativo?.id)}
                                                    getOptionLabel={(options) => { return options["Name"] + ' ' + options["LastName"]; }}
                                                    getOptionValue={(options) => { return options["Id"]; }}
                                                    value={TakenFor}
                                                    onChange={(item) => { setTakenFor(item); }}
                                                />
                                            </div>
                                        </TwoColumns>
                                    </>
                                </Show>

                                <div>
                                    <div className='AtivoModalBody-AtivoInfoForm-Group'>
                                        <FormGroupLabel>
                                            <UilCalendarAlt />
                                            Data
                                        </FormGroupLabel>
                                        <DatePicker className='AtivoModalBody-AtivoInfoForm-Group-Input' showTimeSelect={true} dateFormat="dd/MM/yyyy" selected={EventDate} onChange={(date) => setEventDate(date)} />
                                    </div>
                                </div>

                                <div>
                                    <div className='AtivoModalBody-AtivoInfoForm-Group'>
                                        <FormGroupLabel>
                                            <UilComment />
                                            Observação
                                        </FormGroupLabel>
                                        <textarea className='AtivoModalBody-AtivoInfoForm-Group-Input' value={Obs} onChange={e => setObs(e.target.value)} placeholder='Digite uma Observação(Opcional)' name="" id="" rows="2"></textarea>
                                    </div>

                                </div>

                                <div className='AtivoModalBody-AtivoInfoForm-Button'>
                                    <button onClick={InitConfirm}>
                                        <UilBookmark />
                                        Registrar
                                    </button>
                                </div>

                            </div>

                        </div>

                    </Show>

                    {/*****************************    TODAS UNIDADES RETIRADAS        *****************************/}
                    <Show Show={key === 'Retirar' && (QuantidadeDoAtivo <= QuantidadeRetirada)}>
                        <Warning Text='No momento todas as unidades deste Ativo já foram retiradas' />
                    </Show>

                    {/*****************************    DEVOLUÇÂO        *****************************/}
                    <Show Show={key === 'Devolver' && (QuantidadeRetirada > 0)}>
                        <div className='AtivoTakeReturn-TakeForm'>
                            <Show Show={ActionFor === 'Me'}>
                                <h4 className='AtivoModalBody-AtivoInfoForm-SectionTitle-TakeReturn'>Registro de Devolução de Ativo para {CurrentUser?.Name + ' ' + CurrentUser?.LastName} </h4>
                            </Show>

                            <Show Show={ActionFor !== 'Me'}>
                                <h4 className='AtivoModalBody-AtivoInfoForm-SectionTitle-TakeReturn'>Registro de Devolução de Ativo
                                    {(ReturnFor?.Name ? (' para ' + ReturnFor?.Name) : '') + ' ' + (ReturnFor?.LastName ? ReturnFor?.LastName : '')}
                                </h4>
                            </Show>

                            <div className='AtivoTakeReturn-TakeFor'>
                                {ActionFor === 'Me' ? <ImCheckboxUnchecked onClick={ToggleActionFor} /> : <ImCheckboxChecked onClick={ToggleActionFor} />}
                                Registrar Devolução para outra pessoa
                            </div>

                            <Show Show={QuantidadeRetiradaPeloCurrentUser === 0}>
                                <Tooltip title="Poderá apenas registrar uma devolução para outros usuários" position="bottom" >
                                    <Warning Text='Você não possui nenhuma retirada deste item em seu nome' />
                                </Tooltip>
                            </Show>

                            <div className='TakeForm'>

                                {/*****************************    DEVOLUÇÃO PARA OUTRO USUÁRIO        *****************************/}
                                <Show Show={ActionFor !== 'Me'}>

                                    {/*****************************    SOMENTE O CURRENT USER TEM RETIRADAS DESTE ATIVO        *****************************/}
                                    <Show Show={(QuantidadeRetirada - QuantidadeRetiradaPeloCurrentUser) === 0}>
                                        <div className='AtivoTakeReturn-AvisoInfo'>
                                            <Tooltip title="Poderá apenas registrar uma devolução em seu nome" position="bottom" >
                                                <Warning Text='No momento nenhum outro usuário registrou uma retirada deste item' />
                                            </Tooltip>
                                        </div>
                                    </Show>

                                    <Show Show={(QuantidadeRetirada - QuantidadeRetiradaPeloCurrentUser) !== 0}>
                                        <TwoColumns>
                                            <div className='AtivoModalBody-AtivoInfoForm-Group'>
                                                <FormGroupLabel>
                                                    <UilEnvelope />
                                                    Email (De quem vai devolver)
                                                </FormGroupLabel>
                                                <CustomSelect
                                                    placeholder="Digite o Email"
                                                    options={GetUsersThatTookAtivo(props.Ativo?.id)}
                                                    getOptionLabel={(options) => { return options["Email"]; }}
                                                    getOptionValue={(options) => { return options["Id"]; }}
                                                    value={ReturnFor}
                                                    onChange={(item) => { setReturnFor(item); }}
                                                />
                                            </div>
                                            <div className='AtivoModalBody-AtivoInfoForm-Group'>
                                                <FormGroupLabel>
                                                    <UilUser />
                                                    Nome (De quem vai devolver)
                                                </FormGroupLabel>
                                                <CustomSelect
                                                    placeholder="Digite o Nome"
                                                    options={GetUsersThatTookAtivo(props.Ativo?.id)}
                                                    getOptionLabel={(options) => { return options["Name"] + ' ' + options["LastName"]; }}
                                                    getOptionValue={(options) => { return options["Id"]; }}
                                                    value={ReturnFor}
                                                    onChange={(item) => { setReturnFor(item); }}
                                                />
                                            </div>
                                        </TwoColumns>
                                    </Show>

                                </Show>


                                {/*****************************    DEVOLUÇÃO PARA CURRENT USER        *****************************/}
                                <Show Show={((QuantidadeRetirada - QuantidadeRetiradaPeloCurrentUser) !== 0 || ActionFor === 'Me')}>

                                    <div>
                                        <div className='AtivoModalBody-AtivoInfoForm-Group'>
                                            <FormGroupLabel>
                                                <UilCalendarAlt />
                                                Data e Hora de Devolução
                                            </FormGroupLabel>
                                            <DatePicker className='AtivoModalBody-AtivoInfoForm-Group-Input' showTimeSelect={true} dateFormat="dd/MM/yyyy" selected={EventDate} onChange={(date) => setEventDate(date)} />
                                        </div>
                                    </div>

                                    <div>
                                        <div className='AtivoModalBody-AtivoInfoForm-Group'>
                                            <FormGroupLabel>
                                                <UilComment />
                                                Observação
                                            </FormGroupLabel>
                                            <textarea className='AtivoModalBody-AtivoInfoForm-Group-Input' value={Obs} onChange={e => setObs(e.target.value)} placeholder='Digite uma Observação(Opcional)' name="" id="" rows="2"></textarea>
                                        </div>
                                    </div>

                                    <div className='AtivoModalBody-AtivoInfoForm-Button'>
                                        <button onClick={InitConfirm}>
                                            <UilBookmark />
                                            Registrar
                                        </button>
                                    </div>

                                </Show>

                            </div>
                        </div>
                    </Show>

                    {/***********************   NENHUMA RETIRADA **********************/}
                    <Show Show={key === 'Devolver' && (QuantidadeRetirada === 0)}>
                        <Warning Text='No momento não há nenhum registro de retirada para este Item' />
                    </Show>

                </div>
            </Show>

            {/***********************   CONFIRM **********************/}
            <Show Show={Confirm && !LoadingAction} Width='100%'>
                <ConfirmTab
                    ConfirmMessage={ConfirmMessage}
                    ConfirmBtBack={ConfirmBtBack}
                    ConfirmBtAction={ConfirmBtAction}
                    EndConfirming={BackConfirming}
                    Submit={Submit}
                />
            </Show>

            {/***********************   LOADING  **********************/}
            <Show Show={LoadingAction} Width='100&'>
                <Loading />
            </Show>

        </div>
    )
}


const ConnectedAtivoTakeReturn = connect((state) => {
    return {
        Tema: state.Tema,
        RecordsAtivos: state.RecordsAtivos,
        Ativos: state.Ativos

    }
})(AtivoTakeReturn)

export default ConnectedAtivoTakeReturn  