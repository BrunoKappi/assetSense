import { GetCurrentUserTypePermitFromStore } from "./StoreMiddleware"


export const EDIT_TYPES_ASSETS = () => GetCurrentUserTypePermitFromStore('EDIT_TYPES_ASSETS')
export const EDIT_CAMPOS_PERSONALIZADOS = () => GetCurrentUserTypePermitFromStore('EDIT_CAMPOS_PERSONALIZADOS')
export const EDIT_STORAGELOCATIONS = () => GetCurrentUserTypePermitFromStore('EDIT_STORAGELOCATIONS')
export const EDIT_STATUS_ASSETS = () => GetCurrentUserTypePermitFromStore('EDIT_STATUS_ASSETS')
export const EDIT_TYPES_DE_USO = () => GetCurrentUserTypePermitFromStore('EDIT_TYPES_DE_USO')
export const EDIT_SECTORS = () => GetCurrentUserTypePermitFromStore('EDIT_SECTORS')
export const EDIT_TYPES_DE_USER = () => GetCurrentUserTypePermitFromStore('EDIT_TYPES_DE_USER')
export const EDIT_REQUESTS_TYPES = () => GetCurrentUserTypePermitFromStore('EDIT_REQUESTS_TYPES')
export const EDIT_REQUESTS_STATUS = () => GetCurrentUserTypePermitFromStore('EDIT_REQUESTS_STATUS')

export const EDIT_PERMICOES = () => GetCurrentUserTypePermitFromStore('EDIT_PERMICOES')
export const VIEW_ASSETS = () => GetCurrentUserTypePermitFromStore('VIEW_ASSETS')
export const RETIRAR_ASSETS = () => GetCurrentUserTypePermitFromStore('RETIRAR_ASSETS')
export const ADD_ASSETS = () => GetCurrentUserTypePermitFromStore('ADD_ASSETS')
export const EDIT_ASSETS = () => GetCurrentUserTypePermitFromStore('EDIT_ASSETS')
export const DELETE_ASSETS = () => GetCurrentUserTypePermitFromStore('DELETE_ASSETS')
export const VIEW_USERS = () => GetCurrentUserTypePermitFromStore('VIEW_USERS')
export const ADD_USERS = () => GetCurrentUserTypePermitFromStore('ADD_USERS')
export const EDIT_USERS = () => GetCurrentUserTypePermitFromStore('EDIT_USERS')
export const DELETE_USERS = () => GetCurrentUserTypePermitFromStore('DELETE_USERS')
export const VIEW_REQUESTS = () => GetCurrentUserTypePermitFromStore('VIEW_REQUESTS')
export const OPEN_REQUESTS = () => GetCurrentUserTypePermitFromStore('OPEN_REQUESTS')
export const MANAGE_REQUESTS = () => GetCurrentUserTypePermitFromStore('MANAGE_REQUESTS')







///////////////////////// TELAS //////////////////////////////


// TELA DE ATIVOS
export const AssetsTela = () => {
    return (
        VIEW_ASSETS() ||
        RETIRAR_ASSETS() ||
        ADD_ASSETS() ||
        EDIT_ASSETS() ||
        DELETE_ASSETS()
    )
}

// TELA DE USUÁRIOS
export const UsersTela = () => {
    return (
        VIEW_USERS() ||
        ADD_USERS() ||
        EDIT_USERS() ||
        DELETE_USERS()
    )
}

// TELA DE CONFIGURAÇÔES
export const ConfigTela = () => {
    return (
        EDIT_TYPES_ASSETS() ||
        EDIT_STORAGELOCATIONS() ||
        EDIT_STATUS_ASSETS() ||
        EDIT_TYPES_DE_USO() ||
        EDIT_SECTORS() ||
        EDIT_TYPES_DE_USER ||
        EDIT_PERMICOES()
    )
}


// TELA DE SOLICITAÇÕES
export const RequestsTela = () => {
    return (
        VIEW_REQUESTS() ||
        OPEN_REQUESTS() ||
        MANAGE_REQUESTS()
    )
}























///////////////////////// TELA DE CONFIGURAÇÔES ///////////////////////////

//ACCESS ASSETS TAB
export const AssetsTabAccess = () => {
    return (
        EDIT_TYPES_ASSETS() ||
        EDIT_STORAGELOCATIONS() ||
        EDIT_STATUS_ASSETS() ||
        EDIT_TYPES_DE_USO()
    )
}

//ACCESS SECTORS E USERS TAB
export const SectorsUsersTabAccess = () => {
    return EDIT_SECTORS() || EDIT_TYPES_DE_USER()
}


//ACCESS PERMITS TAB
export const CustomFieldsTabAccess = () => {
    return EDIT_CAMPOS_PERSONALIZADOS()
}


//ACCESS PERMITS TAB
export const PermicoesTabAccess = () => {
    return EDIT_PERMICOES()
}


//ACCESS PERMITS TAB
export const RequestsTabAccess = () => {
    return EDIT_REQUESTS_STATUS() || EDIT_REQUESTS_TYPES()
}











///////////////////////// TELA DE ATIVOS ////////////////////////////


export const TodosAssetsTab = () => {
    return (
        EDIT_ASSETS() || VIEW_ASSETS()
    )
}
export const AssetsInStorageLocationsTab = () => {
    return (
        EDIT_ASSETS() || VIEW_ASSETS()
    )
}
export const AssetsInTypesTab = () => {
    return (
        EDIT_ASSETS() || VIEW_ASSETS()
    )
}

export const AssetsInStatusTab = () => {
    return (
        EDIT_ASSETS() || VIEW_ASSETS()
    )
}

export const AssetsInUsageTypesTab = () => {
    return (
        EDIT_ASSETS() || VIEW_ASSETS()
    )
}





///////////////////////// TELA DE USUÁRIOS ////////////////////////////


export const TodosUsersTab = () => {
    return (
        EDIT_USERS() || VIEW_USERS()
    )
}
export const UsersInSectorsTab = () => {
    return (
        EDIT_USERS() || VIEW_USERS()
    )
}
export const UsersInTypesTab = () => {
    return (
        EDIT_USERS() || VIEW_USERS()
    )
}