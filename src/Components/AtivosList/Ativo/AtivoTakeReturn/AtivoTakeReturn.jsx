import React, { useState } from 'react'
import './AtivoTakeReturn.css'
import { DevolverTabTitle, RetirarTabTitle } from './AtivoTakeReturnUtils';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import { UilUser, UilEnvelope, UilBookmark, UilCheck, UilBackward, UilArchive, UilArrowUp, UilComment, UilArrowDown, UilCommentInfoAlt } from '@iconscout/react-unicons'
import { AddRecord, EditRecord, GetCurrentUserFromStore, GetRecordByAtivoIdAndUserId, GetRecords, GetRecordsFromStore, GetTakesOfAtivo, GetTakesOfAtivoOfCurrentUser, GetUsersFromStore, GetUsersFromStoreWithNoCurrentUser, GetUsersThatTookAtivo, SaveRecords } from '../../../../Functions/Middleware';
import { AtivoModalSelectcustomStyles, noOptionsMessage } from '../AtivoModalUtils';
import Select from "react-select";
import { NotificationErro, NotificationSucesso } from '../../../../NotificationUtils';
import { DefaultRecord } from '../../../../Data/Items';
import { v4 } from 'uuid';
import moment from 'moment'
import { Tooltip } from 'react-tippy';
import { connect } from 'react-redux'

