import React, { useState } from 'react'
import './Config.css'
import Masonry from "react-masonry-css";
import EditableCustomList from '../EditableCustomList/EditableCustomList'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserTypesPermits from '../UserTypesPermits/UserTypesPermits';
import { NotificationErro } from '../../NotificationUtils';
import { connect } from 'react-redux'
import Campos from '../AtivosCampos/Campos';
//LAYOUT COMPONENTS
import TabsContainer from '../LayoutComponents/TabsContainer/TabsContainer';
import TabButton from '../LayoutComponents/TabButton/TabButton';
import Show from '../LayoutComponents/Show/Show';
//FUNCTIONS
import { AtivosTabAccess, PermicoesTabAccess, SetoresUsuariosTabAccess } from '../../Functions/Permits';
import { ConfigBreakpoints } from '../../GlobalVars';


const Config = (props) => {


  // GET INITIAL TAB BASED ON PERMITS
  const getInitialTab = () => {
    if (AtivosTabAccess())
      return 'Ativos'
    else if (SetoresUsuariosTabAccess())
      return 'Setores e Usuários'
    else if (PermicoesTabAccess())
      return 'Permissoes'
  }

  //STATES
  const [key, setKey] = useState(getInitialTab());
  const [Camposkey, setCamposKey] = useState('CustomAtivos');


  // KEY TO CONFIG TAB
  const SetKeyConfig = (Key) => {
    if (Key === 'Ativos' && AtivosTabAccess())
      setKey(Key)
    else if (Key === 'AtivosCampos')
      setKey(Key)
    else if (Key === 'Setores e Usuários' && SetoresUsuariosTabAccess())
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
        <TabButton ButtonName="Ativos" Key={key} onClick={(k) => SetKeyConfig('Ativos')} />
        <TabButton ButtonName="AtivosCampos" Key={key} onClick={(k) => SetKeyConfig('AtivosCampos')} />
        <TabButton ButtonName="Setores e Usuários" Key={key} onClick={(k) => SetKeyConfig('Setores e Usuários')} />
        <TabButton ButtonName="Permissoes" Key={key} onClick={(k) => SetKeyConfig('Permissoes')} />
      </TabsContainer>



      <Tabs id="UsersTabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        {/******************************     ATIVOS TAB    ************************************/}
        <Tab eventKey="Ativos" >
          <div className='ListItensContainer'>
            <Masonry breakpointCols={ConfigBreakpoints} className="my-masonry-grid" columnClassName="my-masonry-grid_column"   >
              <EditableCustomList Title="Tipos de Ativos" Module="TiposAtivos" />
              <EditableCustomList Title="Locais de Armazenamento" Module="Locais" />
              <EditableCustomList Title="Status de Ativos" Module="StatusAtivos" />
              <EditableCustomList Title="Tipos de Uso" Module="TiposUso" />
            </Masonry>
          </div>
        </Tab>
        {/******************************     CAMPOS TAB    ************************************/}
        <Tab eventKey="AtivosCampos" >
          <div className='CamposListItensContainer'>
            <TabsContainer Tema={props.Tema}>
              <TabButton ButtonName="CustomAtivos" Key={Camposkey} onClick={(k) => setCamposKey('CustomAtivos')} />
              <TabButton ButtonName="CustomUserTypes" Key={Camposkey} onClick={(k) => setCamposKey('CustomUserTypes')} />
            </TabsContainer>

            <Show Show={Camposkey === 'CustomAtivos'} Width='100%'>
              <Campos Function="TiposAtivos" />
            </Show>

            <Show Show={Camposkey === 'CustomUserTypes'} Width='100%'>
              <Campos Function="TiposUsuarios" />
            </Show>


          </div>
        </Tab>
        {/******************************     SETORES E USUARIOS TAB    ************************************/}
        <Tab eventKey="Setores e Usuários"  >
          <div className='ListItensContainer'>
            <Masonry breakpointCols={ConfigBreakpoints} className="my-masonry-grid" columnClassName="my-masonry-grid_column"  >
              <EditableCustomList Title="Setores da Empresa" Module="Setores" />
              <EditableCustomList Title="Tipos de Usuários" Module="TiposUsuarios" />
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
