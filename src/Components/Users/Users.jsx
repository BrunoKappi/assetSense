import React, { useState } from 'react'
import './Users.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UsersInSetores from '../UsersInSetores/UsersInSetores';
import UsersInTypes from '../UsersInTypes/UsersInTypes';
import UsersList from '../UsersList/UsersList';
import { GetCurrentUserTypePermitFromStore } from '../../Functions/Middleware';
import { NotificationErro } from '../../NotificationUtils';
import { connect } from 'react-redux'
import TabsContainer from '../LayoutComponents/TabsContainer/TabsContainer';
import TabButton from '../LayoutComponents/TabButton/TabButton';




const Users = (props) => {

  const TodosPermit = GetCurrentUserTypePermitFromStore('USUARIOS') || GetCurrentUserTypePermitFromStore('EDITAR_USUARIOS') || GetCurrentUserTypePermitFromStore('VISUALIZAR_USUARIOS')
  const SetoresPermit = GetCurrentUserTypePermitFromStore('EDITAR_USUARIOS') || GetCurrentUserTypePermitFromStore('VISUALIZAR_USUARIOS')
  const TiposPermit = GetCurrentUserTypePermitFromStore('EDITAR_USUARIOS') || GetCurrentUserTypePermitFromStore('VISUALIZAR_USUARIOS')

  const getInitialTab = () => {
    if (TodosPermit)
      return 'TodosUsuarios'
    else if (SetoresPermit)
      return 'UsersInSetores'
    else if (TiposPermit)
      return 'UsersInTipos'
  }

  const [key, setKey] = useState(getInitialTab());

  const SetKeyConfig = (Key) => {
    if (Key === 'TodosUsuarios' && TodosPermit)
      setKey(Key)
    else if (Key === 'UsersInSetores' && SetoresPermit)
      setKey(Key)
    else if (Key === 'UsersInTipos' && TiposPermit)
      setKey(Key)
    else
      NotificationErro("Não Autorizado", "Você não possui permissão para acessar essa aba, solicite acesso ao seu Administrador")
  }

  return (
    <div className={props.Tema === 'Escuro' ? 'UsersContainerEscuro UsersContainer' : 'UsersContainerClaro UsersContainer'}>



 
      <TabsContainer Tema={props.Tema}>
        <TabButton ButtonName="TodosUsuarios" Key={key} onClick={(k) => SetKeyConfig('TodosUsuarios')} />
        <TabButton ButtonName="UsersInSetores" Key={key} onClick={(k) => SetKeyConfig('UsersInSetores')} />       
        <TabButton ButtonName="UsersInTipos" Key={key} onClick={(k) => SetKeyConfig('UsersInTipos')} />
      </TabsContainer>


      <Tabs id="UsersTabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab className='TabItem' eventKey="TodosUsuarios" >
          <UsersList />
        </Tab>
        <Tab eventKey="UsersInSetores" >
          <UsersInSetores />
        </Tab>
        <Tab eventKey="UsersInTipos"  >
          <UsersInTypes />
        </Tab>
      </Tabs>
    </div>
  )
}


 
const ConnectedUsers = connect((state) => {
  return {       
      Tema: state.Tema
  }
})(Users)

export default ConnectedUsers  











