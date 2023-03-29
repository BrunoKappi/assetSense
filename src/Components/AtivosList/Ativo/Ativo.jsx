import React from 'react'
import './Ativo.css'
import { UilWrench, UilPlay } from '@iconscout/react-unicons'
import { GetLocalArmazenamentoNameWithIdFromStore, GetTipoAtivoNameWithIdFromStore, GetTipoDeUsoNameWithIdFromStore, } from '../../../Functions/Middleware'

export default function Ativo(props) {






    return (
        <>

            <div className={localStorage.getItem('AssetSenseTema') === 'Escuro' ? 'AtivoContainrEscuro AtivoContainr' : 'AtivoContainrClaro AtivoContainr'} >

                <span className='AtivoContainrColumn NameColumnContainer'>
                    <span className='AtivoNameColumn'>
                        <UilWrench />
                        <span> {props.Ativo.Item}</span>
                    </span>
                </span>
                <span className='AtivoContainrColumn TipoDeUsoColumnContainer'>
                    <span className='TipoDeUsoColumn'>
                        <UilPlay />
                        {GetTipoDeUsoNameWithIdFromStore(props.Ativo.Usage.Id)}
                    </span>
                </span>
                <div className='AtivoContainrColumn LocalArmazenamentoColumnContainer'>
                    <span className='LocalArmazenamentoColumn'>
                        {GetLocalArmazenamentoNameWithIdFromStore(props.Ativo.StorageLocation.Id)}
                    </span>
                </div>
                <span className='AtivoContainrColumn AtivoTypeColumnContainer'>
                    <span className='AtivoTypeColumn'>
                        {GetTipoAtivoNameWithIdFromStore(props.Ativo.Type.Id)}
                    </span>
                </span>
            </div>
        </>



    )
}
