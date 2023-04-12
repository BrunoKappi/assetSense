
//REACT
import React, { useState, useEffect, useRef } from 'react'
//CSS
import './UserModal.css'
//ICONS
import { UilUserCircle, UilClipboardNotes, UilEnvelope, UilPhone, UilAsterisk, UilMap, UilMapMarker, UilPen, UilPuzzlePiece, UilLabel, UilListUl, UilSave, UilHistory, UilTimes, UilBuilding, UilKeySkeleton, UilCheck, UilBackward, UilTrash } from '@iconscout/react-unicons'
//COMPONENTS
import UserAtivoRecords from './UserAtivoRecords/UserAtivoRecords';
import UserPhoto from '../../../assets/Images/SerranoLogoFuncoBranco.jpg'
//LIBRARIES
import PI from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { connect } from 'react-redux'
import { Tooltip } from 'react-tippy';
import BootstrapModal from 'react-bootstrap/Modal';
//VARIABLES
import { PermitIndexs } from '../../../GlobalVars'
import { DefaultSetor, DefaultUserType, DefaultUser } from '../../../Data/Items';
//FUNCTIONS
import UserPhotoModal from './UserPhotoModal/UserPhotoModal';
import { FIREBASE_GetUserDocIDById } from '../../../Config/firebase/metodos';
import { noOptionsMessage, UserModalSelectcustomStyles } from './UserModalUtils';
import { v4 } from 'uuid';
import { FIREBASE_LogouyAuth, mudarSenha, unsubscribe } from '../../../Config/firebase/auth';
import Loading from '../../LoadingForTabs/Loading';
import { NotificationAlerta, NotificationErro, NotificationSucesso } from '../../../NotificationUtils';
import { AddUser, AddUserFirebase, DeleteUser, EditUser, GetCurrentUserFromStore, GetCurrentUserSetorNameWithIdFromStore, GetCurrentUserTypeFromStore, GetCurrentUserTypeNameWithIdFromStore, GetCurrentUserTypeWithIdFromStore, GetSetoresFromStore, GetUserTypeWithIdFromStore, GetUserTypesFromStore, GetUserWithIdFromStore, LoginUtil, RegisterUser, ReturnAllAtivosOfUserWithId } from '../../../Functions/Middleware'
//LAYOUT COMPONENTS
import TwoColumns from '../../LayoutComponents/TwoColumns/TwoColumns';
import FormGroupLabel from '../../LayoutComponents/FormGroupLabel/FormGroupLabel';
import FormGroup from '../../LayoutComponents/FormGroup/FormGroup';
import Show from '../../LayoutComponents/Show/Show';
import Stack from '../../LayoutComponents/Stack/Stack';
import SidebarItem from '../../LayoutComponents/SidebarItem/SidebarItem';
import FormInput from '../../LayoutComponents/FormInput/FormInput';
import EditList from '../../LayoutComponents/EditList/EditList';
import CustomFields from '../../LayoutComponents/CustomFields/CustomFields';

