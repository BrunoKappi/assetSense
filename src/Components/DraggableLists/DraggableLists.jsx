import './DraggableLists.css'
import { useState, useEffect } from 'react';
import Lists from './List'
import Masonry from "react-masonry-css";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 } from 'uuid';
import { connect } from 'react-redux'
import NumbersOfList from '../NumbersOfList/NumbersOfList';

import { NotificationErro, NotificationSucesso } from '../../NotificationUtils';
import { EDIT_ASSETS, EDIT_USERS } from '../../Functions/PermitsMiddleware';
import { AssetsInTypesBreakpoints } from '../../GlobalVars';
import Warning from '../LayoutComponents/Warning/Warning'
import Info from '../LayoutComponents/Info/Info'
import Show from '../LayoutComponents/Show/Show';
import LoadingAnimate from '../LoadingForTabs/Loading'
import { UpdateInFirebaseFunctions } from '../../Functions/DatabaseMiddleware';
import { SetAssetsOnStore, SetUsersOnStore } from '../../Functions/StoreMiddleware';
import SectionTitle from '../LayoutComponents/SectionTitle/SectionTitle'

const EditUser = UpdateInFirebaseFunctions["User"]
const EditUAsset = UpdateInFirebaseFunctions["Asset"]

const UpdateInFirebaseFunctionsMap = {
    'AssetsInTypes': (Item) => EditUAsset(Item),
    'AssetsInStorageLocations': (Item) => EditUAsset(Item),
    'UsersInTypes': (Item) => EditUser(Item),
    'UsersInSectores': (Item) => EditUser(Item),
    'AssetsInStatus': (Item) => EditUAsset(Item),
    'AssetsInUsageTypes': (Item) => EditUAsset(Item),
}

const SetInStoreFunctions = {
    'AssetsInTypes': SetAssetsOnStore,
    'AssetsInStorageLocations': SetAssetsOnStore,
    'UsersInTypes': SetUsersOnStore,
    'UsersInSectores': SetUsersOnStore,
    'AssetsInStatus': SetAssetsOnStore,
    'AssetsInUsageTypes': SetAssetsOnStore,
}

const ListaDeitensMap = {
    'AssetsInTypes': 'Assets',
    'AssetsInStorageLocations': 'Assets',
    'UsersInTypes': 'Users',
    'UsersInSectores': 'Users',
    'AssetsInStatus': 'Assets',
    'AssetsInUsageTypes': 'Assets',
}

const ListMap = {
    'AssetsInTypes': 'AssetTypes',
    'AssetsInStorageLocations': 'StorageLocations',
    'UsersInTypes': 'UserTypes',
    'UsersInSectores': 'Sectors',
    'AssetsInStatus': 'AssetsStatus',
    'AssetsInUsageTypes': 'UsageTypes',
}

const KeyMap = {
    'AssetsInTypes': 'Type',
    'AssetsInStorageLocations': 'StorageLocation',
    'UsersInTypes': 'Type',
    'UsersInSectores': 'Sector',
    'AssetsInStatus': 'Status',
    'AssetsInUsageTypes': 'Usage',
}

const PermitsMap = {
    'AssetsInTypes': EDIT_ASSETS,
    'AssetsInStorageLocations': EDIT_ASSETS,
    'UsersInTypes': EDIT_USERS,
    'UsersInSectores': EDIT_USERS,
    'AssetsInStatus': EDIT_ASSETS,
    'AssetsInUsageTypes': EDIT_ASSETS,
}


const SectionTitleMap = {
    'AssetsInTypes': 'Ativos por Tipo',
    'AssetsInStorageLocations': 'Ativos por Local de Armazenamento',
    'UsersInTypes': 'Usuários por Tipo',
    'UsersInSectores': 'Usuários por Setor',
    'AssetsInStatus': 'Ativos por Status',
    'AssetsInUsageTypes': 'Ativos por Tipo de Uso',
}

