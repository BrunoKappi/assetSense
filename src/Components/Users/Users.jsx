import React, { useState } from 'react'
import './Users.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DraggableLists from '../DraggableLists/DraggableLists'
import UsersList from '../UsersList/UsersList';
import { NotificationErro } from '../../NotificationUtils';
import { connect } from 'react-redux'
import TabsContainer from '../LayoutComponents/TabsContainer/TabsContainer';
import TabButton from '../LayoutComponents/TabButton/TabButton';
import { TodosUsersTab, UsersInSectorsTab, UsersInTypesTab } from '../../Functions/Permits';
import FilterSelect from '../LayoutComponents/FilterSelect/FilterSelect'


export const colourOptions = [
  { value: "ocean1", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "yellow", label: "Yellow" },
  { value: "green", label: "Green" },
  { value: "forest", label: "Forest" },
  { value: "slate", label: "Slate" },
  { value: "silver", label: "Silver" }
];

const Users = (props) => {

  //GET INITIAL TAB BASED ON PERMITS
  const getInitialTab = () => {
    if (TodosUsersTab())
      return 'TodosUsuarios'
    else if (UsersInSectorsTab())
      return 'UsersInSectors'
    else if (UsersInTypesTab())
      return 'UsersInTipos'
  }

  //KEY OF TAB
  const [key, setKey] = useState(getInitialTab());

  //SET KEY OF TAB BASED ON PERMITS
  const SetKeyConfig = (Key) => {
    if (Key === 'TodosUsuarios' && TodosUsersTab())
      setKey(Key)
    else if (Key === 'UsersInSectors' && UsersInSectorsTab())
      setKey(Key)
    else if (Key === 'UsersInTipos' && UsersInTypesTab())
      setKey(Key)
    else
      NotificationErro("Não Autorizado", "Você não possui permissão para acessar essa aba, solicite acesso ao seu Administrador")
  }

  return (
    <div className={props.Tema === 'Escuro' ? 'UsersContainerEscuro UsersContainer' : 'UsersContainerClaro UsersContainer'}>



      <TabsContainer Tema={props.Tema}>
        <TabButton ButtonName="TodosUsuarios" Key={key} onClick={(k) => SetKeyConfig('TodosUsuarios')} />
        <TabButton ButtonName="UsersInSectors" Key={key} onClick={(k) => SetKeyConfig('UsersInSectors')} />
        <TabButton ButtonName="UsersInTipos" Key={key} onClick={(k) => SetKeyConfig('UsersInTipos')} />
      </TabsContainer>

    

      <Tabs id="UsersTabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="TodosUsuarios" >
          <UsersList />
        </Tab>
        <Tab eventKey="UsersInSectors" >
          <DraggableLists Module='UsersInSectores' />
        </Tab>
        <Tab eventKey="UsersInTipos"  >
          <DraggableLists Module='UsersInTypes' />
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











