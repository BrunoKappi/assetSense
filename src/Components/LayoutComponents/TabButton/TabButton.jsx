import React, { useEffect, useState } from 'react';
import './TabButton.css'
import { UilListUl, UilSitemap, UilShieldCheck, UilAsterisk, UilLabel, UilBox, UilUsersAlt, UilSetting, UilPlay } from '@iconscout/react-unicons'

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
















export const AssetsTabTitle = () => {
    return <div className='TabsTitle'>
        <UilListUl />
        <span>Ativos</span>
    </div>
}

export const AssetsCamposTabTitle = () => {
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

export const TypesTabTitle = () => {
    return <div className='TabsTitle'>
        <UilLabel />
        <span>Tipos</span>
    </div>
}



export const StatusTabTitle = () => {
    return <div className='TabsTitle'>
        <UilLabel />
        <span>Status</span>
    </div>
}

export const UsageTabTitle = () => {
    return <div className='TabsTitle'>
        <UilPlay />
        <span>Tipo de Uso</span>
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

export const UsersTypesTabTitle = () => {
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










export const DashUsersTabTitle = () => {
    return <div className='TabsTitle'>
        <UilSitemap />
        <span>Usuários</span>
    </div>
}

export const DashRecordsTabTitle = () => {
    return <div className='TabsTitle'>
        <UilListUl />
        <span>Retiradas</span>
    </div>
}
export const DashAssetsTabTitle = () => {
    return <div className='TabsTitle'>
        <UilUsersAlt />
        <span>Ativos</span>
    </div>
}


export const Requests = (Text) => {
    return <div className='TabsTitle'>
        <UilLabel />
        <span>Solicitações</span>
    </div>
}


export const AllRequests = (Text) => {
    return <div className='TabsTitle'>
        <UilLabel />
        <span>Todas</span>
    </div>
}


export const MyRequests = (Text) => {
    return <div className='TabsTitle'>
        <UilLabel />
        <span>Minhas Solicitações</span>
    </div>
}


export const CustomAssetTypes = () => {
    return <div className='TabsTitle'>
        <UilSetting />
        <span>Tipos de Ativos</span>
    </div>
}

export const CustomUserTypes = () => {
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





export const RequestsUsersTabTitle = () => {
    return <div className='TabsTitle'>
        <UilUsersAlt />
        <span>Responsáveis</span>
    </div>
}

export const RequestConfigTabTitle = () => {
    return <div className='TabsTitle'>
        <UilListUl />
        <span>Status e Tipos</span>
    </div>
}



const Tabs = {
    "Assets": AssetsTabTitle(),
    "AssetsCampos": AssetsCamposTabTitle(),
    "Sectors e Usuários": SectorsEUsuáriosTabTitle(),
    "Permissoes": PermicoesTabTitle(),
    "Requests": Requests(),
    "RequestsConfig": RequestConfigTabTitle(),
    "RequestsUsers": RequestsUsersTabTitle(),
    "MyRequests": MyRequests(),
    "AllRequests": AllRequests(),
    "TodosAssets": TodosTabTitle(),
    "AssetsInArmazenamento": ArmazenamentoTabTitle(),
    "AssetsInTypes": TypesTabTitle(),
    "AssetsInStatus": StatusTabTitle(),
    "AssetsInUsageTypes": UsageTabTitle(),
    "TodosUsers": UsersTodosTabTitle(),
    "UsersInSectors": SectorsTabTitle(),
    "UsersInTypes": UsersTypesTabTitle(),
    "DashAssets": DashAssetsTabTitle(),
    "DahUsers": DashUsersTabTitle(),
    "DashTypes": DashRecordsTabTitle(),
    "CustomAssets": CustomAssetTypes(),
    "CustomUserTypes": CustomUserTypes(),
    "UserType": CustomUserTypes(),
}