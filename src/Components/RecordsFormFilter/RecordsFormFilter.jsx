import React, { useState, useEffect } from 'react'
import './RecordsFormFilter.css'
import { GetNameFromStoreWithId } from '../../Functions/Middleware'
import moment from 'moment';
import { connect } from 'react-redux'
import OrderBy, { GetDefautlOption } from '../LayoutComponents/OrderBy/OrderBy'


function GetUserName(item, who) {
    if (who === 'For')
        return GetNameFromStoreWithId('UsersWithDeleted',item.TakenFor.id)
    else if ('By')
        return GetNameFromStoreWithId('UsersWithDeleted',item.TakenBy.id)
}

function GetAssetName(item) {
    return GetNameFromStoreWithId('AssetsWithDeleted',item.AtivoId)
}

function GetUsage(item) {
    if (!item.ReturnDate) {
        return moment().valueOf() - item.TakeDate;
    }
    return item.ReturnDate - item.TakeDate;
}

function GetStatus(item) {
    return item.ReturnDate ? 'Devolvido' : 'Em uso';
}

function GetRecordDate(item, what) {
    if (what === 'Take')
        return moment(item.TakeDate).format("DD/MM/YY")
    else if ('Return')
        return moment(item.ReturnDate).format("DD/MM/YY")
}


const RecordsFormFilter = (props) => {

    //STATES 
    const [OrdenarPor, setOrdenarPor] = useState('')
    const [FiltroDeTexto, setFiltroDeTexto] = useState('')
    const [ResetFilters, setResetFilters] = useState(false);

    const CheckIncludes = (What) => {
        return What.toLowerCase().includes(FiltroDeTexto.trim().toLowerCase())
    }

    //SORT AND FILTER LIST
    useEffect(() => {
        const Registros = props.GetRecords(props?.Asset?.id)
        props.SetRecords(
            Registros.filter(Record => {
                //FILTER
                const TakenForName = GetUserName(Record, 'For')
                const TakenByName = GetUserName(Record, 'By')
                const AssetName = GetAssetName(Record)
                const Status = GetStatus(Record)
                const TakeDate = GetRecordDate(Record, 'Take')
                const ReturnDate = GetRecordDate(Record, 'Return')
                return (
                    FiltroDeTexto === '' ||
                    CheckIncludes(TakenForName) ||
                    CheckIncludes(TakenByName) ||
                    CheckIncludes(AssetName) ||
                    CheckIncludes(Status) ||
                    CheckIncludes(TakeDate) ||
                    CheckIncludes(ReturnDate)
                )

            }).sort(
                (Primeiro, Segundo) => {
                    //SORT
                    const TakenForNamePrimeiro = GetUserName(Primeiro, 'For')
                    const TakenForNameSegundo = GetUserName(Segundo, 'For')
                    const UsoA = GetUsage(Primeiro)
                    const UsoB = GetUsage(Segundo)
                    const StatusPrimeiro = GetStatus(Primeiro)
                    const StatusSegundo = GetStatus(Segundo)
                    switch (OrdenarPor) {
                        case 'Mais Recentes':
                            return Primeiro.TakeDate < Segundo.TakeDate ? 1 : -1
                        case 'Mais Antigos':
                            return Primeiro.TakeDate > Segundo.TakeDate ? 1 : -1
                        case 'Nome':
                            return TakenForNamePrimeiro.localeCompare(TakenForNameSegundo)
                        case 'Tempo de Uso':
                            return UsoA < UsoB ? 1 : -1
                        case 'Status':
                            return StatusPrimeiro.localeCompare(StatusSegundo)
                        default:
                            return Primeiro.TakeDate < Segundo.TakeDate ? 1 : -1
                    }
                }))
    }, [FiltroDeTexto, OrdenarPor, props.Asset])


    useEffect(() => {
        setResetFilters(true)
        setTimeout(() => {
            setResetFilters(false)
        }, 1000);
    }, [])



    //RESET FILTERS
    const handleResetFiltros = () => {
        setFiltroDeTexto('')
        setOrdenarPor('')
        setResetFilters(true)
        setTimeout(() => {
            setResetFilters(false)
        }, 1000);
    }


    return (
        <div className={props.Tema === 'Escuro' ? 'AssetRecords-FormFilterEscuro AssetRecords-FormFilter' : 'AssetRecords-FormFilterClaro AssetRecords-FormFilter'}        >
            <input value={FiltroDeTexto} placeholder='Buscar...' onChange={e => setFiltroDeTexto(e.target.value)}></input>
            <OrderBy
                Module="Records"
                OnChange={(SelectedOption) => setOrdenarPor(SelectedOption.Value)}
                Reset={ResetFilters}
            />
           
        </div>
    )
}



const ConnectedRecordsFormFilter = connect((state) => {
    return {
        Tema: state.Tema
    }
})(RecordsFormFilter)

export default ConnectedRecordsFormFilter

