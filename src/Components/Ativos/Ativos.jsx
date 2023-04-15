import React, { useState } from 'react'
import './Ativos.css'
//LIBRARIES
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { connect } from 'react-redux'
//COMPONENTS
import AtivosInTypes from '../AtivosInTypes/AtivosInTypes'
import AtivosInLocais from '../AtivosInLocais/AtivosInLocais'
import AtivosList from '../AtivosList/AtivosList'
//LAYOUT COMPONENTS
import TabsContainer from '../LayoutComponents/TabsContainer/TabsContainer';
import TabButton from '../LayoutComponents/TabButton/TabButton';
//FUNCTIONS
import { AtivosInLocaisTab, AtivosInTypesTab, TodosAtivosTab } from '../../Functions/Permits';
import { NotificationErro } from '../../NotificationUtils';


const Ativos = (props) => {

  //GET INITIAL TAB BASED ON PERMITS
  const getInitialTab = () => {
    if (TodosAtivosTab())
      return 'TodosAtivos'
    else if (AtivosInLocaisTab())
      return 'AtivosInArmazenamento'
    else if (AtivosInTypesTab())
      return 'AtivosInTipos'
  }

  //STATES 
  const [key, setKey] = useState(getInitialTab());

  //KEY THAT CONTROL TABS
  const SetKeyAtivos = (Key) => {
    if (Key === 'TodosAtivos' && TodosAtivosTab())
      setKey(Key)
    else if (Key === 'AtivosInArmazenamento' && AtivosInLocaisTab())
      setKey(Key)
    else if (Key === 'AtivosInTipos' && AtivosInTypesTab())
      setKey(Key)
    else
      NotificationErro("Não Autorizado", "Você não possui permissão para acessar essa aba, solicite acesso ao seu Administrador")
  }


  return (

    <div className={props.Tema === 'Escuro' ? 'AtivosContainerEscuro AtivosContainer' : 'AtivosContainerClaro AtivosContainer'}>

      {/******************************  TABS  *********************************/}
      <TabsContainer Tema={props.Tema}>
        <TabButton ButtonName="TodosAtivos" Key={key} onClick={(k) => SetKeyAtivos('TodosAtivos')} />
        <TabButton ButtonName="AtivosInArmazenamento" Key={key} onClick={(k) => SetKeyAtivos('AtivosInArmazenamento')} />
        <TabButton ButtonName="AtivosInTipos" Key={key} onClick={(k) => SetKeyAtivos('AtivosInTipos')} />
      </TabsContainer>

      {/****************************** BOOTSTRAP TABS  *********************************/}
      <Tabs id="UsersTabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">

        {/******************************  TODOS ATIVOS TAB  *********************************/}
        <Tab eventKey="TodosAtivos" >
          <AtivosList />
        </Tab>
        {/******************************  ATIVOS IN TYPES TAB  *********************************/}
        <Tab eventKey="AtivosInTipos" >
          <div className='ListItensContainer'>
            <AtivosInTypes />
          </div>
        </Tab>
        {/******************************  ATIVOS IN LOCAIS TAB  *********************************/}
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