import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './EditableCustomList.css'
//ICONES
import { UilLabel, UilPuzzlePiece, UilBox, UilPlay, UilPlus, UilTrashAlt, UilBackspace, UilPen } from '@iconscout/react-unicons'
import ListGroup from 'react-bootstrap/ListGroup';
import { v4 } from 'uuid';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { DefaultAtivoStatus, DefaultAtivosType, DefaultItemType } from '../../Data/Items';
import { NotificationErro, NotificationSucesso } from '../../NotificationUtils';
import { Tooltip } from 'react-tippy';
import { GetNotificationErrorMessageDelete, GetNotificationSuccessMessageAdd, GetNotificationExistsMessageAdd, GetNotificationSuccessMessageDelete, GetNotificationSuccessMessageChangeName } from './EditableCustomListUtils';
import Loading from '../LoadingForTabs/Loading'
import { AddFunctions, CheckIfAnyAtivoOfStatusTaken2, DeleteFunctions, EditFunctions, fetchFunctions, saveFunctions, SaveStatusAtivos, UpdateInFirebase } from '../../Functions/Middleware';
import { DefaultUserRole } from '../../Data/Items';
import { EDITAR_LOCAIS, EDITAR_SETORES, EDITAR_STATUS_ATIVOS, EDITAR_TIPOS_ATIVOS, EDITAR_TIPOS_DE_USO, EDITAR_TIPOS_DE_USUARIO } from '../../Functions/Permits';
import Show from '../LayoutComponents/Show/Show'
import { AssetStatusCollectionName } from '../../Config/firebase/metodos';









