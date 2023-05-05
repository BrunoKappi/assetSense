
//REACT
import React, { useState, useEffect } from 'react'
//CSS
import './AddRequestModal.css'
//LIBRARIES
import { connect } from 'react-redux'
import BootstrapModal from 'react-bootstrap/Modal';
import { AddRequestToStore, GetFromStore, GetFromStoreFunctions } from '../../../Functions/StoreMiddleware'
import SectionTitle from '../../LayoutComponents/SectionTitle/SectionTitle';
//ICONS
import { UilWrench, UilComment, UilEnvelope, UilPhone, UilShieldCheck, UilMap, UilMapMarker, UilPen, UilPuzzlePiece, UilLabel, UilListUl, UilSave, UilHistory, UilTimes, UilBuilding, UilKeySkeleton, UilCheck, UilBackward, UilTrash, UilUser } from '@iconscout/react-unicons'
import TwoColumns from '../../LayoutComponents/TwoColumns/TwoColumns';
import FormGroup from '../../LayoutComponents/FormGroup/FormGroup';
import FormGroupLabel from '../../LayoutComponents/FormGroupLabel/FormGroupLabel';
import FormInput from '../../LayoutComponents/FormInput/FormInput';
import CustomSelect from '../../LayoutComponents/CustomSelect/CustomSelect';
import FormTextarea from '../../LayoutComponents/FormTextarea/FormInput';
import Loading from '../../LoadingForTabs/Loading';
import ConnectedConfirmTab from '../../LayoutComponents/ConfirmTab/ConfirmTab';
import Show from '../../LayoutComponents/Show/Show';
import { DefaultRequest, DefaultRequestMessage } from '../../../Data/Items';
import { RequestTypes } from '../../../GlobalVars';
import { NotificationAlerta, NotificationErro, NotificationSucesso } from '../../../NotificationUtils';
import moment from 'moment';
import { v4 } from 'uuid';
import { AddToFirebaseFunctions } from '../../../Functions/DatabaseMiddleware';
import SubSectionTitle from '../../LayoutComponents/SubSectionTitle/SubSectionTitle';
import Info from '../../LayoutComponents/Info/Info'

