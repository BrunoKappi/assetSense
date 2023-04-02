import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import { useNavigate } from 'react-router-dom';
import { GetSidebarItemClass, SetTab } from './SidebarUtils';
import { connect } from 'react-redux'
import User from '../../assets/Images/SerranoLogoFuncoBranco.jpg'

import { UilChartPieAlt, UilListUl, UilUsersAlt, UilSetting, UilUserCircle } from '@iconscout/react-unicons'
import { NotificationErro } from '../../NotificationUtils';
import { GetCurrentUserFromStore, GetCurrentUserTypePermitFromStore, SetLoggedUserPhotoUrlJustStore } from '../../Functions/Middleware';
import Loading from '../LoadingForTabs/Loading'
import UserPhotoModal from '../UsersList/User/UserPhotoModal/UserPhotoModal'
//Tooltip
import { Tooltip } from 'react-tippy';

const Sidebar = (props) => {

    const navigate = useNavigate();
    const [CurrentUser, SetCurrentUser] = useState({ ...props.Usuarios.find(user => user.Email === props.LoggedUser.Email) })
    const [TimeToLoadPhoto, SetTimeToLoadPhoto] = useState(false)



    useEffect(() => {
        SetCurrentUser({ ...props.Usuarios.find(user => user.Email === props.LoggedUser.Email) })
        setTimeout(() => {
            SetTimeToLoadPhoto(true)
        }, 1500);


        const User = GetCurrentUserFromStore()
        if (User?.PhotoUrl) {
            if (props.LoggedUser.PhotoUrl !== User?.PhotoUrl) {
                console.log(User?.PhotoUrl)
                SetLoggedUserPhotoUrlJustStore(User?.PhotoUrl)
            }
        }
    }, [props.Usuarios])





    const AtivosPermit = GetCurrentUserTypePermitFromStore('VISUALIZAR_ATIVOS') || GetCurrentUserTypePermitFromStore('RETIRAR_ATIVOS') || GetCurrentUserTypePermitFromStore('ADICIONAR_ATIVOS') || GetCurrentUserTypePermitFromStore(' EDITAR_ATIVOS') || GetCurrentUserTypePermitFromStore('EXCLUIR_ATIVOS')
    const UsuariosPermit = GetCurrentUserTypePermitFromStore('VISUALIZAR_USUARIOS') || GetCurrentUserTypePermitFromStore('ADICIONAR_USUARIOS') || GetCurrentUserTypePermitFromStore(' EDITAR_USUARIOS') || GetCurrentUserTypePermitFromStore('EXCLUIR_USUARIOS')
    const ConfigPermit = GetCurrentUserTypePermitFromStore('CONFIGURACOES') || GetCurrentUserTypePermitFromStore('EDITAR_TIPOS_ATIVOS') || GetCurrentUserTypePermitFromStore('EDITAR_LOCAIS') || GetCurrentUserTypePermitFromStore('EDITAR_STATUS_ATIVOS') || GetCurrentUserTypePermitFromStore('EDITAR_TIPOS_DE_USO') || GetCurrentUserTypePermitFromStore('EDITAR_SETORES') || GetCurrentUserTypePermitFromStore('EDITAR_TIPOS_DE_USUARIO') || GetCurrentUserTypePermitFromStore('EDITAR_PERMICOES')


    const SetTabSidebar = (Tab, To) => {
        if (Tab === 'Dash') {
            SetTab(Tab)
            navigate(To)
        } else if (Tab === 'Profile') {
            navigate(To)
        } else if (Tab === 'Ativos' && AtivosPermit) {
            SetTab(Tab)
            navigate(To)
        } else if (Tab === 'Users' && UsuariosPermit) {
            SetTab(Tab)
            navigate(To)
        } else if (Tab === 'Config' && ConfigPermit) {
            SetTab(Tab)
            navigate(To)
        } else
            NotificationErro("Não Autorizado", "Você não possui permissão para acessar essa aba, solicite acesso ao seu Administrador")
    }

    const [ShowPhotoModal, setShowPhotoModal] = useState(false)

    const onChangePhoto = (url) => {

    }


    return (

        <>

            <UserPhotoModal Add={false} OnChangePhoto={onChangePhoto} User={CurrentUser} IsCurrentUser={true} show={ShowPhotoModal} onHide={() => setShowPhotoModal(false)} />


            <div className={props.Tema === 'Escuro' ? 'SidebarContainerEscuro SidebarContainer' : 'SidebarContainerClaro SidebarContainer'}>


                <div className='SidebarUserPhotoContainer'>
                    <Tooltip title="Ver/Alterar Foto de Perfil" position="bottom" >
                        <img onClick={e => setShowPhotoModal(true)} alt='User' className='SidebarUserPhoto' src={props.LoggedUser.PhotoUrl || User}></img>
                    </Tooltip>
                </div>




                {!CurrentUser.Name && <Loading />}

                {CurrentUser.Name &&

                    <>
                        <Tooltip title="Acessar seu Perfil" position="bottom" >
                            <div className='SidebarUserName' onClick={e => SetTabSidebar('Profile', '/App/Profile')}>
                                <p> {CurrentUser.Name ? CurrentUser.Name : 'Caregando...'}</p>
                                <p> {CurrentUser.LastName}</p>
                            </div>
                        </Tooltip>

                        <ul className='SidebarList'>
                            <span to="/App/Dash" className={GetSidebarItemClass('Dash', props.LoggedUser.CurrentSidebarTab)} onClick={e => SetTabSidebar('Dash', '/App/Dash')}>
                                <UilChartPieAlt />
                                <span>Dashboard</span>
                            </span>
                            <span to="/App/Ativos" className={GetSidebarItemClass('Ativos', props.LoggedUser.CurrentSidebarTab)} onClick={e => SetTabSidebar('Ativos', '/App/Ativos')}>
                                <UilListUl />
                                <span>Ativos</span>
                            </span>
                            <span to="/App/Users" className={GetSidebarItemClass('Users', props.LoggedUser.CurrentSidebarTab)} onClick={e => SetTabSidebar('Users', '/App/Users')}>
                                <UilUsersAlt />
                                <span>Usuarios</span>
                            </span>
                            <span to="/App/Profile" className={GetSidebarItemClass('Profile', props.LoggedUser.CurrentSidebarTab)} onClick={e => SetTabSidebar('Profile', '/App/Profile')} >
                                <UilUserCircle />
                                <span>Meu Perfil</span>
                            </span>
                            <span to="/App/Config" className={GetSidebarItemClass('Config', props.LoggedUser.CurrentSidebarTab)} onClick={e => SetTabSidebar('Config', '/App/Config')}>
                                <UilSetting />
                                <span>Configurações</span>
                            </span>



                        </ul>

                    </>


                }

            </div>

        </>
    )
}


const ConnectedSidebar = connect((state) => {
    return {
        LoggedUser: state.LoggedUser,
        Usuarios: state.Usuarios,
        Tema: state.Tema
    }
})(Sidebar)

export default ConnectedSidebar