import React, { useState, useEffect } from 'react'
import './UsersList.css'
import UsuarioModal from './User/UsuarioModal'
import Loading from '../LoadingForTabs/Loading';
import User from './User/User';
import { connect } from 'react-redux'
import { v4 } from 'uuid';
import { MdFilterList } from 'react-icons/md';
import Dropdown from 'react-bootstrap/Dropdown';
import { UilExclamationCircle } from '@iconscout/react-unicons'
import { GetCurrentUserFromStore, GetCurrentUserTypeFromStore, GetSetoresSelect, GetUsersFromStore, GetUsersTypesSelect } from '../../Functions/Middleware';
import { PermitIndexs } from '../../GlobalVars';



const UsersList = (props) => {

    const [SelectedUser, setSelectedUser] = useState({})
    const [ListaDeUsuarios, setListaDeUsuarios] = useState([])
    const [SetoresOptions, setSetoresOptions] = useState([])
    const [SetorLabel, setSetorLabel] = useState('')
    const [TypeLabel, setTypeLabel] = useState('')
    const [UserTypesOptions, setUserTypesOptions] = useState([])
    const [Loaded, setLoaded] = useState(false);
    const [FiltroDeTexto, setFiltroDeTexto] = useState('');
    const [FiltroSetor, setFiltroSetor] = useState('Todos');
    const [FiltroTipo, setFiltroTipo] = useState('Todos');

    const [modalShow, setModalShow] = useState(false);
    const [AddmodalShow, setAddModalShow] = useState(false);
    const [CurrentUser,] = useState(GetCurrentUserFromStore())

    //PERMITS E USER TYPE
    const [CurrentUserType] = useState(GetCurrentUserTypeFromStore())    
    var PermitToAddUsers = CurrentUserType?.Permits[PermitIndexs['ADICIONAR_USUARIOS']]
 



    useEffect(() => {
        GetUsersTypesSelect().then(Options => { setUserTypesOptions(Options) })
        GetSetoresSelect().then(Options => { setSetoresOptions(Options) })
    }, [])


    useEffect(() => {
        const Users = GetUsersFromStore()
        setListaDeUsuarios(Users.sort((a, b) => a.Name.localeCompare(b.Name)))
        setLoaded(true)
    }, [props.Usuarios])


    useEffect(() => {
        const Users = GetUsersFromStore()
        setListaDeUsuarios(Users.filter(Usuario => {
            const TextFilter = FiltroDeTexto === '' || (Usuario.Name.toLowerCase().includes(FiltroDeTexto.toLowerCase()) || Usuario.Email.toLowerCase().includes(FiltroDeTexto.toLowerCase()))
            const SetorFilter = FiltroSetor === 'Todos' || FiltroSetor === '' || Usuario.Sector.id === FiltroSetor
            const TipoFilter = FiltroTipo === 'Todos' || FiltroTipo === '' || Usuario.Type.id === FiltroTipo
            return TextFilter && SetorFilter && TipoFilter
        }).sort((a, b) => a.Name.localeCompare(b.Name)))

        setLoaded(true)

    }, [FiltroDeTexto, FiltroSetor, FiltroTipo])



    const handleSetorOptionChange = (Setor) => {
        setFiltroSetor(Setor.value)
        setSetorLabel(Setor.label)
    }

    const handleTypeOptionChange = (Type) => {
        setFiltroTipo(Type.value)
        setTypeLabel(Type.label)
    }

    const handleResetFiltros = () => {
        setFiltroDeTexto('')
        setFiltroSetor('')
        setFiltroTipo('')
    }


    const handleUserClick = (UserClicked) => {
        //console.log("CLICKsa")
        setModalShow(true);
        setSelectedUser({ ...UserClicked });
    }

    const ResetSelectedUser = (UserClicked) => {
        setModalShow(false);
        setSelectedUser({}); 
    }



    return (
        <div className={props.Tema === 'Escuro' ? 'UsersListContainerEscuro UsersListContainer' : 'UsersListContainerClaro UsersListContainer'}>

            <UsuarioModal FromModal={false} Users={ListaDeUsuarios} CurrentUser={CurrentUser} User={{ ...SelectedUser }} show={modalShow} onHide={() => setModalShow(false)} Function="View" onDelete={ResetSelectedUser} />
            
            <UsuarioModal FromModal={false}Users={ListaDeUsuarios} CurrentUser={CurrentUser} User={{}} show={AddmodalShow} onHide={() => setAddModalShow(false)} Function="Add" />

            <div className='UsersLisFormFilter'>
                <input value={FiltroDeTexto} placeholder='Procurar Usuário...' onChange={e => setFiltroDeTexto(e.target.value)}></input>
                <Dropdown autoClose="outside">
                    <Dropdown.Toggle id="Filtros">
                        <div className='FiltrosTitle'>
                            Filtros
                            <MdFilterList />
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>

                        <Dropdown.Item id='FiltrosItem'>

                            <Dropdown>
                                <Dropdown.Toggle id="FiltroDeSetor">
                                    <div className='FiltroDeSetorTitle'>
                                        {(FiltroSetor !== 'Todos' && FiltroSetor) ? SetorLabel : 'Filtro de Setor'}
                                        <MdFilterList />
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {SetoresOptions.map(Setor => {
                                        return <Dropdown.Item key={v4()} onClick={e => handleSetorOptionChange(Setor)} >{Setor.label}</Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>



                            <Dropdown>
                                <Dropdown.Toggle id="FiltroDeTipo">
                                    <div className='FiltroDeTipoTitle'>
                                        {(FiltroTipo !== 'Todos' && FiltroTipo) ? TypeLabel : 'Tipo de Usuário'}
                                        <MdFilterList />
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {UserTypesOptions.map(Type => {
                                        return <Dropdown.Item key={v4()} onClick={e => handleTypeOptionChange(Type)} >{Type.label}</Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>


                        </Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>

                <button onClick={handleResetFiltros}>Limpar Filtro</button>
            </div>





            {(ListaDeUsuarios.length !== 0 || Loaded) && ListaDeUsuarios.map((Item, Index) => {
                return <div key={v4()} onClick={e => handleUserClick(Item)}>
                    <User User={Item} key={v4()} />
                </div>
            })}

            {ListaDeUsuarios.length === 0 && !Loaded && <Loading />}

            {ListaDeUsuarios.length === 0 && Loaded && <div className='FilterNoResultsContainer'>
                <UilExclamationCircle />
                <h3>Nenhum Usuário encontrado</h3>
            </div>}


            {PermitToAddUsers &&
                <button className='UsersListAddUserButton' onClick={e => setAddModalShow(true)}>
                    Adicionar Usuário
                </button>
            }

        </div>
    )
}



const ConnectedUsersList = connect((state) => {
    return {
        LoggedUser: state.LoggedUser,
        Usuarios: state.Usuarios,
        Tema : state.Tema
    }
})(UsersList)

export default ConnectedUsersList