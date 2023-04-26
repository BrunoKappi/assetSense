import React, { useState, useEffect } from 'react'
import './User.css'
import { UilEnvelope, UilUser } from '@iconscout/react-unicons'
import { GetFromStore } from '../../../Functions/Middleware'

import { connect } from 'react-redux'

const User = (props) => {


    const [UserType, setUserType] = useState({})
    const [UserSector, setUserSector] = useState({})



    useEffect(() => {
        const Tipos = GetFromStore('TiposUsuarios')
        setUserType(Tipos.find(U => U.id === props.User.Type.id))
    }, [props.User.Type.id])


    useEffect(() => {
        const Sectors = GetFromStore('Sectors')
        setUserSector({ ...Sectors.find(U => U.id === props.User.Sector.id) })
    }, [props.User.Sector.id])





    return (
        <>

            <div className={props.Tema === 'Escuro' ? 'UserContainerEscuro UserContainer' : 'UserContainerClaro UserContainer'} >

                <span className='UserContainerColumn NameColumnContainer'>
                    <span className='NameColumn'>
                        <UilUser />
                        <span> {props.User.Name + ' ' + props.User.LastName}</span>
                    </span>
                </span>
                <span className='UserContainerColumn EmailColumnContainer'>
                    <span className='EmailColumn'>
                        <UilEnvelope />
                        {props.User.Email.charAt(0).toUpperCase() + props.User.Email.slice(1)}
                    </span>
                </span>
                <div className='UserContainerColumn SectorColumnContainer'>
                    <span className='SectorColumn'>
                        {UserSector.Value}
                    </span>
                </div>
                <span className='UserContainerColumn TypeColumnContainer'>
                    <span className='TypeColumn'>
                        {UserType.Value}
                    </span>
                </span>
            </div>
        </>

    )
}


const ConnectedUser = connect((state) => {
    return {
        Tema: state.Tema
    }
})(User)

export default ConnectedUser
