import React, { useState, useEffect } from 'react'
import './RecordsFormFilter.css'
import { GetAtivoNameWithIdFromStore, GetuserNameWithIdFromStore } from '../../Functions/Middleware'
import Dropdown from 'react-bootstrap/Dropdown';
import moment from 'moment';
import { MdFilterList } from 'react-icons/md'
import { connect } from 'react-redux'

const RecordsFormFilter = (props) => {

    //STATES
    const [OrdenarPor, setOrdenarPor] = useState('Mais Recentes')
    const [FiltroDeTexto, setFiltroDeTexto] = useState('')


    //SORT AND FILTER LIST
    useEffect(() => {
        const Registros = props.GetRecords(props.Ativo?.id)
        console.log(Registros)
        props.SetRecords(Registros.filter(Record => {
            const TakenForName = GetuserNameWithIdFromStore(Record.TakenFor.id)
            const TakenByName = GetuserNameWithIdFromStore(Record.TakenBy.id)
            const AtivoName = GetAtivoNameWithIdFromStore(Record.AtivoId)
            const Status = Record.ReturnDate ? 'Devolvido' : 'Em uso'
            const TextFilter = FiltroDeTexto === '' || (
                TakenForName.toLowerCase().includes(FiltroDeTexto.trim().toLowerCase()) ||
                TakenByName.toLowerCase().includes(FiltroDeTexto.trim().toLowerCase()) ||
                AtivoName.toLowerCase().includes(FiltroDeTexto.trim().toLowerCase()) ||
                moment(Record.TakeDate).format("DD/MM/YY").includes(FiltroDeTexto.trim().toLowerCase()) ||
                moment(Record.ReturnDate).format("DD/MM/YY").includes(FiltroDeTexto.trim().toLowerCase()) ||
                Status.toLowerCase().includes(FiltroDeTexto.trim().toLowerCase())
            )
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

    }, [FiltroDeTexto, OrdenarPor, props.RecordsAtivos, props.Ativo])


    //RESET FILTERS
    const handleResetFiltros = () => {
        setFiltroDeTexto('')
        setOrdenarPor('Mais Recentes')
    }


    return (
        <div className={props.Tema === 'Escuro' ? 'AtivoRecords-FormFilterEscuro AtivoRecords-FormFilter' : 'AtivoRecords-FormFilterClaro AtivoRecords-FormFilter'}        >
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
    )

}



const ConnectedRecordsFormFilter = connect((state) => {
    return {
        Tema: state.Tema
    }
})(RecordsFormFilter)

export default ConnectedRecordsFormFilter 