import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect, useRef } from 'react'
import './UserModal.css'
import UserPhoto from '../../../assets/Images/SerranoLogoFuncoBranco.jpg'
import { UilUserCircle, UilClipboardNotes, UilEnvelope, UilPhone, UilMap, UilMapMarker, UilPen, UilPuzzlePiece, UilLabel, UilListUl, UilSave, UilHistory, UilTimes, UilBuilding, UilKeySkeleton, UilCheck, UilBackward, UilTrash } from '@iconscout/react-unicons'
import { AddUser, AddUserFirebase, DeleteUser, EditUser, GetCurrentUserFromStore, GetCurrentUserSetorNameWithIdFromStore, GetCurrentUserTypeFromStore, GetCurrentUserTypeNameWithIdFromStore, GetCurrentUserTypeWithIdFromStore, GetSetoresFromStore, GetUserTypesFromStore, GetUserWithIdFromStore, LoginUtil, RegisterUser, ReturnAllAtivosOfUserWithId } from '../../../Functions/Middleware'
import { DefaultUser } from '../../../Data/Items';
import { DefaultSetor, DefaultUserType } from '../../../Data/Items';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import { connect } from 'react-redux'
import { NotificationAlerta, NotificationErro, NotificationSucesso } from '../../../NotificationUtils';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { PermitIndexs } from '../../../GlobalVars'
import { noOptionsMessage, UserModalSelectcustomStyles } from './UserModalUtils';
import { v4 } from 'uuid';
import { mudarSenha } from '../../../Config/firebase/auth';
import UserAtivoRecords from './UserAtivoRecords/UserAtivoRecords';



