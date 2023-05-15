import React from 'react'
import { useState } from 'react';
import { connect } from 'react-redux'
import { PermitDesc } from '../../GlobalVars';
import './UserTypesPermits.css'
import { Tooltip } from 'react-tippy';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import { RxUpdate } from 'react-icons/rx'
import { GetNameFromStoreWithId, SetUserTypesOnStore } from '../../Functions/StoreMiddleware';
import { v4 } from 'uuid';
import { NotificationErro, NotificationSucesso } from '../../NotificationUtils';
import Show from '../LayoutComponents/Show/Show';
import { UpdateInFirebaseFunctions } from '../../Functions/DatabaseMiddleware';
import { CheckIfOneCanEditPermits, CheckPermits } from './UserTypesPermitsUtils';
import Loading from '../LoadingForTabs/Loading'
import Stack from '../LayoutComponents/Stack/Stack';
import SidebarItem from '../LayoutComponents/SidebarItem/SidebarItem';
import { UilLabel } from '@iconscout/react-unicons'
import SectionTitle from '../LayoutComponents/SectionTitle/SectionTitle';


const UserTypesPermits = (props) => {

    //STATES
    const [UserTypes, setUserTypes] = useState([...props.UserTypes])

    const [TypeUserKey, setTypeUserKey] = useState(props.UserTypes[0].id)
    const [LoadingAction, setLoadingAction] = useState(false)

    //SAVE USERTYPE 
    const SaveUserType = async (TypesCopy, UserType) => {
        try {
            await UpdateInFirebaseFunctions["UserTypes"](UserType)
            SetUserTypesOnStore(TypesCopy)
            setUserTypes(TypesCopy)
            NotificationSucesso("Permissões", "Permissões editadas com sucesso!")
            setLoadingAction(false)
        } catch (e) {
            setLoadingAction(false)
            NotificationErro("Erro", "Ocorreu um problema, tente novamente")
        }

    }


    // CHECK USER TYPE AS ADMIN
    const CheckAdmin = (TypeIndex) => {
        var TypesCopy = [...props.UserTypes]
        TypesCopy[TypeIndex].Permits.forEach((valor, indice) => TypesCopy[TypeIndex].Permits[indice] = true)
        TypesCopy[TypeIndex].IsAdmin = true
        SaveUserType(TypesCopy, TypesCopy[TypeIndex])
    }

    //CHANGE PERMIT
    const handleChangePermit = (TypeIndex, PermitIndex) => {

        setLoadingAction(PermitIndex)

        var TypesCopy = [...props.UserTypes]
        TypesCopy[TypeIndex].Permits[PermitIndex] = !TypesCopy[TypeIndex].Permits[PermitIndex]

        const AllTrue = TypesCopy[TypeIndex].Permits.every(function (valor) { return valor === true; })

        TypesCopy[TypeIndex].IsAdmin = AllTrue

        TypesCopy = CheckPermits(TypesCopy, TypeIndex, PermitIndex)

        var OneEditPermits = CheckIfOneCanEditPermits(TypesCopy)

        if (!OneEditPermits) {
            TypesCopy[TypeIndex].Permits[PermitIndex] = true
            setLoadingAction(false)
            NotificationErro("Erro", "Pelo menos um Tipo de Usuário precisa ter a permissão de Editar permissões")
        } else {
            SaveUserType(TypesCopy, TypesCopy[TypeIndex])

        }

    }


    const PermitTab = ({ TypeUser, IndexTypeUser }) =>
        <div key={v4()} className='UserTypesPermits'>
            <div className='UserTypesPermits-TypeContainer-Title2'>
                <span>Permissões de {GetNameFromStoreWithId("UserTypes", TypeUserKey)}</span>

                <Show Show={TypeUser.IsAdmin}>
                    <Tooltip title="Possui permissões de Administrador" position="bottom" >
                        <ImCheckboxChecked />
                    </Tooltip>
                </Show>

                <Show Show={!TypeUser.IsAdmin}>
                    <Tooltip title="Permissões de Administrador" position="bottom" >
                        <ImCheckboxUnchecked onClick={e => CheckAdmin(IndexTypeUser)} />
                    </Tooltip>
                </Show>
            </div>
            <div className='NewPermitsList'>
                {TypeUser.Permits.map((Permit, PermitIndex) =>
                    <PermitItem PermitIndex={PermitIndex} Permit={Permit} IndexTypeUser={IndexTypeUser} />
                )}
            </div>
        </div>




    const PermitItem = (props) => {
        if (PermitDesc[props.PermitIndex] && LoadingAction !== props.PermitIndex)
            return <div key={v4()} onClick={e => handleChangePermit(props.IndexTypeUser, props.PermitIndex)} className='UserTypesPermits-TypeContainer-ListItem2'>
                {props.Permit === true ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                <span> {PermitDesc[props.PermitIndex]}</span>
            </div>
        else if (PermitDesc[props.PermitIndex])
            return <div key={v4()} onClick={e => handleChangePermit(props.IndexTypeUser, props.PermitIndex)} className='UserTypesPermits-TypeContainer-ListItem2'>
                <RxUpdate className="spinner-icon" />
                <span> {PermitDesc[props.PermitIndex]}</span>
            </div>
        else
            return
    }



    return (
        <div className='UserTypesPermitsOuterContainer'>
            <SectionTitle>Permissões por Tipo de Usuário</SectionTitle>

            <div className={props.Tema === 'Dark' ? 'UserTypesPermitsContainerDark UserTypesPermitsContainer' : 'UserTypesPermitsContainerLightTheme UserTypesPermitsContainer'}>

                <Stack Gap={'.5rem'}>
                    {props.UserTypes.map((TypeUser) =>
                        <SidebarItem Active={TypeUserKey === TypeUser.id}
                            onClick={(k) => setTypeUserKey(TypeUser.id)}                    >
                            <UilLabel />
                            {TypeUser.Value}
                        </SidebarItem> 
                    )}
                </Stack>

                <Show Show={true} Width='100%'>
                    {props.UserTypes.map((TypeUser, IndexTypeUser) =>
                        <Show Show={TypeUserKey === TypeUser.id} Width='100%'>
                            <PermitTab TypeUser={TypeUser} IndexTypeUser={IndexTypeUser} />
                        </Show>
                    )}
                </Show>

                <Show Show={false} Width='100%'>
                    <Loading />
                </Show>

            </div >
        </div>
    )
}


const ConnectedUserTypesPermits = connect((state) => {
    return {
        Sectors: state.Sectors,
        Users: state.Users,
        UserTypes: state.UserTypes,
        Tema: state.Tema
    }
})(UserTypesPermits)

export default ConnectedUserTypesPermits







