import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import { useNavigate } from 'react-router-dom';
import { GetSidebarItemClass, SetTab } from './SidebarUtils';
import { connect } from 'react-redux'
import User from '../../assets/Images/SerranoLogoFuncoBranco.jpg'

import { UilChartPieAlt, UilListUl, UilUsersAlt, UilSetting, UilUserCircle, UilClipboardNotes, UilHistory } from '@iconscout/react-unicons'
import { NotificationErro } from '../../NotificationUtils';
import { GetCurrentUserFromStore, GetCurrentUserTypePermitFromStore, SetLoggedUserPhotoUrlJustStore } from '../../Functions/Middleware';
import Loading from '../LoadingForTabs/Loading'
import UserPhotoModal from '../UsersList/User/UserPhotoModal/UserPhotoModal'
//Tooltip
import { Tooltip } from 'react-tippy';
import SidebarItem from '../LayoutComponents/SidebarItem/SidebarItem';
import Show from '../LayoutComponents/Show/Show';
import Stack from '../LayoutComponents/Stack/Stack';

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
        } else if (Tab === 'Records') {
            SetTab(Tab)
            navigate(To)
        } else
            NotificationErro("Não Autorizado", "Você não possui permissão para acessar essa aba, solicite acesso ao seu Administrador")
    }

    const [ShowPhotoModal, setShowPhotoModal] = useState(false)

    const onChangePhoto = () => { }

    const IsActive = (Tab) => props.LoggedUser.CurrentSidebarTab === Tab



    return (

        <>

            <UserPhotoModal Add={false} OnChangePhoto={onChangePhoto} User={CurrentUser} IsCurrentUser={true} show={ShowPhotoModal} onHide={() => setShowPhotoModal(false)} />


            <div className={props.Tema === 'Escuro' ? 'SidebarContainerEscuro SidebarContainer' : 'SidebarContainerClaro SidebarContainer'}>


                <div className='SidebarUserPhotoContainer'>
                    <Tooltip title="Ver/Alterar Foto de Perfil" position="bottom" >
                        <img onClick={e => setShowPhotoModal(true)} alt='User' className='SidebarUserPhoto' src={props.LoggedUser.PhotoUrl || User}></img>
                    </Tooltip>
                </div>





                <Show Show={!CurrentUser.Name}>
                    <Loading />
                </Show>

                <Show Show={CurrentUser.Name}>
                    <Tooltip title="Acessar seu Perfil" position="bottom" >
                        <div className='SidebarUserName' onClick={e => SetTabSidebar('Profile', '/App/Profile')}>
                            <p> {CurrentUser.Name ? CurrentUser.Name : 'Caregando...'}</p>
                            <p> {CurrentUser.LastName}</p>
                        </div>
                    </Tooltip>

                    <Stack Gap={'.4rem'}>
                        <SidebarItem Active={IsActive('Dash')}
                            onClick={e => SetTabSidebar('Dash', '/App/Dash')}>
                            <UilChartPieAlt />
                            Dashboard
                        </SidebarItem>
                        <SidebarItem Active={IsActive('Ativos')}
                            onClick={e => SetTabSidebar('Ativos', '/App/Ativos')}>
                            <UilListUl />
                            Ativos
                        </SidebarItem>
                        <SidebarItem Active={IsActive('Users')}
                            onClick={e => SetTabSidebar('Users', '/App/Users')}>
                            <UilUsersAlt />
                            Usuarios
                        </SidebarItem>
                        <SidebarItem Active={IsActive('Profile')}
                            onClick={e => SetTabSidebar('Profile', '/App/Profile')} >
                            <UilUserCircle />
                            Meu Perfil
                        </SidebarItem>
                        <SidebarItem Active={IsActive('Config')}
                            onClick={e => SetTabSidebar('Config', '/App/Config')}>
                            <UilSetting />
                            Configurações
                        </SidebarItem>
                        <SidebarItem Active={IsActive('Records')}
                            onClick={e => SetTabSidebar('Records', '/App/Records')}>
                            <UilHistory />
                            Registros
                        </SidebarItem>
                        <SidebarItem >
                            <UilClipboardNotes />
                            Relatórios
                        </SidebarItem>
                    </Stack>
                </Show>


                

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












