import React, { useState, useEffect } from 'react'
import './UsersList.css'
import UsuarioModal from './User/UserModal'
import Loading from '../LoadingForTabs/Loading';
import User from './User/User';
import { connect } from 'react-redux'
import { v4 } from 'uuid';
import { GetFromStore } from '../../Functions/Middleware';
import { PermitIndexs } from '../../GlobalVars';
import Warning from '../LayoutComponents/Warning/Warning';
import Show from '../LayoutComponents/Show/Show';
import FilterSelect from '../LayoutComponents/FilterSelect/FilterSelect'


const UsersList = (props) => {

    //STATES
    const [SelectedUser, setSelectedUser] = useState({})
    const [ListaDeUsuarios, setListaDeUsuarios] = useState([])
    const [Loaded, setLoaded] = useState(false);
    const [FiltroDeTexto, setFiltroDeTexto] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [AddmodalShow, setAddModalShow] = useState(false);
    const [CurrentUser,] = useState(GetFromStore('CurrentUser'))
    const [Filters, setFilters] = useState([]);
    const Users = GetFromStore('Usuarios')

    //PERMITS E USER TYPE   
    var PermitToAddUsers = GetFromStore('CurrentUserType')?.Permits[PermitIndexs['ADICIONAR_USUARIOS']]

    //CHECK
    const CheckIncludesText = (What) => {
        return What.toLowerCase().includes(FiltroDeTexto.trim().toLowerCase())
    }

    //CHECK IN OBJECT
    const CheckIncludesInObject = (Item, What, Key) => {
        return What?.find(option => option.id === Item.id)
    }

    //FILL USERS LIST
    useEffect(() => {
        setListaDeUsuarios(Users.sort((a, b) => a.Name.localeCompare(b.Name)))
        setTimeout(() => {
            setLoaded(true)
        }, 500);
    }, [props.Usuarios])


    //FILTER AND SORT USERSLIST
    useEffect(() => {
        setListaDeUsuarios(
            Users.filter(Usuario => {
                //FILTER LIST
                return (
                    (FiltroDeTexto === '' || CheckIncludesText(Usuario.Name) || CheckIncludesText(Usuario.Email)) &&
                    CheckIncludesInObject(Usuario.Sector, Filters?.Sectors) &&
                    CheckIncludesInObject(Usuario.Type, Filters?.TiposUsuarios)
                )
            }).sort(
                //SORT LIST
                (a, b) => a.Name.localeCompare(b.Name)
            ))
    }, [FiltroDeTexto, Filters])


    //USER CLICK
    const handleUserClick = (UserClicked) => {
        setModalShow(true);
        setSelectedUser({ ...UserClicked });
    }

    //RESET SELECTED USER
    const ResetSelectedUser = () => {
        setModalShow(false);
        setSelectedUser({});
    }

    return (
        <div className={props.Tema === 'Escuro' ? 'UsersListContainerEscuro UsersListContainer' : 'UsersListContainerClaro UsersListContainer'}>

            <UsuarioModal FromModal={false} Users={ListaDeUsuarios} CurrentUser={CurrentUser} User={{ ...SelectedUser }} show={modalShow} onHide={() => setModalShow(false)} Function="View" onDelete={ResetSelectedUser} />

            <UsuarioModal FromModal={false} Users={ListaDeUsuarios} CurrentUser={CurrentUser} User={{}} show={AddmodalShow} onHide={() => setAddModalShow(false)} Function="Add" />

            <div className='UsersLisFormFilter'>
                <input value={FiltroDeTexto} placeholder='Procurar Usuário...' onChange={e => setFiltroDeTexto(e.target.value)}></input>
                <FilterSelect Module="FilterUsers" OnChange={setFilters} />

            </div>

            <Show Show={ListaDeUsuarios.length !== 0 || Loaded}>
                {ListaDeUsuarios.map((Item) =>
                    <div key={v4()} onClick={e => handleUserClick(Item)}>
                        <User User={Item} key={v4()} />
                    </div>
                )}
            </Show>

            <Show Show={ListaDeUsuarios.length === 0 && !Loaded}>
                <Loading />
            </Show>

            <Show Show={ListaDeUsuarios.length === 0 && Loaded}>
                <Warning Text='Nenhum Usuário encontrado' />
            </Show>

            <Show Show={PermitToAddUsers}>
                <button className='UsersListAddUserButton' onClick={e => setAddModalShow(true)}>
                    Adicionar Usuário
                </button>
            </Show>

        </div>
    )
}



const ConnectedUsersList = connect((state) => {
    return {
        LoggedUser: state.LoggedUser,
        Usuarios: state.Usuarios,
        Tema: state.Tema
    }
})(UsersList)

export default ConnectedUsersList