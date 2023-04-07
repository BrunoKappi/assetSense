import React, { useState } from 'react'
import './Config.css'
import Masonry from "react-masonry-css";
import EditableCustomList from '../EditableCustomList/EditableCustomList'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { UilSetting } from '@iconscout/react-unicons'
import UserTypesPermits from '../UserTypesPermits/UserTypesPermits';
import { GetCurrentUserTypePermitFromStore } from '../../Functions/Middleware';
import { NotificationErro } from '../../NotificationUtils';
import { connect } from 'react-redux'
import Campos from '../AtivosCampos/Campos';

import TabsContainer from '../LayoutComponents/TabsContainer/TabsContainer';
import TabButton from '../LayoutComponents/TabButton/TabButton';

const breakpointColumnsObj = {
  default: 3,
  1250: 2,
  950: 1
};

const Config = (props) => {

  const AtivosPermit = GetCurrentUserTypePermitFromStore('CONFIGURACOES') || GetCurrentUserTypePermitFromStore('EDITAR_TIPOS_ATIVOS') || GetCurrentUserTypePermitFromStore('EDITAR_LOCAIS') || GetCurrentUserTypePermitFromStore('EDITAR_STATUS_ATIVOS') || GetCurrentUserTypePermitFromStore('EDITAR_TIPOS_DE_USO')
  const SetoresUsuariosPermit = GetCurrentUserTypePermitFromStore('CONFIGURACOES') || GetCurrentUserTypePermitFromStore('EDITAR_SETORES') || GetCurrentUserTypePermitFromStore('EDITAR_TIPOS_DE_USUARIO')
  const PermicoesPermit = GetCurrentUserTypePermitFromStore('CONFIGURACOES') || GetCurrentUserTypePermitFromStore('EDITAR_PERMICOES')

  const getInitialTab = () => {
    if (AtivosPermit)
      return 'Ativos'
    else if (SetoresUsuariosPermit)
      return 'Setores e Usuários'
    else if (PermicoesPermit)
      return 'Permissoes'
  }

  const [key, setKey] = useState(getInitialTab());



  const SetKeyConfig = (Key) => {
    if (Key === 'Ativos' && AtivosPermit)
      setKey(Key)
    else if (Key === 'AtivosCampos')
      setKey(Key)
    else if (Key === 'Setores e Usuários' && SetoresUsuariosPermit)
      setKey(Key)
    else if (Key === 'Permissoes' && PermicoesPermit)
      setKey(Key)
    else
      NotificationErro("Não Autorizado", "Você não possui permissão para acessar essa aba, solicite autorização para seu Administrador")
  }


  return (


    <div className={props.Tema === 'Escuro' ? 'ConfigContainerEscuro ConfigContainer' : 'ConfigContainerClaro ConfigContainer'}>


      <TabsContainer Tema={props.Tema}>
        <TabButton ButtonName="Ativos" Key={key} onClick={(k) => SetKeyConfig('Ativos')} />
        <TabButton ButtonName="AtivosCampos" Key={key} onClick={(k) => SetKeyConfig('AtivosCampos')} />
        <TabButton ButtonName="Setores e Usuários" Key={key} onClick={(k) => SetKeyConfig('Setores e Usuários')} />
        <TabButton ButtonName="Permissoes" Key={key} onClick={(k) => SetKeyConfig('Permissoes')} />
      </TabsContainer>


      <Tabs id="UsersTabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">

        <Tab eventKey="Ativos" >
          <div className='ListItensContainer'>
            <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column"   >
              <EditableCustomList Title="Tipos de Ativos" Module="TiposAtivos" />
              <EditableCustomList Title="Locais de Armazenamento" Module="Locais" />
              <EditableCustomList Title="Status de Ativos" Module="StatusAtivos" />
              <EditableCustomList Title="Tipos de Uso" Module="TiposUso" />
            </Masonry>
          </div>
        </Tab>
        <Tab eventKey="AtivosCampos" >
          <div className='CamposListItensContainer'>
            <h4 className='ConfigTitleSection'> <UilSetting />  Campos Personalizados por Tipo de Ativo</h4>
            <Campos Function="TiposAtivos" />
            <h4 className='ConfigTitleSection'> <UilSetting />  Campos Personalizados por Tipo de Usuário</h4>
            <Campos Function="TiposUsuarios" />
          </div>
        </Tab>
        <Tab eventKey="Setores e Usuários"  >
          <div className='ListItensContainer'>
            <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column"  >
              <EditableCustomList Title="Setores da Empresa" Module="Setores" />
              <EditableCustomList Title="Tipos de Usuários" Module="TiposUsuarios" />
            </Masonry>
          </div>
        </Tab>
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
