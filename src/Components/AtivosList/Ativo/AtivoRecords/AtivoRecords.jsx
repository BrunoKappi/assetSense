import React, { useState, useEffect } from 'react'
import './AtivoRecords.css'
import { GetCurrentUserFromStore, GetRecordsOfAtivo, GetTakesOfAtivo, GetTakesOfAtivoOfCurrentUser, GetuserNameWithIdFromStore, GetUsersThatTookAtivo, GetUserWithIdFromStore } from '../../../../Functions/Middleware';
import { msToTime } from './AtivoRecordsUtils';
import moment from 'moment';
import { UilCalendarAlt, UilClock, UilBookmark, UilPlay } from '@iconscout/react-unicons'
import { MdFilterList } from 'react-icons/md'
import Dropdown from 'react-bootstrap/Dropdown';
//Tooltip
import { Tooltip } from 'react-tippy';
import UserModal from '../../../UsersList/User/UserModal'

export default function AtivoRecords(props) {

    const [CurrentUser, setCurrentUser] = useState(GetCurrentUserFromStore())

    //Quantidades
    const QuantidadeDoAtivo = props.Ativo?.Qtd
    const [Records, SetRecords] = useState(GetRecordsOfAtivo(props.Ativo?.Id))
    console.log(GetRecordsOfAtivo(props.Ativo?.Id))
    const [QuantidadeRetirada, SetQuantidadeRetirada] = useState(GetTakesOfAtivo(props.Ativo?.Id))
    const [QuantidadeRetiradaPeloCurrentUser, SetQuantidadeRetiradaPeloCurrentUser] = useState(GetTakesOfAtivoOfCurrentUser(props.Ativo?.Id))
    const [UsuariosQuePegaramAtivo, SetUsuariosQuePegaramAtivo] = useState(GetUsersThatTookAtivo(props.Ativo?.Id))
    const [OrdenarPor, setOrdenarPor] = useState('Mais Recentes')
    const [FiltroDeTexto, setFiltroDeTexto] = useState('')
    const [SelectedUser, setSelectedUser] = useState({})

    const [modalShow, setModalShow] = useState(false);
 

    useEffect(() => {
        const Registros = GetRecordsOfAtivo(props.Ativo?.Id)
        SetRecords(Registros.filter(Record => {
            const TakenForName = GetuserNameWithIdFromStore(Record.TakenFor.Id)
            const TakenByName = GetuserNameWithIdFromStore(Record.TakenBy.Id)
            const TextFilter = FiltroDeTexto === '' || (TakenForName.toLowerCase().includes(FiltroDeTexto.toLowerCase())) || (TakenByName.toLowerCase().includes(FiltroDeTexto.toLowerCase()))
            return TextFilter
        }).sort((a, b) => {
            if (OrdenarPor === 'Mais recentes' || OrdenarPor === 'Ordenar por') {
                return a.TakeDate < b.TakeDate ? 1 : -1
            } else if (OrdenarPor === 'Mais Antigos') {
                return a.TakeDate < b.TakeDate ? - 1 : 1
            } else if (OrdenarPor === 'Nome') {
                const TakenForNameA = GetuserNameWithIdFromStore(a.TakenFor.Id)
                const TakenForNameB = GetuserNameWithIdFromStore(b.TakenFor.Id)
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

    }, [FiltroDeTexto, OrdenarPor])


    const ResetSelectedUser = (UserClicked) => {
        setModalShow(false);
        setSelectedUser({}); 
    }

    const handleUserSelection = (Id) =>{
        const User = GetUserWithIdFromStore(Id)
        setSelectedUser(User)
        setModalShow(true)
    }

    return (
        <>
            <UserModal CurrentUser={CurrentUser} User={{ ...SelectedUser }} show={modalShow} onHide={() => setModalShow(false)} Function="View" onDelete={ResetSelectedUser} />
            <div className={localStorage.getItem('AssetSenseTema') === 'Escuro' ? 'AtivoRecords-ContainerEscuro AtivoRecords-Container' : 'AtivoRecords-ContainerClaro AtivoRecords-Container'}>


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
                    <button>Limpar filtro</button>

                </div>

                {Records.map(Registro => {

                    const momento = moment.unix(Registro.TakeDate / 1000); // dividir por 1000 porque o valor está em milissegundos, mas moment.unix() espera segundos
                    const horaMinuto = momento.format('HH:mm'); // exemplo de formato "HH:mm"

                    // Tempo alvo em milissegundos
                    const tempoEmMilissegundos = Registro.Duration === 0 ? (moment().valueOf() - Registro.TakeDate) : Registro.Duration;

                    // Duração do tempo em relação à data atual
                    const duracao = moment.duration(tempoEmMilissegundos);

                    // Extrair os dias, horas e minutos da duração
                    const dias = Math.floor(duracao.asDays());
                    const horas = duracao.hours();
                    const minutos = duracao.minutes();

                    // Formatar a duração no formato desejado
                    const tempoFormatado = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;



                    return <div className='AtivoRecord-Container'>
                        <div className='AtivoRecord-UpRow'>
                            <Tooltip title="Para quem a retirada foi registrada" position="bottom" >
                                <span className='AtivoRecord-UpRow-Name' onClick={e => handleUserSelection(Registro.TakenFor.Id)}>
                                    {GetuserNameWithIdFromStore(Registro.TakenFor.Id)}
                                </span>
                            </Tooltip>
                            <span className='AtivoRecord-UpRow-Status'>
                                {Registro.Duration === 0 ? 'Em uso' : 'Devolvido'}
                            </span>
                        </div>

                        {Registro.TakenBy.Id !== Registro.TakenFor.Id && <div className='AtivoRecord-MiddleRow'>
                            <Tooltip title="Usuário que registrou a retirada" position="bottom" >
                                <span className='AtivoRecord-MiddleRow-Name' onClick={e => handleUserSelection(Registro.TakenBy.Id)}>
                                    <UilBookmark />
                                    {GetuserNameWithIdFromStore(Registro.TakenBy.Id)}
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
                            <Tooltip title="Tempo de Uso" position="bottom" >
                                <span className='AtivoRecord-DownRow-Time'>
                                    <UilPlay />
                                    {tempoFormatado}
                                </span>
                            </Tooltip>


                        </div>
                    </div>
                })}



            </div>

        </>
    )
}
