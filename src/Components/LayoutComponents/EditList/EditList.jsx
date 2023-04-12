import React from 'react'
import './EditList.css'
import { v4 } from 'uuid'
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import { connect } from 'react-redux'

const EditList = (props) => {
    return (
        <div className={`EditList ${props.Tema === 'Escuro' ? "EditListEscuro" : 'EditListClaro'}  `}>
            <div className='EditList-Title'>
                {props.Icon}
                {props.Title}
            </div>
            <div className='EditList-Itens'>
                {props.List.map(ListItem => {
                    return <div key={v4()} className={'EditList-Item'} onClick={e => props.Handle(props.Key, ListItem?.id)}>
                        {props.Item[props.Key]?.id === ListItem?.id ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                        {ListItem?.Value}
                    </div>
                })}
            </div>
        </div>
    )
}



const ConnectedEditList = connect((state) => {
    return {
        Tema: state.Tema
    }
})(EditList)

export default ConnectedEditList