const UserModal = (props) => {

    const [Tab, setTab] = useState('UserInfo')



    const [UserType, setUserType] = useState({ ...DefaultUserType })
    const [User, setUser] = useState({ ...DefaultUser })
    const [UserSetor, setUserSetor] = useState({ ...DefaultSetor })
    const [Setores] = useState(GetSetoresFromStore())
    const [TiposUsuarios] = useState(GetUserTypesFromStore())

    //Confirm 
    const [ConfirmAction, SetConfirmAction] = useState('')
    const [Confirm, SetConfirm] = useState(false)
    const [ConfirmMessage, SetConfirmMessage] = useState('')
    const [ConfirmBtAction, SetConfirmBtAction] = useState('')
    const [ConfirmBtBack, SetConfirmBtBack] = useState('')

    //CURRENT USER AND PERMITS
    const [CurrentUserType] = useState(GetCurrentUserTypeFromStore())
    var IsCurrentUser = false
    var IsAdmin = false
    var CanEdit = false

    //SENHA
    const SenhaAtual = useRef()
    const NovaSenha = useRef()

    //COPIAS DAS INFORMAÇÔES DO USER
    const [CopyUserName, setCopyUserName] = useState('')
    const [CopyUserEmail, setCopyUserEmail] = useState('')
    const [CopyUserLastName, setCopyUserLastName] = useState('')
    const [CopyUserPhone, setCopyUserPhone] = useState('')
    const [CopyUserCountry, setCopyUserCountry] = useState('')
    const [CopyUserEstate, setCopyUserEstate] = useState('')
    const [CopyUserCity, setCopyUserCity] = useState('')
    const [CopyUserType, setCopyUserType] = useState({})
    const [CopyUserSector, setCopyUserSector] = useState({})
    //COPIAS DAS INFORMAÇÔES DO USER

    const [IsEdited, setIsEdited] = useState(false)


    //PERMISSOES
    IsAdmin = CurrentUserType?.IsAdmin
    var PermitToEditUsers = CurrentUserType?.Permits[PermitIndexs['EDITAR_USUARIOS']]
    var PermitToDeleteUsers = CurrentUserType?.Permits[PermitIndexs['EXCLUIR_USUARIOS']]
    IsCurrentUser = props.User?.id === GetCurrentUserFromStore()?.id
    CanEdit = IsCurrentUser || IsAdmin || PermitToEditUsers
    //PERMISSOES

    const FillCopyes = (UserCopy) => {
        setCopyUserName(UserCopy?.Name)
        setCopyUserLastName(UserCopy?.LastName)
        setCopyUserPhone(UserCopy?.Phone)
        setCopyUserCountry(UserCopy?.Country)
        setCopyUserEstate(UserCopy?.Estate)
        setCopyUserCity(UserCopy?.City)
        setCopyUserSector(UserCopy?.Sector)
        setCopyUserType(UserCopy?.Type)
    }

    const CancelEditions = () => {
        FillCopyes(User)
    }

    const HandleChangeInfo = (Info, Value) => {
        if (CanEdit) {
            if (Info === 'Name')
                setCopyUserName(Value)
            else if (Info === 'LastName')
                setCopyUserLastName(Value)
            else if (Info === 'Phone')
                setCopyUserPhone(Value)
            else if (Info === 'Estate')
                setCopyUserEstate(Value)
            else if (Info === 'Country')
                setCopyUserCountry(Value)
            else if (Info === 'City')
                setCopyUserCity(Value)
        }
        if ((CanEdit || IsAdmin) || PermitToEditUsers) {
            if (Info === 'Sector')
                setCopyUserSector({ id: Value })
            else if (Info === 'Type')
                setCopyUserType({ id: Value })
        }

        if (props.Function === 'Add') {
            if (Info === 'Email')
                setCopyUserEmail(Value)
        }
    }


    // QUANDO TEM UM USER VALIDO PASSADO PELA PROP
    useEffect(() => {
        if (!props.User?.Name) return
        setUser(GetUserWithIdFromStore(props.User?.id))
        FillCopyes(GetUserWithIdFromStore(props.User?.id))
        setIsEdited(false)
        setTab('UserInfo')
    }, [props.User, props.CurrentUser, CurrentUserType])



    useEffect(() => {
        setUserType(GetCurrentUserTypeWithIdFromStore(User?.Type?.id))
        setUserSetor({ ...GetSetoresFromStore().find(U => U.id === User?.Sector?.id) })
    }, [User, props.CurrentUser])


    // QUANDO ALGUMA INFORMAÇÂO MUDA
    useEffect(() => {
        if (CopyUserName !== User?.Name || CopyUserLastName !== User?.LastName || CopyUserPhone !== User?.Phone || CopyUserEstate?.name !== User?.Estate?.name || CopyUserCity?.name !== User?.City?.name || CopyUserCountry?.name !== User?.Country?.name || CopyUserSector?.id !== User?.Sector?.id || CopyUserType?.id !== User?.Type?.id)
            setIsEdited(true)
        else
            setIsEdited(false)
    }, [CopyUserName, CopyUserLastName, CopyUserPhone, CopyUserEstate, CopyUserCity, CopyUserCountry, CopyUserSector, CopyUserType, User])



    const Submit = () => {
        if (ConfirmAction === 'Edit') {
            if (((CanEdit || IsAdmin) || PermitToEditUsers)) {

                const EditedUser = { ...User }

                EditedUser.Name = CopyUserName
                EditedUser.LastName = CopyUserLastName
                EditedUser.Phone = CopyUserPhone
                EditedUser.Estate = CopyUserEstate
                EditedUser.City = CopyUserCity
                EditedUser.Country = CopyUserCountry
                EditedUser.Type = CopyUserType
                EditedUser.Sector = CopyUserSector


                setUser({ ...EditedUser })
                EditUser(EditedUser).then(() => {
                    FillCopyes(EditedUser)
                    NotificationSucesso('Alteração', 'Alterações salvas com sucesso!')
                }).catch(() => {
                    NotificationErro("Erro", "Ocorreu um problema, tente novamente")
                })

                EndConfirming()

            }
        } else if (ConfirmAction === 'Add') {
            const NewUser = { ...User }

            NewUser.id = v4()
            NewUser.Email = CopyUserEmail.toLocaleLowerCase()
            NewUser.Name = CopyUserName
            NewUser.LastName = CopyUserLastName
            NewUser.Phone = CopyUserPhone
            NewUser.Estate = CopyUserEstate
            NewUser.City = CopyUserCity
            NewUser.Country = CopyUserCountry
            NewUser.Type = CopyUserType
            NewUser.Sector = CopyUserSector
            NewUser.Deleted = false

            setUser({ ...NewUser })

            RegisterUser(NewUser.Email).then(() => {
                AddUser(NewUser).then(() => {
                    AddUserFirebase(NewUser)
                    CancelEditions()
                    props.onHide()
                    NotificationSucesso('Adição', 'Usuário Adicionado com Sucesso!')
                    EndConfirming()
                }).catch(() => {
                    NotificationErro("Erro", "Ocorreu um problema, tente novamente")
                })

            }).catch(() => {
                NotificationErro("Erro", "Ocorreu um problema, tente novamente")
            })


        } else if (ConfirmAction === 'Delete') {
            const UserToDelete = { ...User }
            EndConfirming()
            props.onDelete()
            DeleteUser(UserToDelete).then(() => {
                ReturnAllAtivosOfUserWithId(UserToDelete.id)
                NotificationSucesso('Exclusão', 'Usuário Deletado com Sucesso!')

            }).catch(() => {
                NotificationErro("Erro", "Ocorreu um problema, tente novamente")
            })
        }
    }


    const InitConfirm = (Action) => {
        if (Action !== 'Delete') {
            //ADD AND EDIT
            if (CopyUserEmail.length === 0 && Action === 'Add')
                NotificationAlerta('Preenchimento inválido', 'O Email não pode ser vazio')
            else if (CopyUserPhone.length < 11 && CopyUserPhone.length > 0)
                NotificationAlerta('Preenchimento inválido', 'O Telefone de ter um mínimo 12 digitos')
            else if (CopyUserPhone.length === 0)
                NotificationAlerta('Preenchimento inválido', 'O telefone não pode ser vazio')
            else if (CopyUserName.length === 0)
                NotificationAlerta('Preenchimento inválido', 'O nome não pode ser vazio')
            else if (CopyUserLastName.length === 0)
                NotificationAlerta('Preenchimento inválido', 'O sobrenome não pode ser vazio')
            else if (!CopyUserCountry.name)
                NotificationAlerta('Preenchimento inválido', 'O País não pode ser vazio')
            else if (!CopyUserEstate.name)
                NotificationAlerta('Preenchimento inválido', 'O Estado não pode ser vazio')
            else if (!CopyUserCity.name)
                NotificationAlerta('Preenchimento inválido', 'A Cidade não pode ser vazia')
            else if (!CopyUserType?.id)
                NotificationAlerta('Preenchimento inválido', 'Seleciona um Tipo de Usuário')
            else if (!CopyUserSector.id)
                NotificationAlerta('Preenchimento inválido', 'Seleciona um Setor')
            else {
                SetConfirm(true)
                if (Action === 'Add') {
                    SetConfirmAction(Action)
                    SetConfirmMessage('Tem certeza que quer adicionar este usuário?')
                    SetConfirmBtAction('Adicionar')
                    SetConfirmBtBack('Voltar')
                }
                if (Action === 'Edit') {
                    SetConfirmAction(Action)
                    if (IsCurrentUser)
                        SetConfirmMessage('Tem certeza que quer alterar as suas informações?')
                    else
                        SetConfirmMessage('Tem certeza que quer alterar as informações deste usuário?')
                    SetConfirmBtAction('Alterar')
                    SetConfirmBtBack('Voltar')
                }

            }
        } else {
            //DELETE
            SetConfirm(true)
            SetConfirmAction(Action)
            SetConfirmMessage('Tem certeza que quer deletar este usuário?')
            SetConfirmBtAction('Deletar')
            SetConfirmBtBack('Voltar')
        }
    }


    const UpdatePassword = () => {

        if (NovaSenha.current.value && SenhaAtual.current.value) {
            LoginUtil(GetCurrentUserFromStore().Email, SenhaAtual.current.value).then(() => {
                mudarSenha(NovaSenha.current.value).then(() => {
                    NotificationSucesso("Alteração de Senha", "Senha Atualizada")
                    NovaSenha.current.value = ''
                    SenhaAtual.current.value = ''
                }).catch((error) => {
                    let SenhaFraca = error.code.includes("password");
                    if (SenhaFraca)
                        NotificationAlerta("Erro", 'A senha deve ter pelo menos 6 caracteres')
                })
            }
            ).catch(() => {
                NotificationErro("Erro", 'Senha Atual incorreta')
            })
        } else {

        }
    }


    const EndConfirming = () => {
        SetConfirm(false)
        SetConfirmMessage('')
        SetConfirmBtAction('')
        SetConfirmBtBack('')
        SetConfirmAction('')
    }

    const GetUserSubmit = (e) => {
        e.preventDefault()
    }



    return (
        <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered fullscreen={'md-down'} className={localStorage.getItem('AssetSenseTema') === 'Escuro' ? 'UserModal-ModalEscuro UserModal-Modal' : 'UserModal-ModalClaro UserModal-Modal'}>

            <Modal.Body closeButton className="UserModal-Body">



 TESTE

            </Modal.Body >

        </Modal >
    );
}



const ConnectedUserModal = connect((state) => {
    return {
        LoggedUser: state.LoggedUser
    }
})(UserModal)

export default ConnectedUserModal