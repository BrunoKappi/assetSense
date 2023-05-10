import React, { useState } from 'react'
import './Profile.css'
import { connect } from 'react-redux'
import UserModal from '../UsersList/User/UserModal'
import { useNavigate } from 'react-router-dom';


const Profile = (props) => {

    const navigate = useNavigate();  
    const [ModalShow, setModalShow] = useState(true)

    return (
        <div className={props.Tema === 'Dark' ? 'ProfileContainerDark ProfileContainer' : 'ProfileContainerLightTheme ProfileContainer'}>
            <UserModal
                FromModal={false}
                CurrentUser={props.CurrentUser}
                User={props.CurrentUser}
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
        Tema: state.Tema,
        CurrentUser: state.CurrentUser
    }
})(Profile)

export default ConnectedProfile