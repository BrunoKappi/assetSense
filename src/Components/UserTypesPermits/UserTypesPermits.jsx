import React from 'react'
import { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { PermitDesc } from '../../GlobalVars';
import './UserTypesPermits.css'
import { Tooltip } from 'react-tippy';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import { SetUserTypesOnStore, EditUserTypeInFirebase } from '../../Functions/Middleware';
import { v4 } from 'uuid';
import { NotificationErro, NotificationSucesso } from '../../NotificationUtils';
import TabsContainer from '../LayoutComponents/TabsContainer/TabsContainer';
import TabButton from '../LayoutComponents/TabButton/TabButton';
import Show from '../LayoutComponents/Show/Show';




const UserTypesPermits = (props) => {

    //STATES
    const [UserTypes, setUserTypes] = useState([...props.UserTypes])
    const [TypeUserKey, setTypeUserKey] = useState(props.UserTypes[0].id)

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

        EditUserTypeInFirebase(TypesCopy[TypeIndex]).then(() => {
            SetUserTypesOnStore(TypesCopy)
            setUserTypes(TypesCopy)
            NotificationSucesso("Permissões", "Permissões editadas com sucesso!")
        }).catch(() => {
            NotificationErro("Erro", "Ocorreu um problema, tente novamente")
        })

    }

    //CHANGE PERMIT
    const handleChangePermit = (TypeIndex, PermitIndex) => {
        var TypesCopy = [...props.UserTypes]
        TypesCopy[TypeIndex].Permits[PermitIndex] = !TypesCopy[TypeIndex].Permits[PermitIndex]

        const AllTrue = TypesCopy[TypeIndex].Permits.every(function (valor) { return valor === true; })

        TypesCopy[TypeIndex].IsAdmin = AllTrue

        EditUserTypeInFirebase(TypesCopy[TypeIndex]).then(() => {
            SetUserTypesOnStore(TypesCopy)
            setUserTypes(TypesCopy)
            NotificationSucesso("Permissões", "Permissões editadas com sucesso!")
        }).catch(() => {
            NotificationErro("Erro", "Ocorreu um problema, tente novamente")
        })

    }


    return (
        <div className={props.Tema === 'Escuro' ? 'UserTypesPermitsContainerEscuro UserTypesPermitsContainer' : 'UserTypesPermitsContainerClaro UserTypesPermitsContainer'}>

            <TabsContainer Tema={props.Tema}>
                {UserTypes.map((TypeUser) => {
                    return <TabButton Text={TypeUser.Value} ButtonName={TypeUser.id} Key={TypeUserKey} onClick={(k) => setTypeUserKey(TypeUser.id)} />
                })}
            </TabsContainer>

            {UserTypes.map((TypeUser, IndexTypeUser) => {
                return <Show Show={TypeUserKey === TypeUser.id}>
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


        </div >
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