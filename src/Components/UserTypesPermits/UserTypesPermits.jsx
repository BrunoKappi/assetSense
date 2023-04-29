import React from 'react'
import { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { PermitDesc } from '../../GlobalVars';
import './UserTypesPermits.css'
import { Tooltip } from 'react-tippy';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import { RxUpdate } from 'react-icons/rx'
import { GetNameFromStoreWithId, SetUserTypesOnStore } from '../../Functions/StoreMiddleware';
import { v4 } from 'uuid';
import { NotificationErro, NotificationSucesso } from '../../NotificationUtils';
import TabsContainer from '../LayoutComponents/TabsContainer/TabsContainer';
import TabButton from '../LayoutComponents/TabButton/TabButton';
import Show from '../LayoutComponents/Show/Show';
import { UpdateInFirebaseFunctions } from '../../Functions/DatabaseMiddleware';
import { CheckIfOneCanEditPermits, CheckPermits } from './UserTypesPermitsUtils';
import Loading from '../LoadingForTabs/Loading'
import Stack from '../LayoutComponents/Stack/Stack';
import SidebarItem from '../LayoutComponents/SidebarItem/SidebarItem';
import { UilListUl, UilSitemap, UilShieldCheck, UilAsterisk, UilLabel, UilBox, UilUsersAlt, UilSetting, UilPlay } from '@iconscout/react-unicons'
import SectionTitle from '../LayoutComponents/SectionTitle/SectionTitle';


const UserTypesPermits = (props) => {

    //STATES
    const [UserTypes, setUserTypes] = useState([...props.UserTypes])
    const [TypeUserKey, setTypeUserKey] = useState(props.UserTypes[0].id)
    const [LoadingAction, setLoadingAction] = useState(false)


    //FILL USER TYPES
    useEffect(() => {
        setUserTypes([...props.UserTypes])
    }, [props.UserTypes])

    // CHECK USER TYPE AS ADMIN
    const CheckAdmin = (TypeIndex) => {
        var TypesCopy = [...props.UserTypes]

        TypesCopy[TypeIndex].Permits.forEach(function (valor, indice) {
            TypesCopy[TypeIndex].Permits[indice] = true
        });

        TypesCopy[TypeIndex].IsAdmin = true

        UpdateInFirebaseFunctions["UserTypes"](TypesCopy[TypeIndex]).then(() => {
            SetUserTypesOnStore(TypesCopy)
            setUserTypes(TypesCopy)
            NotificationSucesso("Permissões", "Permissões editadas com sucesso!")
        }).catch(() => {
            NotificationErro("Erro", "Ocorreu um problema, tente novamente")
        })

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
            UpdateInFirebaseFunctions["UserTypes"](TypesCopy[TypeIndex]).then(() => {
                SetUserTypesOnStore(TypesCopy)
                setUserTypes(TypesCopy)
                setLoadingAction(false)
                NotificationSucesso("Permissões", "Permissões editadas com sucesso!")
            }).catch(() => {
                setLoadingAction(false)
                NotificationErro("Erro", "Ocorreu um problema, tente novamente")
            })

        }

    }


    return (
        <div className='UserTypesPermitsOuterContainer'>
            <SectionTitle>Permissões por Tipo de Usuário</SectionTitle>

            <div className={props.Tema === 'Escuro' ? 'UserTypesPermitsContainerEscuro UserTypesPermitsContainer' : 'UserTypesPermitsContainerClaro UserTypesPermitsContainer'}>

                <Stack Gap={'.5rem'}>
                    {UserTypes.map((TypeUser) => {
                        return <SidebarItem Active={TypeUserKey === TypeUser.id}
                            onClick={(k) => setTypeUserKey(TypeUser.id)}                    >
                            <UilLabel />
                            {TypeUser.Value}
                        </SidebarItem>
                    })}
                </Stack>


                <Show Show={1 !== 1} Width='100%'>
                    {UserTypes.map((TypeUser, IndexTypeUser) => {
                        return <Show Show={TypeUserKey === TypeUser.id} Width='100%'>
                            <div key={v4()} className='UserTypesPermits-TypeContainer'>
                                <div className='UserTypesPermits-TypeContainer-Title'>
                                    <span>{TypeUser.Value}</span>

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
                                <div className='UserTypesPermits-TypeContainer-List'>
                                    {TypeUser.Permits.map((Permit, PermitIndex) => {
                                        if (PermitDesc[PermitIndex])
                                            return <div key={v4()} onClick={e => handleChangePermit(IndexTypeUser, PermitIndex)} className='UserTypesPermits-TypeContainer-ListItem'>
                                                {Permit === true ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                                                <span> {PermitDesc[PermitIndex]}</span>
                                            </div>
                                        else
                                            return

                                    })}
                                </div>
                            </div>
                        </Show>
                    })}
                </Show>



                <Show Show={true} Width='100%'>
                    {UserTypes.map((TypeUser, IndexTypeUser) => {
                        return <Show Show={TypeUserKey === TypeUser.id} Width='100%'>
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
                                    {TypeUser.Permits.map((Permit, PermitIndex) => {
                                        if (PermitDesc[PermitIndex] && LoadingAction !== PermitIndex)
                                            return <div key={v4()} onClick={e => handleChangePermit(IndexTypeUser, PermitIndex)} className='UserTypesPermits-TypeContainer-ListItem2'>
                                                {Permit === true ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                                                <span> {PermitDesc[PermitIndex]}</span>
                                            </div>
                                        else if (PermitDesc[PermitIndex])
                                            return <div key={v4()} onClick={e => handleChangePermit(IndexTypeUser, PermitIndex)} className='UserTypesPermits-TypeContainer-ListItem2'>
                                                <RxUpdate className="spinner-icon" />
                                                <span> {PermitDesc[PermitIndex]}</span>
                                            </div>
                                        else
                                            return

                                    })}
                                </div>
                            </div>
                        </Show>
                    })}
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