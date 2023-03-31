import React, { useState, useEffect } from 'react'
import './Profile.css'
import { connect } from 'react-redux'
import UsuarioModal from '../UsersList/User/UsuarioModal'
import { useNavigate } from 'react-router-dom';



const Profile = (props) => {

    const navigate = useNavigate();
    const [CurrentUser, SetCurrentUser] = useState({ ...props.Usuarios.find(user => user.Email === props.LoggedUser.Email) })
    const [modalShow, setModalShow] = useState(true);


    useEffect(() => {
        SetCurrentUser({ ...props.Usuarios.find(user => user.Email === props.LoggedUser.Email) })
    }, [props.Usuarios])

    return (
        <div className={localStorage.getItem('AssetSenseTema') === 'Escuro' ? 'ProfileContainerEscuro ProfileContainer' : 'ProfileContainerClaro ProfileContainer'}>

            <UsuarioModal FromModal={false} CurrentUser={CurrentUser} User={CurrentUser} show={modalShow} onHide={() => { setModalShow(false); navigate('../' + props.LoggedUser.CurrentSidebarTab); }} Function="View" />

        </div>
    )
}


const ConnectedProfile = connect((state) => {
    return {
        LoggedUser: state.LoggedUser,
        Usuarios: state.Usuarios

    }
})(Profile)

export default ConnectedProfile