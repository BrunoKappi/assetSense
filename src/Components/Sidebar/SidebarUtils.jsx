
import { SetSidebarTagOnStore } from '../../Functions/Middleware';
import { PermitIndexs } from '../../GlobalVars';

export const SetTab = (Tab) => {
    SetSidebarTagOnStore(Tab)
}

export const GetSidebarItemClass = (Item, Tab) => {
    if (Item === Tab)
        return "SidebarItem ActiveSidebar" 
    else
        return "SidebarItem"
}

export const GetSidebarItemActive = (Item, Tab) => {
    return Item === Tab
}

export const GetNavbarSidebarItemClass = (Item, Tab) => {
    if (Item === Tab)
        return "NavBarListSidebarItem ActiveNavbarSidebar"
    else
        return "NavBarListSidebarItem"
}





export const GetConfigPermits = (Tipo) => {
    if (Tipo.Permits[PermitIndexs['EDITAR_TIPOS_ATIVOS']]
        || Tipo.Permits[PermitIndexs['EDITAR_LOCAIS']]
        || Tipo.Permits[PermitIndexs['EDITAR_STATUS_ATIVOS']]
        || Tipo.Permits[PermitIndexs['EDITAR_TIPOS_DE_USO']]
        || Tipo.Permits[PermitIndexs['EDITAR_SECTORS']]
        || Tipo.Permits[PermitIndexs['EDITAR_TIPOS_DE_USUARIO']]
        || Tipo.Permits[PermitIndexs['EDITAR_PERMICOES']]

    )
        return true
    else
        return false
}

export const GetUsuariosPermits = (Tipo) => {
    if (Tipo.Permits[PermitIndexs['ADICIONAR_USUARIOS']]
        || Tipo.Permits[PermitIndexs['EDITAR_USUARIOS']]
        || Tipo.Permits[PermitIndexs['EXCLUIR_USUARIOS']]      
        || Tipo.Permits[PermitIndexs['VISUALIZAR_USUARIOS']]
    )
        return true
    else
        return false
}

export const GetAtivosPermits = (Tipo) => {
    if (Tipo.Permits[PermitIndexs['ADICIONAR_ATIVOS']]
        || Tipo.Permits[PermitIndexs['EDITAR_ATIVOS']]
        || Tipo.Permits[PermitIndexs['EXCLUIR_ATIVOS']]
        || Tipo.Permits[PermitIndexs['RETIRAR_ATIVOS']]
        || Tipo.Permits[PermitIndexs['VISUALIZAR_ATIVOS']]
    )
        return true
    else
        return false
}



export const GetUsuariosPermits2 = () => {



    return false
}