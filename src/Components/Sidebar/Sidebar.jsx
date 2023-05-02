import React, { useState, useEffect, useRef } from 'react'
import './Sidebar.css'
import { useNavigate } from 'react-router-dom';
import { SetTab } from './SidebarUtils';
import { connect } from 'react-redux'
import User from '../../assets/Images/SerranoLogoFuncoBranco.jpg'
import { UilChartPieAlt, UilListUl, UilUsersAlt, UilSetting, UilUserCircle, UilClipboardNotes, UilHistory, UilBars, UilTicket } from '@iconscout/react-unicons'
import { NotificationAlerta, NotificationErro } from '../../NotificationUtils';
import { GetFromStore, SetLoggedUserPhotoUrlJustStore } from '../../Functions/StoreMiddleware';
import Loading from '../LoadingForTabs/Loading'
import UserPhotoModal from '../UsersList/User/UserPhotoModal/UserPhotoModal'
//Tooltip
import { Tooltip } from 'react-tippy';
import SidebarItem from '../LayoutComponents/SidebarItem/SidebarItem';
import Show from '../LayoutComponents/Show/Show';
import Stack from '../LayoutComponents/Stack/Stack';
import { AssetsTela, ConfigTela, UsersTela } from '../../Functions/PermitsMiddleware';


const Sidebar = (props) => {

    //STATES AND REF
    const SidebarRef = useRef()
    const navigate = useNavigate();
    const [CurrentUser, SetCurrentUser] = useState({ ...props.Users.find(user => user.Email === props.LoggedUser.Email) })
    const [SidebarActive, setSidebarActive] = useState(true)
    const [ShowPhotoModal, setShowPhotoModal] = useState(false)

    //SET CURRENT USER AND PHOTO URL
    useEffect(() => {
        SetCurrentUser({ ...props.Users.find(user => user.Email === props.LoggedUser.Email) })
        const User = GetFromStore('CurrentUser')
        if (User?.PhotoUrl) {
            if (props.LoggedUser.PhotoUrl !== User?.PhotoUrl) {
                SetLoggedUserPhotoUrlJustStore(User?.PhotoUrl)
            }
        }
    }, [props.Users])

    //SET TAB BASED ON PERMITS
    const SetTabSidebar = (Tab, To) => {
        if (Tab === 'Dash') {
            SetTab(Tab)
            navigate(To)
        } else if (Tab === 'Profile') {
            navigate(To)
        } else if (Tab === 'Assets' && AssetsTela()) {
            SetTab(Tab)
            navigate(To)
        } else if (Tab === 'Users' && UsersTela()) {
            SetTab(Tab)
            navigate(To)
        } else if (Tab === 'Config' && ConfigTela()) {
            SetTab(Tab)
            navigate(To)
        } else if (Tab === 'Records') {
            SetTab(Tab)
            navigate(To)
        } else if (Tab === 'Reports') {
            NotificationAlerta("Ainda Não...", "Esta tela ainda está em desenvolvimento, em breve estará disponível!")
        } else if (Tab === 'Requests') {
            SetTab(Tab)
            navigate(To)
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

    return (
        <>
            <UserPhotoModal Add={false} OnChangePhoto={() => { }} User={CurrentUser} IsCurrentUser={true} show={ShowPhotoModal} onHide={() => setShowPhotoModal(false)} />

            <div ref={SidebarRef} className={(props.Tema === 'Escuro' ? 'SidebarContainerEscuro SidebarContainer' : 'SidebarContainerClaro SidebarContainer')} >
                <Tooltip title="Recolher/Expandir barra lateral" position="bottom" >
                    <div className='NavBar-Hamburguer ToggleSidebarButton' onClick={e => setSidebarActive(!SidebarActive)}>
                        <UilBars />
                    </div>
                </Tooltip>

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
                        <div className='SidebarUserName' onClick={e => SetTabSidebar('Profile', '/Assets/Profile')}>
                            <p> {(CurrentUser.Name ? CurrentUser.Name : 'Caregando...') + ' ' + CurrentUser.LastName}</p>
                        </div>
                    </Tooltip>

                    <Stack Gap={'.4rem'}>
                        <SidebarItem Active={IsActive('Dash')}
                            onClick={e => SetTabSidebar('Dash', '/Assets/Dash')}>
                            <UilChartPieAlt />
                            Dashboard
                        </SidebarItem>
                        <SidebarItem Active={IsActive('Assets')}
                            onClick={e => SetTabSidebar('Assets', '/Assets/Assets')}>
                            <UilListUl />
                            Ativos
                        </SidebarItem>
                        <SidebarItem Active={IsActive('Users')}
                            onClick={e => SetTabSidebar('Users', '/Assets/Users')}>
                            <UilUsersAlt />
                            Usuários
                        </SidebarItem>
                        <SidebarItem Active={IsActive('Profile')}
                            onClick={e => SetTabSidebar('Profile', '/Assets/Profile')} >
                            <UilUserCircle />
                            Meu Perfil
                        </SidebarItem>
                        <SidebarItem Active={IsActive('Config')}
                            onClick={e => SetTabSidebar('Config', '/Assets/Config')}>
                            <UilSetting />
                            Configurações
                        </SidebarItem>
                        <SidebarItem Active={IsActive('Records')}
                            onClick={e => SetTabSidebar('Records', '/Assets/Records')}>
                            <UilHistory />
                            Registros
                        </SidebarItem  >
                        <SidebarItem Active={IsActive('Requests')}
                            onClick={e => SetTabSidebar('Requests', '/Assets/Requests')}>
                            <UilTicket />
                            Solicitações
                        </SidebarItem  >

                        <SidebarItem onClick={e => SetTabSidebar('Reports', '/Assets/Reports')} >
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
        Users: state.Users,
        Tema: state.Tema
    }
})(Sidebar)

export default ConnectedSidebar


export const ToggleSidebar = () => {
    setSidebarActive(!SidebarActive)
}











