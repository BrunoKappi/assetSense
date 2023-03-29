import React, { useState } from 'react'
import { UilListUl, UilSitemap, UilShieldCheck } from '@iconscout/react-unicons'
import { GetCurrentUserTypePermitFromStore } from '../../Functions/Middleware'

export default function TabsHeader(props) {




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


    const ConfigAtivosTabTitle = () => {
        return <div className='TabsTitle'>
            <UilListUl />
            <span>Ativos</span>
        </div>
    }

    const ConfigSetoresEUsuáriosTabTitle = () => {
        return <div className='TabsTitle'>
            <UilSitemap />
            <span>Setores e Usuários</span>
        </div>
    }

    const ConfigPermicoesTabTitle = () => {
        return <div className='TabsTitle'>
            <UilShieldCheck />
            <span>Permissões</span>
        </div>
    }


    const SetKeyConfig = (Key) => {
        if (Key === 'Ativos' && AtivosPermit) {
            setKey(Key)
            props.setKey(Key)
        }
        else if (Key === 'Setores e Usuários' && SetoresUsuariosPermit) {
            setKey(Key)
            props.setKey(Key)
        }
        else if (Key === 'Permissoes' && PermicoesPermit) {
            setKey(Key)
            props.setKey(Key)
        }
        else
            NotificationErro("Não Autorizado", "Você não possui permissão para acessar essa aba, solicite autorização para seu Administrador")
    }

    return (
        <div className={localStorage.getItem('AssetSenseTema') === 'Escuro' ? 'TabsContainerEscuro TabsContainer' : 'TabsContainerClaro TabsContainer'}>
            <button onClick={(k) => SetKeyConfig('Ativos')} className={key === 'Ativos' ? 'TabsButtonActive' : ''}>{ConfigAtivosTabTitle()}</button>
            <button onClick={(k) => SetKeyConfig('Setores e Usuários')} className={key === 'Setores e Usuários' ? 'TabsButtonActive' : ''}>{ConfigSetoresEUsuáriosTabTitle()}</button>
            <button onClick={(k) => SetKeyConfig('Permissoes')} className={key === 'Permissoes' ? 'TabsButtonActive' : ''}>{ConfigPermicoesTabTitle()}</button>
        </div>
    )
}





