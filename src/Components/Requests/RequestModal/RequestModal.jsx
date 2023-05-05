
//REACT
import React, { useState, useEffect, useRef } from 'react'
//CSS
import './RequestModal.css'
//LIBRARIES
import { connect } from 'react-redux'
import BootstrapModal from 'react-bootstrap/Modal';
import { GetFromStore, GetNameFromStoreWithId } from '../../../Functions/StoreMiddleware'

import SubSectionTitle from '../../LayoutComponents/SubSectionTitle/SubSectionTitle';
//ICONS
import { UilClock, UilUsersAlt, UilCalendarAlt, UilPlay, UilPuzzlePiece, UilLabel, UilSave, UilTimes } from '@iconscout/react-unicons'
//Tooltip
import { Tooltip } from 'react-tippy';
import { DefaultTooltipStyles } from '../../../GlobalVars';
import FormGroup from '../../LayoutComponents/FormGroup/FormGroup';
import FormGroupLabel from '../../LayoutComponents/FormGroupLabel/FormGroupLabel';
import CustomSelect from '../../LayoutComponents/CustomSelect/CustomSelect';
import Show from '../../LayoutComponents/Show/Show';
import moment from 'moment';
import { DefaultRequestMessage } from '../../../Data/Items';
import { UpdateInFirebaseFunctions } from '../../../Functions/DatabaseMiddleware';
import { NotificationErro, NotificationSucesso } from '../../../NotificationUtils';
import Loading from '../../LoadingForTabs/Loading';


