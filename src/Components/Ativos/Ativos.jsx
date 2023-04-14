import React, { useState } from 'react'
import './Ativos.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AtivosInTypes from '../AtivosInTypes/AtivosInTypes'
import AtivosInLocais from '../AtivosInLocais/AtivosInLocais'
import { NotificationErro } from '../../NotificationUtils';
import AtivosList from '../AtivosList/AtivosList'
import { connect } from 'react-redux'
import TabsContainer from '../LayoutComponents/TabsContainer/TabsContainer';
import TabButton from '../LayoutComponents/TabButton/TabButton';
import { AtivosInLocaisTab, AtivosInTypesTab, TodosAtivosTab } from '../../Functions/Permits';


const Ativos = (props) => {

  // GET INITIAL TAB BASED ON PERMITS
  const getInitialTab = () => {
    if (TodosAtivosTab())
      return 'TodosAtivos'
    else if (AtivosInLocaisTab())
      return 'AtivosInArmazenamento'
    else if (AtivosInTypesTab())
      return 'AtivosInTipos'
  }


  const [key, setKey] = useState(getInitialTab());

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