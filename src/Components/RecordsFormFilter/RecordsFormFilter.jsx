import React, { useState, useEffect } from 'react'
import './RecordsFormFilter.css'
import { GetFromStoreWithId, GetNameFromStoreWithId } from '../../Functions/StoreMiddleware'
import moment from 'moment';
import { connect } from 'react-redux'
import OrderBy from '../LayoutComponents/OrderBy/OrderBy'
import FilterSelect from '../LayoutComponents/FilterSelect/FilterSelect'
import RangePicker from '../LayoutComponents/RangePicker/RangePicker'
import TwoColumns from '../LayoutComponents/TwoColumns/TwoColumns';
import FormGroupLabel from '../LayoutComponents/FormGroupLabel/FormGroupLabel';
import { UilSearch, UilCalendarAlt, } from '@iconscout/react-unicons'

function GetUserName(item, who) {
    if (who === 'For')
        return GetNameFromStoreWithId('UsersWithDeleted', item.TakenFor.id)
    else if ('By')
        return GetNameFromStoreWithId('UsersWithDeleted', item.TakenBy.id)
}

function GetAssetName(item) {
    return GetNameFromStoreWithId('AssetsWithDeleted', item.AtivoId)
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
    const [Filters, setFilters] = useState([]);

    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const [startDate, setStartDate] = useState(firstDayOfMonth);
    const [endDate, setEndDate] = useState(lastDayOfMonth);

    const CheckIncludes = (What) => {
        return What.toLowerCase().includes(FiltroDeTexto.trim().toLowerCase())
    }


    //CHECK IN OBJECT
    const CheckIncludesInObject = (Item, What, Key) => {
        return What?.find(option => option.id === Item.id)
    }


    //SORT AND FILTER LIST
    useEffect(() => {
        const Registros = props.GetRecords(props?.Asset?.id)
        props.SetRecords(
            //FILTER
            Registros.filter(Record => {
                const TakenForName = GetUserName(Record, 'For')
                const TakenByName = GetUserName(Record, 'By')
                const AssetName = GetAssetName(Record)
                const Status = GetStatus(Record)
                const TakeDate = GetRecordDate(Record, 'Take')
                const ReturnDate = GetRecordDate(Record, 'Return')

                const Asset = GetFromStoreWithId("Assets", Record.AtivoId)
                const User = GetFromStoreWithId("Users", Record.TakenFor.id)

                return (
                    //Text Filter
                    (
                        FiltroDeTexto === '' ||
                        CheckIncludes(TakenForName) ||
                        CheckIncludes(TakenByName) ||
                        CheckIncludes(AssetName) ||
                        CheckIncludes(Status) ||
                        CheckIncludes(TakeDate) ||
                        CheckIncludes(ReturnDate)
                    ) &&
                    //Asset Filter
                    CheckIncludesInObject(Asset.Type, Filters?.AssetTypes) &&
                    CheckIncludesInObject(Asset.StorageLocation, Filters?.StorageLocations) &&
                    CheckIncludesInObject(Asset.Status, Filters?.AssetsStatus) &&
                    CheckIncludesInObject(Asset.Usage, Filters?.UsageTypes) &&
                    //User Filter
                    CheckIncludesInObject(User.Sector, Filters?.Sectors) &&
                    CheckIncludesInObject(User.Type, Filters?.UserTypes) &&

                    Record.TakeDate >= moment(startDate).valueOf() &&
                    Record.TakeDate <= moment(endDate).valueOf()

                )

            }).sort(
                //SORT
                (Primeiro, Segundo) => {
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
                            return StatusSegundo.localeCompare(StatusPrimeiro)
                        default:
                            return Primeiro.TakeDate < Segundo.TakeDate ? 1 : -1
                    }
                }))
    }, [FiltroDeTexto, OrdenarPor, props.Asset, Filters, startDate, endDate])


    useEffect(() => {
        setResetFilters(true)
        setTimeout(() => {
            setResetFilters(false)
        }, 1000);
    }, [])




    return (
        <div className={props.Tema === 'Dark' ? 'AssetRecords-FormFilterDark AssetRecords-FormFilter' : 'AssetRecords-FormFilterLightTheme AssetRecords-FormFilter'}        >



            <div className='AssetRecords-DateRangeContainer'>
                <FormGroupLabel>
                    <UilCalendarAlt />
                    Data de Inicio
                </FormGroupLabel>
                <RangePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                />
            </div>
            <div className='AssetRecords-DateRangeContainer'>
                <FormGroupLabel>
                    <UilCalendarAlt />
                    Data Final
                </FormGroupLabel>
                <RangePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                />
            </div>


            <div className='AssetRecords-SearchBarContainer'>
                <FormGroupLabel>
                    <UilSearch />
                    Palavas Chave
                </FormGroupLabel>
                <input value={FiltroDeTexto} placeholder='Buscar...' onChange={e => setFiltroDeTexto(e.target.value)}></input>
            </div>


            <div className='AssetRecords-OrderAndFilter'>
                <FilterSelect Module="FilterRecords" OnChange={setFilters} />

                <OrderBy
                    Module="Records"
                    OnChange={(SelectedOption) => setOrdenarPor(SelectedOption.Value)}
                    Reset={ResetFilters}
                />
            </div>










        </div>
    )
}



const ConnectedRecordsFormFilter = connect((state) => {
    return {
        Tema: state.Tema
    }
})(RecordsFormFilter)

export default ConnectedRecordsFormFilter

