import React from 'react'
import { useEffect, useState } from 'react';
import './Campos.css'
//LIBRARIES
import { v4 } from 'uuid';
import Masonry from "react-masonry-css";
import { connect } from 'react-redux'
//ICONS
import { UilPlusCircle, UilBackspace, UilTrashAlt, UilLabel } from '@iconscout/react-unicons'
//TOOLTIP 
import { Tooltip } from 'react-tippy';
//COMPONENTS
import Loading from '../LoadingForTabs/Loading'
//LAYOUT COMPONENTS
import Stack from '../LayoutComponents/Stack/Stack'
import Show from '../LayoutComponents/Show/Show'
//FUNCTIONS
import { NotificationErro, NotificationSucesso } from '../../NotificationUtils';
//VARIABLES
import { DefaultCustomField } from '../../Data/Items';
import { CamposMasoryBreakpoints } from '../../GlobalVars';

import { EditAssetTypeInFirebase, EditSectorInFirebase, EditUserTypeInFirebase } from '../../Functions/Middleware';


const UpdateInFirebaseFunctions = {
    TiposAtivos: (Item) => EditAssetTypeInFirebase(Item),
    TiposUsuarios: (Item) => EditUserTypeInFirebase(Item),
    Setores: (Item) => EditSectorInFirebase(Item)
}

