//Dependencias
import React, { useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

//Images

//Tooltip
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import { GetNavbarSidebarItemClass, SetTab } from "../Sidebar/SidebarUtils";
import { NotificationErro, NotificationSucesso } from "../../NotificationUtils";

import { useNavigate } from "react-router-dom";
import {
  UilChartPieAlt,
  UilListUl,
  UilUsersAlt,
  UilSetting,
  UilUserCircle,
  UilSignout,
  UilBars,
  UilMoon,
  UilBright,
  UilHistory,
  UilTicket,
} from "@iconscout/react-unicons";
import { ToggleTema } from "../../Functions/StoreMiddleware";
import UserPhotoModal from "../UsersList/User/UserPhotoModal/UserPhotoModal";
import UserPhoto from "../UserProfilePhoto/UserPhoto";
import { User as UserIcon } from "lucide-react";
import {
  AssetsTela,
  ConfigTela,
  UsersTela,
} from "../../Functions/PermitsMiddleware";
import { LogoutUtil } from "../../Functions/AuthMiddleware";

const NavBar = (props) => {
  //STATES
  const navigate = useNavigate();
  const [ShowPhotoModal, setShowPhotoModal] = useState(false);

  //LOGOUT
  const Sair = () => {
    SetTab("Login");
    LogoutUtil();
    NotificationSucesso("Logoff", "Logoff feito com sucesso!");
  };

  // CHANGE APP THEME
  const handleToggleTema = () => {
    ToggleTema(props.CurrentUser);
  };

  //SET NAVBAR TAB WITH PERMITS
  const SetTabNavBar = (Tab, To) => {
    if (Tab === "Dash") {
      SetTab(Tab);
      navigate(To);
    } else if (Tab === "Profile") {
      navigate(To);
    } else if (Tab === "Records") {
      SetTab(Tab);
      navigate(To);
    } else if (Tab === "Assets" && AssetsTela()) {
      SetTab(Tab);
      navigate(To);
    } else if (Tab === "Users" && UsersTela()) {
      SetTab(Tab);
      navigate(To);
    } else if (Tab === "Config" && ConfigTela()) {
      SetTab(Tab);
      navigate(To);
    } else if (Tab === "Requests") {
      SetTab(Tab);
      navigate(To);
    } else
      NotificationErro(
        "Não Autorizado",
        "Você não possui permissão para acessar essa aba, solicite acesso ao seu Administrador",
      );
  };

  //ONCHANGE PHOTO
  const onChangePhoto = () => {};

  return (
    <>
      <UserPhotoModal
        Add={false}
        OnChangePhoto={onChangePhoto}
        User={props.CurrentUser}
        IsCurrentUser={true}
        show={ShowPhotoModal}
        onHide={() => setShowPhotoModal(false)}
      />

      <div className="NavBarContainer">
        <Navbar className="NavBar" expand={"md"} id="navBarResponsive">
          <Container fluid bg="dark">
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`}>
              <UilBars className="NavBarToggleIcon" />
            </Navbar.Toggle>
            <Navbar.Brand>
              <div
                className="LogoAndCollpse"
                style={{ display: "flex", alignItems: "center" }}>
                <Tooltip
                  title="Recolher/Expandir barra lateral"
                  position="bottom">
                  <div className="NavBar-HamburguerNav">
                    <UilBars />
                  </div>
                </Tooltip>

                <Tooltip title="Inicio" position="bottom"></Tooltip>

                <div
                  className="d-flex align-items-center "
                  style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: "1.2rem",
                    gap: "0.8rem",
                  }}>
                  <img
                    src="https://cdn.bkappi.com/ProjectsAssets/BkappiGeneral/bkappiIcon.ico"
                    alt="AssetSense Icon"
                    style={{
                      width: "25px",
                      height: "25px",
                      borderRadius: "5px",
                    }}
                  />
                  <span>AssetSense</span>
                </div>
              </div>
            </Navbar.Brand>

            <Navbar.Offcanvas id="sidebarOffCanvas" backdrop={true}>
              <Offcanvas.Header closeButton closeVariant="white">
                <Offcanvas.Title>
                  <h1>
                    <Link className="offCanvasBrand" to="/Assets">
                      <img
                        alt="Logo"
                        className="LogoNavBar"
                        src={props.TenantPhotos.NavNameLogo}
                      />
                    </Link>
                  </h1>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 navBody ">
                  <div className="navDiv">
                    <Tooltip title="Alterar o Tema" position="bottom">
                      <button
                        className="ChangeThemeButton"
                        onClick={handleToggleTema}>
                        {props.Tema === "Dark" ? <UilMoon /> : <UilBright />}
                      </button>
                    </Tooltip>
                    <NavDropdown
                      title={
                        <span className="ProfileNavLinkTitle">
                          {props.CurrentUser.Name
                            ? props.CurrentUser.Name
                            : "Carregando..."}{" "}
                          {props.CurrentUser.LastName
                            ? props.CurrentUser.LastName
                            : ""}
                        </span>
                      }>
                      <span
                        className={
                          GetNavbarSidebarItemClass(
                            "Dash",
                            props.LoggedUser.CurrentSidebarTab,
                          ) + " dropDownLink"
                        }
                        onClick={(e) => SetTabNavBar("Dash", "/Assets/Dash")}>
                        <UilChartPieAlt />
                        <span>Dashboard</span>
                      </span>

                      <span
                        className={
                          GetNavbarSidebarItemClass(
                            "Assets",
                            props.LoggedUser.CurrentSidebarTab,
                          ) + " dropDownLink"
                        }
                        onClick={(e) =>
                          SetTabNavBar("Assets", "/Assets/Assets")
                        }>
                        <UilListUl />
                        <span>Ativos</span>
                      </span>
                      <span
                        className={
                          GetNavbarSidebarItemClass(
                            "Users",
                            props.LoggedUser.CurrentSidebarTab,
                          ) + " dropDownLink"
                        }
                        onClick={(e) => SetTabNavBar("Users", "/Assets/Users")}>
                        <UilUsersAlt />
                        <span>Usuários</span>
                      </span>
                      <span
                        className={
                          GetNavbarSidebarItemClass(
                            "Profile",
                            props.LoggedUser.CurrentSidebarTab,
                          ) + " dropDownLink"
                        }
                        onClick={(e) =>
                          SetTabNavBar("Profile", "/Assets/Profile")
                        }>
                        <UilUserCircle />
                        <span>Meu Perfil</span>
                      </span>
                      <span
                        className={
                          GetNavbarSidebarItemClass(
                            "Config",
                            props.LoggedUser.CurrentSidebarTab,
                          ) + " dropDownLink"
                        }
                        onClick={(e) =>
                          SetTabNavBar("Config", "/Assets/Config")
                        }>
                        <UilSetting />
                        <span>Configurações</span>
                      </span>

                      <span
                        className={
                          GetNavbarSidebarItemClass(
                            "Records",
                            props.LoggedUser.CurrentSidebarTab,
                          ) + " dropDownLink"
                        }
                        onClick={(e) =>
                          SetTabNavBar("Records", "/Assets/Records")
                        }>
                        <UilHistory />
                        <span>Registros</span>
                      </span>

                      <span
                        className={
                          GetNavbarSidebarItemClass(
                            "Requests",
                            props.LoggedUser.CurrentSidebarTab,
                          ) + " dropDownLink"
                        }
                        onClick={(e) =>
                          SetTabNavBar("Requests", "/Assets/Requests")
                        }>
                        <UilTicket />
                        <span>Solicitações</span>
                      </span>

                      <NavDropdown.Divider />
                      <span
                        href="/"
                        className="dropDownLink NavBarListSidebarItem"
                        onClick={Sair}>
                        <UilSignout /> Sair
                      </span>
                    </NavDropdown>
                  </div>

                  <div
                    className="LastNavLogoIconContainer"
                    onClick={(e) => SetTabNavBar("Profile", "/Assets/Profile")}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(255,255,255,0.2)",
                      }}>
                      <UserIcon color="white" size={20} />
                    </div>
                  </div>

                  <div className="NavSidebarUserPhotoContainer">
                    <div
                      onClick={(e) => setShowPhotoModal(true)}
                      className="NavSidebarUserPhoto"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(255,255,255,0.2)",
                        cursor: "pointer",
                      }}>
                      <UserIcon color="white" size={40} />
                    </div>
                  </div>

                  <div
                    className="NavbarSidebarUserName"
                    onClick={(e) => SetTabNavBar("Profile", "/Assets/Profile")}>
                    <p>
                      {" "}
                      {props.CurrentUser?.Name
                        ? props.CurrentUser?.Name
                        : "Carregando"}
                    </p>
                    <p>
                      {" "}
                      {props.CurrentUser?.LastName
                        ? props.CurrentUser.LastName
                        : ""}
                    </p>
                  </div>

                  <ul className="NavBarListSidebar">
                    <span
                      className={GetNavbarSidebarItemClass(
                        "Dash",
                        props.LoggedUser.CurrentSidebarTab,
                      )}
                      onClick={(e) => SetTabNavBar("Dash", "/Assets/Dash")}>
                      <UilChartPieAlt />
                      <span>Dashboard</span>
                    </span>
                    <span
                      className={GetNavbarSidebarItemClass(
                        "Assets",
                        props.LoggedUser.CurrentSidebarTab,
                      )}
                      onClick={(e) => SetTabNavBar("Assets", "/Assets/Assets")}>
                      <UilListUl />
                      <span>Ativos</span>
                    </span>
                    <span
                      className={GetNavbarSidebarItemClass(
                        "Users",
                        props.LoggedUser.CurrentSidebarTab,
                      )}
                      onClick={(e) => SetTabNavBar("Users", "/Assets/Users")}>
                      <UilUsersAlt />
                      <span>Usuários</span>
                    </span>
                    <span
                      className={GetNavbarSidebarItemClass(
                        "Profile",
                        props.LoggedUser.CurrentSidebarTab,
                      )}
                      onClick={(e) =>
                        SetTabNavBar("Profile", "/Assets/Profile")
                      }>
                      <UilUserCircle />
                      <span>Meu Perfil</span>
                    </span>
                    <span
                      className={GetNavbarSidebarItemClass(
                        "Config",
                        props.LoggedUser.CurrentSidebarTab,
                      )}
                      onClick={(e) => SetTabNavBar("Config", "/Assets/Config")}>
                      <UilSetting />
                      <span>Configurações</span>
                    </span>

                    <span
                      className={GetNavbarSidebarItemClass(
                        "Records",
                        props.LoggedUser.CurrentSidebarTab,
                      )}
                      onClick={(e) =>
                        SetTabNavBar("Records", "/Assets/Records")
                      }>
                      <UilSetting />
                      <span>Registros</span>
                    </span>

                    <span
                      className={GetNavbarSidebarItemClass(
                        "Requests",
                        props.LoggedUser.CurrentSidebarTab,
                      )}
                      onClick={(e) =>
                        SetTabNavBar("Requests", "/Assets/Requests")
                      }>
                      <UilTicket />
                      <span>Solicitações</span>
                    </span>

                    <div className="ChangeThemeContainer">
                      <button
                        className="ChangeThemeButton"
                        onClick={handleToggleTema}>
                        {props.Tema === "Dark" ? <UilMoon /> : <UilBright />}
                      </button>
                    </div>

                    <span
                      to="/"
                      className={GetNavbarSidebarItemClass(
                        "Sair",
                        props.LoggedUser.CurrentSidebarTab,
                      )}
                      onClick={Sair}>
                      <UilSignout />
                      <span>Sair</span>
                    </span>
                  </ul>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

const ConnectedNavBar = connect((state) => {
  return {
    Tema: state.Tema,
    Users: state.Users,
    TenantPhotos: state.TenantPhotos,
    CurrentUser: state.CurrentUser,
    LoggedUser: state.LoggedUser,
  };
})(NavBar);

export default ConnectedNavBar;
