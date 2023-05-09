import React, { useState, useEffect } from 'react'
import './AssetTakeReturn.css'
import { DevolverTabTitle, RetirarTabTitle } from './AssetTakeReturnUtils';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import { UilUser, UilEnvelope, UilBookmark, UilCalendarAlt, UilArchive, UilArrowUp, UilComment, UilArrowDown } from '@iconscout/react-unicons'


import {
    EditAssetOnStore,
    EditRecordStore,
    GetFromStore,
    GetQtdInUseOfAssetWithId,
    GetRecordByAssetIdAndUserId,
    GetTakesOfAssetOfCurrentUser,
    GetUsersThatNotTookAsset,
    GetUsersThatTookAsset,
    SetRecordsOnStore
} from '../../../../Functions/StoreMiddleware';

import {

    AddToFirebaseFunctions,

    UpdateInFirebaseFunctions,
} from '../../../../Functions/DatabaseMiddleware';



import { NotificationErro, NotificationSucesso } from '../../../../NotificationUtils';
import { DefaultRecord } from '../../../../Data/Items';
import { v4 } from 'uuid';
import moment from 'moment'
import { Tooltip } from 'react-tippy';
import { connect } from 'react-redux'
import { FIREBASE_GetRecordsNotReturnByAsset } from '../../../../Config/firebase/metodos2';


import Loading from '../../../LoadingForTabs/Loading'
import TwoColumns from '../../../LayoutComponents/TwoColumns/TwoColumns';
import FormGroupLabel from '../../../LayoutComponents/FormGroupLabel/FormGroupLabel';
import Show from '../../../LayoutComponents/Show/Show';
import ConfirmTab from '../../../LayoutComponents/ConfirmTab/ConfirmTab';
import SidebarItem from '../../../LayoutComponents/SidebarItem/SidebarItem';
import Warning from '../../../LayoutComponents/Warning/Warning';
import CustomSelect from '../../../LayoutComponents/CustomSelect/CustomSelect'
import DatePicker from "../../../LayoutComponents/DatePicker/DatePicker";

