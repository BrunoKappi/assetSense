import React, { useState, useEffect } from 'react'
import './Profile.css'
import { connect } from 'react-redux'
import UserModal from '../UsersList/User/UserModal'
import { useNavigate } from 'react-router-dom';



const Profile = (props) => {

    const navigate = useNavigate();
    const [CurrentUser, SetCurrentUser] = useState({ ...props.Usuarios.find(user => user.Email === props.LoggedUser.Email) })
    const [modalShow, setModalShow] = useState(true);


    useEffect(() => {
        SetCurrentUser({ ...props.Usuarios.find(user => user.Email === props.LoggedUser.Email) })
    }, [props.Usuarios])

    return (
        <UserModal FromModal={false} CurrentUser={CurrentUser} User={CurrentUser} show={modalShow} onHide={() => { setModalShow(false); navigate('../' + props.LoggedUser.CurrentSidebarTab); }} Function="View" />
    )
}


const ConnectedProfile = connect((state) => {
    return {
        LoggedUser: state.LoggedUser,
        Usuarios: state.Usuarios

    }
})(Profile)

export default ConnectedProfile