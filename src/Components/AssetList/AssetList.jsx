import React, { useState, useEffect } from 'react'
import './AssetList.css'
import Loading from '../LoadingForTabs/Loading';
import { connect } from 'react-redux'
import { GetFromStore, GetNameFromStoreWithId, GetNamesOfUsersThatTookAsset } from '../../Functions/StoreMiddleware';
import { PermitIndexs } from '../../GlobalVars';
import Asset from './Asset/Asset';
import { v4 } from 'uuid';
import AssetModal from './Asset/AssetModal'
import Show from '../LayoutComponents/Show/Show';
import Warning from '../LayoutComponents/Warning/Warning';
import FilterSelect from '../LayoutComponents/FilterSelect/FilterSelect'
import OrderBy from '../LayoutComponents/OrderBy/OrderBy'

const AssetsList = (props) => {



    const [SelectedAsset, setSelectedAsset] = useState({})
    const [ListaDeAssets, setListaDeAssets] = useState([])
    const [Loaded, setLoaded] = useState(false);
    const [FiltroDeTexto, setFiltroDeTexto] = useState('');

    const [modalShow, setModalShow] = useState(false);
    const [AddmodalShow, setAddModalShow] = useState(false);
    const [CurrentUser,] = useState(GetFromStore('CurrentUser'))
    const [Filters, setFilters] = useState([]);
    const [ResetFilters, setResetFilters] = useState(false);
    const [OrdenarPor, setOrdenarPor] = useState('Nome do Ativo');

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
            //FILTER
            return (
                (FiltroDeTexto === '' || CheckIncludesText(Asset.Item) || CheckIncludesText(Asset.Brand) || CheckIncludesText(Asset.Description) || CheckIncludesText(GetNamesOfUsersThatTookAsset(Asset.id))) &&
                CheckIncludesInObject(Asset.Type, Filters?.AssetTypes) &&
                CheckIncludesInObject(Asset.StorageLocation, Filters?.StorageLocations) &&
                CheckIncludesInObject(Asset.Status, Filters?.AssetsStatus) &&
                CheckIncludesInObject(Asset.Usage, Filters?.UsageTypes)
            )
        }).sort(
            (Primeiro, Segundo) => {

                const UsersUsingPrimeiro = GetNamesOfUsersThatTookAsset(Primeiro.id) || 'ZZ'
                const UsersUsingSegundo = GetNamesOfUsersThatTookAsset(Segundo.id) || 'ZZ'
                const StoragePrimeiro = GetNameFromStoreWithId('StorageLocations', Primeiro.StorageLocation.id)
                const StorageSegundo = GetNameFromStoreWithId('StorageLocations', Segundo.StorageLocation.id)
                const TypePrimeiro = GetNameFromStoreWithId('AssetTypes', Primeiro.Type.id)
                const TypeSegundo = GetNameFromStoreWithId('AssetTypes', Segundo.Type.id)

                switch (OrdenarPor) {
                    case 'Nome do Ativo':
                        return Primeiro.Item.localeCompare(Segundo.Item)
                    case 'Nome do Usuário':
                        return UsersUsingPrimeiro.localeCompare(UsersUsingSegundo)
                    case 'Local de Armazenamento':
                        return StoragePrimeiro.localeCompare(StorageSegundo)
                    case 'Tipo':
                        return TypePrimeiro.localeCompare(TypeSegundo)
                    case 'Quantidade do Ativo':
                        return parseInt(Primeiro.Qtd) < parseInt(Segundo.Qtd) ? 1 : -1
                    case 'Quantidade em Uso':
                        return parseInt(Primeiro.QtdInUse) < parseInt(Segundo.QtdInUse) ? 1 : -1
                    default:
                        return Primeiro.Item.localeCompare(Segundo.Item)
                }
            }
        ))


    }, [FiltroDeTexto, Filters, OrdenarPor])

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
                <OrderBy
                    Module="Assets"
                    OnChange={(SelectedOption) => setOrdenarPor(SelectedOption.Value)}
                    Reset={ResetFilters}
                />
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
                <Warning Text='Nenhum Ativo encontrado' />
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