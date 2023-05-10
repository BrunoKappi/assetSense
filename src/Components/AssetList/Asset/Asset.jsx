import React from 'react'
import './Asset.css'
import { UilWrench, UilBox, UilPlay, UilArchive, UilLabelAlt, UilUsersAlt } from '@iconscout/react-unicons'
import { GetNameFromStoreWithId, GetNamesOfUsersThatTookAsset } from '../../../Functions/StoreMiddleware'
//Tooltip
import { Tooltip } from 'react-tippy';
import { DefaultTooltipStyles } from '../../../GlobalVars';
import { connect } from 'react-redux'

const Asset = (props) => {



    return (

        <div className={props.Tema === 'Dark' ? 'AssetContainerDark AssetContainer' : 'AssetContainerLightTheme AssetContainer'} >

            <span className='AssetContainerColumn NameColumnContainer'>
                <span className='AssetNameColumn'>
                    <UilWrench />
                    <span> {props.Asset.Item}</span>
                </span>
            </span>
            <span className='AssetContainerColumn AssetQuantidadesContainer'>

                <Tooltip style={DefaultTooltipStyles} title="Unidades deste Ativo" position="bottom" >
                    <span className='AssetQuantidades'>
                        <UilArchive />
                        {props.Asset?.Qtd}
                    </span>
                </Tooltip>
                <Tooltip title="Quantidade em Uso" position="bottom" className='custom-tooltip' >
                    <span className='AssetQuantidades'>
                        <UilPlay />
                        {props.Asset?.QtdInUse}
                    </span>
                </Tooltip>
            </span>

            <Tooltip title="Usuários Utilizando este Item" position="bottom" >
                <div>
                    <span className='AssetQuantidades'>
                        {GetNamesOfUsersThatTookAsset(props.Asset.id) && <UilUsersAlt />}

                        <span>{GetNamesOfUsersThatTookAsset(props.Asset.id)}</span>
                    </span>
                </div>
            </Tooltip>

            <div className='AssetContainerColumn StorageLocationColumnContainer'>
                <Tooltip title="Local de Armazenamento" position="bottom" >
                    <span className='StorageLocationColumn'>
                        <UilBox />
                        <span>
                            {GetNameFromStoreWithId('StorageLocations', props.Asset.StorageLocation.id)}
                        </span>
                    </span>
                </Tooltip>
            </div>
            <span className='AssetContainerColumn AssetTypeColumnContainer'>
                <Tooltip title="Tipo do Ativo" position="bottom" >
                    <span className='AssetTypeColumn'>
                        <UilLabelAlt />
                        <span>
                            {GetNameFromStoreWithId('AssetTypes', props.Asset.Type.id)}
                        </span>
                    </span>
                </Tooltip>
            </span>
        </div>


    )
}


const ConnectedAsset = connect((state) => {
    return {
        Tema: state.Tema
    }
})(Asset)

export default ConnectedAsset
