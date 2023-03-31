import React, { useState } from 'react'
import './TypesList.css'
//ICONES
import ListGroup from 'react-bootstrap/ListGroup';
import { v4 } from 'uuid';
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Tooltip } from 'react-tippy';
import { UilPuzzlePiece,UilShieldCheck,UilUser   } from '@iconscout/react-unicons'

const TypesList = (props) => {


  const [ListaDeItens,] = useState([...props.Users.filter(User => User.Type.id === props.TipoUsuario.id)]);


  return (
    <div>
      <div className={localStorage.getItem('AssetSenseTema') === 'Escuro' ? 'UserTypesShowOnlyCustomGroupListEscuro UserTypesShowOnlyCustomGroupList' : 'UserTypesShowOnlyCustomGroupListClaro UserTypesShowOnlyCustomGroupList'}>

        <ListGroup as="ul">
          <ListGroup.Item as="li" className='UserTypesShowOnlyCustomGroupListTitle' >
            <Tooltip title="Arraste e solte ítens nesta área" position="bottom" >
              <span className='UserTypesShowOnlyCustomGroupListTitleSpan'> <UilPuzzlePiece/> { props.TipoUsuario.Value }</span>
            </Tooltip>
           
          </ListGroup.Item>

          <Droppable droppableId={props.TipoUsuario.id + '/' +  v4()} key={props.TipoUsuario.id + '/' +  v4()}>
            {(provided, snapshot) => {
              return (
                <div className={snapshot.isDraggingOver ? 'MarginBottom' : ''} {...provided.droppableProps} ref={provided.innerRef}>
                  {ListaDeItens.sort((a, b) => a.Name.localeCompare(b.Name)).map((Item, index) => {
                    const IsAdmin = props.UserTypes.find(UserType => UserType.id === Item.Type.id).IsAdmin                   
                    return <Draggable action as="li" key={Item.id} draggableId={Item.id} index={index} >
                      {(DragProvided) => {
                        return (
                          <div ref={DragProvided.innerRef} {...DragProvided.draggableProps} {...DragProvided.dragHandleProps}>
                            <ListGroup.Item key={Item.Name + v4()} >
                              <span className='UserTypesShowOnlyCustomGroupListItem'>
                                {IsAdmin ?
                                  <Tooltip title="Possui permissões de Administrador" position="bottom" >
                                    <UilShieldCheck className='UserTypesShowOnlyCustomGroupIcon' />
                                  </Tooltip>
                                  :
                                  <Tooltip title="Não possui permissões de Administrador" position="bottom" >
                                    <UilUser className='UserTypesShowOnlyCustomGroupIcon' />
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

            <Droppable droppableId={props.TipoUsuario.id} key={props.TipoUsuario.id}>
              {(provided, snapshot) => {
                return (
                  <div  {...provided.droppableProps} ref={provided.innerRef}>

                    <Tooltip title="Arraste e solte usuários nesta área" position="bottom" >
                      <span className='UserTypesShowOnlyCustomGroupListItem'>
                        <span className='UserTypesShowOnlyCustomGroupListItemSpan'>Nenhum Usuário</span>
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





export default TypesList
