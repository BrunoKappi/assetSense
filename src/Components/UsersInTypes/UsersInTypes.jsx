import './UsersInTypes.css'
import { useEffect, useState } from 'react';
import TypesList from './TypesList'
import Masonry from "react-masonry-css";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 } from 'uuid';
import { connect } from 'react-redux'
import NumbersOfList from '../NumbersOfList/NumbersOfList';
import { EditUser, GetUserTypesFromStore, SaveUsers } from '../../Functions/Middleware';
import { NotificationErro, NotificationSucesso } from '../../NotificationUtils';
import { EDITAR_USUARIOS } from '../../Functions/Permits';
import { UsersInTypesBreakpoints } from '../../GlobalVars';



const UsersInTypes = (props) => {

    //PERMITS
    const TiposPermit = (EDITAR_USUARIOS())

    //STATES   
    const Tipos = GetUserTypesFromStore()
    const [TiposUsuarios, setTiposUsuarios] = useState([])

    //FILL
    useEffect(() => {      
        setTiposUsuarios([
            ...Tipos.map(element => {
                var Users = props.Usuarios.filter(el => el.Type.id === element.id).length
                return { Id: element.id, Value: element.Value, Qtd: Users }
            })])
    }, [props.Usuarios])

    //HANDLE DRAG USER TO TYPE
    const HandleDrag = (Resultado) => {
        if (!Resultado.destination) return;

        if (TiposPermit) {
            const TypeDestinationID = Resultado.destination.droppableId.split("/")[0];
            const UserId = Resultado.draggableId
            const User = props.Usuarios.find(U => U.id === UserId)
            const IndexOfUser = props.Usuarios.indexOf(User)
            if (User.Type.id === TypeDestinationID) return
            User.Type.id = TypeDestinationID

            EditUser(User).then(() => {
                const copiedItems = [...props.Usuarios];
                copiedItems[IndexOfUser] = { ...User }
                SaveUsers(copiedItems)
                NotificationSucesso("Edição", "Tipo do Usuário alterado com Sucesso!")
            })
        } else {
            NotificationErro("Ação não Autoriazada", 'Você não tem permissão para realizar essa ação, solicite autorização ao seu Administrador')
        }

    }

    return (
        <DragDropContext onDragEnd={(result) => { HandleDrag(result) }}>
            <div className='UsersInSetoresContainers'>
                <NumbersOfList Values={TiposUsuarios} />
                <Masonry breakpointCols={UsersInTypesBreakpoints} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
                    {Tipos.map(TipoUsuario =>
                        <TypesList
                            key={v4()}
                            TipoUsuario={TipoUsuario}
                            Users={props.Usuarios}
                            UserTypes={Tipos}
                        />
                    )}
                </Masonry>
            </div >
        </DragDropContext>
    )
}


const ConnectedUsersInTypes = connect((state) => {
    return {
        Usuarios: state.Usuarios,
        TiposUsuarios: state.TiposUsuarios
    }
})(UsersInTypes)

export default ConnectedUsersInTypes  