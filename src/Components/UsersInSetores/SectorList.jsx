import React, { useState } from 'react'
import './SectorList.css'
//ICONES
import ListGroup from 'react-bootstrap/ListGroup';
import { v4 } from 'uuid';
import { Draggable, Droppable } from "react-beautiful-dnd";
import { connect } from 'react-redux'
import { Tooltip } from 'react-tippy';
import { UilPuzzlePiece, UilShieldCheck, UilUser } from '@iconscout/react-unicons'


const SectorList = (props) => {


  const [ListaDeItens,] = useState([...props.Users.filter(User => User.Sector.id === props.Setor.id)]);



  return (
    <div>
      <div className={props.Tema === 'Escuro' ? 'SetoresShowOnlyCustomGroupListEscuro SetoresShowOnlyCustomGroupList' : 'SetoresShowOnlyCustomGroupListClaro SetoresShowOnlyCustomGroupList'}>



        <ListGroup as="ul">
          <ListGroup.Item as="li" className='SetoresShowOnlyCustomGroupListTitle' >
            <Tooltip title="Arraste e solte ítens nesta área" position="bottom" >
              <span className='SetoresShowOnlyCustomGroupListTitleSpan'> <UilPuzzlePiece /> {props.Setor.Value}</span>
            </Tooltip>
          </ListGroup.Item>
 
          <Droppable droppableId={props.Setor.id + '/' + v4()} key={props.Setor.id + '/' + v4()}>
            {(provided, snapshot) => {
              return (
                <div className={snapshot.isDraggingOver ? 'MarginBottom' : ''} {...provided.droppableProps} ref={provided.innerRef}>
                  {ListaDeItens.sort((a, b) => a.Name.localeCompare(b.Name)).map((Item, index) => {
                    const IsAdmin = props.UserTypes.find(UserType => UserType.id === Item.Type.id).IsAdmin
                    return <Draggable action as="li" key={Item.id} draggableId={Item.id} index={index} >
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

            <Droppable droppableId={props.Setor.id} key={props.Setor.id}>
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




const ConnectedSectorList = connect((state) => {
  return {       
      Tema: state.Tema
  }
})(SectorList)

export default ConnectedSectorList  
