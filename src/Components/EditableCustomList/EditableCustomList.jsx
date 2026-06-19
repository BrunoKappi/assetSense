import React, { useState } from 'react'
import { connect } from 'react-redux'
import './EditableCustomList.css'
//ICONES
import { UilLabel, UilPuzzlePiece, UilBox, UilPlay, UilPlus, UilTrashAlt, UilBackspace, UilPen } from '@iconscout/react-unicons'
import ListGroup from 'react-bootstrap/ListGroup';
import { v4 } from 'uuid';
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { DefaultAssetStatus, DefaultAssetsType, DefaultItemType, DefaultRequestStatus, DefaultRequestType } from '../../Data/Items';
import { NotificationErro, NotificationSucesso } from '../../NotificationUtils';
import { Tooltip } from 'react-tippy';
import { GetNotificationErrorMessageDelete, GetNotificationSuccessMessageAdd, GetNotificationExistsMessageAdd, GetNotificationSuccessMessageDelete, GetNotificationSuccessMessageChangeName } from './EditableCustomListUtils';
import Loading from '../LoadingForTabs/Loading'
import { CheckIfAnyAssetOfStatusTaken2, GetFromStoreFunctions, SetInStoreFunctions, SetAssetStatusOnStore, SetRequestsStatusOnStore } from '../../Functions/StoreMiddleware';
import { DefaultUserRole } from '../../Data/Items';
import { EDIT_STORAGELOCATIONS, EDIT_SECTORS, EDIT_STATUS_ASSETS, EDIT_TYPES_ASSETS, EDIT_TYPES_DE_USO, EDIT_TYPES_DE_USER, EDIT_REQUESTS_STATUS, EDIT_REQUESTS_TYPES } from '../../Functions/PermitsMiddleware';
import Show from '../LayoutComponents/Show/Show'
import { AddToFirebaseFunctions, DeleteFromFirebaseFunctions, UpdateInFirebaseFunctions } from '../../Functions/DatabaseMiddleware';
import { CirclePicker } from "react-color";
import Dropdown from 'react-bootstrap/Dropdown';

import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'

const ColorOptions = [
  '#0275d8',
  '#5cb85c',
  '#5bc0de',
  '#f0ad4e',
  '#d9534f',
  '#292b2c',

  '#2b5aa6',
  '#0085C7',
  '#FE9200',
  '#FCDC00',
  '#DBDF00',
  '#A4DD00',


  '#73D8FF',
  '#AEA1FF',
  '#FDA1FF',
  '#333333',
  '#808080',
  '#cccccc',
  '#D33115',
  '#E27300',
  '#FCC400',
  '#B0BC00',
  '#68BC00',
  '#16A5A5',
  '#009CE0',
  '#7B64FF',
  '#FA28FF',
  '#666666',
  '#B3B3B3',
  '#C45100',
]


