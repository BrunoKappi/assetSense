import React from 'react'
import './User.css'
import { UilEnvelope, UilUser, UilPuzzlePiece, UilLabelAlt } from '@iconscout/react-unicons'
//Tooltip
import { Tooltip } from 'react-tippy';
import { connect } from 'react-redux'
import { DefaultTooltipStyles } from '../../../GlobalVars';

const User = ({ User, UserTypes, Sectors, Tema }) => {

    const Type = UserTypes.find(U => U.id === User.Type.id)?.Value
    const Sector = Sectors.find(U => U.id === User.Sector.id)?.Value

    return (
        <div className={Tema === 'Dark' ? 'UserContainerDark UserContainer' : 'UserContainerLightTheme UserContainer'} >

            <span className='UserContainerColumn NameColumnContainer'>
                <Tooltip style={DefaultTooltipStyles} title="Nome" position="bottom" >
                    <span className='NameColumn'>
                        <UilUser />
                        <span> {User.Name + ' ' + User.LastName}</span>
                    </span>
                </Tooltip>
            </span>
            <span className='UserContainerColumn UserEmailColumnContainer'>
                <Tooltip style={DefaultTooltipStyles} title="Email do Usuário" position="bottom" >
                    <span className='UserEmailColumn'>
                        <UilEnvelope />
                        {User.Email.charAt(0).toUpperCase() + User.Email.slice(1)}
                    </span>
                </Tooltip>
            </span>
            <div className='UserContainerColumn SectorColumnContainer'>
                <Tooltip style={DefaultTooltipStyles} title="Setor" position="bottom" >
                    <span className='SectorColumn'>
                        <UilPuzzlePiece />
                        {Sector}
                    </span>
                </Tooltip>

            </div>
            <span className='UserContainerColumn UserTypeColumnContainer'>
                <Tooltip style={DefaultTooltipStyles} title="Tipo de Usuário" position="bottom" >
                    <span className='UserTypeColumn'>
                        <UilLabelAlt />
                        {Type}
                    </span>
                </Tooltip>

            </span>
        </div>
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
