//Dependencias
import React, { useEffect, useState } from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
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
import { UilChartPieAlt, UilListUl, UilUsersAlt, UilSetting, UilUserCircle, UilSignout, UilBars, UilMoon, UilBright, UilHistory } from '@iconscout/react-unicons'
import { GetFromStore, GetLoggedUserInfo, LogoutUtil, ToggleTema } from '../../Functions/Middleware';
import UserPhotoModal from '../UsersList/User/UserPhotoModal/UserPhotoModal'
import UserPhoto from '../UserProfilePhoto/UserPhoto';
import { AtivosTela, ConfigTela, UsuariosTela } from '../../Functions/Permits';



const NavBar = (props) => {

    //STATES 
    const navigate = useNavigate();
    const [CurrentUser, SetCurrentUser] = useState('Carregando')
    const [ShowPhotoModal, setShowPhotoModal] = useState(false)

    //LOGOUT
    const Sair = () => {
        SetTab('Login')
        LogoutUtil()
        NotificationSucesso('Logoff', "Logoff feito com sucesso!")
    }

    // CHANGE APP THEME
    const handleToggleTema = () => { ToggleTema() }

    // SET CURRENT USER ALWAYS WHEN USERS CHANGE
    useEffect(() => {
        SetCurrentUser({ ...GetFromStore('CurrentUser') })
    }, [props.Usuarios])


    //SET NAVBAR TAB WITH PERMITS
    const SetTabNavBar = (Tab, To) => {
        if (Tab === 'Dash') {
            SetTab(Tab)
            navigate(To)
        } else if (Tab === 'Profile') {
            navigate(To)
        } else if (Tab === 'Records') {
            SetTab(Tab)
            navigate(To)
        } else if (Tab === 'Ativos' && AtivosTela()) {
            SetTab(Tab)
            navigate(To)
        } else if (Tab === 'Users' && UsuariosTela()) {
            SetTab(Tab)
            navigate(To)
        } else if (Tab === 'Config' && ConfigTela()) {
            SetTab(Tab)
            navigate(To)
        } else
            NotificationErro("Não Autorizado", "Você não possui permissão para acessar essa aba, solicite acesso ao seu Administrador")
    }

    //ONCHANGE PHOTO
    const onChangePhoto = () => { }

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

                                <Tooltip title="Recolher/Expandir barra lateral" position="bottom" >
                                    <div className='NavBar-HamburguerNav'>
                                        <UilBars />
                                    </div>
                                </Tooltip>

                                <Tooltip title="Inicio" position="bottom" >
                                    <Link to="/Assets/Dash" onClick={e => SetTab('Dash')}>
                                        <img alt="Logo" className="LogoNavBar" src={Logo} />
                                    </Link>
                                </Tooltip>
                            </div>
                        </Navbar.Brand>
                        <Navbar.Offcanvas id="sidebarOffCanvas" backdrop={true}>
                            <Offcanvas.Header closeButton closeVariant='white'>
                                <Offcanvas.Title>
                                    <h1>
                                        <Link className='offCanvasBrand' to="/Assets">
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
                                        <NavDropdown

                                            title={
                                                <span className='ProfileNavLinkTitle' >
                                                    {(CurrentUser.Name ? CurrentUser.Name : 'Carregando...')} {' '} {(CurrentUser.LastName) ? CurrentUser.LastName : ''}
                                                </span>}
                                        >

                                            <span className={GetNavbarSidebarItemClass('Dash', GetLoggedUserInfo('CurrentSidebarTab')) + ' dropDownLink'} onClick={e => SetTabNavBar('Dash', '/Assets/Dash')}>
                                                <UilChartPieAlt />
                                                <span>Dashboard</span>
                                            </span>

                                            <span className={GetNavbarSidebarItemClass('Ativos', GetLoggedUserInfo('CurrentSidebarTab')) + ' dropDownLink'} onClick={e => SetTabNavBar('Ativos', '/Assets/Ativos')}>
                                                <UilListUl />
                                                <span>Ativos</span>
                                            </span>
                                            <span className={GetNavbarSidebarItemClass('Users', GetLoggedUserInfo('CurrentSidebarTab')) + ' dropDownLink'} onClick={e => SetTabNavBar('Users', '/Assets/Users')}>
                                                <UilUsersAlt />
                                                <span>Usuarios</span>
                                            </span>
                                            <span className={GetNavbarSidebarItemClass('Profile', GetLoggedUserInfo('CurrentSidebarTab')) + ' dropDownLink'} onClick={e => SetTabNavBar('Profile', '/Assets/Profile')} >
                                                <UilUserCircle />
                                                <span>Meu Perfil</span>
                                            </span>
                                            <span className={GetNavbarSidebarItemClass('Config', GetLoggedUserInfo('CurrentSidebarTab')) + ' dropDownLink'} onClick={e => SetTabNavBar('Config', '/Assets/Config')}>
                                                <UilSetting />
                                                <span>Configurações</span>
                                            </span>

                                            <span className={GetNavbarSidebarItemClass('Records', GetLoggedUserInfo('CurrentSidebarTab')) + ' dropDownLink'} onClick={e => SetTabNavBar('Records', '/Assets/Records')}>
                                                <UilHistory />
                                                <span>Registros</span>
                                            </span>

                                            <NavDropdown.Divider />
                                            <span href='/' className="dropDownLink NavBarListSidebarItem" onClick={Sair}>
                                                <UilSignout /> Sair
                                            </span>
                                        </NavDropdown>
                                    </div>

                                    <div className='LastNavLogoIconContainer' onClick={e => SetTabNavBar('Profile', '/Assets/Profile')}>
                                        <UserPhoto src={GetLoggedUserInfo('PhotoUrl') || LogoBrancoSerrano} />
                                    </div>


                                    <div className='NavSidebarUserPhotoContainer'>
                                        <img onClick={e => setShowPhotoModal(true)} alt='User' className='NavSidebarUserPhoto' src={GetLoggedUserInfo('PhotoUrl') || User}></img>
                                    </div>

                                    <div className='NavbarSidebarUserName' onClick={e => SetTabNavBar('Profile', '/Assets/Profile')}>
                                        <p> {CurrentUser?.Name ? CurrentUser?.Name : 'Carregando'}</p>
                                        <p> {CurrentUser?.LastName ? CurrentUser.LastName : ''}</p>
                                    </div>

                                    <ul className='NavBarListSidebar'>
                                        <span className={GetNavbarSidebarItemClass('Dash', GetLoggedUserInfo('CurrentSidebarTab'))} onClick={e => SetTabNavBar('Dash', '/Assets/Dash')}>
                                            <UilChartPieAlt />
                                            <span>Dashboard</span>
                                        </span>
                                        <span className={GetNavbarSidebarItemClass('Ativos', GetLoggedUserInfo('CurrentSidebarTab'))} onClick={e => SetTabNavBar('Ativos', '/Assets/Ativos')}>
                                            <UilListUl />
                                            <span>Ativos</span>
                                        </span>
                                        <span className={GetNavbarSidebarItemClass('Users', GetLoggedUserInfo('CurrentSidebarTab'))} onClick={e => SetTabNavBar('Users', '/Assets/Users')}>
                                            <UilUsersAlt />
                                            <span>Usuarios</span>
                                        </span>
                                        <span className={GetNavbarSidebarItemClass('Profile', GetLoggedUserInfo('CurrentSidebarTab'))} onClick={e => SetTabNavBar('Profile', '/Assets/Profile')}>
                                            <UilUserCircle />
                                            <span>Meu Perfil</span>
                                        </span>
                                        <span className={GetNavbarSidebarItemClass('Config', GetLoggedUserInfo('CurrentSidebarTab'))} onClick={e => SetTabNavBar('Config', '/Assets/Config')}>
                                            <UilSetting />
                                            <span>Configurações</span>
                                        </span>

                                        <span className={GetNavbarSidebarItemClass('Records', GetLoggedUserInfo('CurrentSidebarTab'))} onClick={e => SetTabNavBar('Records', '/Assets/Records')}>
                                            <UilSetting />
                                            <span>Registros</span>
                                        </span>

                                        <div className='ChangeThemeContainer'>
                                            <button className='ChangeThemeButton' onClick={handleToggleTema}>
                                                {props.Tema === 'Escuro' ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro'}
                                            </button>
                                        </div>

                                        <span to="/" className={GetNavbarSidebarItemClass('Sair', GetLoggedUserInfo('CurrentSidebarTab'))} onClick={Sair}>
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
        Tema: state.Tema,
        Usuarios: state.Usuarios
    }
})(NavBar)

export default ConnectedNavBar

