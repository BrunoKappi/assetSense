import React from 'react'
import { useEffect, useState } from 'react';
import Masonry from "react-masonry-css";
import { connect } from 'react-redux'
import './AtivosCampos.css'
import Stack from '../LayoutComponents/Stack/Stack'
import Show from '../LayoutComponents/Show/Show'
import { UilPlusCircle, UilBackspace, UilTrashAlt, UilLabel } from '@iconscout/react-unicons'
import { DefaultAtivoCustomField } from '../../Data/Items';
import { v4 } from 'uuid';
import { EditTipoAtivo } from '../../Functions/Middleware';
import { NotificationErro, NotificationSucesso } from '../../NotificationUtils';
//Tooltip
import { Tooltip } from 'react-tippy';


const breakpointColumnsObj = {
    default: 3,
    1250: 2,
    950: 1,
    700: 1
};

const AtivosCampos = (props) => {

    const [TiposAtivos, setTiposAtivos] = useState([...props.TiposAtivos])
    const [IsEditing, setIsEditing] = useState()
    const [SelectedItem, setSelectedItem] = useState()
    const [SelectedAtivoType, setSelectedAtivoType] = useState()
    const [SelectedItemIndex, setSelectedItemIndex] = useState()
    const [SelectedItemValue, setSelectedItemValue] = useState()
    const [NewCustomFieldValue, setNewCustomFieldValue] = useState('')


    useEffect(() => {
        setTiposAtivos([...props.TiposAtivos])
    }, [])



    useEffect(() => {
        console.log("MUDOU", props.TiposAtivos)
        setTiposAtivos([...props.TiposAtivos])
    }, [props.TiposAtivos])







    // CHANGE VALUE
    const ChangeCustomFieldName = (e) => {
        e.preventDefault()

        if (!SelectedItemValue)
            return


        const EditedSelectedItem = { ...SelectedItem }
        EditedSelectedItem.Value = SelectedItemValue
        const SelectedAtivoTypeCopy = { ...SelectedAtivoType }
        SelectedAtivoTypeCopy.CustomFields[SelectedItemIndex] = { ...EditedSelectedItem }

        EditTipoAtivo(SelectedAtivoTypeCopy).then(() => {
            const TiposAtivosCopy = [...TiposAtivos]
            TiposAtivosCopy.forEach(Tipo => {
                if (Tipo.id === SelectedAtivoTypeCopy.id)
                    Tipo = { ...SelectedAtivoTypeCopy }
            })
            setTiposAtivos([...TiposAtivosCopy])
            console.log(SelectedAtivoTypeCopy)
            NotificationSucesso("Edição", "Campo Editado com Sucesso!")
            EndEditing()

        }).catch((erro) => {
            console.log(erro)
            EndEditing()
            NotificationErro("Erro", "Algo deu errado, tente novamete")
        })




    }


    // DELETE VALUE
    const DeleteCustomField = () => {

        const SelectedAtivoTypeCopy = { ...SelectedAtivoType }
        SelectedAtivoTypeCopy.CustomFields = [...SelectedAtivoTypeCopy.CustomFields.filter(Custom => Custom.id !== SelectedItem.id)]

        EditTipoAtivo(SelectedAtivoTypeCopy).then(() => {

            const TiposAtivosCopy = [...TiposAtivos]
            TiposAtivosCopy.forEach(Tipo => {
                if (Tipo.id === SelectedAtivoTypeCopy.id)
                    Tipo.CustomFields = [...SelectedAtivoTypeCopy.CustomFields]
            })
            setTiposAtivos([...TiposAtivosCopy])
            EndEditing()
            NotificationSucesso("Campo", "Campo  Deletado com sucesso!")

        }).catch((erro) => {
            console.log(erro)
            EndEditing()
            NotificationErro("Erro", "Algo deu errado, tente novamete")
        })



    }



    // ADD CUSTOM FIELD
    const AddCustomField = (e, InputId, AtivoType) => {
        e.preventDefault()
        if (!document.getElementById(InputId).value)
            return

        const NewCustomField = { ...DefaultAtivoCustomField }
        NewCustomField.Value = document.getElementById(InputId).value
        NewCustomField.id = v4()
        const AtivoTypeCopy = { ...AtivoType }


        AtivoTypeCopy.CustomFields.push(NewCustomField)


        EditTipoAtivo(AtivoTypeCopy).then(() => {
            const TiposAtivosCopy = [...TiposAtivos]
            TiposAtivosCopy.forEach(Tipo => {
                if (Tipo.id === AtivoType.id)
                    Tipo = AtivoTypeCopy
            })
            setTiposAtivos([...TiposAtivosCopy])
            document.getElementById(InputId).value = ''
            console.log(AtivoTypeCopy)
            NotificationSucesso("Campo", "Campo Personalizado adicionado com sucesso!")

        }).catch((erro) => {
            console.log(erro)
            EndEditing()
            NotificationErro("Erro", "Algo deu errado, tente novamete")
        })



    }



    // INIT
    const InitEditing = (SelectedCustomField, Index, AtivoType) => {
        setIsEditing(true)
        setSelectedItemIndex(Index)
        setSelectedItem(SelectedCustomField)
        setSelectedItemValue(SelectedCustomField?.Value)
        setSelectedAtivoType(AtivoType)
    }

    // END
    const EndEditing = () => {
        setIsEditing(false)
        setSelectedItem()
    }



    return (
        <div className={props.Tema === 'Escuro' ? 'AtivosCamposContainerEscuro AtivosCamposContainer' : 'AtivosCamposContainerClaro AtivosCamposContainer'}>

            <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column"   >

                {TiposAtivos.map(TipoAtivo => {
                    return <Stack>
                        <div className='AtivosCamposTitle'>
                            <UilLabel />
                            {TipoAtivo.Value}
                        </div>

                        <Show Show={TipoAtivo?.CustomFields?.length === 0} Width='100%' className="AtivosCamposItem">
                            Não há Campos Personalizados
                        </Show>


                        <Show Show={TipoAtivo?.CustomFields} Width='100%'>
                            {TipoAtivo?.CustomFields?.map((CustomField, Index) => {
                                return <div className='AtivosCamposItem' onDoubleClick={e => InitEditing(CustomField, Index, TipoAtivo)}>
                                    <Tooltip title="Duplo Clique para editar" position="bottom" >
                                        <Show Show={(!IsEditing && SelectedItem?.id !== CustomField.id) || SelectedItem?.id !== CustomField.id}>
                                            <span>{CustomField?.Value}</span>
                                        </Show>
                                    </Tooltip>

                                    <Show Show={IsEditing && SelectedItem?.id === CustomField.id} >
                                        <form className='AtivosCamposEditForm' onSubmit={ChangeCustomFieldName}>
                                            <input className='AtivosCamposEditInput' value={SelectedItemValue} type="text" placeholder={CustomField.Value} onChange={e => setSelectedItemValue(e.target.value)} />
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


                        <form className='AtivosCamposAddForm' onSubmit={e => AddCustomField(e, TipoAtivo.id, TipoAtivo)}>
                            <input className='AtivosCamposAddInput' id={TipoAtivo.id} type="text" placeholder='Adicionar Campo Personalizado' />
                            <button className='AtivosCamposAddButton'>
                                <Tooltip title="Adicionar novo Campo" position="bottom" >
                                    <UilPlusCircle className='AtivosCamposAddIcon' />
                                </Tooltip>
                            </button>
                        </form>

                    </Stack>
                })}


            </Masonry>

        </div>
    )
}


const ConnectedAtivosCampos = connect((state) => {
    return {
        TiposAtivos: state.TiposAtivos,
        Tema: state.Tema
    }
})(AtivosCampos)

export default ConnectedAtivosCampos 