import React, { useState, useEffect } from 'react'
import './Request.css'
import { UilTicket, UilUser, UilPlay, UilLabelAlt } from '@iconscout/react-unicons'
import { GetFromStoreWithId, GetNameFromStoreWithId } from '../../../Functions/StoreMiddleware'
//Tooltip
import { Tooltip } from 'react-tippy';
import { connect } from 'react-redux'
import { DefaultTooltipStyles } from '../../../GlobalVars';

const Request = (props) => {


    const [RequestType] = useState(GetNameFromStoreWithId("RequestsTypes", props.Request.Type.id))
    const [RequestStatus] = useState(GetNameFromStoreWithId("RequestsStatus", props.Request.Status.id))
    const [RequestStatusColor] = useState(GetFromStoreWithId("RequestsStatus", props.Request.Status.id))

    console.log(RequestStatusColor)

    const RequesterName = GetNameFromStoreWithId("Users", props.Request.CreatedBy)

    return (
        <>
            <div className={props.Tema === 'Escuro' ? 'RequestContainerEscuro RequestContainer' : 'RequestContainerClaro RequestContainer'} >

                <span className='RequestContainerColumn NameColumnContainer'>
                    <span className='TitleColumn'>
                        <UilTicket />
                        <span> {props.Request.Title}</span>
                    </span>
                </span>
                <span className='RequestContainerColumn RequesterColumnContainer'>
                    <Tooltip style={DefaultTooltipStyles} title="Solicitante" position="bottom" >
                        <span className='RequesterColumn'>
                            <UilUser />
                            {RequesterName}
                        </span>
                    </Tooltip>
                </span>
                <div className='RequestContainerColumn StatusColumnContainer'>
                    <Tooltip style={DefaultTooltipStyles} title="Status da Solicitação" position="bottom" >
                        <span className='StatusColumn' style={{ backgroundColor: RequestStatusColor.Color }}>

                            <span>{RequestStatus}</span>
                        </span>
                    </Tooltip>

                </div>
                <span className='RequestContainerColumn TypeColumnContainer'>
                    <Tooltip style={DefaultTooltipStyles} title="Tipo da Soliticação" position="bottom" >
                        <span className='TypeColumn'>
                            <UilLabelAlt />
                            <span>{RequestType}</span>
                        </span>
                    </Tooltip>

                </span>
            </div>
        </>

    )
}


const ConnectedRequest = connect((state) => {
    return {
        Tema: state.Tema
    }
})(Request)

export default ConnectedRequest