const EditableCustomList = (props) => {

  //LISTS OF ITENS RELATED WITH EACH MODULE
  const Lists = {
    AssetTypes: props.Assets,
    Sectors: props.Users,
    UserTypes: props.Users,
    StorageLocations: props.Assets,
    AssetsStatus: props.Assets,
    UsageTypes: props.Assets,
    RequestsStatus: props.Requests,
    RequestsTypes: props.Requests,
  }

  //ICONS FOR EACH MODULE
  const CustomListIcon = {
    AssetTypes: <UilLabel />,
    Sectors: <UilPuzzlePiece />,
    UserTypes: <UilLabel />,
    StorageLocations: <UilBox />,
    AssetsStatus: <UilLabel />,
    UsageTypes: <UilPlay />,
    RequestsStatus: <UilLabel />,
    RequestsTypes: <UilLabel />,
  };

  //DEFAULT ITEM OBJECTS FOR EACH MODULE
  const DefaultObjets = {
    AssetTypes: DefaultAssetsType,
    Sectors: DefaultItemType,
    UserTypes: DefaultUserRole,
    StorageLocations: DefaultItemType,
    AssetsStatus: DefaultAssetStatus,
    UsageTypes: DefaultItemType,
    RequestsStatus: DefaultRequestStatus,
    RequestsTypes: DefaultRequestType,
  }

  //DEFAULT ITENS KEY FOR EACH MODULE
  const ObjectKeys = {
    AssetTypes: 'Type',
    Sectors: 'Sector',
    UserTypes: 'Type',
    StorageLocations: 'StorageLocation',
    AssetsStatus: 'Status',
    UsageTypes: 'Usage',
    RequestsStatus: 'Status',
    RequestsTypes: 'Type',
  }

  //PERMITS
  const TypesAtvisoPermit = EDIT_TYPES_ASSETS()
  const StorageLocationsPermit = EDIT_STORAGELOCATIONS()
  const AssetsStatusPermit = EDIT_STATUS_ASSETS()
  const UsageTypesPermit = EDIT_TYPES_DE_USO()
  const SectorsPermit = EDIT_SECTORS()
  const UserTypesPermit = EDIT_TYPES_DE_USER()
  const RequestsStatusPermit = EDIT_REQUESTS_STATUS()
  const RequestsTypesPermit = EDIT_REQUESTS_TYPES()

  //PERMITS MAP
  const CustomListPermits = {
    AssetTypes: TypesAtvisoPermit,
    Sectors: SectorsPermit,
    UserTypes: UserTypesPermit,
    StorageLocations: StorageLocationsPermit,
    AssetsStatus: AssetsStatusPermit,
    UsageTypes: UsageTypesPermit,
    RequestsStatus: RequestsStatusPermit,
    RequestsTypes: RequestsTypesPermit,
  };

  const fetchFunction = GetFromStoreFunctions[props.Module] || [];

  //STATES
  const [ItemListSelected, setItemListSelected] = useState('')
  const [NewItemList, setNewItemList] = useState('')
  const [Loaded, setLoaded] = useState(false)
  const [EditingItem, setEditingItem] = useState(false)
  const [ListaDeItens, setListaDeItens] = useState(fetchFunction())

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
    setItemListSelected('')
  }

  //CHANGE ITEM NAME
  const HandleSubmiChangeItemName = (e, index, ID) => {
    e.preventDefault();

    const EditFunction = UpdateInFirebaseFunctions[props.Module]
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
    //console.log(Erro)
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
        const addFunction = AddToFirebaseFunctions[props.Module]
        const saveFunction = SetInStoreFunctions[props.Module]

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

      if (props.Module === "RequestsStatus") {
        if (ItemToDelete?.DefaultStatus === true) {
          NotificationErro("Ação não permitida", "Não é possível deletar esse item pois ele é o Status padrão de Solicitações futuras")
          return
        }
      }


      ItensCopy.splice(Index, 1)

      const Associated = Lists[props.Module].find(Asset => Asset[ObjectKeys[props.Module]].id === Id)

      const saveFunction = SetInStoreFunctions[props.Module]

      if (Associated) {
        GetNotificationErrorMessageDelete(props.Module)
      } else {

        const deleteFunction = DeleteFromFirebaseFunctions[props.Module]

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
      const saveFunction = SetInStoreFunctions[props.Module]
      saveFunction(copiedItems)
      setListaDeItens([...copiedItems])
    } else {
      NotificationErro("Não Autorizado", "Você não possui permissão para fazer essa alteração, solicite autorização para seu Administrador")
    }
  }

  //CHANGE CAN TAKE OF STATUS
  const HandleSubmiChangeCanTake = (index) => {
    var ItensCopy = [...ListaDeItens]

    const IsThereTakes = CheckIfAnyAssetOfStatusTaken2(ItensCopy[index].id)

    if (IsThereTakes && (ItensCopy[index].CanTake === true)) {
      NotificationErro("Ação não permitida", "Você não pode mudar este Status no momento, pois já existem assets com este status em utilização")
    } else {
      ItensCopy[index].CanTake = !ItensCopy[index].CanTake

      UpdateInFirebaseFunctions["AssetsStatus"](ItensCopy[index]).then(() => {
        SetAssetStatusOnStore(ItensCopy)
        setListaDeItens([...ItensCopy])
        EndEditing()
        NotificationSucesso('Alteração', 'Status alterado com sucesso!')
      }).catch(HandleError)
    }
  }



  //CHANGE CAN TAKE OF STATUS
  const HandleSubmiChangeDefaultStauts = (index) => {
    var ItensCopy = [...ListaDeItens]

    ItensCopy.forEach((Status, In) => {
      if (In === index)
        Status.DefaultStatus = true
      else
        Status.DefaultStatus = false
    })

    Promise.all(
      ItensCopy.map(Status =>
        UpdateInFirebaseFunctions["RequestsStatus"](Status))
    ).then(() => {
      NotificationSucesso('Alteração', 'Status alterado com sucesso!')
      EndEditing()
      SetRequestsStatusOnStore(ItensCopy)
      setListaDeItens([...ItensCopy])
    }).catch(HandleError)



  }




  //CHANGE COLOR OF GRAPHS
  const handleChangeColor = (color, index) => {

    var ItensCopy = [...ListaDeItens]

    ItensCopy[index].Color = color.hex


    UpdateInFirebaseFunctions["RequestsStatus"](ItensCopy[index]).then(() => {
      NotificationSucesso('Alteração', 'Cor do Status alterada com sucesso!')
      EndEditing()
      SetRequestsStatusOnStore(ItensCopy)
      setListaDeItens([...ItensCopy])
    }).catch(HandleError)


  }

  return (
    <div className={props.Tema === 'Dark' ? 'CustomGroupListDark CustomGroupList' : 'CustomGroupListLightTheme CustomGroupList'}>

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
                      return <Draggable key={v4()} draggableId={Item.id} index={index} isDragDisabled>
                        {(DragProvided, Drag) => {
                          return (
                            <div className={Drag.isDragging ? ' CustomGroupListItemDragging' : ''} ref={DragProvided.innerRef} {...DragProvided.draggableProps} {...DragProvided.dragHandleProps}>
                              <ListGroup.Item className='CustomGroupListItem' key={Item.Value + v4()} action as="li">
                                <div className='CustomGroupListTitleRow'  >



                                  <Show Show={props.Module === "AssetsStatus" && false}>
                                    <Tooltip title="Pode ser Utilizado/Retirado" position="bottom" >
                                      <label class="containerCheck">
                                        <input checked={Item.CanTake} type="checkbox" onChange={e => HandleSubmiChangeCanTake(index)} ></input>
                                        <div class="checkmark"></div>
                                      </label>
                                    </Tooltip>
                                  </Show>

                                  <Show Show={props.Module === "AssetsStatus"}>
                                    <Tooltip title="Pode ser Utilizado/Retirado" position="bottom" >
                                      <div className='ContainerListCheckbox'>
                                        {Item.CanTake ? <ImCheckboxChecked onClick={e => HandleSubmiChangeCanTake(index)} /> : <ImCheckboxUnchecked onClick={e => HandleSubmiChangeCanTake(index)} />}
                                      </div>
                                    </Tooltip>
                                  </Show>




                                  <Show Show={props.Module === "RequestsStatus"}>
                                    <Tooltip title="Status Padrão ao abrir uma solicitação" position="bottom" >
                                      <div className='ContainerListCheckbox'>
                                        {Item.DefaultStatus ? <ImCheckboxChecked onClick={e => HandleSubmiChangeDefaultStauts(index)} /> : <ImCheckboxUnchecked onClick={e => HandleSubmiChangeDefaultStauts(index)} />}
                                      </div>
                                    </Tooltip>
                                  </Show>


                                  <Show Show={props.Module === "RequestsStatus"}>
                                    <Tooltip title="Cor do Status" position="bottom" >
                                      <div className='StatusColorPickerButton'>
                                        <Dropdown >
                                          <Dropdown.Toggle variant="success" id="StatusColorPickerMenuToggle" style={{ backgroundColor: Item.Color }} >

                                          </Dropdown.Toggle>
                                          <Dropdown.Menu id='StatusColorPickerMenu'>
                                            <Dropdown.Item id='StatusColorPickerItem'>
                                              <CirclePicker colors={ColorOptions} onChange={(Color) => { handleChangeColor(Color, index) }} />
                                            </Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </div>
                                    </Tooltip>
                                  </Show>

                                  <span className='CustomGroupListItem'


                                    onClick={e => {
                                      if (CustomListPermits[props.Module]) {
                                        setItemListSelected(Item.Value);
                                      }
                                    }}
                                    onDoubleClick={e => {
                                      if (CustomListPermits[props.Module]) {
                                        setItemListSelected(Item.Value);
                                        InitEditing(Item.Value);
                                      }
                                    }}

                                  >



                                    <Show Show={EditingItem && ItemListSelected !== Item.Value}>
                                      <span onClick={e => { setEditingItem(false); }}> {Item.Value}</span>
                                    </Show>

                                    <Show Show={!EditingItem} Width='100%'>
                                      <Tooltip title="Duplo Clique para Editar" position="bottom" >
                                        <span onDoubleClick={e => InitEditing(Item.Value)}> {Item.Value}</span>
                                      </Tooltip>

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
    AssetTypes: state.AssetTypes,
    UserTypes: state.UserTypes,
    Assets: state.Assets,
    Sectors: state.Sectors,
    StorageLocations: state.StorageLocations,
    Users: state.Users,
    AssetsStatus: state.AssetsStatus,
    Tema: state.Tema,
    Requests: state.Requests,
    RequestsStatus: state.RequestsStatus,
    RequestsTypes: state.RequestsTypes
  }
})(EditableCustomList)

export default ConnectedEditableCustomList