const DraggableLists = (props) => {

    const Key = KeyMap[props.Module]
    const List = ListMap[props.Module]

    //PERMIT
    const PermitFunction = PermitsMap[props.Module]
    const EditPermit = (PermitFunction())

    //STATE
    const [ListaDeItens, setListaDeItens] = useState([])
    const [isMobile, setisMobile] = useState(window.innerWidth <= 768)
    const [Loading, setLoading] = useState(false)



    //SET STATE WHEN ITENS CHANGE
    useEffect(() => {
        setListaDeItens([
            ...props[List].map(element => {
                var ItensQtd = props[ListaDeitensMap[props.Module]].filter(el => el[Key].id === element.id && el.Deleted === false).length
                return { id: element.id, Value: element.Value, Qtd: ItensQtd }
            })])
    }, [props[ListaDeitensMap[props.Module]], props[List]])

    //HANDLE DRAG
    const HandleDrag = (Resultado) => {


        if (!Resultado.destination) return

        if (!EditPermit) {
            NotificationErro("Ação não Autoriazada", 'Você não tem permissão para realizar essa ação, solicite autorização ao seu Administrador')
            return
        }



        const TypeDestinationID = Resultado.destination.droppableId.split("/")[0];
        const ItemId = Resultado.draggableId




        const Item = props[ListaDeitensMap[props.Module]].find(U => U.id === ItemId)
        const IndexOfItem = props[ListaDeitensMap[props.Module]].indexOf(Item)
        if (Item[Key].id === TypeDestinationID) return
        Item[Key].id = TypeDestinationID

        const EditFunction = UpdateInFirebaseFunctionsMap[props.Module]
        const SaveFunction = SetInStoreFunctions[props.Module]

        setLoading(TypeDestinationID)

        EditFunction(Item).then(() => {
            const copiedItems = [...props[ListaDeitensMap[props.Module]]];
            copiedItems[IndexOfItem] = { ...Item }
            SaveFunction(copiedItems)
            NotificationSucesso("Edição", "Alteração salva com sucesso!")
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })

    }

    const handleResize = () => {
        setisMobile(window.innerWidth <= 768) // Largura máxima da tela em que o recurso de drag and drop será habilitado      
    };

    window.addEventListener('resize', handleResize)

    return (
        <DragDropContext onDragEnd={(result) => { HandleDrag(result) }}>
            <div className='AssetsInTypesContainer'>

                <SectionTitle>{SectionTitleMap[props.Module]}</SectionTitle>

                <NumbersOfList Values={ListaDeItens} />

                <Show Show={isMobile}>
                    <Warning Text='A funcionalide de "Arraste e Solte" é habilitada somente em telas maiores' />
                </Show>

                <Show Show={!isMobile}>
                    <Info Text='Você pode arrastar e soltar os itens em outros grupos' />
                </Show>


                <Masonry breakpointCols={AssetsInTypesBreakpoints} className="my-masonry-grid" columnClassName="my-masonry-grid_column"   >
                    {props[List].map(Item => {

                        return <>
                            <Show Show={Loading !== Item.id}>
                                <Lists LoadingList={Loading} key={v4()} Item={Item} Assets={props[ListaDeitensMap[props.Module]]} Key={Key} Module={props.Module} />
                            </Show>
                            <Show Show={Loading === Item.id}>
                                <LoadingAnimate />
                            </Show>
                        </>
                    })}
                </Masonry>




            </div >
        </DragDropContext>
    )
}


const ConnectedDraggableLists = connect((state) => {
    return {
        Assets: state.Assets,
        Users: state.Users,
        UserTypes: state.UserTypes,
        AssetTypes: state.AssetTypes,
        AssetsStatus: state.AssetsStatus,
        UsageTypes: state.UsageTypes,
        StorageLocations: state.StorageLocations,
        Sectors: state.Sectors,
        Tema: state.Tema
    }
})(DraggableLists)

export default ConnectedDraggableLists