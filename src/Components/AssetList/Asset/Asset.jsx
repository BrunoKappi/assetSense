import React from 'react'
import './Asset.css'
import { UilWrench, UilBox, UilPlay, UilArchive, UilLabelAlt, UilUsersAlt } from '@iconscout/react-unicons'
import { GetNameFromStoreWithId, GetNamesOfUsersThatTookAtivo } from '../../../Functions/Middleware'
//Tooltip
import { Tooltip } from 'react-tippy';
import { DefaultTooltipStyles } from '../../../GlobalVars';
import { connect } from 'react-redux'

const Ativo = (props) => {

    console.log("QUE PEGARAM", GetNamesOfUsersThatTookAtivo(props.Ativo.id))

    return (

        <div className={props.Tema === 'Escuro' ? 'AtivoContainrEscuro AtivoContainr' : 'AtivoContainrClaro AtivoContainr'} >

            <span className='AtivoContainrColumn NameColumnContainer'>
                <span className='AtivoNameColumn'>
                    <UilWrench />
                    <span> {props.Ativo.Item}</span>
                </span>
            </span>
            <span className='AtivoContainrColumn AtivoQuantidadesContainer'>

                <Tooltip style={DefaultTooltipStyles} title="Unidades deste Ativo" position="bottom" >
                    <span className='AtivoQuantidades'>
                        <UilArchive />
                        {props.Ativo?.Qtd}
                    </span>
                </Tooltip>
                <Tooltip title="Quantidade em Uso" position="bottom" >
                    <span className='AtivoQuantidades'>
                        <UilPlay />
                        {props.Ativo?.QtdInUse}
                    </span>
                </Tooltip>
            </span>


            <span className='AtivoQuantidades'>
                {GetNamesOfUsersThatTookAtivo(props.Ativo.id) && <UilUsersAlt />}
                {GetNamesOfUsersThatTookAtivo(props.Ativo.id)}
            </span>


            <div className='AtivoContainrColumn LocalArmazenamentoColumnContainer'>
                <Tooltip title="Local de Armazenamento" position="bottom" >
                    <span className='LocalArmazenamentoColumn'>
                        <UilBox />
                        <span>{GetNameFromStoreWithId('StorageLocations', props.Ativo.StorageLocation.id)}</span>
                    </span>
                </Tooltip>
            </div>
            <span className='AtivoContainrColumn AtivoTypeColumnContainer'>
                <Tooltip title="Tipo do Ativo" position="bottom" >
                    <span className='AtivoTypeColumn'>
                        <UilLabelAlt />
                        <span>{GetNameFromStoreWithId('AssetTypess', props.Ativo.Type.id)}</span>
                    </span>
                </Tooltip>
            </span>
        </div>


    )
}


const ConnectedAtivo = connect((state) => {
    return {
        Tema: state.Tema
    }
})(Ativo)

export default ConnectedAtivo
