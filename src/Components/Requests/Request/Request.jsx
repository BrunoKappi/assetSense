import React, { useState } from 'react'
import './Request.css'
import { UilTicket, UilUser, UilLabelAlt } from '@iconscout/react-unicons'
import { GetFromStoreWithId, GetNameFromStoreWithId } from '../../../Functions/StoreMiddleware'
//Tooltip
import { Tooltip } from 'react-tippy';
import { connect } from 'react-redux'
import { DefaultTooltipStyles } from '../../../GlobalVars';


const Request = ({ Request, Tema }) => {


    const [RequestStatusColor] = useState(GetFromStoreWithId("RequestsStatus", Request.Status.id))

    const Status = GetNameFromStoreWithId('RequestsStatus', Request.Status.id)
    const User = GetNameFromStoreWithId('Users', Request.CreatedBy)
    const Type = GetNameFromStoreWithId('RequestsTypes', Request.Type.id)


    return (
        <div className={Tema === 'Dark' ? 'RequestContainerDark RequestContainer' : 'RequestContainerLightTheme RequestContainer'} >

            <span className='RequestContainerColumn NameColumnContainer'>
                <span className='TitleColumn'>
                    <UilTicket />
                    <span> {Request.Title}</span>
                </span>
            </span>
            <span className='RequestContainerColumn RequesterColumnContainer'>
                <Tooltip style={DefaultTooltipStyles} title="Solicitante" position="bottom" >
                    <span className='RequesterColumn'>
                        <UilUser />
                        {User}
                    </span>
                </Tooltip>
            </span>
            <div className='RequestContainerColumn StatusColumnContainer'>
                <Tooltip style={DefaultTooltipStyles} title="Status da Solicitação" position="bottom" >
                    <span className='StatusColumn' style={{ backgroundColor: RequestStatusColor.Color }}>
                        <span>
                            {Status}
                        </span>
                    </span>
                </Tooltip>
            </div>
            <span className='RequestContainerColumn TypeColumnContainer'>
                <Tooltip style={DefaultTooltipStyles} title="Tipo da Soliticação" position="bottom" >
                    <span className='TypeColumn'>
                        <UilLabelAlt />
                        <span>
                            {Type}
                        </span>
                    </span>
                </Tooltip>
            </span>
        </div>
    )
}


const ConnectedRequest = connect((state) => {
    return {
        Tema: state.Tema
    }
})(Request)

export default ConnectedRequest
