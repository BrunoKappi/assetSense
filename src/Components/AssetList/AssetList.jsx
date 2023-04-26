import React, { useState, useEffect } from 'react'
import './AssetList.css'
import Loading from '../LoadingForTabs/Loading';
import { connect } from 'react-redux'
import { GetFromStore } from '../../Functions/Middleware';
import { PermitIndexs } from '../../GlobalVars';
import Asset from './Asset/Asset';
import { v4 } from 'uuid';
import AssetModal from './Asset/AssetModal'
import Show from '../LayoutComponents/Show/Show';
import Warning from '../LayoutComponents/Warning/Warning';
import FilterSelect from '../LayoutComponents/FilterSelect/FilterSelect'


const AssetsList = (props) => {



    const [SelectedAsset, setSelectedAsset] = useState({})
    const [ListaDeAssets, setListaDeAssets] = useState([])
    const [Loaded, setLoaded] = useState(false);
    const [FiltroDeTexto, setFiltroDeTexto] = useState('');

    const [modalShow, setModalShow] = useState(false);
    const [AddmodalShow, setAddModalShow] = useState(false);
    const [CurrentUser,] = useState(GetFromStore('CurrentUser'))
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
    var PermitToAddAssets = GetFromStore('CurrentUserType')?.Permits[PermitIndexs['ADICIONAR_ASSETS']]

    // FILL LIST
    useEffect(() => {
        const Assets = GetFromStore('Assets')
        setListaDeAssets(Assets.sort((a, b) => a.Item.localeCompare(b.Item)))
        setTimeout(() => {
            setLoaded(true)
        }, 500);
    }, [props.Assets])

    // SORT AND FILTER
    useEffect(() => {
        const Assets = GetFromStore('Assets')
        setListaDeAssets(Assets.filter(Asset => {
            return (
                (FiltroDeTexto === '' || CheckIncludesText(Asset.Item) || CheckIncludesText(Asset.Brand)) &&
                CheckIncludesInObject(Asset.Type, Filters?.AssetTypess) &&
                CheckIncludesInObject(Asset.StorageLocation, Filters?.StorageLocations) &&
                CheckIncludesInObject(Asset.Status, Filters?.AssetsStatus) &&
                CheckIncludesInObject(Asset.Usage, Filters?.UsageTypes)
            )
        }).sort((a, b) => a.Item.localeCompare(b.Item)))


    }, [FiltroDeTexto, Filters])

    //HANDLE CLICK ON USER ROW
    const handleUserClick = (AssetClicked) => {
        setModalShow(true);
        setSelectedAsset({ ...AssetClicked })
    }

    //RESET SELECTED ASSET
    const ResetSelectedAsset = () => {
        setModalShow(false)
        setSelectedAsset({})
    }



    return (
        <div className={props.Tema === 'Escuro' ? 'AssetsListContainerEscuro AssetsListContainer' : 'AssetsListContainerClaro AssetsListContainer'}>

            <AssetModal FromModal={false} CurrentUser={CurrentUser} Asset={{ ...SelectedAsset }} show={modalShow} onHide={() => setModalShow(false)} Function="View" onDelete={ResetSelectedAsset} />
            <AssetModal FromModal={false} CurrentUser={CurrentUser} Asset={{}} show={AddmodalShow} onHide={() => setAddModalShow(false)} Function="Add" />


            <div className='AssetsListFormFilter'>
                <input value={FiltroDeTexto} placeholder='Procurar Item...' onChange={e => setFiltroDeTexto(e.target.value)}></input>
                <FilterSelect Module="FilterAssets" OnChange={setFilters} />
            </div>



            <Show Show={ListaDeAssets.length !== 0 || Loaded}>
                {ListaDeAssets.map(Item =>
                    <div key={v4()} onClick={e => handleUserClick(Item)}>
                        <Asset key={v4()} Asset={Item} />
                    </div>
                )}
            </Show>

            <Show Show={ListaDeAssets.length === 0 && !Loaded} Width='100%'>
                <Loading />
            </Show>

            <Show Show={ListaDeAssets.length === 0 && Loaded} Width='100%'>
                <Warning Text='Nenhum Asset encontrado' />
            </Show>

            <Show Show={PermitToAddAssets} Width='100%'>
                <button className='AssetsListAddButton' onClick={e => setAddModalShow(true)}>
                    Adicionar Ativo
                </button>
            </Show>


        </div>
    )
}


const ConnectedAssetsList = connect((state) => {
    return {
        Assets: state.Assets,
        Tema: state.Tema
    }
})(AssetsList)

export default ConnectedAssetsList