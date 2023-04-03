//Dependencias
import React, { useEffect, useState } from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
//Icones


//Bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
//Images
import Logo from '../../assets/Images/SerranoNomeBranco.png'
import LogoBrancoSerrano from '../../assets/Images/SerranoLogoBranco.png'
//Tooltip
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css'
import { GetNavbarSidebarItemClass, SetTab } from '../Sidebar/SidebarUtils';
import { NotificationErro, NotificationSucesso } from '../../NotificationUtils';
import User from '../../assets/Images/User.png'
import { useNavigate } from 'react-router-dom';
import { UilChartPieAlt, UilListUl, UilUsersAlt, UilSetting, UilUserCircle, UilSignout, UilBars, UilMoon, UilBright } from '@iconscout/react-unicons'
import { GetCurrentCurrentSidebarTabFromStore, GetCurrentUserFromStore, GetCurrentUserPhotoUrlFromStore, GetCurrentUserTypePermitFromStore, LogoutUtil, ToggleTema } from '../../Functions/Middleware';
import UserPhotoModal from '../UsersList/User/UserPhotoModal/UserPhotoModal'
import UserPhoto from '../UserProfilePhoto/UserPhoto';


const NavBar = (props) => {

    const navigate = useNavigate();

    const Sair = () => {
        SetTab('Login')
        LogoutUtil()
        NotificationSucesso('Logoff', "Logoff feito com sucesso!")
    }

    const handleToggleTema = () => {
        ToggleTema()
        //window.location.reload()
    }

    const [CurrentUser, SetCurrentUser] = useState('Carregando')


    useEffect(() => {
        SetCurrentUser({ ...GetCurrentUserFromStore() })
    }, [])


    const AtivosPermit = GetCurrentUserTypePermitFromStore('VISUALIZAR_ATIVOS') || GetCurrentUserTypePermitFromStore('RETIRAR_ATIVOS') || GetCurrentUserTypePermitFromStore('ADICIONAR_ATIVOS') || GetCurrentUserTypePermitFromStore(' EDITAR_ATIVOS') || GetCurrentUserTypePermitFromStore('EXCLUIR_ATIVOS')
    const UsuariosPermit = GetCurrentUserTypePermitFromStore('VISUALIZAR_USUARIOS') || GetCurrentUserTypePermitFromStore('ADICIONAR_USUARIOS') || GetCurrentUserTypePermitFromStore(' EDITAR_USUARIOS') || GetCurrentUserTypePermitFromStore('EXCLUIR_USUARIOS')
    const ConfigPermit = GetCurrentUserTypePermitFromStore('CONFIGURACOES') || GetCurrentUserTypePermitFromStore('EDITAR_TIPOS_ATIVOS') || GetCurrentUserTypePermitFromStore('EDITAR_LOCAIS') || GetCurrentUserTypePermitFromStore('EDITAR_STATUS_ATIVOS') || GetCurrentUserTypePermitFromStore('EDITAR_TIPOS_DE_USO') || GetCurrentUserTypePermitFromStore('EDITAR_SETORES') || GetCurrentUserTypePermitFromStore('EDITAR_TIPOS_DE_USUARIO') || GetCurrentUserTypePermitFromStore('EDITAR_PERMICOES')


    const SetTabNavBar = (Tab, To) => {
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

            <div className='NavBarContainer'>

                <Navbar className='NavBar' expand={'md'} id='navBarResponsive' >
                    <Container fluid bg='dark'>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} >
                            <UilBars className='NavBarToggleIcon' />
                        </Navbar.Toggle>
                        <Navbar.Brand>
                            <div className='LogoAndCollpse'>
                                <Tooltip title="Inicio" position="bottom" >
                                    <Link to="/App/Dash" onClick={e => SetTab('Dash')}>
                                        <img alt="Logo" className="LogoNavBar" src={Logo} />
                                    </Link>
                                </Tooltip>
                            </div>
                        </Navbar.Brand>
                        <Navbar.Offcanvas id="sidebarOffCanvas" backdrop={true}>
                            <Offcanvas.Header closeButton closeVariant='white'>
                                <Offcanvas.Title>
                                    <h1>
                                        <Link className='offCanvasBrand' to="/App">
                                            <img alt="Logo" className="LogoNavBar" src={Logo} />
                                        </Link>
                                    </h1>
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body >
                                <Nav className="justify-content-end flex-grow-1 navBody ">

                                    <div className='navDiv'>
                                        <Tooltip title="Alterar o Tema" position="bottom" >
                                            <button className='ChangeThemeButton' onClick={handleToggleTema}>
                                                {props.Tema === 'Escuro' ? <UilMoon /> : <UilBright />}
                                            </button>
                                        </Tooltip>
                                        <NavDropdown title={
                                            <span className='ProfileNavLinkTitle' >
                                                {(CurrentUser.Name ? CurrentUser.Name : 'Carregando...')} {' '} {(CurrentUser.LastName) ? CurrentUser.LastName : ''}
                                            </span>}
                                        >

                                            <span to="/App/Dash" className={GetNavbarSidebarItemClass('Dash', GetCurrentCurrentSidebarTabFromStore()) + ' dropDownLink'} onClick={e => SetTabNavBar('Dash', '/App/Dash')}>
                                                <UilChartPieAlt />
                                                <span>Dashboard</span>
                                            </span>

                                            <span to="/App/Ativos" className={GetNavbarSidebarItemClass('Ativos', GetCurrentCurrentSidebarTabFromStore()) + ' dropDownLink'} onClick={e => SetTabNavBar('Ativos', '/App/Ativos')}>
                                                <UilListUl />
                                                <span>Ativos</span>
                                            </span>
                                            <span to="/App/Users" className={GetNavbarSidebarItemClass('Users', GetCurrentCurrentSidebarTabFromStore()) + ' dropDownLink'} onClick={e => SetTabNavBar('Users', '/App/Users')}>
                                                <UilUsersAlt />
                                                <span>Usuarios</span>
                                            </span>
                                            <span to="/App/Profile" className={GetNavbarSidebarItemClass('Profile', GetCurrentCurrentSidebarTabFromStore()) + ' dropDownLink'} onClick={e => SetTabNavBar('Profile', '/App/Profile')} >
                                                <UilUserCircle />
                                                <span>Meu Perfil</span>
                                            </span>
                                            <span id="NavDropDown" to="/App/Config" className={GetNavbarSidebarItemClass('Config', GetCurrentCurrentSidebarTabFromStore()) + ' dropDownLink'} onClick={e => SetTabNavBar('Config', '/App/Config')}>
                                                <UilSetting />
                                                <span>Configurações</span>
                                            </span>

                                            <NavDropdown.Divider />
                                            <span href='/' className="dropDownLink NavBarListSidebarItem" onClick={Sair}>
                                                <UilSignout /> Sair
                                            </span>
                                        </NavDropdown>
                                    </div>

                                    <div className='LastNavLogoIconContainer' onClick={e => SetTabNavBar('Profile', '/App/Profile')}>
                                        <UserPhoto src={GetCurrentUserPhotoUrlFromStore() || LogoBrancoSerrano} />
                                    </div>


                                    <div className='NavSidebarUserPhotoContainer'>
                                        <img onClick={e => setShowPhotoModal(true)} alt='User' className='NavSidebarUserPhoto' src={GetCurrentUserPhotoUrlFromStore() || User}></img>
                                    </div>

                                    <div className='NavbarSidebarUserName' onClick={e => SetTabNavBar('Profile', '/App/Profile')}>
                                        <p> {CurrentUser?.Name ? CurrentUser?.Name : 'Carregando'}</p>
                                        <p> {CurrentUser?.LastName ? CurrentUser.LastName : ''}</p>
                                    </div>

                                    <ul className='NavBarListSidebar'>
                                        <span to="/App/Dash" className={GetNavbarSidebarItemClass('Dash', GetCurrentCurrentSidebarTabFromStore())} onClick={e => SetTabNavBar('Dash', 'App/')}>
                                            <UilChartPieAlt />
                                            <span>Dashboard</span>
                                        </span>
                                        <span to="/App/Ativos" className={GetNavbarSidebarItemClass('Ativos', GetCurrentCurrentSidebarTabFromStore())} onClick={e => SetTabNavBar('Ativos', '/App/Ativos')}>
                                            <UilListUl />
                                            <span>Ativos</span>
                                        </span>
                                        <span to="/App/Users" className={GetNavbarSidebarItemClass('Users', GetCurrentCurrentSidebarTabFromStore())} onClick={e => SetTabNavBar('Users', '/App/Users')}>
                                            <UilUsersAlt />
                                            <span>Usuarios</span>
                                        </span>
                                        <span to="/App/Profile" className={GetNavbarSidebarItemClass('Profile', GetCurrentCurrentSidebarTabFromStore())} onClick={e => SetTabNavBar('Profile', '/App/Profile')}>
                                            <UilUserCircle />
                                            <span>Meu Perfil</span>
                                        </span>
                                        <span to="/App/Config" className={GetNavbarSidebarItemClass('Config', GetCurrentCurrentSidebarTabFromStore())} onClick={e => SetTabNavBar('Config', '/App/Config')}>
                                            <UilSetting />
                                            <span>Configurações</span>
                                        </span>

                                        <div className='ChangeThemeContainer'>
                                            <button className='ChangeThemeButton' onClick={handleToggleTema}>
                                                {props.Tema === 'Escuro' ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro'}
                                            </button>
                                        </div>

                                        <span to="/" className={GetNavbarSidebarItemClass('Sair', GetCurrentCurrentSidebarTabFromStore())} onClick={Sair}>
                                            <UilSignout />
                                            <span>Sair</span>
                                        </span>

                                    </ul>


                                </Nav>





                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>



            </div >

        </>
    )
}


const ConnectedNavBar = connect((state) => {
    return {
        Tema: state.Tema
    }
})(NavBar)

export default ConnectedNavBar