const AtivoTakeReturn = (props) => {

    const [CurrentUser, setCurrentUser] = useState(GetCurrentUserFromStore())
    const [key, setKey] = useState('');
    const [ActionFor, setActionFor] = useState('Me');
    const [TakenFor, setTakenFor] = useState();
    const [ReturnFor, setReturnFor] = useState();
    const [Obs, setObs] = useState('');

    //Quantidades
    const QuantidadeDoAtivo = props.Ativo?.Qtd
    const [QuantidadeRetirada, SetQuantidadeRetirada] = useState(GetTakesOfAtivo(props.Ativo?.id))
    const [QuantidadeRetiradaPeloCurrentUser, SetQuantidadeRetiradaPeloCurrentUser] = useState(GetTakesOfAtivoOfCurrentUser(props.Ativo?.id))
    const [UsuariosQuePegaramAtivo, SetUsuariosQuePegaramAtivo] = useState(GetUsersThatTookAtivo(props.Ativo?.id))

    //Confirm 
    const [Confirm, SetConfirm] = useState(false)
    const [ConfirmMessage, SetConfirmMessage] = useState('')
    const [ConfirmBtAction, SetConfirmBtAction] = useState('')
    const [ConfirmBtBack, SetConfirmBtBack] = useState('')


    const ToggleActionFor = () => {
        //setActionFor('Me')
        if (key === 'Devolver' && QuantidadeRetiradaPeloCurrentUser === 0)
            setActionFor('Other')
        else if (key === 'Retirar' && (QuantidadeRetiradaPeloCurrentUser >= props.Ativo?.QtdPerUser))
            setActionFor('Other')
        else
            setActionFor(ActionFor === 'Me' ? 'Other' : 'Me')
    }


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
        setTimeout(() => { SetQuantidadeRetirada(GetTakesOfAtivo(props.Ativo?.id)) }, 500);
        setTimeout(() => { SetQuantidadeRetiradaPeloCurrentUser(GetTakesOfAtivoOfCurrentUser(props.Ativo?.id)) }, 500);
    }

    const BackConfirming = () => {
        SetConfirm(false)
    }

    const InitConfirm = () => {
        if (key === 'Retirar') {

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
        } else {
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

    const Submit = () => {
        if (key === 'Retirar') {
            var NewRecordToAdd = { ...DefaultRecord }

            var ForId
            if (ActionFor === 'Me')
                ForId = CurrentUser.id
            else
                ForId = TakenFor.id

            NewRecordToAdd.id = v4()
            NewRecordToAdd.AtivoId = props.Ativo?.id
            NewRecordToAdd.TakeDate = moment().valueOf()
            NewRecordToAdd.TakenBy.id = CurrentUser.id
            NewRecordToAdd.TakenFor.id = ForId
            NewRecordToAdd.Returned = false
            NewRecordToAdd.ReturnDate = ''
            NewRecordToAdd.Obs = Obs


            AddRecord(NewRecordToAdd).then(() => {
                GetRecords().then(Lista => {
                    const Records = [...Lista]
                    console.log("Adicionando", Lista)
                    Records.push(NewRecordToAdd)
                    console.log("Adicionado", Records)
                    SaveRecords(Records)
                    EndConfirming()
                    NotificationSucesso('Registro', 'Registro de Retirada registrado com Sucesso!')
                })
            }).catch(() => {
                NotificationErro("Erro", "Ocorreu um problema, tente novamente")
            })




        } else {
            var UserId = ActionFor === 'Me' ? CurrentUser.id : ReturnFor.id
            const RecordToEdit = GetRecordByAtivoIdAndUserId(props.Ativo?.id, UserId)
            
            RecordToEdit.ReturnDate = moment().valueOf()
            RecordToEdit.ReturnObs = Obs
            RecordToEdit.Duration = RecordToEdit.ReturnDate - RecordToEdit.TakeDate

            //console.log("Mandando Editar", GetRecordsFromStore())

            console.log(RecordToEdit)

            
            EditRecord(RecordToEdit).then(() => {
                NotificationSucesso('Registro', 'Registro de Devolução registrado com Sucesso!')
                EndConfirming()
            }).catch(() => {
                NotificationErro("Erro", "Ocorreu um problema, tente novamente")
            })


        }
    }


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

            {!Confirm &&
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
            }

            {!Confirm && <div>

                <div className={props.Tema === 'Escuro' ? 'AtivoTRTabsContainerEscuro AtivoTRTabsContainer' : 'AtivoTRTabsContainerClaro AtivoTRTabsContainer'}>
                    <button onClick={(k) => SetKey('Retirar')} className={key === 'Retirar' ? 'AtivoTRTabsButtonActive' : ''}>{RetirarTabTitle()}</button>
                    <button onClick={(k) => SetKey('Devolver')} className={key === 'Devolver' ? 'AtivoTRTabsButtonActive' : ''}>{DevolverTabTitle()}</button>
                </div>

                {/*     RETIRADA         */}

                {key === 'Retirar' && (QuantidadeDoAtivo > QuantidadeRetirada) && <div className='AtivoTakeReturn-TakeForm'>

                    {ActionFor === 'Me' &&
                        <h4 className='AtivoModalBody-AtivoInfoForm-SectionTitle-TakeReturn'>Registro de Retirada de Ativo para {CurrentUser?.Name + ' ' + CurrentUser?.LastName} </h4>
                    }

                    {ActionFor !== 'Me' &&
                        <h4 className='AtivoModalBody-AtivoInfoForm-SectionTitle-TakeReturn'>Registro de Retirada de Ativo
                            {(TakenFor?.Name ? (' para ' + TakenFor?.Name) : '') + ' ' + (TakenFor?.LastName ? TakenFor?.LastName : '')}
                        </h4>
                    }



                    <div className='AtivoTakeReturn-TakeFor'>
                        {ActionFor === 'Me' ? <ImCheckboxUnchecked onClick={ToggleActionFor} /> : <ImCheckboxChecked onClick={ToggleActionFor} />}
                        Registrar para outra pessoa
                    </div>

                    {QuantidadeRetiradaPeloCurrentUser >= props.Ativo?.QtdPerUser &&

                        <div className='AtivoTakeReturn-AvisoInfo'>
                            <Tooltip title="Poderá apenas registrar uma retirada para outros usuários" position="bottom" >
                                <div className='AtivoTakeReturn-AvisoInfo-Item'>
                                    <UilCommentInfoAlt />
                                    <span>Você já retirou a quantidade máxima permitida por usuário para este item</span>
                                </div>
                            </Tooltip>
                        </div>
                    }


                    <div className='TakeForm'>

                        {ActionFor !== 'Me' && <>
                            <div className='AtivoModalBody-AtivoInfoForm-TwoLine'>
                                <div className='AtivoModalBody-AtivoInfoForm-Group'>
                                    <span>
                                        <UilEnvelope />
                                        Email (Retirado para)
                                    </span>
                                    <Select
                                        className='AtivoModalBody-AtivoInfoForm-LocationSelect'
                                        placeholder="Digite o Email"
                                        noOptionsMessage={noOptionsMessage}
                                        options={GetUsersFromStoreWithNoCurrentUser(props?.Ativo?.id)}
                                        getOptionLabel={(options) => { return options["Email"]; }}
                                        getOptionValue={(options) => { return options["Id"]; }}
                                        styles={AtivoModalSelectcustomStyles}
                                        value={TakenFor}
                                        onChange={(item) => { setTakenFor(item); }}
                                    />
                                </div>
                                <div className='AtivoModalBody-AtivoInfoForm-Group'>
                                    <span>
                                        <UilUser />
                                        Nome (Retirado para)
                                    </span>
                                    <Select
                                        className='AtivoModalBody-AtivoInfoForm-LocationSelect'
                                        placeholder="Digite o Nome"
                                        noOptionsMessage={noOptionsMessage}
                                        options={GetUsersFromStoreWithNoCurrentUser(props?.Ativo?.id)}
                                        getOptionLabel={(options) => { return options["Name"] + ' ' + options["LastName"]; }}
                                        getOptionValue={(options) => { return options["Id"]; }}
                                        styles={AtivoModalSelectcustomStyles}
                                        value={TakenFor}
                                        onChange={(item) => { setTakenFor(item); }}
                                    />
                                </div>
                            </div>

                        </>
                        }

                        <div className='AtivoModalBody-AtivoInfoForm-OneLine'>
                            <div className='AtivoModalBody-AtivoInfoForm-Group'>
                                <span>
                                    <UilComment />
                                    Observação
                                </span>
                                <textarea value={Obs} onChange={e => setObs(e.target.value)} placeholder='Digite uma Observação(Opcional)' name="" id="" rows="2"></textarea>
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
                }

                {key === 'Retirar' && (QuantidadeDoAtivo <= QuantidadeRetirada) && <div className='AtivoTakeReturn-TakeForm'>
                    <div className='AtivoTakeReturn-AvisoInfo'>
                        <div className='AtivoTakeReturn-AvisoInfo-Item'>
                            <UilCommentInfoAlt />
                            <span>No momento todas as unidades deste Ativo já foram retiradas</span>
                        </div>
                    </div>
                </div>}













                {/*     DEVOLUÇÂO         */}


                {key === 'Devolver' && (QuantidadeRetirada > 0) && <div className='AtivoTakeReturn-TakeForm'>

                    {ActionFor === 'Me' &&
                        <h4 className='AtivoModalBody-AtivoInfoForm-SectionTitle-TakeReturn'>Registro de Devolução de Ativo para {CurrentUser?.Name + ' ' + CurrentUser?.LastName} </h4>
                    }

                    {ActionFor !== 'Me' &&
                        <h4 className='AtivoModalBody-AtivoInfoForm-SectionTitle-TakeReturn'>Registro de Devolução de Ativo
                            {(ReturnFor?.Name ? (' para ' + ReturnFor?.Name) : '') + ' ' + (ReturnFor?.LastName ? ReturnFor?.LastName : '')}
                        </h4>
                    }

                    <div className='AtivoTakeReturn-TakeFor'>
                        {ActionFor === 'Me' ? <ImCheckboxUnchecked onClick={ToggleActionFor} /> : <ImCheckboxChecked onClick={ToggleActionFor} />}
                        Registrar Devolução para outra pessoa
                    </div>

                    {QuantidadeRetiradaPeloCurrentUser === 0 &&

                        <div className='AtivoTakeReturn-AvisoInfo'>
                            <Tooltip title="Poderá apenas registrar uma devolução para outros usuários" position="bottom" >
                                <div className='AtivoTakeReturn-AvisoInfo-Item'>
                                    <UilCommentInfoAlt />
                                    <span>Você não possui nenhuma retirada deste item em seu nome</span>
                                </div>
                            </Tooltip>
                        </div>
                    }

                    <div className='TakeForm'>

                        {ActionFor !== 'Me' && <>

                            {(QuantidadeRetirada - QuantidadeRetiradaPeloCurrentUser) === 0 &&

                                <div className='AtivoTakeReturn-AvisoInfo'>
                                    <Tooltip title="Poderá apenas registrar uma devolução em seu nome" position="bottom" >
                                        <div className='AtivoTakeReturn-AvisoInfo-Item'>
                                            <UilCommentInfoAlt />
                                            <span>No momento nenhum outro usuário registrou uma retirada deste item</span>
                                        </div>
                                    </Tooltip>
                                </div>
                            }


                            {(QuantidadeRetirada - QuantidadeRetiradaPeloCurrentUser) !== 0 &&

                                <div className='AtivoModalBody-AtivoInfoForm-TwoLine'>
                                    <div className='AtivoModalBody-AtivoInfoForm-Group'>
                                        <span>
                                            <UilEnvelope />
                                            Email (De quem vai devolver)
                                        </span>
                                        <Select
                                            className='AtivoModalBody-AtivoInfoForm-LocationSelect'
                                            placeholder="Digite o Email"
                                            noOptionsMessage={noOptionsMessage}
                                            options={GetUsersThatTookAtivo(props.Ativo?.id)}
                                            getOptionLabel={(options) => { return options["Email"]; }}
                                            getOptionValue={(options) => { return options["Id"]; }}
                                            styles={AtivoModalSelectcustomStyles}
                                            value={ReturnFor}
                                            onChange={(item) => { setReturnFor(item); }}
                                        />
                                    </div>
                                    <div className='AtivoModalBody-AtivoInfoForm-Group'>
                                        <span>
                                            <UilUser />
                                            Nome (De quem vai devolver)
                                        </span>
                                        <Select
                                            className='AtivoModalBody-AtivoInfoForm-LocationSelect'
                                            placeholder="Digite o Nome"
                                            noOptionsMessage={noOptionsMessage}
                                            options={GetUsersThatTookAtivo(props.Ativo?.id)}
                                            getOptionLabel={(options) => { return options["Name"] + ' ' + options["LastName"]; }}
                                            getOptionValue={(options) => { return options["Id"]; }}
                                            styles={AtivoModalSelectcustomStyles}
                                            value={ReturnFor}
                                            onChange={(item) => { setReturnFor(item); }}
                                        />
                                    </div>
                                </div>

                            }

                        </>
                        }


                        {((QuantidadeRetirada - QuantidadeRetiradaPeloCurrentUser) !== 0 || ActionFor === 'Me') && <>
                            <div className='AtivoModalBody-AtivoInfoForm-OneLine'>
                                <div className='AtivoModalBody-AtivoInfoForm-Group'>
                                    <span>
                                        <UilComment />
                                        Observação
                                    </span>
                                    <textarea value={Obs} onChange={e => setObs(e.target.value)} placeholder='Digite uma Observação(Opcional)' name="" id="" rows="2"></textarea>
                                </div>
                            </div>

                            <div className='AtivoModalBody-AtivoInfoForm-Button'>
                                <button onClick={InitConfirm}>
                                    <UilBookmark />
                                    Registrar
                                </button>
                            </div>
                        </>
                        }

                    </div>


                </div>
                }


                {key === 'Devolver' && (QuantidadeRetirada === 0) && <div className='AtivoTakeReturn-TakeForm'>
                    <div className='AtivoTakeReturn-AvisoInfo'>
                        <div className='AtivoTakeReturn-AvisoInfo-Item'>
                            <UilCommentInfoAlt />
                            <span>No momento não há nenhum registro de retirada para este Item</span>
                        </div>
                    </div>
                </div>}





            </div>
            }


            {Confirm && <div className='AtivoModalBody-AtivoInfo'>
                <h4 className='AtivoModalBody-AtivoInfoForm-ConfirMessage'>{ConfirmMessage}</h4>
                <div className='AtivoModalBody-AtivoInfoForm-Button'>
                    <button className='AtivoModalBody-AtivoInfoForm-Button-Secondary' onClick={BackConfirming} >
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
    )
}


const ConnectedAtivoTakeReturn = connect((state) => {
    return {
        Tema: state.Tema
    }
})(AtivoTakeReturn)

export default ConnectedAtivoTakeReturn  