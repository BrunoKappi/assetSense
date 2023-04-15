import React from 'react'
import { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { PermitDesc } from '../../GlobalVars';
import './UserTypesPermits.css'
import { Tooltip } from 'react-tippy';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import { EditUserType, SaveUserTipos } from '../../Functions/Middleware';
import { v4 } from 'uuid';
import { NotificationErro, NotificationSucesso } from '../../NotificationUtils';
import TabsContainer from '../LayoutComponents/TabsContainer/TabsContainer';
import TabButton from '../LayoutComponents/TabButton/TabButton';
import Show from '../LayoutComponents/Show/Show';

const UserTypesPermits = (props) => {

    //STATES
    const [TiposUsuarios, setTiposUsuarios] = useState([...props.TiposUsuarios])
    const [TipoUserKey, setTipoUserKey] = useState(props.TiposUsuarios[0].id)

    //FILL USER TYPES
    useEffect(() => {
        setTiposUsuarios([...props.TiposUsuarios])
    }, [props.TiposUsuarios])

    // CHECK USER TYPE AS ADMIN
    const CheckAdmin = (TipoIndex) => {
        var TiposCopy = [...props.TiposUsuarios]

        TiposCopy[TipoIndex].Permits.forEach(function (valor, indice) {
            TiposCopy[TipoIndex].Permits[indice] = true
        });

        TiposCopy[TipoIndex].IsAdmin = true

        EditUserType(TiposCopy[TipoIndex]).then(() => {
            SaveUserTipos(TiposCopy)
            setTiposUsuarios(TiposCopy)
            NotificationSucesso("Permissões", "Permissões editadas com sucesso!")
        }).catch(() => {
            NotificationErro("Erro", "Ocorreu um problema, tente novamente")
        })

    }

    //CHANGE PERMIT
    const handleChangePermit = (TipoIndex, PermitIndex) => {
        var TiposCopy = [...props.TiposUsuarios]
        TiposCopy[TipoIndex].Permits[PermitIndex] = !TiposCopy[TipoIndex].Permits[PermitIndex]

        const AllTrue = TiposCopy[TipoIndex].Permits.every(function (valor) { return valor === true; })

        TiposCopy[TipoIndex].IsAdmin = AllTrue

        EditUserType(TiposCopy[TipoIndex]).then(() => {
            SaveUserTipos(TiposCopy)
            setTiposUsuarios(TiposCopy)
            NotificationSucesso("Permissões", "Permissões editadas com sucesso!")
        }).catch(() => {
            NotificationErro("Erro", "Ocorreu um problema, tente novamente")
        })

    }


    return (
        <div className={props.Tema === 'Escuro' ? 'UserTypesPermitsContainerEscuro UserTypesPermitsContainer' : 'UserTypesPermitsContainerClaro UserTypesPermitsContainer'}>

            <TabsContainer Tema={props.Tema}>
                {TiposUsuarios.map((TipoUsuario) => {
                    return <TabButton Text={TipoUsuario.Value} ButtonName={TipoUsuario.id} Key={TipoUserKey} onClick={(k) => setTipoUserKey(TipoUsuario.id)} />
                })}
            </TabsContainer>

            {TiposUsuarios.map((TipoUsuario, IndexTipoUsuario) => {
                return <Show Show={TipoUserKey === TipoUsuario.id}>
                    <div key={v4()} className='UserTypesPermits-TypeContainer'>
                        <div className='UserTypesPermits-TypeContainer-Title'>
                            <span>{TipoUsuario.Value}</span>

                            <Show Show={TipoUsuario.IsAdmin}>
                                <Tooltip title="Possui permissões de Administrador" position="bottom" >
                                    <ImCheckboxChecked />
                                </Tooltip>
                            </Show>

                            <Show Show={!TipoUsuario.IsAdmin}>
                                <Tooltip title="Permissões de Administrador" position="bottom" >
                                    <ImCheckboxUnchecked onClick={e => CheckAdmin(IndexTipoUsuario)} />
                                </Tooltip>
                            </Show>
                        </div>
                        <div className='UserTypesPermits-TypeContainer-List'>
                            {TipoUsuario.Permits.map((Permit, PermitIndex) => {
                                if (PermitDesc[PermitIndex])
                                    return <div key={v4()} onClick={e => handleChangePermit(IndexTipoUsuario, PermitIndex)} className='UserTypesPermits-TypeContainer-ListItem'>
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
        Setores: state.Setores,
        Usuarios: state.Usuarios,
        TiposUsuarios: state.TiposUsuarios,
        Tema: state.Tema
    }
})(UserTypesPermits)

export default ConnectedUserTypesPermits 