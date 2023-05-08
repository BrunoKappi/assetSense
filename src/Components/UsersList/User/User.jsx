import React, { useState, useEffect } from 'react'
import './User.css'
import { UilEnvelope, UilUser, UilPuzzlePiece, UilLabelAlt } from '@iconscout/react-unicons'
//Tooltip
import { Tooltip } from 'react-tippy';
import { connect } from 'react-redux'
import { DefaultTooltipStyles } from '../../../GlobalVars';

const User = (props) => {


    const [UserType, setUserType] = useState({})
    const [UserSector, setUserSector] = useState({})



    useEffect(() => {
        setUserType(props.UserTypes.find(U => U.id === props.User.Type.id))
    }, [props.User.Type.id])


    useEffect(() => {
        setUserSector({ ...props.Sectors.find(U => U.id === props.User.Sector.id) })
    }, [props.User.Sector.id])





    return (
        <>

            <div className={props.Tema === 'Escuro' ? 'UserContainerEscuro UserContainer' : 'UserContainerClaro UserContainer'} >

                <span className='UserContainerColumn NameColumnContainer'>
                    <Tooltip style={DefaultTooltipStyles} title="Nome" position="bottom" >
                        <span className='NameColumn'>
                            <UilUser />
                            <span> {props.User.Name + ' ' + props.User.LastName}</span>
                        </span>
                    </Tooltip>
                </span>
                <span className='UserContainerColumn UserEmailColumnContainer'>
                    <Tooltip style={DefaultTooltipStyles} title="Email do Usuário" position="bottom" >
                        <span className='UserEmailColumn'>
                            <UilEnvelope />
                            {props.User.Email.charAt(0).toUpperCase() + props.User.Email.slice(1)}
                        </span>
                    </Tooltip>
                </span>
                <div className='UserContainerColumn SectorColumnContainer'>
                    <Tooltip style={DefaultTooltipStyles} title="Setor" position="bottom" >
                        <span className='SectorColumn'>
                            <UilPuzzlePiece />
                            {UserSector.Value}
                        </span>
                    </Tooltip>

                </div>
                <span className='UserContainerColumn UserTypeColumnContainer'>
                    <Tooltip style={DefaultTooltipStyles} title="Tipo de Usuário" position="bottom" >
                        <span className='UserTypeColumn'>
                            <UilLabelAlt />
                            {UserType.Value}
                        </span>
                    </Tooltip>

                </span>
            </div>
        </>

    )
}


const ConnectedUser = connect((state) => {
    return {
        Tema: state.Tema,
        Sectors: state.Sectors,
        UserTypes: state.UserTypes
    }
})(User)

export default ConnectedUser
