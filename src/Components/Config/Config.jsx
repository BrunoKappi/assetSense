import React, { useState } from 'react'
import './Config.css'
import Masonry from "react-masonry-css";
import EditableCustomList from '../EditableCustomList/EditableCustomList'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserTypesPermits from '../UserTypesPermits/UserTypesPermits';
import { NotificationAlerta, NotificationErro } from '../../NotificationUtils';
import { connect } from 'react-redux'
import Campos from '../CustomFields/CustomFields';
//LAYOUT COMPONENTS
import TabsContainer from '../LayoutComponents/TabsContainer/TabsContainer';
import TabButton from '../LayoutComponents/TabButton/TabButton';
import Show from '../LayoutComponents/Show/Show';
//FUNCTIONS
import { AssetsTabAccess, CustomFieldsTabAccess, PermicoesTabAccess, RequestsTabAccess, SectorsUsersTabAccess } from '../../Functions/PermitsMiddleware';
import { ConfigBreakpoints, RequestBreakpoints } from '../../GlobalVars';
import SectionTitle from '../LayoutComponents/SectionTitle/SectionTitle';
import Stack from '../LayoutComponents/Stack/Stack';
import SidebarItem from '../LayoutComponents/SidebarItem/SidebarItem';
import { UilSetting } from '@iconscout/react-unicons'
import RequestsAssigment from '../Requests/RequestsAssigment/RequestsAssigment'

const Config = (props) => {

  // GET INITIAL TAB BASED ON PERMITS
  const getInitialTab = () => {
    if (AssetsTabAccess())
      return 'Assets'
    else if (SectorsUsersTabAccess())
      return 'Sectors e Usuários'
    else if (PermicoesTabAccess())
      return 'Permissoes'
    else if (RequestsTabAccess())
      return 'Requests'
  }

  //STATES
  const [key, setKey] = useState(getInitialTab());
  const [Camposkey, setCamposKey] = useState('CustomAssets');
  const [RequestsKey, setRequestsKey] = useState('RequestsConfig');


  // KEY TO CONFIG TAB
  const SetKeyConfig = (Key) => {
    if (Key === 'Assets' && AssetsTabAccess())
      setKey(Key)
    else if (Key === 'AssetsCampos' && CustomFieldsTabAccess())
      setKey(Key)
    else if (Key === 'Sectors e Usuários' && SectorsUsersTabAccess())
      setKey(Key)
    else if (Key === 'Permissoes' && PermicoesTabAccess())
      setKey(Key)
    else if (Key === 'Requests' && RequestsTabAccess())
      setKey(Key)
    else
      NotificationErro("Não Autorizado", "Você não possui permissão para Acessar essa aba, solicite autorização para seu Administrador")
  }


  return (
    <div className={props.Tema === 'Escuro' ? 'ConfigContainerEscuro ConfigContainer' : 'ConfigContainerClaro ConfigContainer'}>

      {/******************************     TABS    ************************************/}
      <TabsContainer Direction="row" Tema={props.Tema}>
        <TabButton ButtonName="Assets" Key={key} onClick={(k) => SetKeyConfig('Assets')} />
        <TabButton ButtonName="AssetsCampos" Key={key} onClick={(k) => SetKeyConfig('AssetsCampos')} />
        <TabButton ButtonName="Sectors e Usuários" Key={key} onClick={(k) => SetKeyConfig('Sectors e Usuários')} />
        <TabButton ButtonName="Requests" Key={key} onClick={(k) => SetKeyConfig('Requests')} />
        <TabButton ButtonName="Permissoes" Key={key} onClick={(k) => SetKeyConfig('Permissoes')} />
      </TabsContainer>



      <Tabs id="UsersTabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        {/******************************     ASSETS TAB    ************************************/}
        <Tab eventKey="Assets" >
          <div className='ListItensContainer'>
            <SectionTitle>Configurações de Ativos</SectionTitle>
            <Masonry breakpointCols={ConfigBreakpoints} className="my-masonry-grid" columnClassName="my-masonry-grid_column"   >
              <EditableCustomList Title="Tipos de Ativos" Module="AssetTypes" />
              <EditableCustomList Title="Locais de Armazenamento" Module="StorageLocations" />
              <EditableCustomList Title="Status de Ativos" Module="AssetsStatus" />
              <EditableCustomList Title="Tipos de Uso" Module="UsageTypes" />

            </Masonry>
          </div>
        </Tab>

        {/******************************     ASSETS TAB    ************************************/}
        <Tab eventKey="Requests" >
          <div className='RequestsItensContainer'>

            <SectionTitle>Configurações de Solicitações</SectionTitle>

            <TabsContainer Direction="row" Tema={props.Tema}>
              <TabButton ButtonName="RequestsConfig" Key={RequestsKey} onClick={(k) => setRequestsKey('RequestsConfig')} />
              <TabButton ButtonName="RequestsUsers" Key={RequestsKey} onClick={(k) => setRequestsKey('RequestsUsers')} />
            </TabsContainer>



            <Show Show={RequestsKey === 'RequestsConfig'} Width='100%'>
              <Masonry breakpointCols={RequestBreakpoints} className="my-masonry-grid" columnClassName="my-masonry-grid_column"   >
                <EditableCustomList Title="Status de Solicitações" Module="RequestsStatus" />
                <EditableCustomList Title="Tipos de Solicitações" Module="RequestsTypes" />
              </Masonry>
            </Show>


            <Show Show={RequestsKey === 'RequestsUsers'} Width='100%'>
              <RequestsAssigment />
            </Show>



          </div>
        </Tab>

        {/******************************     CAMPOS TAB    ************************************/}
        <Tab eventKey="AssetsCampos" >
          <div className='CamposListItensContainer'>
            <SectionTitle>Configuração de Campos personalizados</SectionTitle>

            <div className='CamposListItensInnerContainer'>
              <Stack className='CamposSidebar' Gap={'.5rem'}>
                <SidebarItem Active={Camposkey === 'CustomAssets'}
                  onClick={(k) => setCamposKey('CustomAssets')}>
                  <UilSetting />
                  Tipos de Ativos
                </SidebarItem>

                <SidebarItem Active={Camposkey === 'CustomUserTypes'}
                  onClick={(k) => setCamposKey('CustomUserTypes')}>
                  <UilSetting />
                  Tipos de Usuários
                </SidebarItem>
              </Stack>

              <Show Show={Camposkey === 'CustomAssets'} Width='100%'>
                <Campos Function="AssetTypes" />
              </Show>

              <Show Show={Camposkey === 'CustomUserTypes'} Width='100%'>
                <Campos Function="UserTypes" />
              </Show>
            </div>




          </div>
        </Tab>
        {/******************************     SECTORS E USERS TAB    ************************************/}
        <Tab eventKey="Sectors e Usuários"  >
          <div className='ListItensContainer'>
            <SectionTitle>Configuração de Setores e Usuários</SectionTitle>
            <Masonry breakpointCols={ConfigBreakpoints} className="my-masonry-grid" columnClassName="my-masonry-grid_column"  >
              <EditableCustomList Title="Setores da Empresa" Module="Sectors" />
              <EditableCustomList Title="Tipos de Usuários" Module="UserTypes" />
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
