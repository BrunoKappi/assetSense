import React, { useState } from 'react'
import { connect } from 'react-redux'
import './LocaisList.css'
//ICONES
import ListGroup from 'react-bootstrap/ListGroup';
import { v4 } from 'uuid';
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Tooltip } from 'react-tippy';


import {UilBox  } from '@iconscout/react-unicons'

const SectorList = (props) => {



  const [ListaDeItens,] = useState([...props.Ativos.filter(Ativo => Ativo.StorageLocation.Id === props.LocalArmazenamento.Id)]);

  //console.log(props.LocalArmazenamento.Value)

  return (
    <div>
      <div className={localStorage.getItem('AssetSenseTema') === 'Escuro' ? 'AtivosLocaisShowOnlyCustomGroupListEscuro AtivosLocaisShowOnlyCustomGroupList' : 'AtivosLocaisShowOnlyCustomGroupListClaro AtivosLocaisShowOnlyCustomGroupList'} >



        <ListGroup as="ul">
          <Tooltip title="Arraste e solte ítens nesta área" position="bottom" >
            <ListGroup.Item as="li" className='AtivosLocaisShowOnlyCustomGroupListTitle' >
              <span className='UserTypesShowOnlyCustomGroupListTitleSpan'>
                <UilBox />
                <p className='NoBreak'> {props.LocalArmazenamento.Value}</p>
              </span>

            </ListGroup.Item>
          </Tooltip>

          <Droppable droppableId={props.LocalArmazenamento.Id} key={props.LocalArmazenamento.Id}>
            {(DropProvidedArmazenamento, snapshotArmazenamento) => {
              return (
                <div className={snapshotArmazenamento.isDraggingOver ? 'MarginBottom' : ''} {...DropProvidedArmazenamento.droppableProps} ref={DropProvidedArmazenamento.innerRef}>
                  {ListaDeItens.sort((a, b) => a.Item.localeCompare(b.Item)).map((Item, index) => {
                    return <Draggable isDragDisabled={!props.LocalArmazenamento.Id} action as="li" key={Item.Id} draggableId={Item.Id} index={index} >
                      {(DragProvided) => {
                        return (
                          <div ref={DragProvided.innerRef} {...DragProvided.draggableProps} {...DragProvided.dragHandleProps}>
                            <ListGroup.Item key={Item.Item + v4()} >
                              <span className='AtivosLocaisShowOnlyCustomGroupListItem'>
                                <span> {Item.Item}</span>
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

          {ListaDeItens.length === 0 && <ListGroup.Item key={v4()} >

            <Droppable droppableId={props.LocalArmazenamento.Id} key={props.LocalArmazenamento.Id}>
              {(DropProvidedArmazenamento2) => {
                return (
                  <div  {...DropProvidedArmazenamento2.droppableProps} ref={DropProvidedArmazenamento2.innerRef}>
                    <Tooltip title="Arraste e solte usuários nesta área" position="bottom" >
                      <span className='AtivosLocaisShowOnlyCustomGroupListItem'>
                        <span className='AtivosLocaisShowOnlyCustomGroupListItemSpan'>Nenhum Ítem</span>
                      </span>
                    </Tooltip>
                  </div>
                );
              }}
            </Droppable>


          </ListGroup.Item>

          }

          <ListGroup.Item action as="li"></ListGroup.Item>


        </ListGroup>





      </div>

    </div>
  )
}



const ConnectedSectorList = connect((state) => {
  return {
    Setores: state.Setores
  }
})(SectorList)


export default ConnectedSectorList