const RequestModal = (props) => {

    //CURRENT USER AND PERMITS
    const [CurrentUser] = useState(GetFromStore('CurrentUser'))

    //STATE
    const [Request, setRequest] = useState({ ...props.Request })
    const [RequestStatus, setRequestStatus] = useState({ id: '', Value: "" })
    const [RequestType, setRequestType] = useState({ id: '', Value: "" })
    const [RequestSector, setRequestSector] = useState({ id: '', Value: "" })
    const [IsEdited, setIsEdited] = useState(false)
    const MessageRef = useRef()
    const [LoadingAction, setLoadingAction] = useState(false)

    //PERMISSOES
    const IsRequester = CurrentUser?.id === props.Request.CreatedBy
    const [PermitToManageRequests, setPermitToManageRequests] = useState(false)



    //FILL REQUEST
    useEffect(() => {
        setRequest({ ...props.Request })
        setRequestStatus(props.RequestsStatus.find(S => S?.id === props.Request.Status?.id))
        setRequestType(props.RequestsTypes.find(S => S?.id === props.Request.Type?.id))
        setRequestSector(props.Sectors.find(S => S?.id === props.Request.Sector?.id))

        const Type = props.RequestsTypes.find(S => S?.id === props.Request.Type?.id)
        setPermitToManageRequests(
            Type?.Assigments?.includes(CurrentUser?.Email)
        )

    }, [props.Request])



    //CHANGE INFO
    const HandleChangeInfo = (Info, Value) => {
        if (Info === 'RequestStatus' && PermitToManageRequests) {
            setRequestStatus(Value)
            setIsEdited(true)
        } else if (Info === 'RequestType' && PermitToManageRequests) {
            setRequestType(Value)
            setIsEdited(true)
        } else if (Info === 'RequestSector' && PermitToManageRequests) {
            setRequestSector(Value)
            setIsEdited(true)
        }

    }


    // HANDLE ERROR
    const HandleError = (Erro) => {
        //console.log(Erro)
        NotificationErro("Erro", "Ocorreu um problema, tente novamente")
        setLoadingAction(false)
    }



    const HandleSaveRequest = () => {

        const EditedRequest = { ...Request }

        setLoadingAction(true)

        //REQUEST

        EditedRequest.Sector.id = RequestSector.id
        EditedRequest.Type.id = RequestType.id
        EditedRequest.Status.id = RequestStatus.id

        EditedRequest.LastEditedAt = moment().valueOf()
        EditedRequest.LasEditedBy = CurrentUser.id

        const Type = props.RequestsTypes.find(S => S?.id === RequestType.id)
        setPermitToManageRequests(
            Type?.Assigments?.includes(CurrentUser?.Email)
        )

        UpdateInFirebaseFunctions["Request"](EditedRequest).then(() => {
            setRequest({ ...EditedRequest })
            setLoadingAction(false)
            NotificationSucesso("Alteração de Solicitação", "Informaçoes Salvas com Sucesso!")
        }).catch(HandleError)


    }



    const HandleAddMessage = (e) => {

        e?.preventDefault()

        if (PermitToManageRequests || IsRequester) {

            const NewMessage = { ...DefaultRequestMessage }

            if (!MessageRef.current.value.trim()) {
                return
            } else {
                setLoadingAction(true)

                NewMessage.CreatedBy = CurrentUser.id
                NewMessage.CreatedAt = moment().valueOf()
                NewMessage.Message = MessageRef.current.value.trim()

                const EditedRequest = { ...Request }

                EditedRequest.Messages.push(NewMessage)

                UpdateInFirebaseFunctions["Request"](EditedRequest).then(() => {
                    setRequest({ ...EditedRequest })
                    setLoadingAction(false)
                    setTimeout(() => {
                        MessageRef.current.value = ''
                    }, 500);
                    NotificationSucesso("Envio de Mensagem", "Mensagem Enviada com Sucesso!")
                }).catch(HandleError)
            }
        }

    }

    return (


        <BootstrapModal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered fullscreen={'md-down'} className={props.Tema === 'Escuro' ? 'RequestModal-ModalEscuro RequestModal-Modal' : 'RequestModal-ModalClaro RequestModal-Modal'}>

            <BootstrapModal.Body closeButton className="RequestModal-Body">

                <UilTimes className='RequestModal-Right-Close' onClick={props.onHide} />

                <div className='RequestModal-Header'>

                    <Tooltip style={DefaultTooltipStyles} title="Título da Solicitação" position="bottom" >
                        <SubSectionTitle>{Request.Title}</SubSectionTitle>
                    </Tooltip>

                    <Tooltip style={DefaultTooltipStyles} title="Setor da Solicitação" position="bottom" >
                        <div className='RequestModal-Sector'>
                            <UilPuzzlePiece />
                            {GetNameFromStoreWithId("Sectors", Request.Sector?.id)}
                        </div>
                    </Tooltip>

                    <Tooltip style={DefaultTooltipStyles} title="Tipo da Solicitação" position="bottom" >
                        <div className='RequestModal-Type'>
                            <UilLabel />
                            {GetNameFromStoreWithId("RequestsTypes", Request.Type?.id)}
                        </div>
                    </Tooltip>

                </div>

                <Show Show={!LoadingAction}>
                    <div className='RequestModal-Info'>

                        {/**** REQUEST MESSAGES ****/}
                        <div className='RequestModal-MessagesContainer'>


                            <form className='RequestModal-MessageForm' onSubmit={HandleAddMessage}>
                                <input type="text" placeholder='Adicionar Mensagem' ref={MessageRef} />
                                <button onClick={HandleAddMessage}>Enviar</button>
                            </form>
                            <div className='RequestModal-Messages'>
                                {Request?.Messages?.sort((a, b) => {
                                    return a.CreatedAt < b.CreatedAt ? 1 : -1
                                }).map(Message => {

                                    const Momento = moment.unix(Message.CreatedAt / 1000); //dividir por 1000 porque o valor está em milissegundos, mas moment.unix() espera segundos
                                    const HoraMinuto = Momento.format('HH:mm'); //exemplo de formato "HH:mm"

                                    return <div className={`  ${Message.CreatedBy === CurrentUser?.id ? 'MyRequestMessageContainer' : 'OtherRequestMessageContainer'} `}>

                                        <div className={`RequestMessage  ${Message.CreatedBy === CurrentUser?.id ? 'RequestMyMessage' : 'RequestOtherMessage'} `} >
                                            <div className='RequestMessageText'>
                                                {Message.Message}
                                            </div>
                                            <div className='RequestMessageDate'>
                                                <Tooltip title="Data" position="bottom" >
                                                    <span className='RequestMessageDate-Item'>
                                                        <UilCalendarAlt />
                                                        {moment(Message.CreatedAt).format("DD/MM/YY")}
                                                    </span>
                                                </Tooltip>
                                                <Tooltip title="Hora" position="bottom" >
                                                    <span className='RequestMessageDate-Item'>
                                                        <UilClock />
                                                        {HoraMinuto}
                                                    </span>
                                                </Tooltip>
                                                <Tooltip title="Usuário que enviou" position="bottom" >
                                                    <span className='RequestMessageDate-Item'>
                                                        <UilUsersAlt />
                                                        {GetNameFromStoreWithId("Users", Message.CreatedBy)}
                                                    </span>
                                                </Tooltip>

                                            </div>
                                        </div>

                                    </div>
                                })}
                            </div>

                        </div>


                        {/**** REQUEST INFO ****/}
                        <div className='RequestModal-Categories'>

                            <SubSectionTitle>Informações da Solicitação</SubSectionTitle>

                            <FormGroup>
                                <FormGroupLabel>
                                    <UilPlay />
                                    Status da Solicitação
                                </FormGroupLabel>
                                <CustomSelect
                                    placeholder="Selecione o Tipo da Solicitação"
                                    options={props.RequestsStatus}
                                    getOptionLabel={(options) => { return options["Value"]; }}
                                    getOptionValue={(options) => { return options["id"]; }}
                                    value={RequestStatus}
                                    isDisabled={false}
                                    onChange={(item) => { HandleChangeInfo("RequestStatus", item) }}
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormGroupLabel>
                                    <UilLabel />
                                    Tipo de Solicitação
                                </FormGroupLabel>
                                <CustomSelect
                                    placeholder="Selecione o Tipo da Solicitação"
                                    options={props.RequestsTypes}
                                    getOptionLabel={(options) => { return options["Value"]; }}
                                    getOptionValue={(options) => { return options["id"]; }}
                                    value={RequestType}
                                    isDisabled={false}
                                    onChange={(item) => { HandleChangeInfo("RequestType", item) }}
                                />
                            </FormGroup>


                            <FormGroup>
                                <FormGroupLabel>
                                    <UilPuzzlePiece />
                                    Setor da Solicitação
                                </FormGroupLabel>
                                <CustomSelect
                                    placeholder="Selecione o Tipo da Solicitação"
                                    options={props.Sectors}
                                    getOptionLabel={(options) => { return options["Value"]; }}
                                    getOptionValue={(options) => { return options["id"]; }}
                                    value={RequestSector}
                                    isDisabled={false}
                                    onChange={(item) => { HandleChangeInfo("RequestSector", item) }}
                                />
                            </FormGroup>

                            <div className='RequestModal-Button'>

                                <Show Show={IsEdited}>
                                    <button onClick={HandleSaveRequest} >
                                        <UilSave />
                                        Salvar
                                    </button>
                                </Show>

                            </div>

                        </div>

                    </div>
                </Show>

                <Show Show={LoadingAction}>
                    <Loading />
                </Show>


            </BootstrapModal.Body >

        </BootstrapModal >


    );
}



const ConnectedRequestModal = connect((state) => {
    return {
        Tema: state.Tema,
        LoggedUser: state.LoggedUser,
        RequestsStatus: state.RequestsStatus,
        RequestsTypes: state.RequestsTypes,
        Sectors: state.Sectors,
    }
})(RequestModal)

export default ConnectedRequestModal






