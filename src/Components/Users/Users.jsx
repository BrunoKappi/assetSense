import React, { useState } from 'react'
import './Users.css'
import { SetoresTabTitle, TiposTabTitle, TodosTabTitle } from './UsersUtils';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UsersInSetores from '../UsersInSetores/UsersInSetores';
import UsersInTypes from '../UsersInTypes/UsersInTypes';
import UsersList from '../UsersList/UsersList';
import { GetCurrentUserTypePermitFromStore } from '../../Functions/Middleware';
import { NotificationErro } from '../../NotificationUtils';





export default function Users() {

  const TodosPermit = GetCurrentUserTypePermitFromStore('USUARIOS') || GetCurrentUserTypePermitFromStore('EDITAR_USUARIOS') || GetCurrentUserTypePermitFromStore('VISUALIZAR_USUARIOS')
  const SetoresPermit = GetCurrentUserTypePermitFromStore('EDITAR_USUARIOS') || GetCurrentUserTypePermitFromStore('VISUALIZAR_USUARIOS')
  const TiposPermit = GetCurrentUserTypePermitFromStore('EDITAR_USUARIOS') || GetCurrentUserTypePermitFromStore('VISUALIZAR_USUARIOS')

  const getInitialTab = () => {
    if (TodosPermit)
      return 'Todos'
    else if (SetoresPermit)
      return 'Setores'
    else if (TiposPermit)
      return 'Tipos'
  }

  const [key, setKey] = useState(getInitialTab());

  const SetKeyConfig = (Key) => {
    if (Key === 'Todos' && TodosPermit)
      setKey(Key)
    else if (Key === 'Setores' && SetoresPermit)
      setKey(Key)
    else if (Key === 'Tipos' && TiposPermit)
      setKey(Key)
    else
      NotificationErro("Não Autorizado", "Você não possui permissão para acessar essa aba, solicite acesso ao seu Administrador")
  }

  return (
    <div className={localStorage.getItem('AssetSenseTema') === 'Escuro' ? 'UsersContainerEscuro UsersContainer' : 'UsersContainerClaro UsersContainer'}>


      <div className={localStorage.getItem('AssetSenseTema') === 'Escuro' ? 'TabsContainerEscuro TabsContainer' : 'TabsContainerClaro TabsContainer'}>
        <button onClick={(k) => SetKeyConfig('Todos')} className={key === 'Todos' ? 'TabsButtonActive' : ''}>{TodosTabTitle()}</button>
        <button onClick={(k) => SetKeyConfig('Setores')} className={key === 'Setores' ? 'TabsButtonActive' : ''}>{SetoresTabTitle()}</button>
        <button onClick={(k) => SetKeyConfig('Tipos')} className={key === 'Tipos' ? 'TabsButtonActive' : ''}>{TiposTabTitle()}</button>
      </div>


      <Tabs id="UsersTabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab className='TabItem' eventKey="Todos" >
          <UsersList />
        </Tab>
        <Tab eventKey="Setores" >
          <UsersInSetores />  
        </Tab>
        <Tab eventKey="Tipos"  >
          <UsersInTypes />
        </Tab>
      </Tabs>
    </div>
  )
}














