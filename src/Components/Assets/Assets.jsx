import React, { useState } from 'react'
import './Assets.css'
//LIBRARIES
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { connect } from 'react-redux'
//COMPONENTS
import DraggableLists from '../DraggableLists/DraggableLists'
import AtivosList from '../AssetList/AssetList'
//LAYOUT COMPONENTS
import TabsContainer from '../LayoutComponents/TabsContainer/TabsContainer';
import TabButton from '../LayoutComponents/TabButton/TabButton';
//FUNCTIONS
import { AtivosInLocaisTab, AtivosInTypesTab, TodosAtivosTab, AtivosInStatusTab, AtivosInUsageTypesTab } from '../../Functions/Permits';
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
    else if (Key === 'AtivosInStatus' && AtivosInStatusTab())
      setKey(Key)
    else if (Key === 'AtivosInUsageTypes' && AtivosInUsageTypesTab())
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
        <TabButton ButtonName="AtivosInUsageTypes" Key={key} onClick={(k) => SetKeyAtivos('AtivosInUsageTypes')} />
        <TabButton ButtonName="AtivosInStatus" Key={key} onClick={(k) => SetKeyAtivos('AtivosInStatus')} />

      </TabsContainer>

      {/****************************** BOOTSTRAP TABS  *********************************/}
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">

        {/******************************  TODOS ATIVOS TAB  *********************************/}
        <Tab eventKey="TodosAtivos" >
          <AtivosList />
        </Tab>
        {/******************************  ATIVOS IN TYPES TAB  *********************************/}
        <Tab eventKey="AtivosInTipos" >
          <div className='ListItensContainer'>
            <DraggableLists Module='AtivosInTypes' />
          </div>
        </Tab>
        {/******************************  ATIVOS IN LOCAIS TAB  *********************************/}
        <Tab eventKey="AtivosInArmazenamento">
          <div className='ListItensContainer'>
            <DraggableLists Module='AtivosInLocais' />
          </div>
        </Tab>
        <Tab eventKey="AtivosInUsageTypes">
          <div className='ListItensContainer'>
            <DraggableLists Module='AtivosInUsageTypes' />
          </div>
        </Tab>
        <Tab eventKey="AtivosInStatus">
          <div className='ListItensContainer'>
            <DraggableLists Module='AtivosInStatus' />
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