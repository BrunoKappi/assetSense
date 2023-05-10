import React, { useState } from 'react'
import './Assets.css'
//LIBRARIES
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { connect } from 'react-redux'
//COMPONENTS
import DraggableLists from '../../DraggableLists/DraggableLists'
import AssetsList from '../../AssetList/AssetList'
//LAYOUT COMPONENTS
import TabsContainer from '../../LayoutComponents/TabsContainer/TabsContainer';
import TabButton from '../../LayoutComponents/TabButton/TabButton';
//FUNCTIONS
import { AssetsInStorageLocationsTab, AssetsInTypesTab, TodosAssetsTab, AssetsInStatusTab, AssetsInUsageTypesTab } from '../../../Functions/PermitsMiddleware';
import { NotificationErro } from '../../../NotificationUtils';


const Assets = (props) => {

  //GET INITIAL TAB BASED ON PERMITS 
  const getInitialTab = () => {
    if (TodosAssetsTab())
      return 'TodosAssets'
    else if (AssetsInStorageLocationsTab())
      return 'AssetsInArmazenamento'
    else if (AssetsInTypesTab())
      return 'AssetsInTypes'
  }

  //STATES 
  const [key, setKey] = useState(getInitialTab());

  //KEY THAT CONTROL TABS
  const SetKeyAssets = (Key) => {
    if (Key === 'TodosAssets' && TodosAssetsTab())
      setKey(Key)
    else if (Key === 'AssetsInArmazenamento' && AssetsInStorageLocationsTab())
      setKey(Key)
    else if (Key === 'AssetsInTypes' && AssetsInTypesTab())
      setKey(Key)
    else if (Key === 'AssetsInStatus' && AssetsInStatusTab())
      setKey(Key)
    else if (Key === 'AssetsInUsageTypes' && AssetsInUsageTypesTab())
      setKey(Key)
    else
      NotificationErro("Não Autorizado", "Você não possui permissão para acessar essa aba, solicite acesso ao seu Administrador")
  }


  return (

    <div className={props.Tema === 'Dark' ? 'AssetsContainerDark AssetsContainer' : 'AssetsContainerLightTheme AssetsContainer'}>

      {/******************************  TABS  *********************************/}
      <TabsContainer Direction="row" Tema={props.Tema}>
        <TabButton ButtonName="TodosAssets" Key={key} onClick={(k) => SetKeyAssets('TodosAssets')} />
        <TabButton ButtonName="AssetsInArmazenamento" Key={key} onClick={(k) => SetKeyAssets('AssetsInArmazenamento')} />
        <TabButton ButtonName="AssetsInTypes" Key={key} onClick={(k) => SetKeyAssets('AssetsInTypes')} />
        <TabButton ButtonName="AssetsInUsageTypes" Key={key} onClick={(k) => SetKeyAssets('AssetsInUsageTypes')} />
        <TabButton ButtonName="AssetsInStatus" Key={key} onClick={(k) => SetKeyAssets('AssetsInStatus')} />

      </TabsContainer>

      {/****************************** BOOTSTRAP TABS  *********************************/}
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">

        {/******************************  TODOS ASSETS TAB  *********************************/}
        <Tab eventKey="TodosAssets" >
          <AssetsList />
        </Tab>
        {/******************************  ASSETS IN TYPES TAB  *********************************/}
        <Tab eventKey="AssetsInTypes" >
          <div className='ListItensContainer'>
            <DraggableLists Module='AssetsInTypes' />
          </div>
        </Tab>
        {/******************************  ASSETS IN STORAGELOCATIONS TAB  *********************************/}
        <Tab eventKey="AssetsInArmazenamento">
          <div className='ListItensContainer'>
            <DraggableLists Module='AssetsInStorageLocations' />
          </div>
        </Tab>
        <Tab eventKey="AssetsInUsageTypes">
          <div className='ListItensContainer'>
            <DraggableLists Module='AssetsInUsageTypes' />
          </div>
        </Tab>
        <Tab eventKey="AssetsInStatus">
          <div className='ListItensContainer'>
            <DraggableLists Module='AssetsInStatus' />
          </div>
        </Tab>

      </Tabs>
    </div>
  )
}


const ConnectedAssets = connect((state) => {
  return {
    Tema: state.Tema
  }
})(Assets)

export default ConnectedAssets 