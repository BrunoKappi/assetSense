import React, { useState } from 'react'
import './Ativos.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AtivosInTypes from '../AtivosInTypes/AtivosInTypes'
import AtivosInLocais from '../AtivosInLocais/AtivosInLocais'
import { GetCurrentUserTypePermitFromStore } from '../../Functions/Middleware';
import { NotificationErro } from '../../NotificationUtils';
import AtivosList from '../AtivosList/AtivosList'
import { connect } from 'react-redux'
import TabsContainer from '../LayoutComponents/TabsContainer/TabsContainer';
import TabButton from '../LayoutComponents/TabButton/TabButton';
 

const Ativos = (props) => {

  const TodosPermit = GetCurrentUserTypePermitFromStore('ATIVOS') || GetCurrentUserTypePermitFromStore('EDITAR_ATIVOS') || GetCurrentUserTypePermitFromStore('VISUALIZAR_ATIVOS')
  const LocaisPermit = GetCurrentUserTypePermitFromStore('EDITAR_ATIVOS') || GetCurrentUserTypePermitFromStore('VISUALIZAR_ATIVOS')
  const TiposPermit = GetCurrentUserTypePermitFromStore('EDITAR_ATIVOS') || GetCurrentUserTypePermitFromStore('VISUALIZAR_ATIVOS')

  const getInitialTab = () => {
    if (TodosPermit) 
      return 'TodosAtivos'
    else if (LocaisPermit) 
      return 'AtivosInArmazenamento'
    else if (TiposPermit)
      return 'AtivosInTipos'
  }



  const [key, setKey] = useState(getInitialTab());

  const SetKeyAtivos = (Key) => {
    if (Key === 'TodosAtivos' && TodosPermit)
      setKey(Key)
    else if (Key === 'AtivosInArmazenamento' && LocaisPermit)
      setKey(Key)
    else if (Key === 'AtivosInTipos' && TiposPermit)
      setKey(Key)
    else
      NotificationErro("Não Autorizado", "Você não possui permissão para acessar essa aba, solicite acesso ao seu Administrador")
  }




  return (

    <div className={props.Tema === 'Escuro' ? 'AtivosContainerEscuro AtivosContainer' : 'AtivosContainerClaro AtivosContainer'}>
   
      
      <TabsContainer Tema={props.Tema}>
        <TabButton ButtonName="TodosAtivos" Key={key} onClick={(k) => SetKeyAtivos('TodosAtivos')} />
        <TabButton ButtonName="AtivosInArmazenamento" Key={key} onClick={(k) => SetKeyAtivos('AtivosInArmazenamento')} />       
        <TabButton ButtonName="AtivosInTipos" Key={key} onClick={(k) => SetKeyAtivos('AtivosInTipos')} />
      </TabsContainer>


      <Tabs id="UsersTabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">

        <Tab eventKey="TodosAtivos" >

          <AtivosList />

        </Tab>
        <Tab eventKey="AtivosInTipos" >
          <div className='ListItensContainer'>
            <AtivosInTypes />
          </div>
        </Tab>
        <Tab eventKey="AtivosInArmazenamento">
          <div className='ListItensContainer'>
            <AtivosInLocais />
          </div>
        </Tab>
      </Tabs>

    </div>
  )
}


const ConnectedAtivos = connect((state) => {
  return {
    Tema: state.Tema
  }
})(Ativos)

export default ConnectedAtivos