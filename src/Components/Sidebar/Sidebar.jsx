import React, { useState, useEffect, useRef } from 'react'
import './Sidebar.css'
import { useNavigate } from 'react-router-dom';
import { SetTab } from './SidebarUtils';
import { connect } from 'react-redux'
import { UilChartPieAlt, UilListUl, UilUsersAlt, UilSetting, UilUserCircle, UilClipboardNotes, UilHistory, UilBars, UilTicket } from '@iconscout/react-unicons'
import { NotificationAlerta, NotificationErro } from '../../NotificationUtils';
import { SetLoggedUserPhotoUrlJustStore } from '../../Functions/StoreMiddleware';
import Loading from '../LoadingForTabs/Loading'
import UserPhotoModal from '../UsersList/User/UserPhotoModal/UserPhotoModal'
//Tooltip
import { Tooltip } from 'react-tippy';
import SidebarItem from '../LayoutComponents/SidebarItem/SidebarItem';
import Show from '../LayoutComponents/Show/Show';
import Stack from '../LayoutComponents/Stack/Stack';
import { AssetsTela, ConfigTela, UsersTela } from '../../Functions/PermitsMiddleware';

import Photo from '../Photo/Photo'

const Sidebar = (props) => {

    //STATES AND REF
    const SidebarRef = useRef()
    const navigate = useNavigate();

    const [SidebarActive, setSidebarActive] = useState(true)
    const [ShowPhotoModal, setShowPhotoModal] = useState(false)



    //SET TAB BASED ON PERMITS
    const SetTabSidebar = (Tab, To) => {
        if (Tab === 'Dash' && Tab !== props.LoggedUser.CurrentSidebarTab) {
            SetTab(Tab)
            navigate(To)
        } else if (Tab === 'Profile' && Tab !== props.LoggedUser.CurrentSidebarTab) {
            navigate(To)
        } else if (Tab === 'Assets' && AssetsTela() && Tab !== props.LoggedUser.CurrentSidebarTab) {
            SetTab(Tab)
            navigate(To)
        } else if (Tab === 'Users' && UsersTela() && Tab !== props.LoggedUser.CurrentSidebarTab) {
            SetTab(Tab)
            navigate(To)
        } else if (Tab === 'Config' && ConfigTela() && Tab !== props.LoggedUser.CurrentSidebarTab) {
            SetTab(Tab)
            navigate(To)
        } else if (Tab === 'Records' && Tab !== props.LoggedUser.CurrentSidebarTab) {
            SetTab(Tab)
            navigate(To)
        } else if (Tab === 'Reports' && Tab !== props.LoggedUser.CurrentSidebarTab) {
            NotificationAlerta("Ainda Não...", "Esta tela ainda está em desenvolvimento, em breve estará disponível!")
        } else if (Tab === 'Requests' && Tab !== props.LoggedUser.CurrentSidebarTab) {
            SetTab(Tab)
            navigate(To)
        } else if (Tab === props.LoggedUser.CurrentSidebarTab) {

        } else
            NotificationErro("Não Autorizado", "Você não possui permissão para acessar essa aba, solicite acesso ao seu Administrador")
    }

    //VERIFY WHAT TAB IS ACTIVE
    const IsActive = (Tab) => props.LoggedUser.CurrentSidebarTab === Tab

    //SIDEBAR TOGGLE
    useEffect(() => {
        if (!SidebarActive) {
            SidebarRef.current.style.width = '0'
            SidebarRef.current.style.padding = '0'
        }
        else {
            SidebarRef.current.style.width = '25%'
            SidebarRef.current.style.paddingLeft = '.5rem'
            SidebarRef.current.style.paddingTop = '1.5rem'
        }
    }, [SidebarActive])


    console.log(props.CurrentUser.PhotoUrl)


    return (
        <>
            <UserPhotoModal Add={false} OnChangePhoto={() => { }} User={props.CurrentUser} IsCurrentUser={true} show={ShowPhotoModal} onHide={() => setShowPhotoModal(false)} />

            <div ref={SidebarRef} className={(props.Tema === 'Dark' ? 'SidebarContainerDark SidebarContainer' : 'SidebarContainerLightTheme SidebarContainer')} >


                <Tooltip title="Recolher/Expandir barra lateral" position="bottom" >
                    <div className='NavBar-Hamburguer ToggleSidebarButton' onClick={e => setSidebarActive(!SidebarActive)}>
                        <UilBars />
                    </div>
                </Tooltip>

                <div className='SidebarUserPhotoContainer'>
                    <Tooltip title="Ver/Alterar Foto de Perfil" position="bottom" >
                        <Photo onClick={e => setShowPhotoModal(true)} alt='User' className='SidebarUserPhoto' src={props.CurrentUser.PhotoUrl || props.TenantPhotos.MainLogo}></Photo>
                    </Tooltip>
                </div>

                <Show Show={!props.CurrentUser.Name}>
                    <Loading />
                </Show>



                <Show Show={props.CurrentUser.Name}>
                    <Tooltip title="Acessar seu Perfil" position="bottom" >
                        <div className='SidebarUserName' onClick={e => SetTabSidebar('Profile', '/Assets/Profile')}>
                            <p> {(props.CurrentUser.Name ? props.CurrentUser.Name : 'Caregando...') + ' ' + props.CurrentUser.LastName}</p>
                        </div>
                    </Tooltip>

                    <Stack Gap={'.4rem'}>
                        <SidebarItem Active={IsActive('Dash')}
                            onClick={e => SetTabSidebar('Dash', '/Assets/Dash')}>
                            <UilChartPieAlt />
                            <span>Dashboard</span>
                        </SidebarItem>
                        <SidebarItem Active={IsActive('Assets')}
                            onClick={e => SetTabSidebar('Assets', '/Assets/Assets')}>
                            <UilListUl />
                            <span>Ativos</span>
                        </SidebarItem>
                        <SidebarItem Active={IsActive('Users')}
                            onClick={e => SetTabSidebar('Users', '/Assets/Users')}>
                            <UilUsersAlt />
                            <span>Usuários</span>
                        </SidebarItem>
                        <SidebarItem Active={IsActive('Profile')}
                            onClick={e => SetTabSidebar('Profile', '/Assets/Profile')} >
                            <UilUserCircle />
                            <span>Meu Perfil</span>
                        </SidebarItem>
                        <SidebarItem Active={IsActive('Config')}
                            onClick={e => SetTabSidebar('Config', '/Assets/Config')}>
                            <UilSetting />
                            <span>Configurações</span>
                        </SidebarItem>
                        <SidebarItem Active={IsActive('Records')}
                            onClick={e => SetTabSidebar('Records', '/Assets/Records')}>
                            <UilHistory />
                            <span>Registros</span>
                        </SidebarItem>
                        <SidebarItem Active={IsActive('Requests')}
                            onClick={e => SetTabSidebar('Requests', '/Assets/Requests')}>
                            <UilTicket />
                            <span>Solicitações</span>
                        </SidebarItem>

                        <SidebarItem onClick={e => SetTabSidebar('Reports', '/Assets/Reports')} >
                            <UilClipboardNotes />
                            <span>Relatórios</span>
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
        Users: state.Users,
        Tema: state.Tema,
        TenantPhotos: state.TenantPhotos,
        CurrentUser: state.CurrentUser
    }
})(Sidebar)

export default ConnectedSidebar


export const ToggleSidebar = () => {
    setSidebarActive(!SidebarActive)
}











