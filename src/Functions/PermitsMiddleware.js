import { GetCurrentUserTypePermitFromStore } from "./StoreMiddleware"


export const EDITAR_TYPES_ASSETS = () => GetCurrentUserTypePermitFromStore('EDITAR_TYPES_ASSETS')
export const EDITAR_STORAGELOCATIONS = () => GetCurrentUserTypePermitFromStore('EDITAR_STORAGELOCATIONS')
export const EDITAR_STATUS_ASSETS = () => GetCurrentUserTypePermitFromStore('EDITAR_STATUS_ASSETS')
export const EDITAR_TYPES_DE_USO = () => GetCurrentUserTypePermitFromStore('EDITAR_TYPES_DE_USO')
export const EDITAR_SECTORS = () => GetCurrentUserTypePermitFromStore('EDITAR_SECTORS')
export const EDITAR_TYPES_DE_USER = () => GetCurrentUserTypePermitFromStore('EDITAR_TYPES_DE_USER')
export const EDITAR_PERMICOES = () => GetCurrentUserTypePermitFromStore('EDITAR_PERMICOES')
export const VISUALIZAR_ASSETS = () => GetCurrentUserTypePermitFromStore('VISUALIZAR_ASSETS')
export const RETIRAR_ASSETS = () => GetCurrentUserTypePermitFromStore('RETIRAR_ASSETS')
export const ADICIONAR_ASSETS = () => GetCurrentUserTypePermitFromStore('ADICIONAR_ASSETS')
export const EDITAR_ASSETS = () => GetCurrentUserTypePermitFromStore('EDITAR_ASSETS')
export const EXCLUIR_ASSETS = () => GetCurrentUserTypePermitFromStore('EXCLUIR_ASSETS')
export const VISUALIZAR_USERS = () => GetCurrentUserTypePermitFromStore('VISUALIZAR_USERS')
export const ADICIONAR_USERS = () => GetCurrentUserTypePermitFromStore('ADICIONAR_USERS')
export const EDITAR_USERS = () => GetCurrentUserTypePermitFromStore('EDITAR_USERS')
export const EXCLUIR_USERS = () => GetCurrentUserTypePermitFromStore('EXCLUIR_USERS')








///////////////////////// TELAS //////////////////////////////


// TELA DE ATIVOS
export const AssetsTela = () => {
    return (
        VISUALIZAR_ASSETS() ||
        RETIRAR_ASSETS() ||
        ADICIONAR_ASSETS() ||
        EDITAR_ASSETS() ||
        EXCLUIR_ASSETS()
    )
}

// TELA DE USUÁRIOS
export const UsersTela = () => {
    return (
        VISUALIZAR_USERS() ||
        ADICIONAR_USERS() ||
        EDITAR_USERS() ||
        EXCLUIR_USERS()
    )
}

// TELA DE CONFIGURAÇÔES
export const ConfigTela = () => {
    return (
        EDITAR_TYPES_ASSETS() ||
        EDITAR_STORAGELOCATIONS() ||
        EDITAR_STATUS_ASSETS() ||
        EDITAR_TYPES_DE_USO() ||
        EDITAR_SECTORS() ||
        EDITAR_TYPES_DE_USER ||
        EDITAR_PERMICOES()
    )
}

























///////////////////////// TELA DE CONFIGURAÇÔES ///////////////////////////

//ACCESS ASSETS TAB
export const AssetsTabAccess = () => {
    return (
        EDITAR_TYPES_ASSETS() ||
        EDITAR_STORAGELOCATIONS() ||
        EDITAR_STATUS_ASSETS() ||
        EDITAR_TYPES_DE_USO()
    )
}

//ACCESS SECTORS E USERS TAB
export const SectorsUsersTabAccess = () => {
    return EDITAR_SECTORS() || EDITAR_TYPES_DE_USER()
}

//ACCESS PERMITS TAB
export const PermicoesTabAccess = () => {
    return EDITAR_PERMICOES()
}













///////////////////////// TELA DE ATIVOS ////////////////////////////


export const TodosAssetsTab = () => {
    return (
        EDITAR_ASSETS() || VISUALIZAR_ASSETS()
    )
}
export const AssetsInStorageLocationsTab = () => {
    return (
        EDITAR_ASSETS() || VISUALIZAR_ASSETS()
    )
}
export const AssetsInTypesTab = () => {
    return (
        EDITAR_ASSETS() || VISUALIZAR_ASSETS()
    )
}

export const AssetsInStatusTab = () => {
    return (
        EDITAR_ASSETS() || VISUALIZAR_ASSETS()
    )
}

export const AssetsInUsageTypesTab = () => {
    return (
        EDITAR_ASSETS() || VISUALIZAR_ASSETS()
    )
}





///////////////////////// TELA DE USUÁRIOS ////////////////////////////


export const TodosUsersTab = () => {
    return (
        EDITAR_USERS() || VISUALIZAR_USERS()
    )
}
export const UsersInSectorsTab = () => {
    return (
        EDITAR_USERS() || VISUALIZAR_USERS()
    )
}
export const UsersInTypesTab = () => {
    return (
        EDITAR_USERS() || VISUALIZAR_USERS()
    )
}