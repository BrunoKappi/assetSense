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
import { TodosUsersTab, UsersInSectorsTab, UsersInTypesTab } from '../../Functions/PermitsMiddleware';
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
      return 'TodosUsers'
    else if (UsersInSectorsTab())
      return 'UsersInSectors'
    else if (UsersInTypesTab())
      return 'UsersInTypes'
  }

  //KEY OF TAB
  const [key, setKey] = useState(getInitialTab());

  //SET KEY OF TAB BASED ON PERMITS
  const SetKeyConfig = (Key) => {
    if (Key === 'TodosUsers' && TodosUsersTab())
      setKey(Key)
    else if (Key === 'UsersInSectors' && UsersInSectorsTab())
      setKey(Key)
    else if (Key === 'UsersInTypes' && UsersInTypesTab())
      setKey(Key)
    else
      NotificationErro("Não Autorizado", "Você não possui permissão para acessar essa aba, solicite acesso ao seu Administrador")
  }

  return (
    <div className={props.Tema === 'Dark' ? 'UsersContainerDark UsersContainer' : 'UsersContainerLightTheme UsersContainer'}>



      <TabsContainer Direction="row" Tema ={props.Tema}>
        <TabButton ButtonName="TodosUsers" Key={key} onClick={(k) => SetKeyConfig('TodosUsers')} />
        <TabButton ButtonName="UsersInSectors" Key={key} onClick={(k) => SetKeyConfig('UsersInSectors')} />
        <TabButton ButtonName="UsersInTypes" Key={key} onClick={(k) => SetKeyConfig('UsersInTypes')} />
      </TabsContainer>

    

      <Tabs id="UsersTabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="TodosUsers" >
          <UsersList />
        </Tab>
        <Tab eventKey="UsersInSectors" >
          <DraggableLists Module='UsersInSectores' />
        </Tab>
        <Tab eventKey="UsersInTypes"  >
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