const Campos = (props) => {

    //STATES
    const [Items, setItems] = useState([])
    const [IsLoading, setIsLoading] = useState()
    const [IsEditing, setIsEditing] = useState()
    const [SelectedItem, setSelectedItem] = useState()
    const [SelectedListItem, setSelectedListItem] = useState()
    const [SelectedListItemIndex, setSelectedListItemIndex] = useState()
    const [SelectedListItemValue, setSelectedListItemValue] = useState()


    //SET ITENS DEPENDING ON FUNCTION
    useEffect(() => {
        if (props.Function === 'TiposAtivos')
            setItems([...props.TiposAtivos])
        else if (props.Function === 'TiposUsuarios')
            setItems([...props.TiposUsuarios])
        else if (props.Function === 'Setores')
            setItems([...props.Setores])
    }, [props.Items, props.TiposAtivos, props.TiposUsuarios, props.Setores])


    //HANDLE ERROR
    const HandleError = (Erro) => {
        console.log(Erro)
        setIsLoading(false)
        EndEditing()
        NotificationErro("Erro", "Algo deu errado, tente novamete")
    }

    //EDIT FUNCTION 
    const EditFunction = UpdateInFirebaseFunctions[props.Function]

    //CHANGE VALUE
    const ChangeCustomFieldName = (e) => {
        e.preventDefault()

        if (!SelectedListItemValue) return

        const EditedSelectedListItem = { ...SelectedListItem }
        EditedSelectedListItem.Value = SelectedListItemValue
        const SelectedItemCopy = { ...SelectedItem }
        SelectedItemCopy.CustomFields[SelectedListItemIndex] = { ...EditedSelectedListItem }

        setIsLoading(SelectedItemCopy?.id)

        EditFunction(SelectedItemCopy).then(() => {
            setIsLoading(false)
            const ItemsCopy = [...Items]
            ItemsCopy.forEach(item => {
                if (item.id === SelectedItemCopy.id)
                    item = { ...SelectedItemCopy }
            })
            setItems([...ItemsCopy])
            NotificationSucesso("Edição", "Campo Editado com Sucesso!")
            EndEditing()
        }).catch(HandleError)
    }

    //DELETE VALUE
    const DeleteCustomField = () => {

        const SelectedItemCopy = { ...SelectedItem }
        SelectedItemCopy.CustomFields = [...SelectedItemCopy.CustomFields.filter(Custom => Custom.id !== SelectedListItem.id)]

        setIsLoading(SelectedItemCopy?.id)

        EditFunction(SelectedItemCopy).then(() => {
            setIsLoading(false)
            const ItemsCopy = [...Items]
            ItemsCopy.forEach(item => {
                if (item.id === SelectedItemCopy.id)
                    item.CustomFields = [...SelectedItemCopy.CustomFields]
            })
            setItems([...ItemsCopy])
            EndEditing()
            NotificationSucesso("Campo", "Campo  Deletado com sucesso!")

        }).catch(HandleError)
    }

    //ADD CUSTOM FIELD
    const AddCustomField = (e, InputId, ItemType) => {
        e.preventDefault()
        const NewItemValue = document.getElementById(InputId).value

        if (!NewItemValue) return

        const NewCustomField = { ...DefaultCustomField, id: v4(), Value: NewItemValue }
        const ItemTypeCopy = { ...ItemType }

        //CHECK IF EXISTS 
        if (ItemType?.CustomFields.find(I => I.Value === NewItemValue)) {
            document.getElementById(InputId).value = ''
            return
        }

        setIsLoading(ItemType?.id)

        ItemTypeCopy.CustomFields.push(NewCustomField)

        EditFunction(ItemTypeCopy).then(() => {
            setIsLoading(false)
            const ItemsCopy = [...Items]
            ItemsCopy.forEach(Item => {
                if (Item.id === ItemType.id)
                    Item = ItemTypeCopy
            })
            setItems([...ItemsCopy])
            document.getElementById(InputId).value = ''
            NotificationSucesso("Campo", "Campo Personalizado adicionado com sucesso!")
        }).catch(HandleError)

    }

    //INIT EDITING
    const InitEditing = (SelectedCustomField, Index, SelectedItemToSet) => {
        setIsEditing(true)
        setSelectedListItemIndex(Index)
        setSelectedListItem(SelectedCustomField)
        setSelectedListItemValue(SelectedCustomField?.Value)
        setSelectedItem(SelectedItemToSet)
    }

    //END
    const EndEditing = () => {
        setIsEditing(false)
        setSelectedListItem()
    }



    return (
        <div className={props.Tema === 'Escuro' ? 'CamposContainerEscuro CamposContainer' : 'CamposContainerClaro CamposContainer'}>

            <Masonry breakpointCols={CamposMasoryBreakpoints} className="my-masonry-grid" columnClassName="my-masonry-grid_column"   >

                {Items.map(Item => {
                    return <>

                        <Show Show={IsLoading !== Item.id}>
                            <Stack>
                                <div className='CamposTitle'>
                                    <UilLabel />
                                    {Item.Value}
                                </div>

                                <Show Show={Item?.CustomFields?.length === 0} Width='100%' className="CamposItem">
                                    Não há Campos Personalizados
                                </Show>


                                <Show Show={Item?.CustomFields} Width='100%'>
                                    {Item?.CustomFields?.map((CustomField, Index) => {
                                        return <div className='CamposItem' onDoubleClick={e => InitEditing(CustomField, Index, Item)}>
                                            <Tooltip title="Duplo Clique para editar" position="bottom" >
                                                <Show Show={(!IsEditing && SelectedListItem?.id !== CustomField.id) || SelectedListItem?.id !== CustomField.id}>
                                                    <span>{CustomField?.Value}</span>
                                                </Show>
                                            </Tooltip>

                                            <Show Show={IsEditing && SelectedListItem?.id === CustomField.id} >
                                                <form className='CamposEditForm' onSubmit={ChangeCustomFieldName}>
                                                    <input className='CamposEditInput' value={SelectedListItemValue} type="text" placeholder={CustomField.Value} onChange={e => setSelectedListItemValue(e.target.value)} />
                                                    <Tooltip title="Cancelar" position="bottom" >
                                                        <UilBackspace onClick={EndEditing} />
                                                    </Tooltip>
                                                    <Tooltip title="Excluir campo" position="bottom" >
                                                        <UilTrashAlt onClick={DeleteCustomField} />
                                                    </Tooltip>
                                                </form>
                                            </Show>
                                        </div>


                                    })}
                                </Show>


                                <form className='CamposAddForm' onSubmit={e => AddCustomField(e, Item.id, Item)}>
                                    <input className='CamposAddInput' id={Item.id} type="text" placeholder='Adicionar Campo Personalizado' />
                                    <button className='CamposAddButton'>
                                        <Tooltip title="Adicionar novo Campo" position="bottom" >
                                            <UilPlusCircle className='CamposAddIcon' />
                                        </Tooltip>
                                    </button>
                                </form>

                            </Stack>
                        </Show>

                        <Show Show={IsLoading === Item.id} Width='100%'>
                            <Loading />
                        </Show>

                    </>
                })}


            </Masonry>

        </div>
    )
}



const ConnectedCampos = connect((state) => {
    return {
        Items: state.TiposAtivos,
        TiposAtivos: state.TiposAtivos,
        TiposUsuarios: state.TiposUsuarios,
        Setores: state.Setores,
        Tema: state.Tema
    }
})(Campos)

export default ConnectedCampos 