const AddRequestModal = (props) => {

    //CURRENT USER AND PERMITS
    const [CurrentUserType] = useState(GetFromStore('CurrentUserType'))
    const [CurrentUser] = useState(GetFromStore('CurrentUser'))


    //STATES
    const [Title, setTitle] = useState('')
    const [Desc, setDesc] = useState('')
    const [RequestType, setRequestType] = useState()
    const [RequestSector, setRequestSector] = useState()
    const [RequestAsset, setRequestAsset] = useState()
    const [RequestUser, setRequestUser] = useState()
    const [LoadingAction, setLoadingAction] = useState(false)


    //CONFIRM 
    const [Confirm, SetConfirm] = useState(false)
    const [ConfirmMessage, SetConfirmMessage] = useState('')
    const [ConfirmBtAction, SetConfirmBtAction] = useState('')
    const [ConfirmBtBack, SetConfirmBtBack] = useState('')


    // INIT CONFIRMING ACTION
    const InitConfirm = () => {
        if (!Title.trim()) {
            NotificationAlerta('Preenchimento inválido', 'O Titulo não pode ser vazio')
        } else if (!Desc.trim()) {
            NotificationAlerta('Preenchimento inválido', 'A Descrição não pode ser vazia')
        } else if (!RequestType) {
            NotificationAlerta('Preenchimento inválido', 'Selecione um Tipo')
        } else if (!RequestSector) {
            NotificationAlerta('Preenchimento inválido', 'Selecione um Setor')
        } else {
            SetConfirm(true)
            SetConfirmMessage('Tem certeza que quer abrir esta solicitação ?')
            SetConfirmBtAction('Sim')
            SetConfirmBtBack('Voltar')
        }

    }


    // END CONFIRMING ACTION
    const EndConfirming = () => {
        SetConfirm(false)
        SetConfirmMessage('')
        SetConfirmBtAction('')
        SetConfirmBtBack('')
    }


    // END CONFIRMING ACTION
    const ClearValues = () => {
        setTitle('')
        setDesc('')
        setRequestSector('')
        setRequestType('')
    }

    // HANDLE ERROR
    const HandleError = (Erro) => {
        //console.log(Erro)
        NotificationErro("Erro", "Ocorreu um problema, tente novamente")
        setLoadingAction(false)
    }

    //SUBMIT FINAL ACTION
    const Submit = () => {

        const RequestToOpen = { ...DefaultRequest }

        const StatusList = GetFromStoreFunctions["RequestsStatus"]()
        const DefaultStatusId = StatusList.find(Status => Status.DefaultStatus === true)?.id

        //REQUEST
        RequestToOpen.id = v4()
        RequestToOpen.Title = Title
        RequestToOpen.Desc = Desc
        RequestToOpen.Sector.id = RequestSector.id
        RequestToOpen.Type.id = RequestType.id
        RequestToOpen.CreatedBy = CurrentUser.id
        RequestToOpen.AssetId = RequestAsset?.id || ''
        RequestToOpen.UserId = RequestUser?.id || ''
        RequestToOpen.CreatedByEmail = CurrentUser.Email
        RequestToOpen.CreatedAt = moment().valueOf()
        RequestToOpen.LastEditedAt = moment().valueOf()
        RequestToOpen.LasEditedBy = CurrentUser.id
        RequestToOpen.Status.id = DefaultStatusId

        //MESSAGE 2
        const messageToAdd1 = { ...DefaultRequestMessage }

        messageToAdd1.CreatedBy = CurrentUser.id
        messageToAdd1.CreatedAt = moment().valueOf()
        messageToAdd1.Message = "Abertura da Solicitação: " + Title

        //MESSAGE 2
        const messageToAdd2 = { ...DefaultRequestMessage }

        messageToAdd2.CreatedBy = CurrentUser.id
        messageToAdd2.CreatedAt = moment().valueOf()
        messageToAdd2.Message = Desc


        //ADD MESSAGES 
        RequestToOpen.Messages.push(messageToAdd1)
        RequestToOpen.Messages.push(messageToAdd2)

        setLoadingAction(true)



        //ADD TO DATABASE
        AddToFirebaseFunctions['Request'](RequestToOpen).then((DocId) => {
            RequestToOpen.docID = DocId.id
            EndConfirming()
            AddRequestToStore(RequestToOpen)
            setLoadingAction(false)
            //console.log(RequestToOpen)
            NotificationSucesso("Abertura de Solicitação", "Solicitação Aberta com Sucesso!")
            ClearValues()
            props.onHide()
        }).catch(HandleError)


    }


    return (


        <BootstrapModal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered fullscreen={'md-down'} className={props.Tema === 'Escuro' ? 'AddRequestModal-ModalEscuro AddRequestModal-Modal' : 'AddRequestModal-ModalClaro AddRequestModal-Modal'}>



            <BootstrapModal.Body closeButton className="AddRequestModal-Body">

                <UilTimes className='AddRequestModal-Right-Close' onClick={props.onHide} />

                <SectionTitle>Abertura de Solicitação</SectionTitle>

                <Show Show={!Confirm && !LoadingAction} Width='100%'>
                    <FormGroup>
                        <FormGroupLabel>
                            <UilPen />
                            Título
                        </FormGroupLabel>
                        <FormInput
                            placeholder=' Título da sua Solicitação'
                            value={Title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </FormGroup>
                </Show>

                <Show Show={!Confirm && !LoadingAction} Width='100%'>
                    <TwoColumns>
                        <FormGroup>
                            <FormGroupLabel>
                                <UilLabel />
                                Tipo da Solicitação
                            </FormGroupLabel>
                            <CustomSelect
                                placeholder="Selecione o Tipo da Solicitação"
                                options={props.RequestsTypes}
                                getOptionLabel={(options) => { return options["Value"]; }}
                                getOptionValue={(options) => { return options["id"]; }}
                                value={RequestType}
                                isDisabled={false}
                                onChange={(item) => { setRequestType(item) }}
                            />
                        </FormGroup>

                        <FormGroup>
                            <FormGroupLabel>
                                <UilPuzzlePiece />
                                Solicitado para o Setor:
                            </FormGroupLabel>
                            <CustomSelect
                                placeholder="Selecione o Tipo da Solicitação"
                                options={GetFromStore('Sectors')}
                                getOptionLabel={(options) => { return options["Value"]; }}
                                getOptionValue={(options) => { return options["id"]; }}
                                value={RequestSector}
                                isDisabled={false}
                                onChange={(item) => { setRequestSector(item) }}
                            />
                        </FormGroup>
                    </TwoColumns>
                </Show>

                <Show Show={!Confirm && !LoadingAction} Width='100%'>
                    <FormGroup>
                        <FormGroupLabel>
                            <UilComment />
                            Descrição
                        </FormGroupLabel>
                        <FormTextarea
                            placeholder='Descrição detalhado da sua solicitação'
                            value={Desc}
                            onChange={e => setDesc(e.target.value)}
                        />
                    </FormGroup>
                </Show>

                <Show Show={!Confirm && !LoadingAction} Width='100%'>
                    <SubSectionTitle>Adiciona à sua Solcitiação(Opcional)</SubSectionTitle>
                </Show>

                <Show Show={!Confirm && !LoadingAction} Width='100%'>
                    <Info Text={'O Aivo e o Usuário selecionados abaixo serão enviados como um "Anexo" em sua solicitação'}></Info>
                </Show>

                <Show Show={!Confirm && !LoadingAction} Width='100%'>
                    <TwoColumns>
                        <FormGroup>
                            <FormGroupLabel>
                                <UilWrench />
                                Ativo
                            </FormGroupLabel>
                            <CustomSelect
                                placeholder="Adicione um Ativo à sua Solicitação"
                                options={props.Assets}
                                getOptionLabel={(options) => { return options["Item"]; }}
                                getOptionValue={(options) => { return options["id"]; }}
                                value={RequestAsset}
                                isDisabled={false}
                                onChange={(item) => { setRequestAsset(item) }}
                            />
                        </FormGroup>

                        <FormGroup>
                            <FormGroupLabel>
                                <UilUser />
                                Usuário
                            </FormGroupLabel>
                            <CustomSelect
                                placeholder="Adicione um Usuário á sua solicitação"
                                options={props.Users}
                                getOptionLabel={(options) => { return options["Name"] + ' ' + options["LastName"] }}
                                getOptionValue={(options) => { return options["id"]; }}
                                value={RequestUser}
                                isDisabled={false}
                                onChange={(item) => { setRequestUser(item) }}
                            />
                        </FormGroup>
                    </TwoColumns>
                </Show>


                <Show Show={!Confirm && !LoadingAction} Width='100%'>
                    <div className='AddRequestModal-UserInfoForm-Button'>

                        <button onClick={e => InitConfirm('Add')}>
                            <UilSave />
                            Abrir Solicitação
                        </button>


                    </div>
                </Show>


                <Show Show={Confirm && !LoadingAction} Width='100%'>
                    <ConnectedConfirmTab
                        ConfirmMessage={ConfirmMessage}
                        ConfirmBtBack={ConfirmBtBack}
                        ConfirmBtAction={ConfirmBtAction}
                        EndConfirming={EndConfirming}
                        setIsEdited={() => { }}
                        Submit={Submit}
                    />
                </Show>

                <Show Show={LoadingAction}>
                    <Loading />
                </Show>


            </BootstrapModal.Body >

        </BootstrapModal >


    );
}



const ConnectedAddRequestModal = connect((state) => {
    return {
        Tema: state.Tema,
        LoggedUser: state.LoggedUser,
        Users: state.Users,
        Assets: state.Assets,
        RequestsTypes: state.RequestsTypes,
        RequestsStatus: state.RequestsStatus
    }
})(AddRequestModal)

export default ConnectedAddRequestModal