const UsuarioModal = (props) => {

    // PROBLEMA DA BIBLIOTECA PHONE INPUT
    const PhoneInput = PI.default ? PI.default : PI;


    // DEPENDENCIAS
    const [User, setUser] = useState({ ...DefaultUser })
    const [Setores] = useState(GetSetoresFromStore())
    const [UserType, setUserType] = useState({ ...DefaultUserType })
    const [UserSetor, setUserSetor] = useState({ ...DefaultSetor })
    const [TiposUsuarios] = useState(GetUserTypesFromStore())
    const [ProfileImageUrl, setProfileImageUrl] = useState('')
    const [UserTypeCustomFields, setUserTypeCustomFields] = useState([])
    const [SenhaAtual, setSenhaAtual] = useState('')
    const [NovaSenha, setNovaSenha] = useState('')
    const [IdToUse, setIdToUse] = useState('')


    //FUNCIONALIDADE
    const [ShowPhotoModal, setShowPhotoModal] = useState(false)
    const [IsEdited, setIsEdited] = useState(false)
    const [LoadingAction, setLoadingAction] = useState(false)
    const [Tab, setTab] = useState('UserInfo')

    //CONFIRM 
    const [ConfirmAction, SetConfirmAction] = useState('')
    const [Confirm, SetConfirm] = useState(false)
    const [ConfirmMessage, SetConfirmMessage] = useState('')
    const [ConfirmBtAction, SetConfirmBtAction] = useState('')
    const [ConfirmBtBack, SetConfirmBtBack] = useState('')

    //CURRENT USER AND PERMITS
    const [CurrentUserType] = useState(GetCurrentUserTypeFromStore())



    //PERMISSOES
    var IsAdmin = CurrentUserType?.IsAdmin
    var PermitToEditUsers = CurrentUserType?.Permits[PermitIndexs['EDITAR_USUARIOS']]
    var PermitToDeleteUsers = CurrentUserType?.Permits[PermitIndexs['EXCLUIR_USUARIOS']]
    var IsCurrentUser = props.User?.id === GetCurrentUserFromStore()?.id
    var CanEdit = IsCurrentUser || IsAdmin || PermitToEditUsers


    // GERENCIAMENTO DE ALTERAÇÕES DE INFORMAÇÔES
    const HandleChangeInfo = (Info, Value) => {

        if (!CanEdit) return

        const newUser = { ...User }
        switch (Info) {
            case 'Country':
                newUser.Country = Value
                newUser.Estate.name = ''
                newUser.City.name = ''
                break
            case 'Estate':
                newUser.Estate = Value
                newUser.City.name = ''
                break
            case 'Type':
                newUser.Type = { id: Value }
                const GotUserType = GetUserTypeWithIdFromStore(Value)
                setUserType(GotUserType)
                break
            case 'Sector':
                newUser.Sector = { id: Value }
                break
            case 'Email':
                if (props.Function === 'Add')
                    newUser.Email = Value.toLocaleLowerCase()
                break
            default:
                newUser[Info] = Value
                break
        }

        setUser(newUser)
        setIsEdited(true)
    }


    // QUANDO TEM UM USER VALIDO PASSADO PELA PROP
    useEffect(() => {
        console.log(props.User)
        if (props.Function === 'Add') {
            setUser({ ...DefaultUser })
        } else {
            const { id, Name, PhotoUrl } = props.User || {};
            if (!Name) return
            setUser(GetUserWithIdFromStore(id))
            setIsEdited(false)
            setTab('UserInfo')
            setProfileImageUrl(IsCurrentUser ? props.LoggedUser.PhotoUrl : PhotoUrl || '')
        }
    }, [props.User, props.CurrentUser, CurrentUserType])


    //QUANDO O USERTYPE MUDA, PEGA O NOVO TYPE
    useEffect(() => {
        setUserType(GetCurrentUserTypeWithIdFromStore(User?.Type?.id))
        setUserSetor({ ...GetSetoresFromStore().find(U => U.id === User?.Sector?.id) })
    }, [User?.Type, props.CurrentUser])



    //QUANDO O USERTYPE MUDA, PEGA OS CUSTOMS FIELDS DO NOVO USER TYPE
    useEffect(() => {
        if (UserType?.CustomFields?.length > 0)
            setUserTypeCustomFields([...UserType?.CustomFields])
        else
            setUserTypeCustomFields([])
    }, [UserType])



    // SUBMIT FINAL ACTION
    const Submit = () => {
        setLoadingAction(true)
        // EDITAR USUARIO
        if (ConfirmAction === 'Edit') {

            const EditedUser = { ...User }
            EditedUser.id = v4()

            if (!EditedUser.docID) {
                FIREBASE_GetUserDocIDById(User.id).then((docID) => {
                    EditedUser.docID = docID
                    setUser(EditedUser)
                    EditUser(User).then(() => {
                        NotificationSucesso('Alteração', 'Alterações salvas com sucesso!')
                        setLoadingAction(false)
                    }).catch(HandleError)
                }).catch(HandleError)
            } else {
                EditUser(User).then(() => {
                    NotificationSucesso('Alteração', 'Alterações salvas com sucesso!')
                    setLoadingAction(false)
                }).catch(HandleError)
            }
            EndConfirming()

        }
        // ADICIONAR USUÁRIO
        else if (ConfirmAction === 'Add') {

            const NewUser = { ...User }
            NewUser.id = IdToUse ? IdToUse : v4()

            unsubscribe()
            setTimeout(() => { FIREBASE_LogouyAuth() }, 5000);

            RegisterUser(NewUser.Email).then(() => {
                AddUser(NewUser).then((AddedUserDoc) => {
                    NewUser.docID = AddedUserDoc?.id // PEGA O docID gerado pelo firebase e coloca no objeto do novo User
                    setUser(NewUser)
                    setLoadingAction(false)
                    AddUserFirebase(User)
                    CancelEditions()
                    props.onHide()
                    NotificationSucesso('Adição', 'Usuário Adicionado com Sucesso!')
                    EndConfirming()
                }).catch(HandleError)
            }).catch(HandleError)


        }
        //DELETAR USUARIO
        else if (ConfirmAction === 'Delete') {
            EndConfirming()
            props.onDelete()
            DeleteUser(User).then(() => {
                setLoadingAction(false)
                ReturnAllAtivosOfUserWithId(User.id)
                NotificationSucesso('Exclusão', 'Usuário Deletado com Sucesso!')
            }).catch(HandleError)
        }
    }


    // INIT CONFIRMING ACTION
    const InitConfirm = (Action) => {
        // ADICIONAR OU EDITAR USUARIO
        if (Action !== 'Delete') {
            if (User?.Email.length === 0 && Action === 'Add')
                NotificationAlerta('Preenchimento inválido', 'O Email não pode ser vazio')
            else if (User?.Phone?.length < 11 && User?.Phone?.length > 0)
                NotificationAlerta('Preenchimento inválido', 'O Telefone de ter um mínimo 12 digitos')
            else if (User?.Phone?.length === 0)
                NotificationAlerta('Preenchimento inválido', 'O telefone não pode ser vazio')
            else if (User?.Name?.length === 0)
                NotificationAlerta('Preenchimento inválido', 'O nome não pode ser vazio')
            else if (User?.LastName.length === 0)
                NotificationAlerta('Preenchimento inválido', 'O sobrenome não pode ser vazio')
            else if (!User?.Country.name)
                NotificationAlerta('Preenchimento inválido', 'O País não pode ser vazio')
            else if (!User?.Estate.name)
                NotificationAlerta('Preenchimento inválido', 'O Estado não pode ser vazio')
            else if (!User?.City.name)
                NotificationAlerta('Preenchimento inválido', 'A Cidade não pode ser vazia')
            else if (!User?.Type?.id)
                NotificationAlerta('Preenchimento inválido', 'Seleciona um Tipo de Usuário')
            else if (!User?.Sector.id)
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
        }
        // DELETE USUARIO
        else {

            SetConfirm(true)
            SetConfirmAction(Action)
            SetConfirmMessage('Tem certeza que quer deletar este usuário?')
            SetConfirmBtAction('Deletar')
            SetConfirmBtBack('Voltar')
        }
    }

    // UPDATE PASSWORD FIREBASE
    const UpdatePassword = () => {
        if (NovaSenha && SenhaAtual) {
            const Senha = SenhaAtual
            const SenhaNova = NovaSenha
            setLoadingAction(true)
            LoginUtil(User?.Email, Senha).then(() => {
                mudarSenha(SenhaNova).then(() => {
                    setLoadingAction(false)
                    NotificationSucesso("Alteração de Senha", "Senha Atualizada")
                    setSenhaAtual('')
                    setNovaSenha('')
                }).catch((error) => {
                    setLoadingAction(false)
                    if (error.code.includes("password"))
                        NotificationAlerta("Erro", 'A senha deve ter pelo menos 6 caracteres')
                })
            }).catch(() => {
                NotificationErro("Erro", 'Senha Atual incorreta')
                setLoadingAction(false)
            })
        }
    }

    // END CONFIRMING ACTION
    const EndConfirming = () => {
        SetConfirm(false)
        SetConfirmMessage('')
        SetConfirmBtAction('')
        SetConfirmBtBack('')
        SetConfirmAction('')
    }

    // HANDLE FORM
    const GetUserSubmit = (e) => {
        e.preventDefault()
    }

    // SHOW PHOTO MODAL
    const handleShowPhotoModal = () => {
        if (CanEdit)
            setShowPhotoModal(true)
        else
            NotificationAlerta("Ação negada", "Você não possui permissão para editar usuários")
    }

    // HANDLE PHOTO CHANGE
    const onChangePhoto = (url, Id) => {
        setProfileImageUrl(url)
        HandleChangeInfo("PhotoUrl", url)
        setTimeout(() => { setProfileImageUrl(url) }, 4000);
        setShowPhotoModal(false)

        // SE ESTIVER ADICIONANDO E COLOCAR UMA FOTO, SET EM UM ID
        if (props.Function === 'Add') {
            setIdToUse(Id)
            console.log("ID RECEBIDO", Id)
        }
    }

    // CHANGE CUSTOM FIELD VALUE
    const handleChangeCustomField = (TypedValue, Index, CustomFieldId) => {
        const NewUserCustomFieldsValues = [...User?.CustomFieldsValues]
        NewUserCustomFieldsValues[Index] = {
            id: CustomFieldId,
            Value: TypedValue
        }
        HandleChangeInfo("CustomFieldsValues", NewUserCustomFieldsValues)
        setIsEdited(true)
    }

    // HANDLE ERROR
    const HandleError = (Erro) => {
        console.log(Erro)
        NotificationErro("Erro", "Ocorreu um problema, tente novamente")
        setLoadingAction(false)
    }

    // CANCEL EDITIONS
    const CancelEditions = () => {
        setIsEdited(false)
        return
    }


    const IsActive = (tab) => tab === Tab

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

                                    <Show Show={props.Function === 'Add'}>
                                        <span>
                                            {(props.Function === 'Add' && (!User?.Name)) ? 'Nome ' : User?.Name}
                                            {(props.Function === 'Add' && (!User?.LastName)) ? ' Sobrenome' : ' ' + User?.LastName}
                                        </span>
                                    </Show>

                                    {(props.Function !== 'Add') ? User?.Name + ' ' + User?.LastName : ''}
                                    <UilTimes className='UserModalHeader-Right-Close' onClick={props.onHide} />
                                </div>
                                <div className='UserModalHeader-Right-Setor'>
                                    <UilPuzzlePiece />
                                    {props.Function === 'Add' ? GetCurrentUserSetorNameWithIdFromStore(User?.Sector?.id) : UserSetor?.Value}
                                </div>
                                <div className='UserModalHeader-Right-Tipo'>
                                    <UilLabel />
                                    {props.Function === 'Add' ? GetCurrentUserTypeNameWithIdFromStore(User?.Type?.id) : UserType?.Value}
                                </div>
                            </div>

                        </div>


                        <Show Show={!LoadingAction} Width='100%'>
                            <div className='UserModalBody'>
                                <Stack className='UserModalBody-Sidebar' Gap={'.5rem'}>

                                    <SidebarItem Active={IsActive('UserInfo')}
                                        onClick={e => setTab('UserInfo')}>
                                        <UilUserCircle />
                                        Informações Pessoais
                                    </SidebarItem>

                                    <Show Show={props.Function !== 'Add'}>
                                        <SidebarItem Active={IsActive('Ativos')}
                                            onClick={e => setTab('Ativos')}>
                                            <UilClipboardNotes />
                                            Ativos
                                        </SidebarItem>
                                    </Show>

                                    <Show Show={props.Function !== 'Add'}>
                                        <SidebarItem Active={IsActive('Atividade')}
                                            onClick={e => setTab('Atividade')}>
                                            <UilHistory />
                                            Atividade
                                        </SidebarItem>
                                    </Show>

                                </Stack>



                                <Show Show={!Confirm} Width='100%'>
                                    <div className='UserModalBody-UserInfo'>
                                        {Tab === 'UserInfo' && <div className='UserModalBody-UserInfoForm'>
                                            <form onSubmit={GetUserSubmit}>

                                                <h4 className='UserModalBody-UserInfoForm-SectionTitle'>Dados Cadastrais</h4>


                                                <div>
                                                    <FormGroup>
                                                        <FormGroupLabel>
                                                            <UilEnvelope />
                                                            Email
                                                        </FormGroupLabel>
                                                        <Show Show={props.Function === 'Add'}>
                                                            <FormInput
                                                                value={User?.Email}
                                                                placeholder='Digite o Email'
                                                                onChange={e => HandleChangeInfo('Email', e.target.value)}
                                                            />
                                                        </Show>

                                                        <Show Show={props.Function !== 'Add'}>
                                                            <FormInput
                                                                value={User?.Email}
                                                                placeholder='Digite o Email'
                                                            />
                                                        </Show>
                                                    </FormGroup>
                                                </div>


                                                <TwoColumns>
                                                    <FormGroup>
                                                        <FormGroupLabel>
                                                            <UilPen />
                                                            Nome
                                                        </FormGroupLabel>
                                                        <FormInput
                                                            placeholder='Digite o Nome'
                                                            disabled={!CanEdit}
                                                            value={User?.Name}
                                                            onChange={e => HandleChangeInfo('Name', e.target.value)}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <FormGroupLabel>
                                                            <UilPen />
                                                            Sobrenome
                                                        </FormGroupLabel>
                                                        <FormInput
                                                            placeholder=' Digite o Sobrenome'
                                                            disabled={!CanEdit} value={User?.LastName}
                                                            onChange={e => HandleChangeInfo('LastName', e.target.value)}
                                                        />
                                                    </FormGroup>
                                                </TwoColumns>



                                                <div>
                                                    <FormGroup>
                                                        <FormGroupLabel>
                                                            <UilPhone />
                                                            Telefone
                                                        </FormGroupLabel>
                                                        <PhoneInput
                                                            containerClass="UserModalBody-UserInfoForm-PhoneInput-Container"
                                                            inputClass="UserModalBody-UserInfoForm-PhoneInput"
                                                            buttonClass="UserModalBody-UserInfoForm-PhoneInput-Button"
                                                            dropdownClass="UserModalBody-UserInfoForm-PhoneInput-Dropdown"
                                                            containerStyle={{ margin: '0', padding: '0', width: '100%', fontSize: '12px' }}
                                                            country={'br'}
                                                            value={User?.Phone}
                                                            disabled={!CanEdit}
                                                            onChange={e => HandleChangeInfo('Phone', e)}
                                                        />

                                                    </FormGroup>
                                                </div>




                                                <TwoColumns>
                                                    <FormGroup>
                                                        <FormGroupLabel>
                                                            <UilMap />
                                                            País
                                                        </FormGroupLabel>
                                                        <Select
                                                            className='UserModalBody-UserInfoForm-LocationSelect'

                                                            placeholder="Selecione o País"
                                                            noOptionsMessage={noOptionsMessage}
                                                            options={Country.getAllCountries()}
                                                            getOptionLabel={(options) => { return options["name"]; }}
                                                            getOptionValue={(options) => { return options["name"]; }}
                                                            styles={UserModalSelectcustomStyles}
                                                            value={User?.Country}
                                                            isDisabled={!CanEdit}
                                                            onChange={(item) => { HandleChangeInfo('Country', item) }}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <FormGroupLabel>
                                                            <UilMapMarker />
                                                            Estado
                                                        </FormGroupLabel>
                                                        <Select
                                                            className='UserModalBody-UserInfoForm-LocationSelect'

                                                            placeholder="Selecione o Estado"
                                                            noOptionsMessage={noOptionsMessage}
                                                            options={State?.getStatesOfCountry(User?.Country?.isoCode)}
                                                            getOptionLabel={(options) => { return options["name"]; }}
                                                            getOptionValue={(options) => { return options["name"]; }}
                                                            styles={UserModalSelectcustomStyles}
                                                            isDisabled={!CanEdit}
                                                            value={User?.Estate}
                                                            onChange={(item) => { HandleChangeInfo("Estate", item); }}
                                                        />
                                                    </FormGroup>
                                                </TwoColumns>


                                                <div>
                                                    <FormGroup>
                                                        <FormGroupLabel>
                                                            <UilBuilding />
                                                            Cidade
                                                        </FormGroupLabel>
                                                        <Select
                                                            className='UserModalBody-UserInfoForm-LocationSelect'
                                                            placeholder="Selecione a Cidade"
                                                            noOptionsMessage={noOptionsMessage}
                                                            options={City.getCitiesOfState(User?.Estate?.countryCode, User?.Estate?.isoCode)}
                                                            getOptionLabel={(options) => { return options["name"]; }}
                                                            getOptionValue={(options) => { return options["name"]; }}
                                                            styles={UserModalSelectcustomStyles}
                                                            isDisabled={!CanEdit}
                                                            value={User?.City}
                                                            onChange={(item) => { HandleChangeInfo("City", item); }}
                                                            allowCreate={true}
                                                        />
                                                    </FormGroup>
                                                </div>








                                                <Show Show={IsCurrentUser}>

                                                    <h4 className='UserModalBody-UserInfoForm-SectionTitle'>Trocar de Senha</h4>

                                                    <TwoColumns>
                                                        <FormGroup>
                                                            <FormGroupLabel>
                                                                <UilKeySkeleton />
                                                                Senha Atual
                                                            </FormGroupLabel>
                                                            <FormInput
                                                                placeholder='Digite sua Senha'
                                                                type="password"
                                                                value={SenhaAtual}
                                                                onChange={e => setSenhaAtual(e.target.value)}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <FormGroupLabel>
                                                                <UilKeySkeleton />
                                                                Nova Senha
                                                            </FormGroupLabel>
                                                            <FormInput
                                                                placeholder='Digite a nova Senha'
                                                                type="password"
                                                                value={NovaSenha}
                                                                onChange={e => setNovaSenha(e.target.value)}
                                                            />
                                                        </FormGroup>
                                                    </TwoColumns>

                                                    <div className='UserModalBody-UserInfoForm-Button'>
                                                        <button onClick={UpdatePassword}>
                                                            <UilPen />
                                                            Atualizar
                                                        </button>
                                                    </div>
                                                </Show>





                                                <h4 className='UserModalBody-UserInfoForm-SectionTitle'>Na Empresa</h4>

                                                <TwoColumns>
                                                    <FormGroup>
                                                        <EditList
                                                            Item={User}
                                                            List={Setores}
                                                            Title="Sector"
                                                            Key='Sector'
                                                            Handle={HandleChangeInfo}
                                                            Icon={<UilPuzzlePiece />}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <EditList
                                                            Item={User}
                                                            List={TiposUsuarios}
                                                            Title="Tipos de Usuarios"
                                                            Key='Type'
                                                            Handle={HandleChangeInfo}
                                                            Icon={<UilListUl />}
                                                        />
                                                    </FormGroup>
                                                </TwoColumns>




                                                <CustomFields
                                                    Container={UserTypeCustomFields}
                                                    CanEdit={CanEdit}
                                                    Item={User}
                                                    Handle={handleChangeCustomField}
                                                />


                                            </form>

                                            <div className='UserModalBody-UserInfoForm-Button'>

                                                <Show Show={!IsEdited && !IsCurrentUser && PermitToDeleteUsers && (props.Function !== 'Add')}>
                                                    <button className='UserModalBody-UserInfoForm-Button-Delete' onClick={e => InitConfirm('Delete')}>
                                                        <UilTrash />
                                                        Excluir Usuário
                                                    </button>
                                                </Show>

                                                <Show Show={IsEdited}>
                                                    <Show Show={false}>
                                                        <button onClick={CancelEditions}>
                                                            <UilTimes />
                                                            {props.Function === 'Add' ? 'Limpar Campos' : 'Cancelar'}
                                                        </button>
                                                    </Show>

                                                    <Show Show={props.Function === 'Add'}>
                                                        <button onClick={e => InitConfirm('Add')}>
                                                            <UilSave />
                                                            Adicionar
                                                        </button>
                                                    </Show>

                                                    <Show Show={props.Function !== 'Add'}>
                                                        <button onClick={e => InitConfirm('Edit')}>
                                                            <UilSave />
                                                            Salvar
                                                        </button>
                                                    </Show>
                                                </Show>


                                            </div>
                                        </div>}


                                        {Tab === 'Ativos' && <UserAtivoRecords FromModal={props.FromModal} User={User} />}
                                    </div>
                                </Show>


                                <Show Show={Confirm} Width='100%'>
                                    <div className='UserModalBody-UserInfo'>
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
                                </Show>

                            </div>
                        </Show>

                        <Show Show={LoadingAction} Width='100%'>
                            <Loading />
                        </Show>

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






