import './AtivosInTypes.css'
import { useState, useEffect } from 'react';
import TypesList from './TypesList'
import Masonry from "react-masonry-css";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 } from 'uuid';
import { connect } from 'react-redux'
import NumbersOfList from '../NumbersOfList/NumbersOfList';
import { EditAtivo, GetCurrentUserTypePermitFromStore, SaveAtivos } from '../../Functions/Middleware';
import { NotificationErro, NotificationSucesso } from '../../NotificationUtils';

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
            var AtivosQtd = props.Ativos.filter(el => el.Type.id === element.id).length
            return { id: element.id, Value: element.Value, Qtd: AtivosQtd }
        })])

    useEffect(() => {
        setTiposAtivos([
            ...props.TiposAtivos.map(element => {
                var AtivosQtd = props.Ativos.filter(el => el.Type.id === element.id).length
                return { id: element.id, Value: element.Value, Qtd: AtivosQtd }
            })])
    }, [props.Ativos, props.TiposAtivos])




    const HandleDrag = (Resultado) => {
        //console.log(Resultado)
        if (!Resultado.destination) return;

        if (AtivosPermit) {
            const TypeDestinationID = Resultado.destination.droppableId.split("/")[0];
            const ItemId = Resultado.draggableId

            const Ativo = props.Ativos.find(U => U.id === ItemId)
            const IndexOfAtivo = props.Ativos.indexOf(Ativo)
            if (Ativo.Type.id === TypeDestinationID) return
            Ativo.Type.id = TypeDestinationID
            EditAtivo(Ativo).then(() => {
                console.log("Movido")
                const copiedItems = [...props.Ativos]; 
                copiedItems[IndexOfAtivo] = { ...Ativo }
                SaveAtivos(copiedItems)
                NotificationSucesso("Edição", "Local do Ativo alterado com Sucesso!")
            })
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