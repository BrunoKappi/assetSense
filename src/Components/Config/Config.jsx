import React, { useState } from 'react'
import './Config.css'
import Masonry from "react-masonry-css";

import EditableCustomList from '../EditableCustomList/EditableCustomList'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { AtivosTabTitle, PermicoesTabTitle, SetoresEUsuáriosTabTitle } from './ConfigUtils';
import UserTypesPermits from '../UserTypesPermits/UserTypesPermits';
import { GetCurrentUserTypePermitFromStore } from '../../Functions/Middleware';
import { NotificationErro } from '../../NotificationUtils';

const breakpointColumnsObj = {
  default: 3,
  1250: 2,
  950: 1
};

export default function Config() {

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
    else if (Key === 'Setores e Usuários' && SetoresUsuariosPermit)
      setKey(Key)
    else if (Key === 'Permissoes' && PermicoesPermit)
      setKey(Key)
    else
    NotificationErro("Não Autorizado", "Você não possui permissão para acessar essa aba, solicite autorização para seu Administrador")
  }


  return (



    <div className={localStorage.getItem('AssetSenseTema') === 'Escuro' ? 'ConfigContainerEscuro ConfigContainer' : 'ConfigContainerClaro ConfigContainer'}>


      <div className={localStorage.getItem('AssetSenseTema') === 'Escuro' ? 'TabsContainerEscuro TabsContainer' : 'TabsContainerClaro TabsContainer'}>
        <button onClick={(k) => SetKeyConfig('Ativos')} className={key === 'Ativos' ? 'TabsButtonActive' : ''}>{AtivosTabTitle()}</button>
        <button onClick={(k) => SetKeyConfig('Setores e Usuários')} className={key === 'Setores e Usuários' ? 'TabsButtonActive' : ''}>{SetoresEUsuáriosTabTitle()}</button>
        <button onClick={(k) => SetKeyConfig('Permissoes')} className={key === 'Permissoes' ? 'TabsButtonActive' : ''}>{PermicoesTabTitle()}</button>
      </div>


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
