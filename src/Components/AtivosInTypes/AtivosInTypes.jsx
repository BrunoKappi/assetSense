import './AtivosInTypes.css'
import { useState, useEffect } from 'react';
import TypesList from './TypesList'
import Masonry from "react-masonry-css";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 } from 'uuid';
import { connect } from 'react-redux'
import NumbersOfList from '../NumbersOfList/NumbersOfList';
import { GetCurrentUserTypePermitFromStore, SaveAtivos } from '../../Functions/Middleware';
import { NotificationErro } from '../../NotificationUtils';

const breakpointColumnsObj = {
    default: 4,
    1250: 3,
    950: 2,
    700: 1
};


const AtivosInTypes = (props) => {

    const AtivosPermit = (GetCurrentUserTypePermitFromStore('EDITAR_ATIVOS'))

    const [TiposAtivos, setTiposAtivos] = useState([
        ...props.TiposAtivos.map(element => {
            var AtivosQtd = props.Ativos.filter(el => el.Type.Id === element.Id).length
            return { Id: element.Id, Value: element.Value, Qtd: AtivosQtd }
        })])

    useEffect(() => {
        setTiposAtivos([
            ...props.TiposAtivos.map(element => {
                var AtivosQtd = props.Ativos.filter(el => el.Type.Id === element.Id).length
                return { Id: element.Id, Value: element.Value, Qtd: AtivosQtd }
            })])
    }, [props.Ativos, props.TiposAtivos])




    const HandleDrag = (Resultado) => {
        //console.log(Resultado)
        if (!Resultado.destination) return;

        if (AtivosPermit) {
            const TypeDestinationID = Resultado.destination.droppableId.split("/")[0];
            const ItemId = Resultado.draggableId

            const Ativo = props.Ativos.find(U => U.Id === ItemId)
            const IndexOfAtivo = props.Ativos.indexOf(Ativo)
            Ativo.Type.Id = TypeDestinationID

            const copiedItems = [...props.Ativos];
            copiedItems[IndexOfAtivo] = { ...Ativo }
            SaveAtivos(copiedItems)
            //SaveUsers(copiedItems)
        } else {
            NotificationErro("Ação não Autoriazada", 'Você não tem permissão para realizar essa ação, solicite autorização ao seu Administrador')
        }


    }

    return (
        <DragDropContext onDragEnd={(result) => { HandleDrag(result) }}>
            <div className='AtivosInTypesContainer'>

                <NumbersOfList Values={TiposAtivos} />

                <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column"   >

                    {props.TiposAtivos.map((TipoAtivo, Index) => {
                        return <TypesList key={v4()} TipoAtivo={TipoAtivo} Ativos={props.Ativos} />
                    })}

                </Masonry>
            </div >
        </DragDropContext>
    )
}





const ConnectedAtivosInTypes = connect((state) => {
    return {
        Ativos: state.Ativos,
        Usuarios: state.Usuarios,
        TiposUsuarios: state.TiposUsuarios,
        TiposAtivos: state.TiposAtivos
    }
})(AtivosInTypes)

export default ConnectedAtivosInTypes