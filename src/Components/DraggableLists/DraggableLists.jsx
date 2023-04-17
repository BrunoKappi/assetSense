import './DraggableLists.css'
import { useState, useEffect } from 'react';
import Lists from './List'
import Masonry from "react-masonry-css";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 } from 'uuid';
import { connect } from 'react-redux'
import NumbersOfList from '../NumbersOfList/NumbersOfList';
import { EditAtivo, EditUser, SaveAtivos, SaveUsers } from '../../Functions/Middleware';
import { NotificationErro, NotificationSucesso } from '../../NotificationUtils';
import { EDITAR_ATIVOS, EDITAR_USUARIOS } from '../../Functions/Permits';
import { AtivosInTypesBreakpoints } from '../../GlobalVars';

const EditFunctions = {
    'AtivosInTypes': EditAtivo,
    'AtivosInLocais': EditAtivo,
    'UsersInTypes': EditUser,
    'UsersInSectores': EditUser,
}
 
const SaveFunctions = {
    'AtivosInTypes': SaveAtivos,
    'AtivosInLocais': SaveAtivos,
    'UsersInTypes': SaveUsers,
    'UsersInSectores': SaveUsers,
}

const ListaDeitensMap = {
    'AtivosInTypes': 'Ativos',
    'AtivosInLocais': 'Ativos',
    'UsersInTypes': 'Usuarios',
    'UsersInSectores': 'Usuarios',
}

const ListMap = {
    'AtivosInTypes': 'TiposAtivos',
    'AtivosInLocais': 'LocaisArmazenamento',
    'UsersInTypes': 'TiposUsuarios',
    'UsersInSectores': 'Setores',
}

const KeyMap = {
    'AtivosInTypes': 'Type',
    'AtivosInLocais': 'StorageLocation',
    'UsersInTypes': 'Type',
    'UsersInSectores': 'Sector',
}

const PermitsMap = {
    'AtivosInTypes': EDITAR_ATIVOS,
    'AtivosInLocais': EDITAR_ATIVOS,
    'UsersInTypes': EDITAR_USUARIOS,
    'UsersInSectores': EDITAR_USUARIOS,
}

const DraggableLists = (props) => {

    const Key = KeyMap[props.Module]
    const List = ListMap[props.Module]

    //PERMIT
    const PermitFunction = PermitsMap[props.Module]
    const EditPermit = (PermitFunction())
 
    //STATE
    const [ListaDeItens, setListaDeItens] = useState([])

    //SET STATE WHEN ITENS CHANGE
    useEffect(() => {
        setListaDeItens([
            ...props[List].map(element => {
                var ItensQtd = props[ListaDeitensMap[props.Module]].filter(el => el[Key].id === element.id).length
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

        const EditFunction = EditFunctions[props.Module]
        const SaveFunction = SaveFunctions[props.Module]

        EditFunction(Item).then(() => {
            const copiedItems = [...props[ListaDeitensMap[props.Module]]];
            copiedItems[IndexOfItem] = { ...Item }
            SaveFunction(copiedItems)
            NotificationSucesso("Edição", "Alteração salva com sucesso!")
        })

    }

    return (
        <DragDropContext onDragEnd={(result) => { HandleDrag(result) }}>
            <div className='AtivosInTypesContainer'>

                <NumbersOfList Values={ListaDeItens} />

                <Masonry breakpointCols={AtivosInTypesBreakpoints} className="my-masonry-grid" columnClassName="my-masonry-grid_column"   >

                    {props[List].map(Item => <Lists key={v4()} Item={Item} Ativos={props[ListaDeitensMap[props.Module]]} Key={Key} Module={props.Module} />)}

                </Masonry>
            </div > 
        </DragDropContext>
    )  
}


const ConnectedDraggableLists = connect((state) => {
    return {
        Ativos: state.Ativos,
        Usuarios: state.Usuarios,
        TiposUsuarios: state.TiposUsuarios,
        TiposAtivos: state.TiposAtivos,
        LocaisArmazenamento: state.LocaisArmazenamento,
        Setores: state.Setores,
        Tema: state.Tema
    }
})(DraggableLists)

export default ConnectedDraggableLists