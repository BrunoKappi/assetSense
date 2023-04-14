import { GetCurrentUserTypePermitFromStore } from "./Middleware"


export const EDITAR_TIPOS_ATIVOS = () => GetCurrentUserTypePermitFromStore('EDITAR_TIPOS_ATIVOS')
export const EDITAR_LOCAIS = () => GetCurrentUserTypePermitFromStore('EDITAR_LOCAIS')
export const EDITAR_STATUS_ATIVOS = () => GetCurrentUserTypePermitFromStore('EDITAR_STATUS_ATIVOS')
export const EDITAR_TIPOS_DE_USO = () => GetCurrentUserTypePermitFromStore('EDITAR_TIPOS_DE_USO')
export const EDITAR_SETORES = () => GetCurrentUserTypePermitFromStore('EDITAR_SETORES')
export const EDITAR_TIPOS_DE_USUARIO = () => GetCurrentUserTypePermitFromStore('EDITAR_TIPOS_DE_USUARIO')
export const EDITAR_PERMICOES = () => GetCurrentUserTypePermitFromStore('EDITAR_PERMICOES')
export const VISUALIZAR_ATIVOS = () => GetCurrentUserTypePermitFromStore('VISUALIZAR_ATIVOS')
export const RETIRAR_ATIVOS = () => GetCurrentUserTypePermitFromStore('RETIRAR_ATIVOS')
export const ADICIONAR_ATIVOS = () => GetCurrentUserTypePermitFromStore('ADICIONAR_ATIVOS')
export const EDITAR_ATIVOS = () => GetCurrentUserTypePermitFromStore('EDITAR_ATIVOS')
export const EXCLUIR_ATIVOS = () => GetCurrentUserTypePermitFromStore('EXCLUIR_ATIVOS')
export const VISUALIZAR_USUARIOS = () => GetCurrentUserTypePermitFromStore('VISUALIZAR_USUARIOS')
export const ADICIONAR_USUARIOS = () => GetCurrentUserTypePermitFromStore('ADICIONAR_USUARIOS')
export const EDITAR_USUARIOS = () => GetCurrentUserTypePermitFromStore('EDITAR_USUARIOS')
export const EXCLUIR_USUARIOS = () => GetCurrentUserTypePermitFromStore('EXCLUIR_USUARIOS')








///////////////////////// TELAS //////////////////////////////


// TELA DE ATIVOS
export const AtivosTela = () => {
    return (
        VISUALIZAR_ATIVOS() ||
        RETIRAR_ATIVOS() ||
        ADICIONAR_ATIVOS() ||
        EDITAR_ATIVOS() ||
        EXCLUIR_ATIVOS()
    )
}

// TELA DE USUARIOS
export const UsuariosTela = () => {
    return (
        VISUALIZAR_USUARIOS() ||
        ADICIONAR_USUARIOS() ||
        EDITAR_USUARIOS() ||
        EXCLUIR_USUARIOS()
    )
}

// TELA DE CONFIGURAÇÔES
export const ConfigTela = () => {
    return (
        EDITAR_TIPOS_ATIVOS() ||
        EDITAR_LOCAIS() ||
        EDITAR_STATUS_ATIVOS() ||
        EDITAR_TIPOS_DE_USO() ||
        EDITAR_SETORES() ||
        EDITAR_TIPOS_DE_USUARIO ||
        EDITAR_PERMICOES()
    )
}

























///////////////////////// TELA DE CONFIGURAÇÔES ///////////////////////////

//ACCESS ATIVOS TAB
export const AtivosTabAccess = () => {
    return (
        EDITAR_TIPOS_ATIVOS() ||
        EDITAR_LOCAIS() ||
        EDITAR_STATUS_ATIVOS() ||
        EDITAR_TIPOS_DE_USO()
    )
}

//ACCESS SETORES E USUARIOS TAB
export const SetoresUsuariosTabAccess = () => {
    return EDITAR_SETORES() || EDITAR_TIPOS_DE_USUARIO()
}

//ACCESS PERMITS TAB
export const PermicoesTabAccess = () => {
    return EDITAR_PERMICOES()
}













///////////////////////// TELA DE ATIVOS ////////////////////////////


export const TodosAtivosTab = () => {
    return (
        EDITAR_ATIVOS() || VISUALIZAR_ATIVOS()
    )
}
export const AtivosInLocaisTab = () => {
    return (
        EDITAR_ATIVOS() || VISUALIZAR_ATIVOS()
    )
}
export const AtivosInTypesTab = () => {
    return (
        EDITAR_ATIVOS() || VISUALIZAR_ATIVOS()
    )
}





///////////////////////// TELA DE USUARIOS ////////////////////////////


export const TodosUsersTab = () => {
    return (
        EDITAR_USUARIOS() || VISUALIZAR_USUARIOS()
    )
}
export const UsersInSetoresTab = () => {
    return (
        EDITAR_USUARIOS() || VISUALIZAR_USUARIOS()
    )
}
export const UsersInTypesTab = () => {
    return (
        EDITAR_USUARIOS() || VISUALIZAR_USUARIOS()
    )
}