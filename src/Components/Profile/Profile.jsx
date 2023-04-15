import React, { useState } from 'react'
import './Profile.css'
import { connect } from 'react-redux'
import UsuarioModal from '../UsersList/User/UsuarioModal'
import { useNavigate } from 'react-router-dom';
import { GetCurrentUserFromStore } from '../../Functions/Middleware';

const Profile = (props) => {

    const navigate = useNavigate();
    const [CurrentUser] = useState(GetCurrentUserFromStore())
    const [ModalShow, setModalShow] = useState(true)

    return (
        <div className={props.Tema === 'Escuro' ? 'ProfileContainerEscuro ProfileContainer' : 'ProfileContainerClaro ProfileContainer'}>
            <UsuarioModal
                FromModal={false}
                CurrentUser={CurrentUser}
                User={CurrentUser}
                show={ModalShow}
                Function="View" 
                onHide={() => {
                    setModalShow(false);
                    navigate('../' + props.LoggedUser.CurrentSidebarTab);
                }}
            />
        </div>
    )
}


const ConnectedProfile = connect((state) => {
    return {
        LoggedUser: state.LoggedUser,
        Tema: state.Tema
    }
})(Profile)

export default ConnectedProfile