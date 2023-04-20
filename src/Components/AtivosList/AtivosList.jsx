import React, { useState, useEffect } from 'react'
import './AtivosList.css'
import Loading from '../LoadingForTabs/Loading';
import { connect } from 'react-redux'
import { MdFilterList } from 'react-icons/md';
import Dropdown from 'react-bootstrap/Dropdown';
import { UilExclamationCircle } from '@iconscout/react-unicons'
import { GetAtivosFromStore, GetCurrentUserFromStore, GetCurrentUserTypeFromStore, GetLocaisSelect, GetLocalArmazenamentoNameWithIdFromStore, GetTipoAtivoNameWithIdFromStore, GetTipoDeUsoNameWithIdFromStore, GetTiposAtivosSelect } from '../../Functions/Middleware';
import { PermitIndexs } from '../../GlobalVars';
import Ativo from './Ativo/Ativo';
import { v4 } from 'uuid';
import AtivoModal from './Ativo/AtivoModal'
import Show from '../LayoutComponents/Show/Show';
import Warning from '../LayoutComponents/Warning/Warning';
import FilterSelect from '../LayoutComponents/FilterSelect/FilterSelect'


const AtivosList = (props) => {

    const [SelectedAtivo, setSelectedAtivo] = useState({})
    const [ListaDeAtivos, setListaDeAtivos] = useState([])
    const [Loaded, setLoaded] = useState(false);
    const [FiltroDeTexto, setFiltroDeTexto] = useState('');

    const [modalShow, setModalShow] = useState(false);
    const [AddmodalShow, setAddModalShow] = useState(false);
    const [CurrentUser,] = useState(GetCurrentUserFromStore())
    const [Filters, setFilters] = useState([]);
    const [ResetFilters, setResetFilters] = useState([]);

    //PERMITS E USER TYPE   
    var PermitToAddAtivos = GetCurrentUserTypeFromStore()?.Permits[PermitIndexs['ADICIONAR_ATIVOS']]

    // FILL LIST
    useEffect(() => {
        const Ativos = GetAtivosFromStore()
        setListaDeAtivos(Ativos.sort((a, b) => a.Item.localeCompare(b.Item)))
        setTimeout(() => {
            setLoaded(true)
        }, 500);
    }, [props.Ativos])

    // SORT AND FILTER
    useEffect(() => {
        const Ativos = GetAtivosFromStore()

        setListaDeAtivos(Ativos.filter(Ativo => {
            const TextFilter = FiltroDeTexto === '' || (
                Ativo.Item.toLowerCase().includes(FiltroDeTexto.toLowerCase()) ||
                Ativo.Brand.toLowerCase().includes(FiltroDeTexto.toLowerCase()) ||
                GetLocalArmazenamentoNameWithIdFromStore(Ativo.StorageLocation.id).toLowerCase().includes(FiltroDeTexto.toLowerCase()) ||
                GetTipoAtivoNameWithIdFromStore(Ativo.Type.id).toLowerCase().includes(FiltroDeTexto.toLowerCase()) ||
                GetTipoDeUsoNameWithIdFromStore(Ativo.Usage.id).toLowerCase().includes(FiltroDeTexto.toLowerCase())
            )
            const TipoAtivoFiler = Filters?.TiposAtivos?.find(option => option.id === Ativo.Type.id)
            const LocalArmazenamentoFilter = Filters?.LocaisArmazenamento?.find(option => option.id === Ativo.StorageLocation.id)
            const StatusFilter = Filters?.StatusAtivos?.find(option => option.id === Ativo.Status.id)
            const UsageFilter = Filters?.TiposDeUso?.find(option => option.id === Ativo.Usage.id)

            return TextFilter && TipoAtivoFiler && LocalArmazenamentoFilter && StatusFilter && UsageFilter
        }).sort((a, b) => a.Item.localeCompare(b.Item)))



    }, [FiltroDeTexto, Filters]) 


    //RESET FILTERS
    const handleResetFiltros = () => {
        setFiltroDeTexto('')
        setResetFilters(true)
        setTimeout(() => {
            setResetFilters(false)
        }, 1000);
    }

    //HANDLE CLICK ON USER ROW
    const handleUserClick = (AtivoClicked) => {
        setModalShow(true);
        setSelectedAtivo({ ...AtivoClicked })
    }

    //RESET SELECTED ATIVO
    const ResetSelectedAtivo = () => {
        setModalShow(false)
        setSelectedAtivo({})
    }



    return (
        <div className={props.Tema === 'Escuro' ? 'AtivosListContainerEscuro AtivosListContainer' : 'AtivosListContainerClaro AtivosListContainer'}>

            <AtivoModal FromModal={false} CurrentUser={CurrentUser} Ativo={{ ...SelectedAtivo }} show={modalShow} onHide={() => setModalShow(false)} Function="View" onDelete={ResetSelectedAtivo} />
            <AtivoModal FromModal={false} CurrentUser={CurrentUser} Ativo={{}} show={AddmodalShow} onHide={() => setAddModalShow(false)} Function="Add" />


            <div className='AtivosListFormFilter'>
                <input value={FiltroDeTexto} placeholder='Procurar Item...' onChange={e => setFiltroDeTexto(e.target.value)}></input>

                <FilterSelect
                    Module="FilterAtivos"
                    OnChange={setFilters}
                    Reset={ResetFilters}
                />

                <button onClick={handleResetFiltros}>Limpar Filtro</button>
            </div>



            <Show Show={ListaDeAtivos.length !== 0 || Loaded}>
                {ListaDeAtivos.map(Item =>
                    <div key={v4()} onClick={e => handleUserClick(Item)}>
                        <Ativo key={v4()} Ativo={Item} />
                    </div>
                )}
            </Show>

            <Show Show={ListaDeAtivos.length === 0 && !Loaded} Width='100%'>
                <Loading />
            </Show>

            <Show Show={ListaDeAtivos.length === 0 && Loaded} Width='100%'>
                <Warning Text='Nenhum Ativo encontrado' />
            </Show>

            <Show Show={PermitToAddAtivos} Width='100%'>
                <button className='AtivosListAddButton' onClick={e => setAddModalShow(true)}>
                    Adicionar Ativo
                </button>
            </Show>


        </div>
    )
}


const ConnectedAtivosList = connect((state) => {
    return {
        Ativos: state.Ativos,
        Tema: state.Tema
    }
})(AtivosList)

export default ConnectedAtivosList