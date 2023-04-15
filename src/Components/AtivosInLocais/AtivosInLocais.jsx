import './AtivosInLocais.css'
import { useState, useEffect } from 'react';
//COMPONENT
import NumbersOfList from '../NumbersOfList/NumbersOfList';
import LocaisList from './LocaisList'
//VARIABLES
import { EDITAR_ATIVOS } from '../../Functions/Permits';
//LIBRARIES
import Masonry from "react-masonry-css";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 } from 'uuid';
import { connect } from 'react-redux'
//FUNCTIONS
import { EditAtivo, SaveAtivos } from '../../Functions/Middleware';
import { NotificationErro, NotificationSucesso } from '../../NotificationUtils';
import { AtivosInLocaisBreakpoints } from '../../GlobalVars';


const AtivosInLocais = (props) => {

    //PERMITS
    const AtivosPermit = (EDITAR_ATIVOS())

    //STATES
    const [LocaisArmazenamento, setLocaisArmazenamento] = useState([])

    //FILL LOCAIS
    useEffect(() => {
        setLocaisArmazenamento([
            ...props.LocaisArmazenamento.map(element => {
                var Qtd = props.Ativos.filter(el => el.StorageLocation.id === element.id).length
                return { id: element.id, Value: element.Value, Qtd: Qtd }
            })])
    }, [props.Ativos, props.LocaisArmazenamento])

    //HANDLE DRAG OF ATIVOS
    const HandleDrag = (Resultado) => {

        //IF NO DESTINATION
        if (!Resultado.destination)
            return

        //PERMIT
        if (!AtivosPermit) {
            NotificationErro("Ação não Autoriazada", 'Você não tem permissão para realizar essa ação, solicite autorização ao seu Administrador')
            return
        }

        const TypeDestinationID = Resultado.destination.droppableId.split("/")[0];
        const ItemId = Resultado.draggableId

        const Ativo = props.Ativos.find(U => U.id === ItemId)
        const IndexOfAtivo = props.Ativos.indexOf(Ativo)
        if (Ativo.StorageLocation.id === TypeDestinationID) return
        Ativo.StorageLocation.id = TypeDestinationID

        EditAtivo(Ativo).then(() => {
            const copiedItems = [...props.Ativos];
            copiedItems[IndexOfAtivo] = { ...Ativo }
            SaveAtivos(copiedItems)
            NotificationSucesso("Edição", "Local do Ativo alterado com Sucesso!")
        })
    }

    return (
        <DragDropContext onDragEnd={(result) => { HandleDrag(result) }}>
            <div className={props.Tema === 'Escuro' ? 'AtivosInLocaisContainerEscuro AtivosInLocaisContainer' : 'AtivosInLocaisContainerClaro AtivosInLocaisContainer'}>

                <NumbersOfList Values={LocaisArmazenamento} />

                <Masonry breakpointCols={AtivosInLocaisBreakpoints} className="my-masonry-grid" columnClassName="my-masonry-grid_column"   >

                    {props.LocaisArmazenamento.map((LocalArmazenamento, Index) => {
                        return <LocaisList key={v4()} LocalArmazenamento={LocalArmazenamento} Ativos={props.Ativos} IndexList={Index} />
                    })}

                </Masonry>
            </div > 
        </DragDropContext>
    )
}





const ConnectedAtivosInLocais = connect((state) => {
    return {
        Ativos: state.Ativos,
        Usuarios: state.Usuarios,
        TiposUsuarios: state.TiposUsuarios,
        TiposAtivos: state.TiposAtivos,
        LocaisArmazenamento: state.LocaisArmazenamento,
        Tema: state.Tema
    }
})(AtivosInLocais)

export default ConnectedAtivosInLocais

