import React, { useState } from 'react'
import './UsersList.css'
import UserModal from './User/UserModal'
import Loading from '../LoadingForTabs/Loading';
import User from './User/User';
import { connect } from 'react-redux'
import { v4 } from 'uuid';
import { GetFromStore } from '../../Functions/StoreMiddleware';
import { PermitIndexs } from '../../GlobalVars';
import Warning from '../LayoutComponents/Warning/Warning';
import Show from '../LayoutComponents/Show/Show';
import FilterSelect from '../LayoutComponents/FilterSelect/FilterSelect'
import OrderBy from '../LayoutComponents/OrderBy/OrderBy'
import { GetNameFromStoreWithId } from '../../Functions/StoreMiddleware';
import SectionTitle from '../LayoutComponents/SectionTitle/SectionTitle';

const UsersList = (props) => {

    //STATES
    const [SelectedUser, setSelectedUser] = useState({})
    //const [ListaDeUsers, setListaDeUsers] = useState([])
    var ListaDeUsers = []
    const [Loaded, setLoaded] = useState(true);
    const [FiltroDeTexto, setFiltroDeTexto] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [AddmodalShow, setAddModalShow] = useState(false);
    const [Filters, setFilters] = useState([]);
    const Users = GetFromStore('Users')
    const [ResetFilters, setResetFilters] = useState(false);
    const [OrdenarPor, setOrdenarPor] = useState('Nome');

    //PERMITS E USER TYPE   
    const [CurrentUserType] = useState(props.UserTypes.find(Type => Type.id === props.CurrentUser.Type.id))
    var PermitToAddUsers = CurrentUserType?.Permits[PermitIndexs['ADD_USERS']]

    //CHECK
    const CheckIncludesText = (What) =>
        What.toLowerCase().includes(FiltroDeTexto.trim().toLowerCase())


    //CHECK IN OBJECT
    const CheckIncludesInObject = (Item, What, Key) =>
        What?.find(option => option.id === Item.id)

    setTimeout(() => {
        setLoaded(true)
    }, 1000);


    ListaDeUsers = Users.filter(User => {
        //FILTER LIST
        const Sector = GetNameFromStoreWithId("Sectors", User.Sector.id)
        const Type = GetNameFromStoreWithId('UserTypes', User.Type.id)

        return (
            (FiltroDeTexto === '' || CheckIncludesText(User.Name) || CheckIncludesText(User.Email) || CheckIncludesText(Sector) || CheckIncludesText(Type)) &&
            CheckIncludesInObject(User.Sector, Filters?.Sectors) &&
            CheckIncludesInObject(User.Type, Filters?.UserTypes)
        )
    }).sort(
        //SORT LIST
        (Primeiro, Segundo) => {

            const SectorPrimeiro = GetNameFromStoreWithId("Sectors", Primeiro.Sector.id)
            const SectorSegundo = GetNameFromStoreWithId("Sectors", Segundo.Sector.id)
            const TypePrimeiro = GetNameFromStoreWithId('UserTypes', Primeiro.Type.id)
            const TypeSegundo = GetNameFromStoreWithId('UserTypes', Segundo.Type.id)

            switch (OrdenarPor) {
                case 'Nome':
                    return Primeiro.Name.localeCompare(Segundo.Name)
                case 'Email':
                    return Primeiro.Email.localeCompare(Segundo.Email)
                case 'Setor':
                    return SectorPrimeiro.localeCompare(SectorSegundo)
                case 'Tipo':
                    return TypePrimeiro.localeCompare(TypeSegundo)
                case 'Data de Adição':
                    return Primeiro.CreatedAt < Segundo.CreatedAt ? 1 : -1
                case 'Última edição':
                    return Primeiro.LastEditedAt < Segundo.LastEditedAt ? 1 : -1
                default:
                    return Primeiro.Name.localeCompare(Segundo.Name)
            }
        }
    )



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
        <div className={props.Tema === 'Dark' ? 'UsersListContainerDark UsersListContainer' : 'UsersListContainerLightTheme UsersListContainer'}>

            <UserModal FromModal={false} Users={ListaDeUsers} CurrentUser={props.CurrentUser} User={{ ...SelectedUser }} show={modalShow} onHide={() => setModalShow(false)} Function="View" onDelete={ResetSelectedUser} />

            <UserModal FromModal={false} Users={ListaDeUsers} CurrentUser={props.CurrentUser} User={{}} show={AddmodalShow} onHide={() => setAddModalShow(false)} Function="Add" />

            <SectionTitle>Lista de Usuários</SectionTitle>

            <div className='UsersLisFormFilter'>
                <input value={FiltroDeTexto} placeholder='Procurar Usuário...' onChange={e => setFiltroDeTexto(e.target.value)}></input>
                <FilterSelect Module="FilterUsers" OnChange={setFilters} />
                <OrderBy
                    Module="Users"
                    OnChange={(SelectedOption) => setOrdenarPor(SelectedOption.Value)}
                    Reset={ResetFilters}
                />
            </div>

            <Show Show={ListaDeUsers.length !== 0 || Loaded}>
                {ListaDeUsers.map((Item) =>
                    <div key={v4()} onClick={e => handleUserClick(Item)}>
                        <User User={Item} key={v4()} />
                    </div>
                )}
            </Show>

            <Show Show={ListaDeUsers.length === 0 && !Loaded}>
                <Loading />
            </Show>

            <Show Show={ListaDeUsers.length === 0 && Loaded}>
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
        Users: state.Users,
        Tema: state.Tema,
        CurrentUser: state.CurrentUser,
        UserTypes: state.UserTypes
    }
})(UsersList)

export default ConnectedUsersList