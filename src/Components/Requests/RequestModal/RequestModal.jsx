
//REACT
import React, { useState, useEffect } from 'react'
//CSS
import './RequestModal.css'
//LIBRARIES
import { connect } from 'react-redux' 
import BootstrapModal from 'react-bootstrap/Modal';
import { GetFromStore } from '../../../Functions/StoreMiddleware'


const RequestModal = (props) => {

    //CURRENT USER AND PERMITS
    const [CurrentUserType] = useState(GetFromStore('CurrentUserType'))

    return (


        <BootstrapModal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered fullscreen={'md-down'} className={props.Tema === 'Escuro' ? 'RequestModal-ModalEscuro RequestModal-Modal' : 'RequestModal-ModalClaro RequestModal-Modal'}>

            <BootstrapModal.Body closeButton className="RequestModal-Body">

            </BootstrapModal.Body >

        </BootstrapModal >


    );              
}



const ConnectedRequestModal = connect((state) => {
    return {
        Tema: state.Tema,
        LoggedUser: state.LoggedUser
    }
})(RequestModal)

export default ConnectedRequestModal






