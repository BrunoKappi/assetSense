import BootstrapModal from 'react-bootstrap/Modal';
import React, { useState, useEffect, useRef } from 'react'
import './UserModal.css'
import UserPhoto from '../../../assets/Images/SerranoLogoFuncoBranco.jpg'
import { UilUserCircle, UilClipboardNotes, UilEnvelope, UilPhone, UilMap, UilMapMarker, UilPen, UilPuzzlePiece, UilLabel, UilListUl, UilSave, UilHistory, UilTimes, UilBuilding, UilKeySkeleton, UilCheck, UilBackward, UilTrash } from '@iconscout/react-unicons'
import { AddUser, AddUserFirebase, DeleteUser, EditUser, GetCurrentUserFromStore, GetCurrentUserSetorNameWithIdFromStore, GetCurrentUserTypeFromStore, GetCurrentUserTypeNameWithIdFromStore, GetCurrentUserTypeWithIdFromStore, GetSetoresFromStore, GetUserTypesFromStore, GetUserWithIdFromStore, LoginUtil, RegisterUser, ReturnAllAtivosOfUserWithId } from '../../../Functions/Middleware'
import { DefaultUser } from '../../../Data/Items';
import { DefaultSetor, DefaultUserType } from '../../../Data/Items';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import { NotificationAlerta, NotificationErro, NotificationSucesso } from '../../../NotificationUtils';
import PI from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { PermitIndexs } from '../../../GlobalVars'
import { noOptionsMessage, UserModalSelectcustomStyles } from './UserModalUtils';
import { v4 } from 'uuid';
import { FIREBASE_LogouyAuth, mudarSenha, unsubscribe } from '../../../Config/firebase/auth';
import UserAtivoRecords from './UserAtivoRecords/UserAtivoRecords';
import { connect } from 'react-redux'
//Tooltip
import { Tooltip } from 'react-tippy';
import UserPhotoModal from './UserPhotoModal/UserPhotoModal';
import { FIREBASE_GetUserDocIDById } from '../../../Config/firebase/metodos';
import Loading from '../../LoadingForTabs/Loading';

