import React, { useState } from 'react'
import './Config.css'
import Masonry from "react-masonry-css";
import EditableCustomList from '../EditableCustomList/EditableCustomList'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserTypesPermits from '../UserTypesPermits/UserTypesPermits';
import { NotificationErro } from '../../NotificationUtils';
import { connect } from 'react-redux'
import Campos from '../CustomFields/CustomFields';
//LAYOUT COMPONENTS
import TabsContainer from '../LayoutComponents/TabsContainer/TabsContainer';
import TabButton from '../LayoutComponents/TabButton/TabButton';
import Show from '../LayoutComponents/Show/Show';
//FUNCTIONS
import { AssetsTabAccess, PermicoesTabAccess, SectorsUsersTabAccess } from '../../Functions/Permits';
import { ConfigBreakpoints } from '../../GlobalVars';
 

const Config = (props) => {


  // GET INITIAL TAB BASED ON PERMITS
  const getInitialTab = () => { 
    if (AssetsTabAccess())
      return 'Assets'
    else if (SectorsUsersTabAccess())
      return 'Sectors e Usuários'
    else if (PermicoesTabAccess()) 
      return 'Permissoes'
  }

  //STATES
  const [key, setKey] = useState(getInitialTab());
  const [Camposkey, setCamposKey] = useState('CustomAssets');


  // KEY TO CONFIG TAB
  const SetKeyConfig = (Key) => {
    if (Key === 'Assets' && AssetsTabAccess())
      setKey(Key)
    else if (Key === 'AssetsCampos')
      setKey(Key)
    else if (Key === 'Sectors e Usuários' && SectorsUsersTabAccess())
      setKey(Key)
    else if (Key === 'Permissoes' && PermicoesTabAccess())
      setKey(Key)
    else
      NotificationErro("Não Autorizado", "Você não possui permissão para Acessar essa aba, solicite autorização para seu Administrador")
  }


  return (
    <div className={props.Tema === 'Escuro' ? 'ConfigContainerEscuro ConfigContainer' : 'ConfigContainerClaro ConfigContainer'}>

      {/******************************     TABS    ************************************/}
      <TabsContainer Tema={props.Tema}>
        <TabButton ButtonName="Assets" Key={key} onClick={(k) => SetKeyConfig('Assets')} />
        <TabButton ButtonName="AssetsCampos" Key={key} onClick={(k) => SetKeyConfig('AssetsCampos')} />
        <TabButton ButtonName="Sectors e Usuários" Key={key} onClick={(k) => SetKeyConfig('Sectors e Usuários')} />
        <TabButton ButtonName="Permissoes" Key={key} onClick={(k) => SetKeyConfig('Permissoes')} />
      </TabsContainer>



      <Tabs id="UsersTabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        {/******************************     ASSETS TAB    ************************************/}
        <Tab eventKey="Assets" >
          <div className='ListItensContainer'>
            <Masonry breakpointCols={ConfigBreakpoints} className="my-masonry-grid" columnClassName="my-masonry-grid_column"   >
              <EditableCustomList Title="Tipos de  Ativos" Module="AssetTypess" />
              <EditableCustomList Title="Locais de Armazenamento" Module="StorageLocations" />
              <EditableCustomList Title="Status de Ativos" Module="AssetsStatus" />
              <EditableCustomList Title="Tipos de  Uso" Module="UsageTypes" />
            </Masonry>
          </div>
        </Tab>
        {/******************************     CAMPOS TAB    ************************************/}
        <Tab eventKey="AssetsCampos" >
          <div className='CamposListItensContainer'>
            <TabsContainer Tema={props.Tema}>
              <TabButton ButtonName="CustomAssets" Key={Camposkey} onClick={(k) => setCamposKey('CustomAssets')} />
              <TabButton ButtonName="CustomUserTypes" Key={Camposkey} onClick={(k) => setCamposKey('CustomUserTypes')} />
            </TabsContainer>

            <Show Show={Camposkey === 'CustomAssets'} Width='100%'>
              <Campos Function="AssetTypess" />
            </Show>

            <Show Show={Camposkey === 'CustomUserTypes'} Width='100%'>
              <Campos Function="UserTypes" />
            </Show>


          </div>
        </Tab>
        {/******************************     SECTORS E USERS TAB    ************************************/}
        <Tab eventKey="Sectors e Usuários"  >
          <div className='ListItensContainer'>
            <Masonry breakpointCols={ConfigBreakpoints} className="my-masonry-grid" columnClassName="my-masonry-grid_column"  >
              <EditableCustomList Title="Setores da Empresa" Module="Sectors" />
              <EditableCustomList Title="Tipos de  Usuários" Module="UserTypes" />
            </Masonry>
          </div> 
        </Tab>
        {/******************************     PERMISSÕES TAB    ************************************/}
        <Tab eventKey="Permissoes"  >
          <div className='ListItensContainer'>
            <UserTypesPermits />
          </div>
        </Tab>
      </Tabs>

    </div>


  )
}


const ConnectedConfig = connect((state) => {
  return {
    Tema: state.Tema
  }
})(Config)

export default ConnectedConfig  
