import React, { useState, useEffect } from 'react'
import './UserAtivoRecords.css'
import { GetAtivoNameWithIdFromStore, GetAtivoWithIdFromStore, GetCurrentUserFromStore, GetRecordsOfUser, GetuserNameWithIdFromStore, GetUserWithIdFromStore } from '../../../../Functions/Middleware';
import { connect } from 'react-redux'
import moment from 'moment';
import { UilCalendarAlt, UilClock, UilBookmark, UilPlay, UilCommentInfoAlt } from '@iconscout/react-unicons'
import { MdFilterList } from 'react-icons/md'
import Dropdown from 'react-bootstrap/Dropdown';
//Tooltip
import { Tooltip } from 'react-tippy';
import AtivoModal from '../../../AtivosList/Ativo/AtivoModal'
import { NotificationAlerta } from '../../../../NotificationUtils';
import { v4 } from 'uuid';


const UserAtivoRecords = (props) => {

    const [CurrentUser, setCurrentUser] = useState(GetCurrentUserFromStore())

    //Quantidades
    const [Records, SetRecords] = useState(GetRecordsOfUser(props.User?.id))
    const [OrdenarPor, setOrdenarPor] = useState('Mais Recentes')
    const [FiltroDeTexto, setFiltroDeTexto] = useState('')
    const [SelectedAtivo, setSelectedAtivo] = useState({})
    const [modalShow, setModalShow] = useState(false);


    useEffect(() => {
        const Registros = GetRecordsOfUser(props.User?.id)
        SetRecords(Registros.filter(Record => {
            const AtivoName = GetAtivoNameWithIdFromStore(Record.AtivoId)
            const TakenByName = GetuserNameWithIdFromStore(Record.TakenBy.id)
            const TextFilter = FiltroDeTexto === '' || (AtivoName.toLowerCase().includes(FiltroDeTexto.toLowerCase())) || (TakenByName.toLowerCase().includes(FiltroDeTexto.toLowerCase()))
            return TextFilter
        }).sort((a, b) => {
            if (OrdenarPor === 'Mais recentes' || OrdenarPor === 'Ordenar por') {
                return a.TakeDate < b.TakeDate ? 1 : -1
            } else if (OrdenarPor === 'Mais Antigos') {
                return a.TakeDate < b.TakeDate ? - 1 : 1
            } else if (OrdenarPor === 'Nome') {
                const TakenForNameA = GetAtivoNameWithIdFromStore(a.AtivoId)
                const TakenForNameB = GetAtivoNameWithIdFromStore(b.AtivoId)
                return TakenForNameA.localeCompare(TakenForNameB);
            } else if (OrdenarPor === 'Tempo de Uso') {
                const UsoA = !a.ReturnDate ? (moment().valueOf() - a.TakeDate) : a.Duration
                const UsoB = !b.ReturnDate ? (moment().valueOf() - b.TakeDate) : b.Duration
                return UsoA < UsoB ? 1 : -1
            } else if (OrdenarPor === 'Status') {
                const UsoA = !a.ReturnDate ? 'Em uso' : 'Devolvido'
                const UsoB = !b.ReturnDate ? 'Em uso' : 'Devolvido'
                return UsoA.localeCompare(UsoB);
            } else {
                return a.TakeDate < b.TakeDate ? 1 : -1
            }
        }))

    }, [FiltroDeTexto, OrdenarPor])


    const ResetSelectedAtivo = () => {
        setModalShow(false);
        setSelectedAtivo({});
    }

    const handleAtivoSelection = (Id) => {

        const Ativo = GetAtivoWithIdFromStore(Id)

        if (Ativo.Deleted === false) {
            if (props.FromModal === false) {
                setSelectedAtivo(Ativo)
                setModalShow(true)
            }
        } else {
            NotificationAlerta("Aviso", "Este Ativo foi deletado da base de dados, não sendo possível exibir suas informações")
        }

    }


    const handleResetFiltros = () => {
        setFiltroDeTexto('')
        setOrdenarPor('Mais Recentes')
    }

    return (
        <>
            <AtivoModal FromModal={true} CurrentUser={CurrentUser} Ativo={{ ...SelectedAtivo }} show={modalShow} onHide={() => setModalShow(false)} Function="View" onDelete={ResetSelectedAtivo} />
            <div className={props.Tema === 'Escuro' ? 'UserAtivoRecords-ContainerEscuro UserAtivoRecords-Container' : 'UserAtivoRecords-ContainerClaro UserAtivoRecords-Container'}>



                <div className='UserAtivoRecords-FormFilter'>
                    <input value={FiltroDeTexto} placeholder='Buscar...' onChange={e => setFiltroDeTexto(e.target.value)}></input>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="UserAtivoRecords-OrderBy">
                            <div className='UserAtivoRecords-OrdenarPorTitle'>
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
                    <button onClick={handleResetFiltros}>Limpar filtro</button>

                </div>

                {Records.map(Registro => {

                    const momento = moment.unix(Registro.TakeDate / 1000); // dividir por 1000 porque o valor está em milissegundos, mas moment.unix() espera segundos
                    const horaMinuto = momento.format('HH:mm'); // exemplo de formato "HH:mm"

                    const momentoReturn = moment.unix(Registro?.ReturnDate / 1000); // dividir por 1000 porque o valor está em milissegundos, mas moment.unix() espera segundos
                    const horaMinutoReturn = momentoReturn.format('HH:mm'); // exemplo de formato "HH:mm"

                    // Tempo alvo em milissegundos
                    const tempoEmMilissegundos = !Registro.ReturnDate ? (moment().valueOf() - Registro.TakeDate) : Registro.Duration;

                    // Duração do tempo em relação à data atual
                    const duracao = moment.duration(tempoEmMilissegundos);

                    // Extrair os dias, horas e minutos da duração
                    const dias = Math.floor(duracao.asDays());
                    const horas = duracao.hours();
                    const minutos = duracao.minutes();

                    // Formatar a duração no formato desejado
                    const tempoFormatado = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;



                    return <div key={v4()} className='UserAtivoRecord-Container'>
                        <div className='UserAtivoRecord-UpRow'>
                            <Tooltip title="Item retirado" position="bottom" >
                                <span className='UserAtivoRecord-UpRow-Name' onClick={e => handleAtivoSelection(Registro.AtivoId)}>
                                    {GetAtivoNameWithIdFromStore(Registro.AtivoId)}
                                </span>
                            </Tooltip>
                            <span className='UserAtivoRecord-UpRow-Status'>
                                {!Registro.ReturnDate ? 'Em uso' : ''}
                            </span>
                        </div>

                        {Registro.TakenBy.id !== Registro.TakenFor.id && <div className='UserAtivoRecord-MiddleRow'>
                            <Tooltip title="Usuário que registrou a retirada" position="bottom" >
                                <span className='UserAtivoRecord-MiddleRow-Name' onClick={e => handleAtivoSelection(Registro.TakenBy.id)}>
                                    <UilBookmark />
                                    {GetuserNameWithIdFromStore(Registro.TakenBy.id)}
                                </span>
                            </Tooltip>
                        </div>
                        }
                        <div className='UserAtivoRecord-DownRow'>
                            <Tooltip title="Data de Retirada" position="bottom" >
                                <span className='UserAtivoRecord-DownRow-Date'>
                                    <UilCalendarAlt />
                                    {moment(Registro.TakeDate).format("DD/MM/YY")}
                                </span>
                            </Tooltip>
                            <Tooltip title="Hora da Retirada" position="bottom" >
                                <span className='UserAtivoRecord-DownRow-Time'>
                                    <UilClock />
                                    {horaMinuto}
                                </span>
                            </Tooltip>
                            <Tooltip title="Tempo de Uso (HH:mm)" position="bottom" >
                                <span className='UserAtivoRecord-DownRow-Time'>
                                    <UilPlay />
                                    {tempoFormatado}
                                </span>
                            </Tooltip>


                        </div>

                        {Registro.ReturnDate &&
                            <div className='AtivoRecord-DownRow'>
                                <span className='UserAtivoRecord-UpRow-Status'>
                                    {"Devolvido em " + moment(Registro.ReturnDate).format("DD/MM/YY") + " " + horaMinutoReturn}
                                </span>
                            </div>
                        }

                    </div>
                })}




                {Records.length === 0 && <div className='UserAtivosRecords-TakeForm'>
                    <div className='UserAtivosRecords-AvisoInfo'>
                        <div className='UserAtivosRecords-AvisoInfo-Item'>
                            <UilCommentInfoAlt />
                            <span>Nenhum registro encontrado</span>
                        </div>
                    </div>
                </div>}



            </div>

        </>
    )
}



const ConnectedUserAtivoRecords = connect((state) => {
    return {
        Tema: state.Tema
    }
})(UserAtivoRecords)

export default ConnectedUserAtivoRecords
