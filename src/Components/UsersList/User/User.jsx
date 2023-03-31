import React, { useState, useEffect } from 'react'
import './User.css'
import { UilEnvelope, UilUser } from '@iconscout/react-unicons'
import { GetSetoresFromStore, GetUserTypesFromStore } from '../../../Functions/Middleware'

export default function User(props) {


    const [UserType, setUserType] = useState({})
    const [UserSetor, setUserSetor] = useState({})



    useEffect(() => {
        const Tipos = GetUserTypesFromStore()       
        setUserType(Tipos.find(U => U.id === props.User.Type.id))
    }, [props.User.Type.id])


    useEffect(() => {
        const Setores = GetSetoresFromStore()
        setUserSetor({ ...Setores.find(U => U.id === props.User.Sector.id) })
    }, [props.User.Sector.id])





    return (
        <>

            <div className={localStorage.getItem('AssetSenseTema') === 'Escuro' ? 'UserContainerEscuro UserContainer' : 'UserContainerClaro UserContainer'} >

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
                <div className='UserContainerColumn SetorColumnContainer'>
                    <span className='SetorColumn'>
                        {UserSetor.Value}
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
