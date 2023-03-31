import './UsersInSetores.css'
import { useState, useEffect } from 'react';
import SectorList from './SectorList'
import Masonry from "react-masonry-css";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 } from 'uuid';
import { connect } from 'react-redux'
import NumbersOfList from '../NumbersOfList/NumbersOfList';
import { EditUser, GetCurrentUserTypePermitFromStore, GetSetoresFromStore, GetUsersFromStore, GetUserTypesFromStore, SaveUsers } from '../../Functions/Middleware';
import { NotificationErro, NotificationSucesso } from '../../NotificationUtils';

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
                var Users = Usuarios.filter(el => el.Sector.id === element.id).length
                return { id: element.id, Value: element.Value, Qtd: Users }
            })])
    }, [props.Usuarios, props.Setores])


    console.log("SETORES")


    const HandleDrag = (Resultado) => {
        if (!Resultado.destination) return;
        if (SetoresPermit) {
            const SectorDestinationID = Resultado.destination.droppableId.split("/")[0];
            const UserId = Resultado.draggableId
            const User = Usuarios.find(U => U.id === UserId)
            const IndexOfUser = Usuarios.indexOf(User)
            if (User.Sector.id === SectorDestinationID) return
            User.Sector.id = SectorDestinationID
            EditUser(User).then(() => {
                console.log("Movido")
                const copiedItems = [...Usuarios];
                copiedItems[IndexOfUser] = { ...User }
                SaveUsers(copiedItems)
                NotificationSucesso("Edição", "Setor do Usuário alterado com Sucesso!")
            })
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
        Usuarios: state.Usuarios,
        Setores: state.Setores
    }
})(UsersInSetores)

export default ConnectedUsersInSetores