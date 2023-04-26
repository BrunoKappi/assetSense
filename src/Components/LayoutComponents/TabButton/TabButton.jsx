import React, { useEffect, useState } from 'react';
import './TabButton.css'
import { UilListUl, UilSitemap, UilShieldCheck, UilAsterisk, UilLabel, UilBox, UilUsersAlt, UilSetting } from '@iconscout/react-unicons'

const TabButton = ({ children, onClick, className = '', ButtonName, Key, Text }) => {

    const [IsActive, setIsActive] = useState(false)

    useEffect(() => {
        setIsActive(Key === ButtonName)
    }, [Key, ButtonName])


    return (

        <>
            {Text && <button className={`TabButton ${className} ${IsActive ? 'TabsButtonActive' : ''}`} onClick={onClick}>
                {UserType(Text)}
            </button>
            }

            {!Text && <button className={`TabButton ${className} ${IsActive ? 'TabsButtonActive' : ''}`} onClick={onClick}>
                {Tabs[ButtonName]}
            </button>
            }


        </>

    );
};

export default TabButton;
















export const AtivosTabTitle = () => {
    return <div className='TabsTitle'>
        <UilListUl />
        <span>Ativos</span>
    </div>
}

export const AtivosCamposTabTitle = () => {
    return <div className='TabsTitle'>
        <UilAsterisk />
        <span>Campos Personalizados</span>
    </div>
}

export const SectorsEUsuáriosTabTitle = () => {
    return <div className='TabsTitle'>
        <UilSitemap />
        <span>Setores e Usuários</span>
    </div>
}

export const PermicoesTabTitle = () => {
    return <div className='TabsTitle'>
        <UilShieldCheck />
        <span>Permissões</span>
    </div>
}


export const ArmazenamentoTabTitle = () => {
    return <div className='TabsTitle'>
        <UilBox />
        <span>Armazenamento</span>
    </div>
}

export const TiposTabTitle = () => {
    return <div className='TabsTitle'>
        <UilLabel />
        <span>Tipos</span>
    </div>
}
export const TodosTabTitle = () => {
    return <div className='TabsTitle'>
        <UilListUl />
        <span>Todos</span>
    </div>
}






export const SectorsTabTitle = () => {
    return <div className='TabsTitle'>
        <UilSitemap />
        <span>Setores</span>
    </div>
}

export const UsersTiposTabTitle = () => {
    return <div className='TabsTitle'>
        <UilListUl />
        <span>Tipos</span>
    </div>
}
export const UsersTodosTabTitle = () => {
    return <div className='TabsTitle'>
        <UilUsersAlt />
        <span>Usuários</span>
    </div>
}










export const DashUsuariosTabTitle = () => {
    return <div className='TabsTitle'>
        <UilSitemap />
        <span>Usuarios</span>
    </div>
}

export const DashRecordsTabTitle = () => {
    return <div className='TabsTitle'>
        <UilListUl />
        <span>Retiradas</span>
    </div>
}
export const DashAtivosTabTitle = () => {
    return <div className='TabsTitle'>
        <UilUsersAlt />
        <span>Ativos</span>
    </div>
}




export const CustomTiposAtivos = () => {
    return <div className='TabsTitle'>
        <UilSetting />
        <span>Tipos de Ativos</span>
    </div>
}

export const CustomTiposUsuarios = () => {
    return <div className='TabsTitle'>
        <UilSetting />
        <span>Tipos de Usuários</span>
    </div>
}


export const UserType = (Text) => {
    return <div className='TabsTitle'>
        <UilLabel />
        <span>{Text}</span>
    </div>
}








const Tabs = {
    "Ativos": AtivosTabTitle(),
    "AtivosCampos": AtivosCamposTabTitle(),
    "Sectors e Usuários": SectorsEUsuáriosTabTitle(),
    "Permissoes": PermicoesTabTitle(),
    "TodosAtivos": TodosTabTitle(),
    "AtivosInArmazenamento": ArmazenamentoTabTitle(),
    "AtivosInTipos": TiposTabTitle(),
    "TodosUsuarios": UsersTodosTabTitle(),
    "UsersInSectors": SectorsTabTitle(),
    "UsersInTipos": UsersTiposTabTitle(),
    "DashAtivos": DashAtivosTabTitle(),
    "DahUsuarios": DashUsuariosTabTitle(),
    "DashTipos": DashRecordsTabTitle(),
    "CustomAtivos": CustomTiposAtivos(),
    "CustomUserTypes": CustomTiposUsuarios(),
    "UserType": CustomTiposUsuarios(),
}