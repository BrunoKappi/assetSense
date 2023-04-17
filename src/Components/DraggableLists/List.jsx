import React from 'react'
//ICONES
import { UilLabel, UilBox, UilPuzzlePiece } from '@iconscout/react-unicons'
//LIBRARIES
import ListGroup from 'react-bootstrap/ListGroup';
import { v4 } from 'uuid';
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Tooltip } from 'react-tippy';
import { connect } from 'react-redux'
//COMPONENTS 
import './List.css'
//LAYOUT COMPONENTS
import Show from '../LayoutComponents/Show/Show'


const ListaDeitensMap = { 
  'AtivosInTypes': 'Ativos',
  'AtivosInLocais': 'Ativos',
  'UsersInTypes': 'Usuarios',
  'UsersInSectores': 'Usuarios',
}


const NameKey = {
  'AtivosInTypes': 'Item',
  'AtivosInLocais': 'Item',
  'UsersInTypes': 'Name',
  'UsersInSectores': 'Name',
}


const IconMap = {
  'AtivosInTypes': <UilLabel />,
  'AtivosInLocais': <UilBox />,
  'UsersInTypes': <UilLabel />,
  'UsersInSectores': <UilPuzzlePiece />,
}




const List = (props) => {

  const ListaDeItens = [...props[ListaDeitensMap[props.Module]].filter(Ativo => Ativo[props.Key].id === props.Item.id)]

  return (
    <div className={localStorage.getItem('AssetSenseTema') === 'Escuro' ? 'AtivosTypesShowOnlyCustomGroupListEscuro AtivosTypesShowOnlyCustomGroupList' : 'AtivosTypesShowOnlyCustomGroupListClaro AtivosTypesShowOnlyCustomGroupList'}>
      <ListGroup as="ul">
        <ListGroup.Item as="li" className='AtivosTypesShowOnlyCustomGroupListTitle' >
          <Tooltip title="Arraste e solte ítens nesta área" position="bottom" >
            <span className='UserTypesShowOnlyCustomGroupListTitleSpan'>
              {IconMap[props.Module]}
              {props.Item.Value}
            </span>
          </Tooltip>
        </ListGroup.Item>

        <Droppable droppableId={props.Item.id + '/' + v4()} key={props.Item.id + '/' + v4()}>
          {(provided, snapshot) => {
            return (
              <div className={snapshot.isDraggingOver ? 'MarginBottom' : ''} {...provided.droppableProps} ref={provided.innerRef}>
                {ListaDeItens.sort((a, b) => a[NameKey[props.Module]].localeCompare(b[NameKey[props.Module]])).map((Item, index) => {
                  return <Draggable action as="li" key={Item.id} draggableId={Item.id} index={index} >
                    {(DragProvided) => {
                      return (
                        <div ref={DragProvided.innerRef} {...DragProvided.draggableProps} {...DragProvided.dragHandleProps}>
                          <ListGroup.Item key={Item[NameKey[props.Module]] + v4()} >
                            <span className='AtivosTypesShowOnlyCustomGroupListItem'>
                              <span>
                                {(props.Module === 'UsersInTypes' || props.Module === 'UsersInSectores') ?
                                  Item[NameKey[props.Module]] + ' ' + Item?.LastName : Item[NameKey[props.Module]]
                                }

                              </span>
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
            <Droppable droppableId={props.Item.id} key={props.Item.id}>
              {(provided, snapshot) => {
                return (
                  <div  {...provided.droppableProps} ref={provided.innerRef}>
                    <Tooltip title="Arraste e solte usuários nesta área" position="bottom" >
                      <span className='AtivosTypesShowOnlyCustomGroupListItem'>
                        <span className='AtivosTypesShowOnlyCustomGroupListItemSpan'>Nenhum Ítem</span>
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
    </div>
  )
}

const ConnectedList = connect((state) => {
  return {
    Ativos: state.Ativos,
    Usuarios: state.Usuarios
  }
})(List)


export default ConnectedList 
