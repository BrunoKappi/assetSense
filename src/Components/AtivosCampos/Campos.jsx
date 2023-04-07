import React from 'react'
import { useEffect, useState } from 'react';
import Masonry from "react-masonry-css";
import { connect } from 'react-redux'
import './Campos.css'
import Stack from '../LayoutComponents/Stack/Stack'
import Show from '../LayoutComponents/Show/Show'
import { UilPlusCircle, UilBackspace, UilTrashAlt, UilLabel } from '@iconscout/react-unicons'
import { DefaultCustomField } from '../../Data/Items';
import { EditLocalArmazenamento, EditSetor, EditTipoAtivo, EditUserType } from '../../Functions/Middleware';
import { NotificationErro, NotificationSucesso } from '../../NotificationUtils';
//Tooltip
import { Tooltip } from 'react-tippy';
import Loading from '../LoadingForTabs/Loading'
import { v4 } from 'uuid';


const breakpointColumnsObj = {
    default: 3,
    1250: 2,
    950: 1,
    700: 1
};

const EditFunctions = {
    TiposAtivos: EditTipoAtivo,
    TiposUsuarios: EditUserType,
    Setores: EditSetor
}

const Campos = (props) => {

    const [Items, setItems] = useState([])
    const [IsLoading, setIsLoading] = useState()
    const [IsEditing, setIsEditing] = useState()
    const [SelectedListItem, setSelectedListItem] = useState()
    const [SelectedItem, setSelectedItem] = useState()
    const [SelectedListItemIndex, setSelectedListItemIndex] = useState()
    const [SelectedListItemValue, setSelectedListItemValue] = useState()
    const [SelectedListItemId, setSelectedListItemId] = useState()

    useEffect(() => {
        if (props.Function === 'TiposAtivos')
            setItems([...props.TiposAtivos])
        else if (props.Function === 'TiposUsuarios')
            setItems([...props.TiposUsuarios])
        else if (props.Function === 'Setores')
            setItems([...props.Setores])
    }, [props.Items, props.TiposAtivos, props.TiposUsuarios, props.Setores])


    // HANDLE ERROR
    const HandleError = (Erro) => {
        console.log(Erro)
        setIsLoading(false)
        EndEditing()
        NotificationErro("Erro", "Algo deu errado, tente novamete")
    }

    // EDIT FUNCTION 
    const EditFunction = EditFunctions[props.Function]

    // CHANGE VALUE
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

    // DELETE VALUE
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

    // ADD CUSTOM FIELD
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

    // INIT
    const InitEditing = (SelectedCustomField, Index, SelectedItemToSet) => {
        console.log(SelectedCustomField)
        setIsEditing(true)
        setSelectedListItemIndex(Index)
        setSelectedListItem(SelectedCustomField)
        setSelectedListItemValue(SelectedCustomField?.Value)
        setSelectedListItemId(SelectedCustomField?.id)
        setSelectedItem(SelectedItemToSet)
    }

    // END
    const EndEditing = () => {
        setIsEditing(false)
        setSelectedListItem()
    }



    return (
        <div className={props.Tema === 'Escuro' ? 'CamposContainerEscuro CamposContainer' : 'CamposContainerClaro CamposContainer'}>

            <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column"   >

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