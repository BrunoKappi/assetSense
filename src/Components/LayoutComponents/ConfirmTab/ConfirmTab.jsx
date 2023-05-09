import React from 'react'
import './ConfirmTab.css'
import { connect } from 'react-redux'
import { UilBackward, UilCheck } from '@iconscout/react-unicons'

const ConfirmTab = (props) => {
    return (
        <div className={`ConfirmTab ${props.Tema === 'Escuro' ? "ConfirmTabEscuro" : 'ConfirmTabClaro'}  `}>
            <h4 className='ConfirmMessage'>{props.ConfirmMessage}</h4>
            <div className='ConfirmButtons'>
                <button className='ConfirmButtons-Secondary' onClick={e => { props.EndConfirming(); props.setIsEdited(true); }}>
                    <UilBackward />
                    {props.ConfirmBtBack}
                </button>
                <button onClick={props.Submit}> 
                    <UilCheck />
                    {props.ConfirmBtAction}
                </button>
            </div>
        </div>
    )
}



const ConnectedConfirmTab = connect((state) => {
    return {
        Tema: state.Tema
    }
})(ConfirmTab)

export default ConnectedConfirmTab