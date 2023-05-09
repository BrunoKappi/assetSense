import React, { useState, useEffect } from 'react'
import './Request.css'
import { UilTicket, UilUser, UilPlay, UilLabelAlt } from '@iconscout/react-unicons'
import { GetFromStoreWithId, GetNameFromStoreWithId } from '../../../Functions/StoreMiddleware'
//Tooltip
import { Tooltip } from 'react-tippy';
import { connect } from 'react-redux'
import { DefaultTooltipStyles } from '../../../GlobalVars';
import ItemName from '../../ItemName/ItemName';

const Request = (props) => {


    const [RequestStatusColor] = useState(GetFromStoreWithId("RequestsStatus", props.Request.Status.id))


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
                            <ItemName Collection="Users" ID={props.Request.CreatedBy} />
                        </span>
                    </Tooltip>
                </span>
                <div className='RequestContainerColumn StatusColumnContainer'>
                    <Tooltip style={DefaultTooltipStyles} title="Status da Solicitação" position="bottom" >
                        <span className='StatusColumn' style={{ backgroundColor: RequestStatusColor.Color }}>

                            <span>
                                <ItemName Collection="RequestsStatus" ID={props.Request.Status.id} />
                            </span>

                        </span>
                    </Tooltip>

                </div>
                <span className='RequestContainerColumn TypeColumnContainer'>
                    <Tooltip style={DefaultTooltipStyles} title="Tipo da Soliticação" position="bottom" >
                        <span className='TypeColumn'>
                            <UilLabelAlt />
                            <span>
                                <ItemName Collection="RequestsTypes" ID={props.Request.Type.id} />
                            </span>
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