const EditableCustomList = (props) => {

  //LISTS OF ITENS RELATED WITH EACH MODULE
  const Lists = {
    TiposAtivos: props.Ativos,
    Setores: props.Usuarios,
    TiposUsuarios: props.Usuarios,
    Locais: props.Ativos,
    StatusAtivos: props.Ativos,
    TiposUso: props.Ativos
  }

  //ICONS FOR EACH MODULE
  const CustomListIcon = {
    TiposAtivos: <UilLabel />,
    Setores: <UilPuzzlePiece />,
    TiposUsuarios: <UilLabel />,
    Locais: <UilBox />,
    StatusAtivos: <UilLabel />,
    TiposUso: <UilPlay />
  };

  //DEFAULT ITEM OBJECTS FOR EACH MODULE
  const DefaultObjets = {
    TiposAtivos: DefaultAtivosType,
    Setores: DefaultItemType,
    TiposUsuarios: DefaultUserRole,
    Locais: DefaultItemType,
    StatusAtivos: DefaultAtivoStatus,
    TiposUso: DefaultItemType
  }

  //DEFAULT ITENS KEY FOR EACH MODULE
  const ObjectKeys = {
    TiposAtivos: 'Type',
    Setores: 'Sector',
    TiposUsuarios: 'Type',
    Locais: 'StorageLocation',
    StatusAtivos: 'Status',
    TiposUso: 'Usage'
  }

  //PERMITS
  const TiposAtvisoPermit = EDITAR_TIPOS_ATIVOS()
  const LocaisPermit = EDITAR_LOCAIS()
  const StatusAtivosPermit = EDITAR_STATUS_ATIVOS()
  const TiposUsoPermit = EDITAR_TIPOS_DE_USO()
  const SetoresPermit = EDITAR_SETORES()
  const TiposUsuariosPermit = EDITAR_TIPOS_DE_USUARIO()

  //PERMITS MAP
  const CustomListPermits = {
    TiposAtivos: TiposAtvisoPermit,
    Setores: SetoresPermit,
    TiposUsuarios: TiposUsuariosPermit,
    Locais: LocaisPermit,
    StatusAtivos: StatusAtivosPermit,
    TiposUso: TiposUsoPermit
  };

  //STATES
  const [ItemListSelected, setItemListSelected] = useState('')
  const [NewItemList, setNewItemList] = useState('')
  const [Loaded, setLoaded] = useState(false)
  const [EditingItem, setEditingItem] = useState(false)
  const [ListaDeItens, setListaDeItens] = useState([])

  //GET FUNCTION
  useEffect(() => {
    //Procura a função get correspondente com base no nome do módulo/prop
    const fetchFunction = fetchFunctions[props.Module] || [];

    //Executa a função get e atualiza o estado com o resultado 
    setListaDeItens(fetchFunction())
    setLoaded(true)

  }, [props.Module, props.TiposAtivos, props.Setores, props.TiposUsuarios, props.StorageLocations, props.StatusAtivos])

  //INIT EDITING AND CHECK PERMITS
  const InitEditing = () => {
    if (CustomListPermits[props.Module])
      setEditingItem(true)
    else
      NotificationErro("Não Autorizado", "Você não possui permissão para acessar essa aba, solicite acesso ao seu Administrador")
  }

  //END EDITING
  const EndEditing = () => {
    setEditingItem(false)
  }

  //CHANGE ITEM NAME
  const HandleSubmiChangeItemName = (e, index, ID) => {
    e.preventDefault();

    const EditFunction = EditFunctions[props.Module]
    var ListaDeItensCopy = [...ListaDeItens]
    if (!document.getElementById(ID).value) return
    ListaDeItensCopy[index].Value = document.getElementById(ID).value
    var ItemToEdit = { ...ListaDeItensCopy[index] }

    EditFunction(ItemToEdit).then(() => {
      setItemListSelected('')
      setListaDeItens([...ListaDeItensCopy]);
      EndEditing();
      GetNotificationSuccessMessageChangeName(props.Module);
    }).catch(HandleError)


  };

  // HANDLE ERROR
  const HandleError = (Erro) => {
    console.log(Erro)
    NotificationErro("Erro", "Ocorreu um problema, tente novamente")
    setLoaded(true)
  }

  //ADD ITEM
  const HandleSubmiAddItem = (e) => {
    e.preventDefault()

    if (CustomListPermits[props.Module]) {
      const Find = ListaDeItens.find(Item => Item.Value.toLocaleLowerCase() === NewItemList.toLocaleLowerCase())

      if (!Find && NewItemList) {
        var ItensCopy = [...ListaDeItens]
        const DefaultObject = DefaultObjets[props.Module]
        const NewItem = { ...DefaultObject, id: v4(), Value: NewItemList }
        const addFunction = AddFunctions[props.Module]
        const saveFunction = saveFunctions[props.Module]

        addFunction(NewItem).then((AddedItemFirebase) => {
          NewItem.docID = AddedItemFirebase?.id
          ItensCopy.push(NewItem)
          if (saveFunction) {
            saveFunction(ItensCopy)
            setListaDeItens([...ItensCopy])
            GetNotificationSuccessMessageAdd(props.Module)
            setNewItemList('')
          }
        }).catch(HandleError)


      } else {
        GetNotificationExistsMessageAdd(props.Module)
      }
      setNewItemList('')
    } else {
      NotificationErro("Não Autorizado", "Você não possui permissão para fazer essa alteração, solicite autorização para seu Administrador")
    }


  }

  //DELETE ITEM 
  const HandleDeleteItem = (Index, Id) => {

    if (CustomListPermits[props.Module]) {
      var ItensCopy = [...ListaDeItens]
      const ItemToDelete = ItensCopy[Index]

      ItensCopy.splice(Index, 1)

      const Associated = Lists[props.Module].find(Ativo => Ativo[ObjectKeys[props.Module]].id === Id)

      const saveFunction = saveFunctions[props.Module]

      if (Associated) {
        GetNotificationErrorMessageDelete(props.Module)
      } else {

        const deleteFunction = DeleteFunctions[props.Module]

        deleteFunction(ItemToDelete).then(() => {
          saveFunction(ItensCopy)
          setListaDeItens([...ItensCopy])
          GetNotificationSuccessMessageDelete(props.Module)
        }).catch(HandleError)

      }
    } else {
      NotificationErro("Não Autorizado", "Você não possui permissão para fazer essa alteração, solicite autorização para seu Administrador")
    }

  }

  //HANDLE DRAG ITEM
  const HandleDrag = (Resultado) => {
    if (!Resultado.destination) return

    if (CustomListPermits[props.Module]) {
      const IndexSource = Resultado.source.index;
      const IndexDestination = Resultado.destination.index;
      const copiedItems = [...ListaDeItens];
      const [removed] = copiedItems.splice(IndexSource, 1)
      copiedItems.splice(IndexDestination, 0, removed);
      const saveFunction = saveFunctions[props.Module]
      saveFunction(copiedItems)
      setListaDeItens([...copiedItems])
    } else {
      NotificationErro("Não Autorizado", "Você não possui permissão para fazer essa alteração, solicite autorização para seu Administrador")
    }
  }

  //CHANGE CAN TAKE OF STATUS
  const HandleSubmiChangeCanTake = (index) => {
    var ItensCopy = [...ListaDeItens]

    const IsThereTakes = CheckIfAnyAtivoOfStatusTaken2(ItensCopy[index].id)

    if (IsThereTakes && (ItensCopy[index].CanTake === true)) {
      NotificationErro("Ação não permitida", "Você não pode mudar este Status no momento, pois já existem ativos com este status em utilização")
    } else {
      ItensCopy[index].CanTake = !ItensCopy[index].CanTake

      UpdateInFirebase(AssetStatusCollectionName, ItensCopy[index]).then(() => {
        SaveStatusAtivos(ItensCopy)
        setListaDeItens([...ItensCopy])
        EndEditing()
        NotificationSucesso('Alteração', 'Status alterado com sucesso!')
      }).catch(HandleError)
    }
  }


  return (
    <div className={props.Tema === 'Escuro' ? 'CustomGroupListEscuro CustomGroupList' : 'CustomGroupListClaro CustomGroupList'}>

      {ListaDeItens.length === 0 && !Loaded && <Loading />}


      {(ListaDeItens.length !== 0 || Loaded) &&

        <ListGroup as="ul">
          <ListGroup.Item Id="CustomGroupListTitle" as="li" className='CustomGroupListTitle' >
            <span className='CustomGroupListTitleIcon'> {CustomListIcon[props.Module]} {props.Title} </span>
          </ListGroup.Item>
          <DragDropContext onDragEnd={(result) => { HandleDrag(result) }}>
            <Droppable droppableId={props.Module} key={props.Module}>
              {(provided) => {
                return (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {ListaDeItens.map((Item, index) => {
                      return <Draggable key={v4()} draggableId={Item.id} index={index} >
                        {(DragProvided, Drag) => {
                          return (
                            <div className={Drag.isDragging ? ' CustomGroupListItemDragging' : ''} ref={DragProvided.innerRef} {...DragProvided.draggableProps} {...DragProvided.dragHandleProps}>
                              <ListGroup.Item className='CustomGroupListItem' key={Item.Value + v4()} action as="li">
                                <div className='CustomGroupListTitleRow'  >



                                  <Show Show={props.Module === "StatusAtivos"}>
                                    <Tooltip title="Pode ser Utilizado/Retirado" position="bottom" >
                                      <label class="containerCheck">
                                        <input checked={Item.CanTake} type="checkbox" onChange={e => HandleSubmiChangeCanTake(index)} ></input>
                                        <div class="checkmark"></div>
                                      </label>
                                    </Tooltip>
                                  </Show>

                                  <span className='CustomGroupListItem' onClick={e => { if (CustomListPermits[props.Module]) { setItemListSelected(Item.Value); } }}>



                                    <Show Show={EditingItem && ItemListSelected !== Item.Value}>
                                      <span onClick={e => { setEditingItem(false); }}> {Item.Value}</span>
                                    </Show>

                                    <Show Show={!EditingItem} Width='100%'>
                                      <span onDoubleClick={e => InitEditing(Item.Value)}> {Item.Value}</span>
                                    </Show>

                                    <Show Show={ItemListSelected === Item.Value && EditingItem} Width='100%'>
                                      <form onSubmit={e => HandleSubmiChangeItemName(e, index, Item.Value)}>
                                        <input maxLength={50} className='CustomGroupListInput' defaultValue={Item.Value} id={Item.Value} type="text" />
                                      </form>
                                    </Show>

                                    <Show Show={ItemListSelected === Item.Value && !EditingItem} >
                                      <Tooltip title="Editar Item" position="bottom" >
                                        <button onClick={e => InitEditing(Item.Value)}>
                                          <UilPen className='EditableCustomListIcon' />
                                        </button>
                                      </Tooltip>
                                    </Show>

                                    <Show Show={ItemListSelected === Item.Value && EditingItem} >
                                      <Tooltip title="Cancelar" position="bottom" >
                                        <button onClick={e => EndEditing()}>
                                          <UilBackspace className='EditableCustomListIcon' />
                                        </button>
                                      </Tooltip>
                                    </Show>

                                    <Show Show={ItemListSelected === Item.Value} >
                                      <Tooltip title="Excluir Item" position="bottom" >
                                        <button onClick={e => HandleDeleteItem(index, Item.id)}>
                                          <UilTrashAlt lete className='EditableCustomListIcon' />
                                        </button>
                                      </Tooltip>
                                    </Show>


                                  </span>
                                </div>
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
          </DragDropContext>




          <ListGroup.Item action as="li">
            <span className='CustomGroupListItem' >
              <form onSubmit={HandleSubmiAddItem} className='CustomGroupListItem'>
                <input maxLength={50} type="text" disabled={!CustomListPermits[props.Module]} placeholder='Novo Item' value={NewItemList} onChange={e => setNewItemList(e.target.value)} />

                <Tooltip title="Adicionar Item" position="bottom" >
                  <button className='EditableCustomListAddButton'>
                    <UilPlus className='EditableCustomListIcon' />
                  </button>
                </Tooltip>

              </form>
            </span>
          </ListGroup.Item>
        </ListGroup>

      }



    </div >
  )
}



const ConnectedEditableCustomList = connect((state) => {
  return {
    TiposAtivos: state.TiposAtivos,
    TiposUsuarios: state.TiposUsuarios,
    Ativos: state.Ativos,
    Setores: state.Setores,
    StorageLocations: state.StorageLocations,
    Usuarios: state.Usuarios,
    StatusAtivos: state.StatusAtivos,
    Tema: state.Tema
  }
})(EditableCustomList)

export default ConnectedEditableCustomList