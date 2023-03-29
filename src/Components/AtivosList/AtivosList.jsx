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


const AtivosList = (props) => {

    const [SelectedAtivo, setSelectedAtivo] = useState({})
    const [ListaDeAtivos, setListaDeAtivos] = useState([])
    const [AtivosTypesOptions, setAtivosTypesOptions] = useState([])
    const [TipoAtivoLabel, setTipoAtivoLabel] = useState('')
    const [LocalLabel, setLocalLabel] = useState('')
    const [LocaisOptions, setLocaisOptions] = useState([])
    const [Loaded, setLoaded] = useState(false);
    const [FiltroDeTexto, setFiltroDeTexto] = useState('');
    const [FiltroDeTipoAtivo, setFiltroDeTipoAtivo] = useState('Todos');
    const [FiltroLocal, setFiltroLocal] = useState('Todos');

    const [modalShow, setModalShow] = useState(false);
    const [AddmodalShow, setAddModalShow] = useState(false);
    const [CurrentUser,] = useState(GetCurrentUserFromStore())

    //PERMITS E USER TYPE
    const [CurrentUserType] = useState(GetCurrentUserTypeFromStore())
    var PermitToAddAtivos = CurrentUserType?.Permits[PermitIndexs['ADICIONAR_ATIVOS']]




    useEffect(() => {
        GetLocaisSelect().then(Options => { setLocaisOptions(Options) })
        GetTiposAtivosSelect().then(Options => { setAtivosTypesOptions(Options) })
    }, [])


    useEffect(() => {
        const Ativos = GetAtivosFromStore()
        console.log(Ativos)
        setListaDeAtivos(Ativos.sort((a, b) => a.Item.localeCompare(b.Item)))
        setLoaded(true)
    }, [props.Ativos])


    

    useEffect(() => {
        const Ativos = GetAtivosFromStore()
        setListaDeAtivos(Ativos.filter(Ativo => {
            const TextFilter = FiltroDeTexto === '' || (Ativo.Item.toLowerCase().includes(FiltroDeTexto.toLowerCase()) || Ativo.Brand.toLowerCase().includes(FiltroDeTexto.toLowerCase()) || GetLocalArmazenamentoNameWithIdFromStore(Ativo.StorageLocation.Id).toLowerCase().includes(FiltroDeTexto.toLowerCase()) || GetTipoAtivoNameWithIdFromStore(Ativo.Type.Id).toLowerCase().includes(FiltroDeTexto.toLowerCase()) || GetTipoDeUsoNameWithIdFromStore(Ativo.Usage.Id).toLowerCase().includes(FiltroDeTexto.toLowerCase()))
            const TipoAtivoFiler = FiltroDeTipoAtivo === 'Todos' || FiltroDeTipoAtivo === '' || Ativo.Type.Id === FiltroDeTipoAtivo
            const LocalArmazenamentoFilter = FiltroLocal === 'Todos' || FiltroLocal === '' || Ativo.StorageLocation.Id === FiltroLocal
            return TextFilter && TipoAtivoFiler && LocalArmazenamentoFilter
        }).sort((a, b) => a.Item.localeCompare(b.Item)))

        setLoaded(true)

    }, [FiltroDeTexto, FiltroDeTipoAtivo, FiltroLocal])



    const handleSetorOptionChange = (Setor) => {
        setFiltroDeTipoAtivo(Setor.value)
        setTipoAtivoLabel(Setor.label)
    }

    const handleTypeOptionChange = (Type) => {
        setFiltroLocal(Type.value)
        setLocalLabel(Type.label)
    }

    const handleResetFiltros = () => {
        setFiltroDeTexto('')
        setFiltroDeTipoAtivo('')
        setFiltroLocal('')
    }


    const handleUserClick = (AtivoClicked) => {
        //console.log("CLICKsa")
        setModalShow(true);
        setSelectedAtivo({ ...AtivoClicked });
    }

    const ResetSelectedAtivo = () => {
        setModalShow(false);
        setSelectedAtivo({});
    }



    return (
        <div className={localStorage.getItem('AssetSenseTema') === 'Escuro' ? 'AtivosListContainerEscuro AtivosListContainer' : 'AtivosListContainerClaro AtivosListContainer'}>

            <AtivoModal CurrentUser={CurrentUser} Ativo={{ ...SelectedAtivo }} show={modalShow} onHide={() => setModalShow(false)} Function="View" onDelete={ResetSelectedAtivo} />
            <AtivoModal CurrentUser={CurrentUser} Ativo={{}} show={AddmodalShow} onHide={() => setAddModalShow(false)} Function="Add" />


            <div className='AtivosListFormFilter'>
                <input value={FiltroDeTexto} placeholder='Procurar Item...' onChange={e => setFiltroDeTexto(e.target.value)}></input>
                <Dropdown autoClose="outside">
                    <Dropdown.Toggle id="AtivosList-Filtros">
                        <div className='AtivosList-FiltrosTitle'>
                            Filtros
                            <MdFilterList />
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>

                        <Dropdown.Item id='AtivosList-FiltrosItem'>

                            <Dropdown>
                                <Dropdown.Toggle id="FiltroDeTipoDeAtivo">
                                    <div className='FiltroDeTipoDeAtivoTitle'>
                                        {(FiltroDeTipoAtivo !== 'Todos' && FiltroDeTipoAtivo) ? TipoAtivoLabel : 'Filtro de Tipo'}
                                        <MdFilterList />
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {AtivosTypesOptions.map(Setor => {
                                        return <Dropdown.Item onClick={e => handleSetorOptionChange(Setor)} >{Setor.label}</Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>



                            <Dropdown>
                                <Dropdown.Toggle id="FiltroLocalDeAtivo">
                                    <div className='FiltroLocalDeAtivoTitle'>
                                        {(FiltroLocal !== 'Todos' && FiltroLocal) ? LocalLabel : 'Local Armazenamento'}
                                        <MdFilterList />
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {LocaisOptions.map(Type => {
                                        return <Dropdown.Item onClick={e => handleTypeOptionChange(Type)} >{Type.label}</Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>


                        </Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>

                <button onClick={handleResetFiltros}>Limpar Filtro</button>
            </div>





            {(ListaDeAtivos.length !== 0 || Loaded) && ListaDeAtivos.map((Item, Index) => {
                return <div onClick={e => handleUserClick(Item)}>
                    <Ativo key={v4()} Ativo={Item} />
                </div>
            })}

            {ListaDeAtivos.length === 0 && !Loaded && <Loading />}

            {ListaDeAtivos.length === 0 && Loaded && <div className='AtivosList-FilterNoResultsContainer'>
                <UilExclamationCircle />
                <h3>Nenhum Ativo encontrado</h3>
            </div>}


            {PermitToAddAtivos &&
                <button className='AtivosListAddButton' onClick={e => setAddModalShow(true)}>
                    Adicionar Ativo
                </button>
            }

        </div>
    )
}



const ConnectedAtivosList = connect((state) => {
    return {
        Ativos: state.Ativos
    }
})(AtivosList)

export default ConnectedAtivosList