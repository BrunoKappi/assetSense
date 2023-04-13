import React, { useState, useEffect } from 'react'
import './AtivoRecords.css'
import { GetCurrentUserFromStore, GetRecordsOfAtivo, GetuserNameWithIdFromStore, GetUserWithIdFromStore } from '../../../../Functions/Middleware';

import moment from 'moment';
import { UilCalendarAlt, UilClock, UilBookmark, UilPlay, UilCommentInfoAlt, UilCommentAltMessage, UilArrowUp, UilArrowDown } from '@iconscout/react-unicons'
import { MdFilterList } from 'react-icons/md'
import Dropdown from 'react-bootstrap/Dropdown';
//Tooltip
import { Tooltip } from 'react-tippy';
import UsuarioModal from '../../../UsersList/User/UsuarioModal'
import { NotificationAlerta } from '../../../../NotificationUtils';
import { v4 } from 'uuid';
import { connect } from 'react-redux'


const AtivoRecords = (props) => {

    const [CurrentUser, setCurrentUser] = useState(GetCurrentUserFromStore())

    //Quantidades
    const [Records, SetRecords] = useState(GetRecordsOfAtivo(props.Ativo?.id))
    const [OrdenarPor, setOrdenarPor] = useState('Mais Recentes')
    const [FiltroDeTexto, setFiltroDeTexto] = useState('')
    const [SelectedUser, setSelectedUser] = useState({})
    const [modalShow, setModalShow] = useState(false);


    useEffect(() => {
        SetRecords(GetRecordsOfAtivo(props.Ativo?.id))
    }, [props.Ativo?.id, props.RecordsAtivos])

    useEffect(() => {
        const Registros = GetRecordsOfAtivo(props.Ativo?.id)
        SetRecords(Registros.filter(Record => {
            const TakenForName = GetuserNameWithIdFromStore(Record.TakenFor.id)
            const TakenByName = GetuserNameWithIdFromStore(Record.TakenBy.id)
            const TextFilter = FiltroDeTexto === '' || (TakenForName.toLowerCase().includes(FiltroDeTexto.toLowerCase())) || (TakenByName.toLowerCase().includes(FiltroDeTexto.toLowerCase()))
            return TextFilter
        }).sort((a, b) => {
            if (OrdenarPor === 'Mais recentes' || OrdenarPor === 'Ordenar por') {
                return a.TakeDate < b.TakeDate ? 1 : -1
            } else if (OrdenarPor === 'Mais Antigos') {
                return a.TakeDate < b.TakeDate ? - 1 : 1
            } else if (OrdenarPor === 'Nome') {
                const TakenForNameA = GetuserNameWithIdFromStore(a.TakenFor.id)
                const TakenForNameB = GetuserNameWithIdFromStore(b.TakenFor.id)
                return TakenForNameA.localeCompare(TakenForNameB);
            } else if (OrdenarPor === 'Tempo de Uso') {
                const UsoA = a.Duration === 0 ? (moment().valueOf() - a.TakeDate) : a.Duration
                const UsoB = b.Duration === 0 ? (moment().valueOf() - b.TakeDate) : b.Duration
                return UsoA < UsoB ? 1 : -1
            } else if (OrdenarPor === 'Status') {
                const UsoA = a.Duration === 0 ? 'Em uso' : 'Devolvido'
                const UsoB = b.Duration === 0 ? 'Em uso' : 'Devolvido'
                return UsoA.localeCompare(UsoB);
            } else {
                return a.TakeDate < b.TakeDate ? 1 : -1
            }
        }))

    }, [FiltroDeTexto, OrdenarPor, props.RecordsAtivos])


    const ResetSelectedUser = () => {
        setModalShow(false);
        setSelectedUser({});
    }

    const handleUserSelection = (Id) => {

        const User = GetUserWithIdFromStore(Id)
        if (User.Deleted === false) {
            if (props.FromModal === false) {
                setSelectedUser(User)
                setModalShow(true)
            }
        } else {
            NotificationAlerta("Aviso", "Este usuário foi deletado da base de dados, não sendo possível exibir suas informações")
        }

    }


    const handleResetFiltros = () => {
        setFiltroDeTexto('')
        setOrdenarPor('Mais Recentes')
    }

    return (
        <>
            <UsuarioModal FromModal={true} CurrentUser={CurrentUser} User={{ ...SelectedUser }} show={modalShow} onHide={() => setModalShow(false)} Function="View" onDelete={ResetSelectedUser} />
            <div className={props.Tema === 'Escuro' ? 'AtivoRecords-ContainerEscuro AtivoRecords-Container' : 'AtivoRecords-ContainerClaro AtivoRecords-Container'}>


                <div className='AtivoRecords-FormFilter'>
                    <input value={FiltroDeTexto} placeholder='Buscar...' onChange={e => setFiltroDeTexto(e.target.value)}></input>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="AtivoRecords-OrderBy">
                            <div className='AtivoRecords-OrdenarPorTitle'>
                                {OrdenarPor ? OrdenarPor : 'Ordenar por'}
                                <MdFilterList />
                            </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={e => setOrdenarPor('Mais Recentes')}>Mais Recentes</Dropdown.Item>
                            <Dropdown.Item onClick={e => setOrdenarPor('Mais Antigos')}>Mais Antigos</Dropdown.Item>
                            <Dropdown.Item onClick={e => setOrdenarPor('Nome')}>Nome</Dropdown.Item>
                            <Dropdown.Item onClick={e => setOrdenarPor('Tempo de Uso')}>Tempo de Uso</Dropdown.Item>
                            <Dropdown.Item onClick={e => setOrdenarPor('Status')}>Status</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <button onClick={handleResetFiltros} >Limpar filtro</button>

                </div>

                {Records.map(Registro => {

                    const momento = moment.unix(Registro.TakeDate / 1000); // dividir por 1000 porque o valor está em milissegundos, mas moment.unix() espera segundos
                    const horaMinuto = momento.format('HH:mm'); // exemplo de formato "HH:mm"

                    const momentoReturn = moment.unix(Registro?.ReturnDate / 1000); // dividir por 1000 porque o valor está em milissegundos, mas moment.unix() espera segundos
                    const horaMinutoReturn = momentoReturn.format('HH:mm'); // exemplo de formato "HH:mm"

                    // Tempo alvo em milissegundos
                    const tempoEmMilissegundos = Registro.Duration === 0 ? (moment().valueOf() - Registro.TakeDate) : Registro.Duration;

                    // Duração do tempo em relação à data atual
                    const duracao = moment.duration(tempoEmMilissegundos);

                    // Extrair os dias, horas e minutos da duração
                    const dias = Math.floor(duracao.asDays());
                    const horas = duracao.hours();
                    const minutos = duracao.minutes();

                    // Formatar a duração no formato desejado
                    const tempoFormatado = `${dias !== 0 ? (dias + ' Dias ') : ''} ${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;



                    return <div key={v4()} className='AtivoRecord-Container'>
                        <div className='AtivoRecord-UpRow'>
                            <Tooltip title="Para quem a retirada foi registrada" position="bottom" >
                                <span className='AtivoRecord-UpRow-Name' onClick={e => handleUserSelection(Registro.TakenFor.id)}>
                                    {GetuserNameWithIdFromStore(Registro.TakenFor.id)}
                                </span>
                            </Tooltip>
                            <span className='AtivoRecord-UpRow-Status'>
                                {!Registro.ReturnDate ? 'Em uso' : ''}
                            </span>
                        </div>

                        {Registro.TakenBy.id !== Registro.TakenFor.id && <div className='AtivoRecord-MiddleRow'>
                            <Tooltip title="Usuário que registrou a retirada" position="bottom" >
                                <span className='AtivoRecord-MiddleRow-Name' onClick={e => handleUserSelection(Registro.TakenBy.id)}>
                                    <UilBookmark />
                                    {GetuserNameWithIdFromStore(Registro.TakenBy.id)}
                                </span>
                            </Tooltip>
                        </div>
                        }

                        {Registro.Obs &&
                            <div className='AtivoRecord-DownRow'>
                                <Tooltip title="Observação de Retirada" position="bottom" >
                                    <span className='AtivoRecord-DownRow-Obs'>
                                        <UilCommentAltMessage />
                                        {Registro.Obs}
                                    </span>
                                </Tooltip>
                            </div>
                        }

                        {Registro.ReturnObs &&
                            <div className='AtivoRecord-DownRow'>
                                <Tooltip title="Observação de devolução" position="bottom" >
                                    <span className='AtivoRecord-DownRow-Obs'>
                                        <UilCommentAltMessage />
                                        {Registro.ReturnObs}
                                    </span>
                                </Tooltip>
                            </div>
                        }

                        <div className='AtivoRecord-DownRow'>
                            <Tooltip title="Data de Retirada" position="bottom" >
                                <span className='AtivoRecord-DownRow-Date'>
                                    <UilCalendarAlt />
                                    {moment(Registro.TakeDate).format("DD/MM/YY")}
                                </span>
                            </Tooltip>
                            <Tooltip title="Hora da Retirada" position="bottom" >
                                <span className='AtivoRecord-DownRow-Time'>
                                    <UilClock />
                                    {horaMinuto}
                                </span>
                            </Tooltip>
                            <Tooltip title="Tempo de Uso (HH:mm)" position="bottom" >
                                <span className='AtivoRecord-DownRow-Time'>
                                    <UilPlay />
                                    {tempoFormatado}
                                </span>
                            </Tooltip>



                        </div>

                        {Registro.ReturnDate &&
                            <div className='AtivoRecord-DownRow'>
                                <span className='AtivoRecord-UpRow-Status'>
                                    {"Devolvido em " + moment(Registro.ReturnDate).format("DD/MM/YY") + " " + horaMinutoReturn}
                                </span>
                            </div>
                        }



                    </div>
                })}


                {Records.length === 0 && <div className='AtivosRecords-TakeForm'>
                    <div className='AtivosRecords-AvisoInfo'>
                        <div className='AtivosRecords-AvisoInfo-Item'>
                            <UilCommentInfoAlt />
                            <span>Nenhum registro encontrado</span>
                        </div>
                    </div>
                </div>}



            </div>

        </>
    )
}


const ConnectedAtivoRecords = connect((state) => {
    return {
        Tema: state.Tema,
        RecordsAtivos: state.RecordsAtivos
    }
})(AtivoRecords)

export default ConnectedAtivoRecords 