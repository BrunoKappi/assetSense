import React, { useState } from 'react'
import './Record.css'
import { GetNameFromStoreWithId } from '../../Functions/StoreMiddleware';
import moment from 'moment';
import { UilCalendarAlt, UilClock, UilWrench, UilUserCircle } from '@iconscout/react-unicons'
//Tooltip
import { Tooltip } from 'react-tippy';
import { connect } from 'react-redux';
import Collapse from 'react-bootstrap/Collapse';
import Show from '../LayoutComponents/Show/Show';

const Record = (props) => {

    //STATE 
    const [open, setOpen] = useState(false);

    //HANDLE COLLAPSE RECORD
    const handleCollapse = (ID) => {
        setOpen(!open)
    }


    const HandleSelection = (What, Item) => {
        if (!open) return
        setOpen(true)

        if (What === 'Asset')
            props.handleAssetSelection(Item)
        else
            props.handleUserSelection(Item)

    }

    const Momento = moment.unix(props.Record.TakeDate / 1000); //dividir por 1000 porque o valor está em milissegundos, mas moment.unix() espera segundos
    const HoraMinuto = Momento.format('HH:mm'); //exemplo de formato "HH:mm"

    const MomentoReturn = moment.unix(props.Record?.ReturnDate / 1000); //dividir por 1000 porque o valor está em milissegundos, mas moment.unix() espera segundos
    const HoraMinutoReturn = MomentoReturn.format('HH:mm'); //exemplo de formato "HH:mm"

    //Tempo alvo em milissegundos
    const MsTime = !props.Record.ReturnDate ? (moment().valueOf() - props.Record.TakeDate) : (props.Record?.ReturnDate - props.Record?.TakeDate);

    //Duração do tempo em relação à data atual
    const Duration = moment.duration(MsTime);

    //Extrair os Days, Hours e Minutes da duração
    const Days = Math.floor(Duration.asDays());
    const Hours = Duration.hours();
    const Minutes = Duration.minutes();

    //Formatar a duração no formato 
    const tempoFormatado = `${Days > 0 ? Days : ''}${Days > 0 ? 'D' : ''}  ${Hours.toString().padStart(2, '0')}:${Minutes.toString().padStart(2, '0')}`;

    return (

        <div className={props.Tema === 'Dark' ? 'AssetRecord-ContainerDark AssetRecord-Container' : 'AssetRecord-ContainerLightTheme AssetRecord-Container'} onClick={() => handleCollapse(props.Record.id)}>


            {/******** PARA QUEM/ ASSET RETIRADO **********/}
            <div className='RecordTitle'>
                <Show Show={props.PerspectiveOf === 'Asset'}>
                    <Tooltip title="Item retirado" position="bottom" >
                        <span className='AssetRecord-UpRow-Name' onClick={() => HandleSelection("Asset", props.Record.AtivoId)}>
                            <UilWrench />
                            <span>{GetNameFromStoreWithId('AssetsWithDeleted', props.Record.AtivoId)}</span>
                        </span>
                    </Tooltip>
                </Show>
                <Show Show={props.PerspectiveOf === 'User'}>
                    <Tooltip title="Para quem a retirada foi registrada" position="bottom" >
                        <span className='AssetRecord-UpRow-Name' onClick={() => HandleSelection("User", props.Record.TakenFor.id)}>
                            <UilUserCircle />
                            <span>{GetNameFromStoreWithId('UsersWithDeleted', props.Record.TakenFor.id)}</span>
                        </span>
                    </Tooltip>
                </Show>
                <Show Show={!open}>
                    <div>
                        <span className={`AssetRecord-UpRow-Status ${!props.Record.ReturnDate ? 'RecordInUseStatus' : 'RecordNotInUseStatus'}`}>
                            {!props.Record.ReturnDate ? 'Em uso' : 'Devolvido'}
                        </span>
                    </div>
                </Show>

            </div>

            <Collapse in={open}>
                <div className='RecordsItens'>

                    <div className='RecordsItensHeader'>
                        <span className={`AssetRecord-UpRow-Status ${!props.Record.ReturnDate ? 'RecordInUseStatus' : 'RecordNotInUseStatus'}`}>
                            {!props.Record.ReturnDate ? 'Status: Em uso' : 'Status: Devolvido'}
                        </span>
                        <span className='AssetRecord-UpRow-Status'>
                            Tempo em Uso: <span>{tempoFormatado}</span>
                        </span>

                    </div>

                    {/******** RETIRADA MESSAGE **********/}
                    <div className='RecordMessage'>
                        <div className='RecordMessageText'>
                            Registro de Retirada de
                            <span onClick={() => HandleSelection("Asset", props.Record.AtivoId)}> {GetNameFromStoreWithId('AssetsWithDeleted', props.Record.AtivoId)} </span>
                            para
                            <span onClick={() => HandleSelection("User", props.Record.TakenFor.id)}> {GetNameFromStoreWithId('UsersWithDeleted', props.Record.TakenFor.id)}. </span>

                            {props.Record.TakenBy.id !== props.Record.TakenFor.id && 'Registro feito por'}

                            {props.Record.TakenBy.id !== props.Record.TakenFor.id &&
                                <span onClick={() => HandleSelection("User", props.Record.TakenBy.id)}> {GetNameFromStoreWithId('UsersWithDeleted', props.Record.TakenBy.id)}</span>
                            }

                        </div>
                        <div className='RecordMessageDate'>
                            <Tooltip title="Data de Retirada" position="bottom" >
                                <span className='RecordMessageDate-Item'>
                                    <UilCalendarAlt />
                                    {moment(props.Record.TakeDate).format("DD/MM/YY")}
                                </span>
                            </Tooltip>
                            <Tooltip title="Hora da Retirada" position="bottom" >
                                <span className='RecordMessageDate-Item'>
                                    <UilClock />
                                    {HoraMinuto}
                                </span>
                            </Tooltip>
                        </div>
                    </div>



                    {/******** RETIRADA OBS **********/}
                    <Show Show={props.Record.Obs}>
                        <div className='RecordMessage'>
                            <div className='RecordMessageText'>
                                Comentário: {props.Record.Obs}
                            </div>
                            <div className='RecordMessageDate'>
                                <Tooltip title="Data de Retirada" position="bottom" >
                                    <span className='RecordMessageDate-Item'>
                                        <UilCalendarAlt />
                                        {moment(props.Record.TakeDate).format("DD/MM/YY")}
                                    </span>
                                </Tooltip>
                                <Tooltip title="Hora da Retirada" position="bottom" >
                                    <span className='RecordMessageDate-Item'>
                                        <UilClock />
                                        {HoraMinuto}
                                    </span>
                                </Tooltip>
                            </div>
                        </div>
                    </Show>



                    {/******** REGISTRO DE DEVOLUCAO **********/}
                    <Show Show={props.Record.ReturnDate}>
                        <div className='RecordMessage'>
                            <div className='RecordMessageText'>
                                Registro de Devolução do  <span onClick={() => HandleSelection("Asset", props.Record.AtivoId)}> {GetNameFromStoreWithId('AssetsWithDeleted', props.Record.AtivoId)} </span>
                            </div>
                            <div className='RecordMessageDate'>
                                <Tooltip title="Data de Devolução" position="bottom" >
                                    <span className='RecordMessageDate-Item'>
                                        <UilCalendarAlt />
                                        {moment(props.Record.ReturnDate).format("DD/MM/YY")}
                                    </span>
                                </Tooltip>
                                <Tooltip title="Hora da Devolução" position="bottom" >
                                    <span className='RecordMessageDate-Item'>
                                        <UilClock />
                                        {HoraMinutoReturn}
                                    </span>
                                </Tooltip>
                            </div>
                        </div>
                    </Show>


                    {/******** DEVOLUCAO OBS **********/}
                    <Show Show={props.Record.ReturnObs}>
                        <div className='RecordMessage'>
                            <div className='RecordMessageText'>
                                Comentário: {props.Record.ReturnObs}
                            </div>
                            <div className='RecordMessageDate'>
                                <Tooltip title="Data de Devolução" position="bottom" >
                                    <span className='RecordMessageDate-Item'>
                                        <UilCalendarAlt />
                                        {moment(props.Record.ReturnDate).format("DD/MM/YY")}
                                    </span>
                                </Tooltip>
                                <Tooltip title="Hora da Devolução" position="bottom" >
                                    <span className='RecordMessageDate-Item'>
                                        <UilClock />
                                        {HoraMinutoReturn}
                                    </span>
                                </Tooltip>
                            </div>
                        </div>
                    </Show>


                </div>
            </Collapse>
        </div>

    )
}


const ConnectedRecord = connect((state) => {
    return {
        Tema: state.Tema
    }
})(Record)

export default ConnectedRecord 