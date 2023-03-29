import React, { useState } from 'react'
import './Ativos.css'
import { ArmazenamentoTabTitle, TiposTabTitle, TodosTabTitle } from './AtivosUtils';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AtivosInTypes from '../AtivosInTypes/AtivosInTypes'
import AtivosInLocais from '../AtivosInLocais/AtivosInLocais'
import { GetCurrentUserTypePermitFromStore } from '../../Functions/Middleware';
import { NotificationErro } from '../../NotificationUtils';
import AtivosList from '../AtivosList/AtivosList'

const Ativos = (props) => {

  const TodosPermit = GetCurrentUserTypePermitFromStore('USUARIOS') || GetCurrentUserTypePermitFromStore('EDITAR_ATIVOS') || GetCurrentUserTypePermitFromStore('VISUALIZAR_ATIVOS')
  const LocaisPermit = GetCurrentUserTypePermitFromStore('EDITAR_ATIVOS') || GetCurrentUserTypePermitFromStore('VISUALIZAR_ATIVOS')
  const TiposPermit = GetCurrentUserTypePermitFromStore('EDITAR_ATIVOS') || GetCurrentUserTypePermitFromStore('VISUALIZAR_ATIVOS')

  const getInitialTab = () => {
    if (TodosPermit)
      return 'Todos'
    else if (LocaisPermit)
      return 'Armazenamento'
    else if (TiposPermit)
      return 'Tipos'
  }



  const [key, setKey] = useState(getInitialTab());

  const SetKeyAtivos = (Key) => {
    if (Key === 'Todos' && TodosPermit)
      setKey(Key)
    else if (Key === 'Armazenamento' && LocaisPermit)
      setKey(Key)
    else if (Key === 'Tipos' && TiposPermit)
      setKey(Key)
    else
      NotificationErro("Não Autorizado", "Você não possui permissão para acessar essa aba, solicite acesso ao seu Administrador")
  }




  return (

    <div className={localStorage.getItem('AssetSenseTema') === 'Escuro' ? 'AtivosContainerEscuro AtivosContainer' : 'AtivosContainerClaro AtivosContainer'}>


      <div className={localStorage.getItem('AssetSenseTema') === 'Escuro' ? 'TabsContainerEscuro TabsContainer' : 'TabsContainerClaro TabsContainer'}>
        <button onClick={(k) => SetKeyAtivos('Todos')} className={key === 'Todos' ? 'TabsButtonActive' : ''}>{TodosTabTitle()}</button>
        <button onClick={(k) => SetKeyAtivos('Armazenamento')} className={key === 'Armazenamento' ? 'TabsButtonActive' : ''}>{ArmazenamentoTabTitle()}</button>
        <button onClick={(k) => SetKeyAtivos('Tipos')} className={key === 'Tipos' ? 'TabsButtonActive' : ''}>{TiposTabTitle()}</button>
      </div>


      <Tabs id="UsersTabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">

        <Tab eventKey="Todos" >
        
            <AtivosList />
         
        </Tab>
        <Tab eventKey="Tipos" >
          <div className='ListItensContainer'>
            <AtivosInTypes />
          </div>
        </Tab>
        <Tab eventKey="Armazenamento">
          <div className='ListItensContainer'>
            <AtivosInLocais />
          </div>
        </Tab>
      </Tabs>









    </div>




  )
}


export default Ativos