const UsuarioModal = (props) => {

    const PhoneInput = PI.default ? PI.default : PI;

    const [LoadingAction, setLoadingAction] = useState(false)
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
    const [ProfileImageUrl, setProfileImageUrl] = useState('')
    const [CopyUserName, setCopyUserName] = useState('')
    const [CopyUserUrlImage, setCopyUserUrlImage] = useState('')
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
        setCopyUserUrlImage(UserCopy?.PhotoUrl)
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

        if (IsCurrentUser) {
            setProfileImageUrl(props.LoggedUser.PhotoUrl)
        } else {
            if (props.User?.PhotoUrl) {
                setProfileImageUrl(props.User?.PhotoUrl)
            } else {
                setProfileImageUrl('')
            }
        }
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
        setLoadingAction(true)

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

                if (!EditedUser.docID) {
                    console.log("Atualizando User SEM DOCID")
                    FIREBASE_GetUserDocIDById(EditedUser.id).then((docID) => {
                        console.log("PEGUEI O DOCID", docID)
                        EditedUser.docID = docID
                        EditUser(EditedUser).then(() => {
                            FillCopyes(EditedUser)
                            NotificationSucesso('Alteração', 'Alterações salvas com sucesso!')
                            setLoadingAction(false)
                        }).catch((erro) => {
                            console.log(erro)
                            NotificationErro("Erro", "Ocorreu um problema, tente novamente")
                            setLoadingAction(false)
                        })
                    }).catch(() => {
                        setLoadingAction(false)
                    })
                } else {
                    console.log("Atualizando User com DOCID")
                    EditUser(EditedUser).then(() => {
                        FillCopyes(EditedUser)
                        NotificationSucesso('Alteração', 'Alterações salvas com sucesso!')
                        setLoadingAction(false)
                    }).catch((erro) => {
                        console.log(erro)
                        NotificationErro("Erro", "Ocorreu um problema, tente novamente")
                        setLoadingAction(false)
                    })
                }

                EndConfirming()

            }
        } else if (ConfirmAction === 'Add') {
            const NewUser = { ...User }

            NewUser.id = v4()
            NewUser.PhotoUrl = CopyUserUrlImage
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

            unsubscribe()
            setTimeout(() => {
                FIREBASE_LogouyAuth().then(()=>{
                    console.log("LOGOUT")
                }).catch(()=>{
                    console.log("ERRO LOGOUT") 
                })
            }, 1500);

            RegisterUser(NewUser.Email).then(() => {
                AddUser(NewUser).then(() => {
                    setLoadingAction(false)
                    AddUserFirebase(NewUser)
                    CancelEditions()
                    props.onHide()
                    NotificationSucesso('Adição', 'Usuário Adicionado com Sucesso!')
                    EndConfirming()
                }).catch(() => {
                    setLoadingAction(false)
                    NotificationErro("Erro", "Ocorreu um problema, tente novamente")
                })
            }).catch((erro) => {
                console.log(erro)
                NotificationErro("Erro", "Ocorreu um problema, tente novamente")
            })


        } else if (ConfirmAction === 'Delete') {
            const UserToDelete = { ...User }
            EndConfirming()
            props.onDelete()
            DeleteUser(UserToDelete).then(() => {
                setLoadingAction(false)
                ReturnAllAtivosOfUserWithId(UserToDelete.id)
                NotificationSucesso('Exclusão', 'Usuário Deletado com Sucesso!')
            }).catch(() => {
                setLoadingAction(false)
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





    const [ShowPhotoModal, setShowPhotoModal] = useState(false)

    const handleShowPhotoModal = () => {
        if (PermitToEditUsers) {
            setShowPhotoModal(true)
        } else {
            NotificationAlerta("Ação negada", "Você não possui permissão para editar usuários")
        }
    }


    const onChangePhoto = (url) => {
        setProfileImageUrl(url)
        setCopyUserUrlImage(url)
        setTimeout(() => {
            setProfileImageUrl(url)
        }, 4000);
        setShowPhotoModal(false)
    }

    return (

        <>

            <UserPhotoModal Add={props.Function === 'Add'} OnChangePhoto={onChangePhoto} User={props.User} IsCurrentUser={IsCurrentUser} show={ShowPhotoModal} onHide={() => setShowPhotoModal(false)} />

            <BootstrapModal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered fullscreen={'md-down'} className={props.Tema === 'Escuro' ? 'UserModal-ModalEscuro UserModal-Modal' : 'UserModal-ModalClaro UserModal-Modal'}>

                <BootstrapModal.Body closeButton className="UserModal-Body">


                    <div className='UserModal'>
                        <div className='UserModalHeader'>
                            <div className='UserModalHeader-Left'>
                                <Tooltip title="Alterar Foto" position="bottom" >
                                    <div className='UserModalHeader-Left-Photo'>
                                        <img onClick={handleShowPhotoModal} src={ProfileImageUrl || UserPhoto} alt="User" />
                                    </div>
                                </Tooltip>
                            </div>
                            <div className='UserModalHeader-Right'>
                                <div className='UserModalHeader-Right-Name'>

                                    {props.Function === 'Add' && <span>
                                        {(props.Function === 'Add' && (!CopyUserName)) ? 'Nome ' : CopyUserName}
                                        {(props.Function === 'Add' && (!CopyUserLastName)) ? ' Sobrenome' : ' ' + CopyUserLastName}
                                    </span>
                                    }

                                    {(props.Function !== 'Add') ? User?.Name + ' ' + User?.LastName : ''}
                                    <UilTimes className='UserModalHeader-Right-Close' onClick={props.onHide} />
                                </div>
                                <div className='UserModalHeader-Right-Setor'>
                                    <UilPuzzlePiece />
                                    {props.Function === 'Add' ? GetCurrentUserSetorNameWithIdFromStore(CopyUserSector?.id) : UserSetor?.Value}
                                </div>
                                <div className='UserModalHeader-Right-Tipo'>
                                    <UilLabel />
                                    {props.Function === 'Add' ? GetCurrentUserTypeNameWithIdFromStore(CopyUserType?.id) : UserType?.Value}
                                </div>
                            </div>

                        </div>

                        {!LoadingAction &&
                            <div className='UserModalBody'>
                                <div className='UserModalBody-Sidebar'>
                                    <div className={Tab === 'UserInfo' ? 'UserModalBody-Sidebar-ActiveItem' : 'UserModalBody-Sidebar-Item'} onClick={e => setTab('UserInfo')}>
                                        <UilUserCircle />
                                        Informações Pessoais
                                    </div>

                                    {props.Function !== 'Add' &&
                                        <div className={Tab === 'Ativos' ? 'UserModalBody-Sidebar-ActiveItem' : 'UserModalBody-Sidebar-Item'} onClick={e => setTab('Ativos')}>
                                            <UilClipboardNotes />
                                            Ativos
                                        </div>
                                    }
                                    {props.Function !== 'Add' &&
                                        <div className={Tab === 'Atividade' ? 'UserModalBody-Sidebar-ActiveItem' : 'UserModalBody-Sidebar-Item'} onClick={e => setTab('Atividade')}>
                                            <UilHistory />
                                            Atividade
                                        </div>
                                    }
                                </div>
                                {!Confirm &&
                                    <div className='UserModalBody-UserInfo'>
                                        {Tab === 'UserInfo' && <div className='UserModalBody-UserInfoForm'>
                                            <form onSubmit={GetUserSubmit}>

                                                <h4 className='UserModalBody-UserInfoForm-SectionTitle'>Dados Cadastrais</h4>


                                                <div className='UserModalBody-UserInfoForm-OneLine'>
                                                    <div className='UserModalBody-UserInfoForm-Group'>
                                                        <span>
                                                            <UilEnvelope />
                                                            Email
                                                        </span>
                                                        {props.Function === 'Add' && <input value={CopyUserEmail} type="text" placeholder='Digite o Email' onChange={e => HandleChangeInfo('Email', e.target.value)} />}
                                                        {props.Function !== 'Add' && <input value={User?.Email} type="text" placeholder='Digite o Email' />}
                                                    </div>
                                                </div>


                                                <div className='UserModalBody-UserInfoForm-TwoLine'>
                                                    <div className='UserModalBody-UserInfoForm-Group'>
                                                        <span>
                                                            <UilPen />
                                                            Nome
                                                        </span>
                                                        <input placeholder='Digite o Nome' disabled={!CanEdit} value={CopyUserName} type="text" onChange={e => HandleChangeInfo('Name', e.target.value)} />
                                                    </div>
                                                    <div className='UserModalBody-UserInfoForm-Group'>
                                                        <span>
                                                            <UilPen />
                                                            Sobrenome
                                                        </span>
                                                        <input placeholder='Digite o Sobrenome' disabled={!CanEdit} value={CopyUserLastName} type="text" onChange={e => HandleChangeInfo('LastName', e.target.value)} />
                                                    </div>
                                                </div>



                                                <div className='UserModalBody-UserInfoForm-OneLine'>
                                                    <div className='UserModalBody-UserInfoForm-Group'>
                                                        <span>
                                                            <UilPhone />
                                                            Telefone
                                                        </span>
                                                        <PhoneInput
                                                            containerClass="UserModalBody-UserInfoForm-PhoneInput-Container"
                                                            inputClass="UserModalBody-UserInfoForm-PhoneInput"
                                                            buttonClass="UserModalBody-UserInfoForm-PhoneInput-Button"
                                                            dropdownClass="UserModalBody-UserInfoForm-PhoneInput-Dropdown"
                                                            containerStyle={{ margin: '0', padding: '0', width: '100%', fontSize: '12px' }}
                                                            country={'br'}
                                                            value={CopyUserPhone}
                                                            disabled={!CanEdit}
                                                            onChange={e => HandleChangeInfo('Phone', e)}
                                                        />

                                                    </div>
                                                </div>




                                                <div className='UserModalBody-UserInfoForm-TwoLine'>
                                                    <div className='UserModalBody-UserInfoForm-Group'>
                                                        <span>
                                                            <UilMap />
                                                            País
                                                        </span>
                                                        <Select
                                                            className='UserModalBody-UserInfoForm-LocationSelect'
                                                            placeholder="Selecione o País"
                                                            noOptionsMessage={noOptionsMessage}
                                                            options={Country.getAllCountries()}
                                                            getOptionLabel={(options) => { return options["name"]; }}
                                                            getOptionValue={(options) => { return options["name"]; }}
                                                            styles={UserModalSelectcustomStyles}
                                                            value={CopyUserCountry}
                                                            isDisabled={!CanEdit}
                                                            onChange={(item) => {
                                                                setCopyUserCountry(item);;
                                                                setCopyUserEstate({ name: '' });
                                                                setCopyUserCity({ name: '' });
                                                            }}
                                                        />
                                                    </div>
                                                    <div className='UserModalBody-UserInfoForm-Group'>
                                                        <span>
                                                            <UilMapMarker />
                                                            Estado
                                                        </span>
                                                        <Select
                                                            className='UserModalBody-UserInfoForm-LocationSelect'
                                                            placeholder="Selecione o Estado"
                                                            noOptionsMessage={noOptionsMessage}
                                                            options={State?.getStatesOfCountry(CopyUserCountry?.isoCode)}
                                                            getOptionLabel={(options) => { return options["name"]; }}
                                                            getOptionValue={(options) => { return options["name"]; }}
                                                            styles={UserModalSelectcustomStyles}
                                                            isDisabled={!CanEdit}
                                                            value={CopyUserEstate}
                                                            onChange={(item) => {
                                                                setCopyUserEstate(item);
                                                                setCopyUserCity({ name: '' });
                                                            }}
                                                        />
                                                    </div>
                                                </div>


                                                <div className='UserModalBody-UserInfoForm-OneLine'>
                                                    <div className='UserModalBody-UserInfoForm-Group'>
                                                        <span>
                                                            <UilBuilding />
                                                            Cidade
                                                        </span>
                                                        <Select
                                                            className='UserModalBody-UserInfoForm-LocationSelect'
                                                            placeholder="Selecione a Cidade"
                                                            noOptionsMessage={noOptionsMessage}
                                                            options={City.getCitiesOfState(
                                                                CopyUserEstate?.countryCode,
                                                                CopyUserEstate?.isoCode
                                                            )}
                                                            getOptionLabel={(options) => { return options["name"]; }}
                                                            getOptionValue={(options) => { return options["name"]; }}
                                                            styles={UserModalSelectcustomStyles}
                                                            isDisabled={!CanEdit}
                                                            value={CopyUserCity}
                                                            onChange={(item) => {
                                                                setCopyUserCity(item);
                                                            }}
                                                            allowCreate={true}
                                                        />
                                                    </div>
                                                </div>

                                                {IsCurrentUser && <div className='UserModalBody-UserInfoForm-SectionTitle'></div>}
                                                {IsCurrentUser && <h4 className='UserModalBody-UserInfoForm-SectionTitle'>Trocar de Senha</h4>}
                                                {IsCurrentUser &&
                                                    <div className='UserModalBody-UserInfoForm-TwoLine'>
                                                        <div className='UserModalBody-UserInfoForm-Group'>
                                                            <span>
                                                                <UilKeySkeleton />
                                                                Senha Atual
                                                            </span>
                                                            <input placeholder='Digite sua Senha' ref={SenhaAtual} type="password" />
                                                        </div>
                                                        <div className='UserModalBody-UserInfoForm-Group'>
                                                            <span>
                                                                <UilKeySkeleton />
                                                                Nova Senha
                                                            </span>
                                                            <input placeholder='Digite a nova Senha' ref={NovaSenha} type="password" />
                                                        </div>
                                                    </div>
                                                }

                                                {IsCurrentUser &&
                                                    <div className='UserModalBody-UserInfoForm-Button'>
                                                        <button onClick={UpdatePassword}>
                                                            <UilPen />
                                                            Atualizar
                                                        </button>
                                                    </div>
                                                }



                                                <h4 className='UserModalBody-UserInfoForm-SectionTitle'>Na Empresa</h4>



                                                <div className='UserModalBody-UserInfoForm-TwoLine'>
                                                    <div className='UserModalBody-UserInfoForm-Group'>

                                                        <div className='UserModalBody-UserInfoForm-SetorList'>
                                                            <div className='UserModalBody-UserInfoForm-SetorList-Title'>
                                                                <UilPuzzlePiece />
                                                                Setor
                                                            </div>
                                                            <div className='UserModalBody-UserInfoForm-SetorList-Itens'>
                                                                {Setores.map(Setor => {
                                                                    return <div key={v4()} className={'UserModalBody-UserInfoForm-SetorList-Item'} onClick={e => HandleChangeInfo('Sector', Setor?.id)}>
                                                                        {CopyUserSector?.id === Setor?.id ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                                                                        {Setor?.Value}
                                                                    </div>
                                                                })}
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className='UserModalBody-UserInfoForm-Group'>
                                                        <div className='UserModalBody-UserInfoForm-TiposUserList'>
                                                            <div className='UserModalBody-UserInfoForm-TiposUserList-Title'>
                                                                <UilListUl />
                                                                Tipos de Usuario
                                                            </div>
                                                            <div className='UserModalBody-UserInfoForm-TiposUserList-Itens'>
                                                                {TiposUsuarios.map(TipoUser => {
                                                                    return <div key={v4()} className={'UserModalBody-UserInfoForm-TiposUserList-Item'} onClick={e => HandleChangeInfo('Type', TipoUser?.id)}>
                                                                        {CopyUserType?.id === TipoUser?.id ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                                                                        {TipoUser?.Value}
                                                                    </div>
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>

                                            <div className='UserModalBody-UserInfoForm-Button'>
                                                {!IsEdited && !IsCurrentUser && PermitToDeleteUsers && (props.Function !== 'Add') &&
                                                    <button className='UserModalBody-UserInfoForm-Button-Delete' onClick={e => InitConfirm('Delete')}>
                                                        <UilTrash />
                                                        Excluir Usuário
                                                    </button>
                                                }
                                                {IsEdited &&
                                                    <>
                                                        <button onClick={CancelEditions}>
                                                            <UilTimes />
                                                            {props.Function === 'Add' ? 'Limpar Campos' : 'Cancelar'}
                                                        </button>

                                                        {props.Function === 'Add' &&
                                                            <button onClick={e => InitConfirm('Add')}>
                                                                <UilSave />
                                                                Adicionar
                                                            </button>
                                                        }

                                                        {props.Function !== 'Add' &&
                                                            <button onClick={e => InitConfirm('Edit')}>
                                                                <UilSave />
                                                                Salvar
                                                            </button>
                                                        }


                                                    </>

                                                }
                                            </div>
                                        </div>}


                                        {Tab === 'Ativos' && <UserAtivoRecords FromModal={props.FromModal} User={User} />}
                                    </div>
                                }

                                {Confirm && <div className='UserModalBody-UserInfo'>
                                    <h4 className='UserModalBody-UserInfoForm-ConfirMessage'>{ConfirmMessage}</h4>
                                    <div className='UserModalBody-UserInfoForm-Button'>
                                        <button className='UserModalBody-UserInfoForm-Button-Secondary' onClick={e => { EndConfirming(); setIsEdited(true); }}>
                                            <UilBackward />
                                            {ConfirmBtBack}
                                        </button>
                                        <button onClick={Submit}>
                                            <UilCheck />
                                            {ConfirmBtAction}
                                        </button>
                                    </div>
                                </div>
                                }

                            </div>
                        }

                        {LoadingAction && <Loading />}
                    </div>


                </BootstrapModal.Body >

            </BootstrapModal >
        </>

    );
}



const ConnectedUsuarioModal = connect((state) => {
    return {
        Tema: state.Tema,
        LoggedUser: state.LoggedUser
    }
})(UsuarioModal)

export default ConnectedUsuarioModal
