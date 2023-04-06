import React, { useState } from 'react'
import './Ativo.css'
import { UilWrench, UilBox, UilPlay , UilArchive, UilLabelAlt } from '@iconscout/react-unicons'
import { GetLocalArmazenamentoNameWithIdFromStore, GetTakesOfAtivo, GetTipoAtivoNameWithIdFromStore, GetTipoDeUsoNameWithIdFromStore, } from '../../../Functions/Middleware'
//Tooltip
import { Tooltip } from 'react-tippy';
import { DefaultTooltipStyles } from '../../../GlobalVars';
import { connect } from 'react-redux'

const Ativo = (props) => {
 

    //Quantidades
    const QuantidadeDoAtivo = props.Ativo?.Qtd
    const [QuantidadeRetirada, SetQuantidadeRetirada] = useState(GetTakesOfAtivo(props.Ativo?.id))



    return (
        <>

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
                            {QuantidadeDoAtivo}
                        </span>
                    </Tooltip>
                    <Tooltip title="Quantidade em Uso" position="bottom" >
                        <span className='AtivoQuantidades'>
                            <UilPlay  />
                            {QuantidadeRetirada}
                        </span>
                    </Tooltip>



                </span>
                <div className='AtivoContainrColumn LocalArmazenamentoColumnContainer'>
                    <Tooltip title="Local de Armazenamento" position="bottom" >
                        <span className='LocalArmazenamentoColumn'>
                            <UilBox />
                            <span>{GetLocalArmazenamentoNameWithIdFromStore(props.Ativo.StorageLocation.id)}</span>
                        </span>
                    </Tooltip>
                </div>
                <span className='AtivoContainrColumn AtivoTypeColumnContainer'>
                    <Tooltip title="Tipo do Ativo" position="bottom" >
                        <span className='AtivoTypeColumn'>
                            <UilLabelAlt />
                            <span>{GetTipoAtivoNameWithIdFromStore(props.Ativo.Type.id)}</span>
                        </span>
                    </Tooltip>
                </span>
            </div>
        </>



    )
}


const ConnectedAtivo = connect((state) => {
    return {       
        Tema: state.Tema
    }
  })(Ativo)
  
  export default ConnectedAtivo  
  