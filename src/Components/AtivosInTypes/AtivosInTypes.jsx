import './AtivosInTypes.css'
import { useState, useEffect } from 'react';
import TypesList from './TypesList'
import Masonry from "react-masonry-css";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 } from 'uuid';
import { connect } from 'react-redux'
import NumbersOfList from '../NumbersOfList/NumbersOfList';
import { EditAtivo, SaveAtivos } from '../../Functions/Middleware';
import { NotificationErro, NotificationSucesso } from '../../NotificationUtils';
import { EDITAR_ATIVOS } from '../../Functions/Permits';
import { AtivosInTypesBreakpoints } from '../../GlobalVars';



const AtivosInTypes = (props) => {

    //PERMIT
    const AtivosPermit = (EDITAR_ATIVOS())

    //STATE
    const [TiposAtivos, setTiposAtivos] = useState([])

    //SET STATE WHEN ATIVOS CHANGE
    useEffect(() => {
        setTiposAtivos([
            ...props.TiposAtivos.map(element => {
                var AtivosQtd = props.Ativos.filter(el => el.Type.id === element.id).length
                return { id: element.id, Value: element.Value, Qtd: AtivosQtd }
            })])
    }, [props.Ativos, props.TiposAtivos])

    //HANDLE DRAG
    const HandleDrag = (Resultado) => {
        if (!Resultado.destination) return

        if (AtivosPermit) {
            NotificationErro("Ação não Autoriazada", 'Você não tem permissão para realizar essa ação, solicite autorização ao seu Administrador')
            return
        }

        const TypeDestinationID = Resultado.destination.droppableId.split("/")[0];
        const ItemId = Resultado.draggableId

        const Ativo = props.Ativos.find(U => U.id === ItemId)
        const IndexOfAtivo = props.Ativos.indexOf(Ativo)
        if (Ativo.Type.id === TypeDestinationID) return
        Ativo.Type.id = TypeDestinationID
        EditAtivo(Ativo).then(() => {
            const copiedItems = [...props.Ativos];
            copiedItems[IndexOfAtivo] = { ...Ativo }
            SaveAtivos(copiedItems)
            NotificationSucesso("Edição", "Tipo do Ativo alterado com Sucesso!")
        })

    }

    return (
        <DragDropContext onDragEnd={(result) => { HandleDrag(result) }}>
            <div className='AtivosInTypesContainer'>

                <NumbersOfList Values={TiposAtivos} />

                <Masonry breakpointCols={AtivosInTypesBreakpoints} className="my-masonry-grid" columnClassName="my-masonry-grid_column"   >

                    {props.TiposAtivos.map(TipoAtivo => <TypesList key={v4()} TipoAtivo={TipoAtivo} Ativos={props.Ativos} />)}

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
        TiposAtivos: state.TiposAtivos,
        Tema: state.Tema
    }
})(AtivosInTypes)

export default ConnectedAtivosInTypes