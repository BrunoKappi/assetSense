import React, { useState } from 'react'
import { UilListUl, UilSitemap, UilShieldCheck } from '@iconscout/react-unicons'
import { connect } from 'react-redux'
import { AtivosTabAccess, PermicoesTabAccess, SetoresUsuariosTabAccess } from '../../Functions/Permits'

const TabsHeader = (props) => {




    const getInitialTab = () => {
        if (AtivosTabAccess())
            return 'Ativos'
        else if (SetoresUsuariosTabAccess())
            return 'Setores e Usuários'
        else if (PermicoesTabAccess())
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
        if (Key === 'Ativos' && AtivosTabAccess()) {
            setKey(Key)
            props.setKey(Key)
        }
        else if (Key === 'Setores e Usuários' && SetoresUsuariosTabAccess()) {
            setKey(Key)
            props.setKey(Key)
        }
        else if (Key === 'Permissoes' && PermicoesTabAccess()) {
            setKey(Key)
            props.setKey(Key)
        }
        else
            NotificationErro("Não Autorizado", "Você não possui permissão para acessar essa aba, solicite autorização para seu Administrador")
    }

    return (
        <div className={props.Tema === 'Escuro' ? 'TabsContainerEscuro TabsContainer' : 'TabsContainerClaro TabsContainer'}>
            <button onClick={(k) => SetKeyConfig('Ativos')} className={key === 'Ativos' ? 'TabsButtonActive' : ''}>{ConfigAtivosTabTitle()}</button>
            <button onClick={(k) => SetKeyConfig('Setores e Usuários')} className={key === 'Setores e Usuários' ? 'TabsButtonActive' : ''}>{ConfigSetoresEUsuáriosTabTitle()}</button>
            <button onClick={(k) => SetKeyConfig('Permissoes')} className={key === 'Permissoes' ? 'TabsButtonActive' : ''}>{ConfigPermicoesTabTitle()}</button>
        </div>
    )
}



const ConnectedTabsHeader = connect((state) => {
    return {
        Tema: state.Tema
    }
})(TabsHeader)

export default ConnectedTabsHeader

