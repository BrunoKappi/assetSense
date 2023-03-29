import './UsersInSetores.css'
import { useState, useEffect } from 'react';
import SectorList from './SectorList'
import Masonry from "react-masonry-css";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 } from 'uuid';
import { connect } from 'react-redux'
import NumbersOfList from '../NumbersOfList/NumbersOfList';
import { GetCurrentUserTypePermitFromStore, GetSetoresFromStore, GetUsersFromStore, GetUserTypesFromStore, SaveUsers } from '../../Functions/Middleware';
import { NotificationErro } from '../../NotificationUtils';

const breakpointColumnsObj = {
    default: 4,
    1250: 3,
    950: 2,
    700: 1
};


const UsersInSetores = (props) => {

    const SetoresPermit = (GetCurrentUserTypePermitFromStore('EDITAR_USUARIOS'))

    const ListaSetores = GetSetoresFromStore()
    const TiposUsuarios = GetUserTypesFromStore()
    const Usuarios = GetUsersFromStore()

    const [Setores, setSetores] = useState([GetSetoresFromStore()])



    useEffect(() => {
        setSetores([
            ...ListaSetores.map(element => {
                var Users = Usuarios.filter(el => el.Sector.Id === element.Id).length
                return { Id: element.Id, Value: element.Value, Qtd: Users }
            })])
    }, [props.Usuarios, ListaSetores, Usuarios])





    const HandleDrag = (Resultado) => {
        if (!Resultado.destination) return;
        if (SetoresPermit) {
            const SectorDestinationID = Resultado.destination.droppableId.split("/")[0];
            const UserId = Resultado.draggableId
            const User = Usuarios.find(U => U.Id === UserId)
            const IndexOfUser = Usuarios.indexOf(User)
            User.Sector.Id = SectorDestinationID
            const copiedItems = [...Usuarios];
            copiedItems[IndexOfUser] = { ...User }          
            SaveUsers(copiedItems)          
        } else {
            NotificationErro("Ação não Autoriazada", 'Você não tem permissão para realizar essa ação, solicite autorização ao seu Administrador')
        }

    }

    return (
        <DragDropContext onDragEnd={(result) => { HandleDrag(result) }}>
            <div className='UsersInSetoresContainers'>


                <NumbersOfList Values={Setores} />

                <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column"   >

                    {ListaSetores.map((Setor, Index) => {
                        return <SectorList key={v4()} Setor={Setor} Users={Usuarios} UserTypes={TiposUsuarios} />
                    })}

                </Masonry>
            </div >
        </DragDropContext>
    )
}





const ConnectedUsersInSetores = connect((state) => {
    return {
        Usuarios: state.Usuarios
    }
})(UsersInSetores)

export default ConnectedUsersInSetores