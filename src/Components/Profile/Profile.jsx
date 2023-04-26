import React, { useState } from 'react'
import './Profile.css'
import { connect } from 'react-redux'
import UserModal from '../UsersList/User/UserModal'
import { useNavigate } from 'react-router-dom';
import { GetFromStore } from '../../Functions/Middleware';

const Profile = (props) => {

    const navigate = useNavigate();
    const [CurrentUser] = useState(GetFromStore('CurrentUser'))
    const [ModalShow, setModalShow] = useState(true)

    return (
        <div className={props.Tema === 'Escuro' ? 'ProfileContainerEscuro ProfileContainer' : 'ProfileContainerClaro ProfileContainer'}>
            <UserModal
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