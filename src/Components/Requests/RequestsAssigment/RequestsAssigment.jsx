
//REACT
import React, { useState, useEffect } from 'react'
//CSS
import './RequestsAssigment.css'
//LIBRARIES
import { connect } from 'react-redux'
import Stack from '../../LayoutComponents/Stack/Stack';
import SidebarSubItem from '../../LayoutComponents/SidebarSubItem/SidebarSubItem';
import { UilLabel } from '@iconscout/react-unicons'
import Info from '../../LayoutComponents/Info/Info'
import SubSectionTitle from '../../LayoutComponents/SubSectionTitle/SubSectionTitle'

const RequestsAssigment = (props) => {

    const [RequestsTypeKey, setRequestsTypeKey] = useState(props.RequestsTypes[0].id);


    return (


        <div className={props.Tema === 'Escuro' ? 'RequestsAssigentContainerEscuro RequestsAssigentContainer' : 'RequestsAssigentContainerClaro RequestsAssigentContainer'}>

            <SubSectionTitle>Tipos de Solicitações</SubSectionTitle>



            <div className='RequestsAssigentBody'>
                <Stack Gap={'.3rem'}>

                    {props.RequestsTypes.map(Type => {
                        return <SidebarSubItem Active={RequestsTypeKey === Type.id}
                            onClick={(k) => setRequestsTypeKey(Type.id)}>
                            <UilLabel />
                            {Type.Value}
                        </SidebarSubItem>
                    })}



                </Stack>

                <div className='RequestsAssigentUsers'>
                    sasas
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






