
//REACT
import React, { useState, useEffect } from 'react'
//CSS
import './RequestsAssigment.css'
//LIBRARIES
import { connect } from 'react-redux'
import Stack from '../../LayoutComponents/Stack/Stack';
import SidebarSubItem from '../../LayoutComponents/SidebarSubItem/SidebarSubItem';
import { UilLabel, UilEnvelope, UilTimes } from '@iconscout/react-unicons'
import Info from '../../LayoutComponents/Info/Info'
import SubSectionTitle from '../../LayoutComponents/SubSectionTitle/SubSectionTitle'
import TwoColumns from '../../LayoutComponents/TwoColumns/TwoColumns';
import FormGroupLabel from '../../LayoutComponents/FormGroupLabel/FormGroupLabel';
import CustomSelect from '../../LayoutComponents/CustomSelect/CustomSelect';
import { UpdateInFirebaseFunctions } from '../../../Functions/DatabaseMiddleware';
import { NotificationErro, NotificationInfo, NotificationSucesso } from '../../../NotificationUtils';
import Loading from '../../LoadingForTabs/Loading';
import Show from '../../LayoutComponents/Show/Show';
import Warning from '../../LayoutComponents/Warning/Warning'


const RequestsAssigment = (props) => {

    //STATES
    const [RequestsTypeKey, setRequestsTypeKey] = useState('')
    const [RequestsTypeSelected, setRequestsTypeSelected] = useState({})
    const [RequestsTypes, setRequestsTypes] = useState([])
    const [SeletedUser, setSeletedUser] = useState()
    const [LoadingAction, setLoadingAction] = useState(false)

    useEffect(() => {
        setRequestsTypeKey(props.RequestsTypes[0].id)
        setRequestsTypeSelected({ ...props.RequestsTypes[0] })
        setRequestsTypes([...props.RequestsTypes])
    }, [])

    // HANDLE ERROR
    const HandleError = (Erro) => {
        //console.log(Erro)
        NotificationErro("Erro", "Ocorreu um problema, tente novamente")
        setLoadingAction(false)
    }


    const HadleSelectType = (Type) => {
        setRequestsTypeKey(Type.id)
        setRequestsTypeSelected(Type)
        //console.log(Type)
    }



    const HandleAssignUser = () => {

        const TypesCopy = [...RequestsTypes]
        const Index = TypesCopy.findIndex(El => El.id === RequestsTypeKey)

        if (TypesCopy[Index].Assigments.includes(SeletedUser.Email)) {

            NotificationInfo("Associação", "Usuário já Associado a este tipo")
            setSeletedUser('')
            return
        }

        TypesCopy[Index].Assigments.push(SeletedUser.Email)

        setLoadingAction(true)
        UpdateInFirebaseFunctions["RequestsTypes"](TypesCopy[Index]).then(() => {
            NotificationSucesso('Associação', 'Usuário associado com Sucesso!')
            setRequestsTypes(TypesCopy)
            HadleSelectType(TypesCopy[Index])
            setSeletedUser('')
            setLoadingAction(false)
        }).catch(HandleError)

    }


    const HandleUnassignUser = (User, Index) => {

        const TypesCopy = [...RequestsTypes]
        const IndexOfType = TypesCopy.findIndex(El => El.id === RequestsTypeKey)

        TypesCopy[IndexOfType].Assigments.splice(Index, 1)

        setLoadingAction(true)
        UpdateInFirebaseFunctions["RequestsTypes"](IndexOfType[Index]).then(() => {
            NotificationSucesso('Associação', 'Usuário desassociado com Sucesso!')
            setRequestsTypes(TypesCopy)
            HadleSelectType(TypesCopy[IndexOfType])
            setLoadingAction(false)
        }).catch(HandleError)

    }


    return (


        <div className={props.Tema === 'Escuro' ? 'RequestsAssigentContainerEscuro RequestsAssigentContainer' : 'RequestsAssigentContainerClaro RequestsAssigentContainer'}>



            <div className='RequestsAssigentBody'>

                <Stack className='RequestsAssigentBodySidebar' Gap={'.3rem'}>
                    <h6>Tipos de Solicitações</h6>

                    {RequestsTypes.map(Type => {
                        return <SidebarSubItem Active={RequestsTypeKey === Type.id}
                            onClick={(k) => HadleSelectType(Type)}>
                            <UilLabel />
                            {Type.Value}
                        </SidebarSubItem>
                    })}
                </Stack>

                <div className='RequestsAssigentUsers'>

                    <h6>Responsáveis por essa Solicitação</h6>

                    <div className='AssigmentForm'>
                        <CustomSelect
                            placeholder="Digite o Email"
                            options={props.Users}
                            getOptionLabel={(options) => { return options["Email"]; }}
                            getOptionValue={(options) => { return options["Id"]; }}
                            value={SeletedUser}
                            onChange={(item) => {
                                setSeletedUser(item);
                            }}
                        />
                        <button onClick={HandleAssignUser}>
                            Adicionar
                        </button>
                    </div>

                    <Show Show={!LoadingAction && RequestsTypeSelected?.Assigments?.length > 0}>
                        <div className='AssigmentList'>
                            {RequestsTypeSelected?.Assigments?.map((User, UserIndex) => {
                                return <span className='UserAssignedContainer'>
                                    <span className='UserAssigned'>{User}</span>
                                    <UilTimes
                                        onClick={e => HandleUnassignUser(User, UserIndex)}
                                    />
                                </span>
                            })}
                        </div>
                    </Show>

                    <Show Show={!LoadingAction && RequestsTypeSelected?.Assigments?.length === 0}>
                        <div className='AssigmentList'>
                            <Warning Text={'Nenhum Usuário Associado a teste tipo de Solicitação Ainda'}/>
                        </div>
                    </Show>

                    <Show Show={LoadingAction}>
                        <Loading />
                    </Show>



                </div>

            </div>



        </div>

    );
}



const ConnectedRequestsAssigment = connect((state) => {
    return {
        Tema: state.Tema,
        LoggedUser: state.LoggedUser,
        Users: state.Users,
        Assets: state.Assets,
        RequestsTypes: state.RequestsTypes,
        RequestsStatus: state.RequestsStatus
    }
})(RequestsAssigment)

export default ConnectedRequestsAssigment






