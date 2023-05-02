import React from 'react'
import './CustomFields.css'
import { connect } from 'react-redux'
import TwoColumns from '../TwoColumns/TwoColumns'
import Show from '../Show/Show'
import FormGroup from '../FormGroup/FormGroup'
import FormGroupLabel from '../FormGroupLabel/FormGroupLabel'
import FormInput from '../FormInput/FormInput'
import { UilAsterisk } from '@iconscout/react-unicons'


const CustomFields = (props) => {

    console.log("CUSTOM", props.Item.CustomFieldsValues)
    console.log("CUSTOM", props.Container)

    return ( 
        <>
            <Show Show={props.Container?.length > 0}>
                <h4 className='CustomFields-Title'>Campos Personalizados</h4>
            </Show>

            <TwoColumns>
                {props.Container?.map((CustomField, CustomFieldIndex) => {
                    return <FormGroup>
                        <FormGroupLabel>
                            <UilAsterisk />
                            {CustomField.Value}
                        </FormGroupLabel>
                        <FormInput
                            value={props?.Item?.CustomFieldsValues?.find(CF => CF?.id === CustomField?.id)?.Value || ''}
                            disabled={!props.CanEdit}
                            onChange={e => { props.Handle(e.target.value, CustomFieldIndex, CustomField.id) }}
                        />
                    </FormGroup>
                })}

            </TwoColumns>
        </>

    )
}



const ConnectedCustomFields = connect((state) => {
    return {
        Tema: state.Tema
    }
})(CustomFields)

export default ConnectedCustomFields