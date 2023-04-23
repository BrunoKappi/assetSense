import React, { useState, useEffect } from 'react'
import './AtivosList.css'
import Loading from '../LoadingForTabs/Loading';
import { connect } from 'react-redux'
import { GetCurrentUserFromStore, GetCurrentUserTypeFromStore, GetFromStore, GetLocaisSelect, GetLocalArmazenamentoNameWithIdFromStore, GetTipoAtivoNameWithIdFromStore, GetTipoDeUsoNameWithIdFromStore, GetTiposAtivosSelect } from '../../Functions/Middleware';
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

    //CHECK
    const CheckIncludesText = (What) => {
        return What.toLowerCase().includes(FiltroDeTexto.trim().toLowerCase())
    }

    //CHECK IN OBJECT
    const CheckIncludesInObject = (Item, What, Key) => {
        return What?.find(option => option.id === Item.id)
    }

    //PERMITS E USER TYPE   
    var PermitToAddAtivos = GetCurrentUserTypeFromStore()?.Permits[PermitIndexs['ADICIONAR_ATIVOS']]

    // FILL LIST
    useEffect(() => {
        const Ativos = GetFromStore('Ativos')
        setListaDeAtivos(Ativos.sort((a, b) => a.Item.localeCompare(b.Item)))
        setTimeout(() => {
            setLoaded(true)
        }, 500);
    }, [props.Ativos])

    // SORT AND FILTER
    useEffect(() => {
        const Ativos = GetFromStore('Ativos')
        setListaDeAtivos(Ativos.filter(Ativo => {
            return (
                (FiltroDeTexto === '' || CheckIncludesText(Ativo.Item) || CheckIncludesText(Ativo.Brand)) &&
                CheckIncludesInObject(Ativo.Type, Filters?.TiposAtivos) &&
                CheckIncludesInObject(Ativo.StorageLocation, Filters?.StorageLocations) &&
                CheckIncludesInObject(Ativo.Status, Filters?.StatusAtivos) &&
                CheckIncludesInObject(Ativo.Usage, Filters?.TiposDeUso)
            )
        }).sort((a, b) => a.Item.localeCompare(b.Item)))


    }, [FiltroDeTexto, Filters])

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
                <FilterSelect Module="FilterAtivos" OnChange={setFilters} />
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