const AssetTakeReturn = (props) => {

    // FUNCIONALIDADE
    const [key, setKey] = useState('');
    const [ActionFor, setActionFor] = useState('Me');
    const [TakenFor, setTakenFor] = useState();
    const [ReturnFor, setReturnFor] = useState();
    const [Obs, setObs] = useState('');
    const [EventDate, setEventDate] = useState(new Date());
    const [LoadingAction, setLoadingAction] = useState(false);

    //QUANTIDADES
    const QuantidadeDoAsset = props.Asset?.Qtd
    const [QuantidadeRetirada, SetQuantidadeRetirada] = useState()
    const [QuantidadeRetiradaPeloCurrentUser, SetQuantidadeRetiradaPeloCurrentUser] = useState(GetTakesOfAssetOfCurrentUser(props.Asset?.id, props.CurrentUser))

    //CONFIRM 
    const [Confirm, SetConfirm] = useState(false)
    const [ConfirmMessage, SetConfirmMessage] = useState('')
    const [ConfirmBtAction, SetConfirmBtAction] = useState('')
    const [ConfirmBtBack, SetConfirmBtBack] = useState('')

    //UPDATE QUANTIDADES
    useEffect(() => {
        SetQuantidadeRetirada(GetQtdInUseOfAssetWithId(props.Asset?.id))
    }, [props.Assets])

    // HANDLE ERROR
    const HandleError = (Erro) => {
        console.log(Erro)
        setLoadingAction(false)
        NotificationErro("Erro", "Ocorreu um problema, tente novamente")
    }

    //UPDATE QUANTIDADES
    useEffect(() => {
        SetQuantidadeRetirada(GetQtdInUseOfAssetWithId(props.Asset?.id))
        SetQuantidadeRetiradaPeloCurrentUser(GetTakesOfAssetOfCurrentUser(props.Asset?.id, props.CurrentUser))
    }, [props.Asset?.id, props.RecordsAssets])


    //TOGGLE TARGET OF ACTION
    const ToggleActionFor = () => {
        if (key === 'Devolver' && QuantidadeRetiradaPeloCurrentUser === 0)
            setActionFor('Other')
        else if (key === 'Retirar' && (QuantidadeRetiradaPeloCurrentUser >= props.Asset?.QtdPerUser))
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
        setTimeout(() => { SetQuantidadeRetirada(GetQtdInUseOfAssetWithId(props.Asset?.id)) }, 500);
        setTimeout(() => { SetQuantidadeRetiradaPeloCurrentUser(GetTakesOfAssetOfCurrentUser(props.Asset?.id, props.CurrentUser)) }, 500);
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
            var UserId = ActionFor === 'Me' ? props.CurrentUser.id : ReturnFor.id
            const RecordToEdit = GetRecordByAssetIdAndUserId(props.Asset?.id, UserId)

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
                ForId = props.CurrentUser.id
            else
                ForId = TakenFor.id

            NewRecordToAdd.id = v4()
            NewRecordToAdd.AtivoId = props.Asset?.id
            NewRecordToAdd.TakeDate = SelectedDateTime
            NewRecordToAdd.TakenBy.id = props.CurrentUser.id
            NewRecordToAdd.TakenFor.id = ForId
            NewRecordToAdd.Returned = false
            NewRecordToAdd.ReturnDate = ''
            NewRecordToAdd.Obs = Obs



            FIREBASE_GetRecordsNotReturnByAsset(props.Asset?.id).then(QuantidadeFirebaseRetirada => {

                if (QuantidadeDoAsset <= QuantidadeFirebaseRetirada) {
                    NotificationErro("Ação negada", "Parece que alguém ja reitrou esse item, atualize sua página para infomações atualizadas")
                } else {

                    AddToFirebaseFunctions["Record"](NewRecordToAdd).then((Record) => {

                        //ADD PLUS 1 RETIRADA 
                        const NewAsset = { ...props.Asset, QtdInUse: props.Asset.QtdInUse + 1 }
                        EditAssetOnStore(NewAsset)
                        UpdateInFirebaseFunctions["Asset"](NewAsset)
                        SetQuantidadeRetirada(prev => prev + 1)


                        const Lista = GetFromStore('RecordsAssets')

                        const Records = [...Lista]
                        NewRecordToAdd.docID = Record?.id
                        Records.push(NewRecordToAdd)
                        SetRecordsOnStore(Records)
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
            var UserId = ActionFor === 'Me' ? props.CurrentUser.id : ReturnFor.id
            const RecordToEdit = GetRecordByAssetIdAndUserId(props.Asset?.id, UserId)

            RecordToEdit.ReturnDate = SelectedDateTime
            RecordToEdit.ReturnObs = Obs
            RecordToEdit.Duration = RecordToEdit.ReturnDate - RecordToEdit.TakeDate




            //ADD MINUS 1 RETIRADA 
            const NewAsset = { ...props.Asset, QtdInUse: props.Asset.QtdInUse - 1 }
            EditAssetOnStore(NewAsset)
            UpdateInFirebaseFunctions["Asset"](NewAsset)
            SetQuantidadeRetirada(prev => prev - 1)

            UpdateInFirebaseFunctions["Record"](RecordToEdit).then(() => {
                EditRecordStore(RecordToEdit)
                setLoadingAction(false)
                NotificationSucesso('Registro', 'Registro de Devolução registrado com Sucesso!')
                EndConfirming()
                props.OnTake('Registros')
            }).catch(HandleError)





        }
    }

    // SET KEY
    const SetKey = (Action) => {
        setActionFor('Me')
        if (Action === 'Devolver' && QuantidadeRetiradaPeloCurrentUser === 0) {
            setActionFor('Other')
            setKey(Action)
        } else if (Action === 'Retirar' && (QuantidadeRetiradaPeloCurrentUser >= props.Asset?.QtdPerUser)) {
            setActionFor('Other')
            setKey(Action)
        } else
            setKey(Action)
    }



    ////console.log("QTD", props.Asset?.QtdPerUser)

    return (
        <div className={props.Tema === 'Escuro' ? 'AssetTakeReturn-ContainerEscuro AssetTakeReturn-Container' : 'AssetTakeReturn-ContainerClaro AssetTakeReturn-Container'}>

            {/***********************   QUANTIDADES  **********************/}
            <Show Show={!Confirm && !LoadingAction}>
                <div className='AssetTakeReturn-Quantidades'>
                    <div className='AssetTakeReturn-Quantidades-Item'>
                        <UilArchive />
                        <span>Quantidade de Itens: {QuantidadeDoAsset} </span>
                    </div>
                    <div className='AssetTakeReturn-Quantidades-Item'>
                        <UilArrowUp />
                        <span>Itens Retirados: {QuantidadeRetirada} </span>
                    </div>
                    <div className='AssetTakeReturn-Quantidades-Item'>
                        <UilArrowDown />
                        <span>Retirador por você: {QuantidadeRetiradaPeloCurrentUser} </span>
                    </div>
                </div>
            </Show>


            {/***********************   RETIRADA E DEVOLUÇÃO  **********************/}
            <Show Show={!Confirm && !LoadingAction}>
                <div>

                    <div className={props.Tema === 'Escuro' ? 'AssetTRTabsContainerEscuro AssetTRTabsContainer' : 'AssetTRTabsContainerClaro AssetTRTabsContainer'}>
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
                    <Show Show={key === 'Retirar' && (QuantidadeDoAsset > QuantidadeRetirada)}>
                        <div className='AssetTakeReturn-TakeForm'>

                            <Show Show={ActionFor === 'Me'}>
                                <h4 className='AssetModalBody-AssetInfoForm-SectionTitle-TakeReturn'>Registro de Retirada de Ativo para {props.CurrentUser?.Name + ' ' + props.CurrentUser?.LastName} </h4>
                            </Show>

                            <Show Show={ActionFor !== 'Me'}>
                                <h4 className='AssetModalBody-AssetInfoForm-SectionTitle-TakeReturn'>Registro de Retirada de Ativo
                                    {(TakenFor?.Name ? (' para ' + TakenFor?.Name) : '') + ' ' + (TakenFor?.LastName ? TakenFor?.LastName : '')}
                                </h4>
                            </Show>

                            <div className='AssetTakeReturn-TakeFor'>
                                {ActionFor === 'Me' ? <ImCheckboxUnchecked onClick={ToggleActionFor} /> : <ImCheckboxChecked onClick={ToggleActionFor} />}
                                Registrar para outra pessoa
                            </div>

                            <Show Show={QuantidadeRetiradaPeloCurrentUser >= props.Asset?.QtdPerUser}>
                                <div className='AssetTakeReturn-AvisoInfo'>
                                    <Tooltip title="Poderá apenas registrar uma retirada para outros usuários" position="bottom" >
                                        <Warning Text='Você já retirou a quantidade máxima permitida por usuário para este item' />
                                    </Tooltip>
                                </div>
                            </Show>

                            <div className='TakeForm'>

                                <Show Show={ActionFor !== 'Me'}>
                                    <>
                                        <TwoColumns>
                                            <div className='AssetModalBody-AssetInfoForm-Group'>
                                                <FormGroupLabel>
                                                    <UilEnvelope />
                                                    Email (Retirado para)
                                                </FormGroupLabel>
                                                <CustomSelect
                                                    placeholder="Digite o Email"
                                                    options={GetUsersThatNotTookAsset(props?.Asset?.id, props.CurrentUser)}
                                                    getOptionLabel={(options) => { return options["Email"]; }}
                                                    getOptionValue={(options) => { return options["Id"]; }}
                                                    value={TakenFor}
                                                    onChange={(item) => { setTakenFor(item); }}
                                                />
                                            </div>
                                            <div className='AssetModalBody-AssetInfoForm-Group'>
                                                <FormGroupLabel>
                                                    <UilUser />
                                                    Nome (Retirado para)
                                                </FormGroupLabel>
                                                <CustomSelect
                                                    placeholder="Digite o Nome"
                                                    options={GetUsersThatNotTookAsset(props?.Asset?.id, props.CurrentUser)}
                                                    getOptionLabel={(options) => { return options["Name"] + ' ' + options["LastName"]; }}
                                                    getOptionValue={(options) => { return options["Id"]; }}
                                                    value={TakenFor}
                                                    onChange={(item) => { setTakenFor(item); }}
                                                />
                                            </div>
                                        </TwoColumns>
                                    </>
                                </Show>


                                <div >
                                    <FormGroupLabel>
                                        <UilCalendarAlt />
                                        Data
                                    </FormGroupLabel>
                                    <DatePicker
                                        showTimeSelect={true}
                                        selected={EventDate}
                                        onChange={(date) => setEventDate(date)}
                                    />
                                </div>


                                <div>
                                    <div className='AssetModalBody-AssetInfoForm-Group'>
                                        <FormGroupLabel>
                                            <UilComment />
                                            Observação
                                        </FormGroupLabel>
                                        <textarea className='AssetModalBody-AssetInfoForm-Group-Input' value={Obs} onChange={e => setObs(e.target.value)} placeholder='Digite uma Observação(Opcional)' name="" id="" rows="2"></textarea>
                                    </div>

                                </div>

                                <div className='AssetModalBody-AssetInfoForm-Button'>
                                    <button onClick={InitConfirm}>
                                        <UilBookmark />
                                        Registrar
                                    </button>
                                </div>

                            </div>

                        </div>

                    </Show>

                    {/*****************************    TODAS UNIDADES RETIRADAS        *****************************/}
                    <Show Show={key === 'Retirar' && (QuantidadeDoAsset <= QuantidadeRetirada)}>
                        <Warning Text='No momento todas as unidades deste Ativo já foram retiradas' />
                    </Show>

                    {/*****************************    DEVOLUÇÂO        *****************************/}
                    <Show Show={key === 'Devolver' && (QuantidadeRetirada > 0)}>
                        <div className='AssetTakeReturn-TakeForm'>
                            <Show Show={ActionFor === 'Me'}>
                                <h4 className='AssetModalBody-AssetInfoForm-SectionTitle-TakeReturn'>Registro de Devolução de Ativo para {props.CurrentUser?.Name + ' ' + props.CurrentUser?.LastName} </h4>
                            </Show>

                            <Show Show={ActionFor !== 'Me'}>
                                <h4 className='AssetModalBody-AssetInfoForm-SectionTitle-TakeReturn'>Registro de Devolução de Ativo
                                    {(ReturnFor?.Name ? (' para ' + ReturnFor?.Name) : '') + ' ' + (ReturnFor?.LastName ? ReturnFor?.LastName : '')}
                                </h4>
                            </Show>

                            <div className='AssetTakeReturn-TakeFor'>
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
                                        <div className='AssetTakeReturn-AvisoInfo'>
                                            <Tooltip title="Poderá apenas registrar uma devolução em seu nome" position="bottom" >
                                                <Warning Text='No momento nenhum outro usuário registrou uma retirada deste item' />
                                            </Tooltip>
                                        </div>
                                    </Show>

                                    <Show Show={(QuantidadeRetirada - QuantidadeRetiradaPeloCurrentUser) !== 0}>
                                        <TwoColumns>
                                            <div className='AssetModalBody-AssetInfoForm-Group'>
                                                <FormGroupLabel>
                                                    <UilEnvelope />
                                                    Email (De quem vai devolver)
                                                </FormGroupLabel>
                                                <CustomSelect
                                                    placeholder="Digite o Email"
                                                    options={GetUsersThatTookAsset(props.Asset?.id, props.CurrentUser)}
                                                    getOptionLabel={(options) => { return options["Email"]; }}
                                                    getOptionValue={(options) => { return options["Id"]; }}
                                                    value={ReturnFor}
                                                    onChange={(item) => { setReturnFor(item); }}
                                                />
                                            </div>
                                            <div className='AssetModalBody-AssetInfoForm-Group'>
                                                <FormGroupLabel>
                                                    <UilUser />
                                                    Nome (De quem vai devolver)
                                                </FormGroupLabel>
                                                <CustomSelect
                                                    placeholder="Digite o Nome"
                                                    options={GetUsersThatTookAsset(props.Asset?.id, props.CurrentUser)}
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
                                        <div className='AssetModalBody-AssetInfoForm-Group'>
                                            <FormGroupLabel>
                                                <UilCalendarAlt />
                                                Data e Hora de Devolução
                                            </FormGroupLabel>
                                            <DatePicker
                                                showTimeSelect={true}
                                                selected={EventDate}
                                                onChange={(date) => setEventDate(date)}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className='AssetModalBody-AssetInfoForm-Group'>
                                            <FormGroupLabel>
                                                <UilComment />
                                                Observação
                                            </FormGroupLabel>
                                            <textarea className='AssetModalBody-AssetInfoForm-Group-Input' value={Obs} onChange={e => setObs(e.target.value)} placeholder='Digite uma Observação(Opcional)' name="" id="" rows="2"></textarea>
                                        </div>
                                    </div>

                                    <div className='AssetModalBody-AssetInfoForm-Button'>
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
                    setIsEdited={() => { }}
                />
            </Show>

            {/***********************   LOADING  **********************/}
            <Show Show={LoadingAction} Width='100&'>
                <Loading />
            </Show>

        </div>
    )
}


const ConnectedAssetTakeReturn = connect((state) => {
    return {
        Tema: state.Tema,
        RecordsAssets: state.RecordsAssets,
        Assets: state.Assets,
        CurrentUser: state.CurrentUser

    }
})(AssetTakeReturn)

export default ConnectedAssetTakeReturn  