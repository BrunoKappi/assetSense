import React from 'react'
import './LocaisList.css'
//LIBRARIES
import { connect } from 'react-redux'
import { v4 } from 'uuid';
import { Draggable, Droppable } from "react-beautiful-dnd";
import ListGroup from 'react-bootstrap/ListGroup';
import { Tooltip } from 'react-tippy';
//ICONS
import { UilBox } from '@iconscout/react-unicons'
//LAYOUT COMPONENT
import Show from '../LayoutComponents/Show/Show';

const AtivosInLocais = (props) => {

  //STATE
  const ListaDeItens = [...props.Ativos.filter(Ativo => Ativo.StorageLocation.id === props.LocalArmazenamento.id)]

  return (
    <div className={props.Tema === 'Escuro' ? 'AtivosLocaisShowOnlyCustomGroupListEscuro AtivosLocaisShowOnlyCustomGroupList' : 'AtivosLocaisShowOnlyCustomGroupListClaro AtivosLocaisShowOnlyCustomGroupList'}>
      <ListGroup as="ul">
        <Tooltip title="Arraste e solte ítens nesta área" position="bottom" >
          <ListGroup.Item as="li" className='AtivosLocaisShowOnlyCustomGroupListTitle' >
            <span className='UserTypesShowOnlyCustomGroupListTitleSpan'>
              <UilBox />
              <p className='NoBreak'> {props.LocalArmazenamento.Value}</p>
            </span>
          </ListGroup.Item>
        </Tooltip>

        <Droppable droppableId={props.LocalArmazenamento.id} key={props.LocalArmazenamento.id}>
          {(DropProvidedArmazenamento, snapshotArmazenamento) => {
            return (
              <div className={snapshotArmazenamento.isDraggingOver ? 'MarginBottom' : ''} {...DropProvidedArmazenamento.droppableProps} ref={DropProvidedArmazenamento.innerRef}>
                {ListaDeItens.sort((a, b) => a.Item.localeCompare(b.Item)).map((Item, index) => {
                  return <Draggable isDragDisabled={!props.LocalArmazenamento.id} action as="li" key={v4()} draggableId={Item.id} index={index} >
                    {(DragProvided) => {
                      return (
                        <div ref={DragProvided.innerRef} {...DragProvided.draggableProps} {...DragProvided.dragHandleProps}>
                          <ListGroup.Item key={Item.Item + v4()} >
                            <span className='AtivosLocaisShowOnlyCustomGroupListItem'>
                              <span>{Item.Item}</span>
                            </span>
                          </ListGroup.Item>
                        </div>
                      )
                    }}
                  </Draggable>
                })}
              </div>
            );
          }}
        </Droppable>


        <Show Show={ListaDeItens.length === 0}>
          <ListGroup.Item key={v4()} >
            <Droppable droppableId={props.LocalArmazenamento.id} key={props.LocalArmazenamento.id}>
              {(DropProvidedArmazenamento2) => {
                return (
                  <div  {...DropProvidedArmazenamento2.droppableProps} ref={DropProvidedArmazenamento2.innerRef}>
                    <Tooltip title="Arraste e solte ítens nesta área" position="bottom" >
                      <span className='AtivosLocaisShowOnlyCustomGroupListItem'>
                        <span className='AtivosLocaisShowOnlyCustomGroupListItemSpan'>Nenhum Ítem</span>
                      </span>
                    </Tooltip>
                  </div>
                );
              }}
            </Droppable>
          </ListGroup.Item>
        </Show>


        <ListGroup.Item action as="li"></ListGroup.Item>


      </ListGroup>
    </div>)
}

const ConnectedAtivosInLocais = connect((state) => {
  return {
    Ativos: state.Ativos,
    Tema: state.Tema
  }
})(AtivosInLocais)


export default ConnectedAtivosInLocais
