import React, { useState } from 'react'
import './Record.css'
import { GetAtivoNameWithIdFromStore, GetuserNameWithIdFromStore } from '../../Functions/Middleware';
import moment from 'moment';
import { UilCalendarAlt, UilClock, UilWrench, UilUserCircle, UilBookmark, UilPlay, UilCommentAltMessage, UilArrowUp } from '@iconscout/react-unicons'
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

    //Formatar a duração no formato desejado
    const tempoFormatado = `${Hours.toString().padStart(2, '0')}:${Minutes.toString().padStart(2, '0')}`;

    return (

        <div className={props.Tema === 'Escuro' ? 'AtivoRecord-ContainerEscuro AtivoRecord-Container' : 'AtivoRecord-ContainerClaro AtivoRecord-Container'} onClick={() => handleCollapse(props.Record.id)}>


            {/******** PARA QUEM/ ATIVO RETIRADO **********/}
            <div className='RecordTitle'>
                <Show Show={props.PerspectiveOf === 'Ativo'}>
                    <Tooltip title="Item retirado" position="bottom" >
                        <span className='AtivoRecord-UpRow-Name' onClick={e => props.handleAtivoSelection(props.Record.AtivoId)}>
                            <UilWrench />
                            <span>{GetAtivoNameWithIdFromStore(props.Record.AtivoId)}</span>
                        </span>
                    </Tooltip>
                </Show>
                <Show Show={props.PerspectiveOf === 'User'}>
                    <Tooltip title="Para quem a retirada foi registrada" position="bottom" >
                        <span className='AtivoRecord-UpRow-Name' onClick={e => props.handleUserSelection(props.Record.TakenFor.id)}>
                            <UilUserCircle />
                            <span>{GetuserNameWithIdFromStore(props.Record.TakenFor.id)}</span>
                        </span>
                    </Tooltip>
                </Show>
                <div>
                    <span className='AtivoRecord-UpRow-Status'>
                        {!props.Record.ReturnDate ? 'Em uso' : 'Devolvido'}
                    </span>
                </div>
            </div>

            <Collapse in={open}>
                <div>
                    
                    {/******** RETIRADA SECTION **********/}
                    <div className='Record-RetiradaSection'>

                        <span className='SectionTitle'>
                            Informações da Retirada
                        </span>

                        {/******** PARA QUEM/ ATIVO RETIRADO **********/}
                        <div className='AtivoRecord-UpRow'>
                            <Show Show={props.PerspectiveOf === 'Ativo'}>
                                <Tooltip title="Para quem a retirada foi registrada" position="bottom" >
                                    <span className='AtivoRecord-UpRow-UserName' onClick={e => props.handleUserSelection(props.Record.TakenFor.id)}>
                                        <UilUserCircle />
                                        <span>{GetuserNameWithIdFromStore(props.Record.TakenFor.id)}</span>
                                    </span>
                                </Tooltip>
                            </Show>
                            <Show Show={props.PerspectiveOf === 'User'}>
                                <Tooltip title="Ativo Retirado" position="bottom" >
                                    <span className='AtivoRecord-UpRow-UserName' onClick={e => props.handleAtivoSelection(props.Record.AtivoId)}>
                                        <UilWrench />
                                        <span>{GetAtivoNameWithIdFromStore(props.Record.AtivoId)}</span>
                                    </span>
                                </Tooltip>
                            </Show>
                        </div>

                        {/******** USUÁRIO QUE REGISTROU A RETIRADA **********/}
                        <Show Show={props.Record.TakenBy.id !== props.Record.TakenFor.id}>
                            <div className='AtivoRecord-MiddleRow'>
                                <Tooltip title="Usuário que Registoru a retirada" position="bottom" >
                                    <span className='AtivoRecord-MiddleRow-Name' onClick={e => props.handleUserSelection(props.Record.TakenBy.id)}>
                                        <UilBookmark />
                                        {GetuserNameWithIdFromStore(props.Record.TakenBy.id)}
                                    </span>
                                </Tooltip>
                            </div>
                        </Show>

                        {/******** COMENTÁRIO DE RETIRADA **********/}
                        <Show Show={props.Record.Obs}>
                            <div className='AtivoRecord-DownRow'>
                                <Tooltip title="Observação de Retirada" position="bottom" >
                                    <span className='AtivoRecord-DownRow-Obs'>
                                        <UilCommentAltMessage />
                                        {props.Record.Obs}
                                    </span>
                                </Tooltip>
                            </div>
                        </Show>

                        {/******** DATA RETIRADA HORA E TEMPO DE USO **********/}
                        <div className='AtivoRecord-DownRow'>
                            <Tooltip title="Data de Retirada" position="bottom" >
                                <span className='AtivoRecord-DownRow-Date'>
                                    <UilCalendarAlt />
                                    {moment(props.Record.TakeDate).format("DD/MM/YY")}
                                </span>
                            </Tooltip>
                            <Tooltip title="Hora da Retirada" position="bottom" >
                                <span className='AtivoRecord-DownRow-Time'>
                                    <UilClock />
                                    {HoraMinuto}
                                </span>
                            </Tooltip>
                            <Tooltip title="Tempo de Uso (HH:mm)" position="bottom" >
                                <span className='AtivoRecord-DownRow-Time'>
                                    <UilPlay />
                                    {tempoFormatado}
                                </span>
                            </Tooltip>
                        </div>

                    </div>

                    {/******** DEVOLUÇÂO SECTION **********/}
                    <Show Show={props.Record.ReturnDate}>
                        <div className='Record-ReturnSection'>

                            <span className='SectionTitle'>
                                Informações da Devolução
                            </span>

                            {/******** COMENTÁRIO DE DEVOLUÇÃO **********/}
                            <Show Show={props.Record.ReturnObs}>
                                <div className='AtivoRecord-DownRow'>
                                    <Tooltip title="Observação de devolução" position="bottom" >
                                        <span className='AtivoRecord-DownRow-Obs'>
                                            <UilCommentAltMessage />
                                            {props.Record.ReturnObs}
                                        </span>
                                    </Tooltip>
                                </div>
                            </Show>


                            {/******** DEVOLVIDO EM **********/}
                            <Show Show={props.Record.ReturnDate}>
                                <div className='AtivoRecord-DownRow'>
                                    <span className='AtivoRecord-UpRow-Status'>
                                        {"Devolvido em " + moment(props.Record.ReturnDate).format("DD/MM/YY") + " " + HoraMinutoReturn}
                                    </span>
                                </div>
                            </Show>

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