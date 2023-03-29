import React, { useState } from 'react'
import './SectorList.css'
//ICONES
import ListGroup from 'react-bootstrap/ListGroup';
import { v4 } from 'uuid';
import { Draggable, Droppable } from "react-beautiful-dnd";

import { Tooltip } from 'react-tippy';

import { UilPuzzlePiece, UilShieldCheck, UilUser } from '@iconscout/react-unicons'


const SectorList = (props) => {


  const [ListaDeItens,] = useState([...props.Users.filter(User => User.Sector.Id === props.Setor.Id)]);

  

  return (
    <div>
      <div className={localStorage.getItem('AssetSenseTema') === 'Escuro' ? 'SetoresShowOnlyCustomGroupListEscuro SetoresShowOnlyCustomGroupList' : 'SetoresShowOnlyCustomGroupListClaro SetoresShowOnlyCustomGroupList'}>



        <ListGroup as="ul">
          <ListGroup.Item as="li" className='SetoresShowOnlyCustomGroupListTitle' >
            <Tooltip title="Arraste e solte ítens nesta área" position="bottom" >
              <span className='SetoresShowOnlyCustomGroupListTitleSpan'> <UilPuzzlePiece /> {props.Setor.Value}</span>
            </Tooltip>
          </ListGroup.Item>

          <Droppable droppableId={props.Setor.Id + '/' + v4()} key={props.Setor.Id + '/' + v4()}>
            {(provided, snapshot) => {
              return (
                <div className={snapshot.isDraggingOver ? 'MarginBottom' : ''} {...provided.droppableProps} ref={provided.innerRef}>
                  {ListaDeItens.sort((a, b) => a.Name.localeCompare(b.Name)).map((Item, index) => {
                    const IsAdmin = props.UserTypes.find(UserType => UserType.Id === Item.Type.Id).IsAdmin
                    return <Draggable action as="li" key={Item.Id} draggableId={Item.Id} index={index} >
                      {(DragProvided, DraggableSnapshot) => {
                        return (
                          <div ref={DragProvided.innerRef} {...DragProvided.draggableProps} {...DragProvided.dragHandleProps}>
                            <ListGroup.Item key={Item.Name + v4()} className={DraggableSnapshot.isDraggingOver ? 'Tilt' : ''}>
                              <span className='SetoresShowOnlyCustomGroupListItem'>
                                {IsAdmin ?
                                  <Tooltip title="Possui permissões de Administrador" position="bottom" >
                                    <UilShieldCheck className='SetoresShowOnlyCustomGroupIcon' />
                                  </Tooltip>
                                  :
                                  <Tooltip title="Não possui permissões de Administrador" position="bottom" >
                                    <UilUser className='SetoresShowOnlyCustomGroupIcon' />
                                  </Tooltip>
                                }
                                <span> {Item.Name}</span>
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

            <Droppable droppableId={props.Setor.Id} key={props.Setor.Id}>
              {(provided, snapshot) => {
                return (
                  <div  {...provided.droppableProps} ref={provided.innerRef}>
                    <Tooltip title="Arraste e solte usuários nesta área" position="bottom" >
                      <span className='SetoresShowOnlyCustomGroupListItem'>
                        <span className='SetoresShowOnlyCustomGroupListItemSpan'>Nenhum Usuário</span>
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




export default SectorList
