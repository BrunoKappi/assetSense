
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





export const GetConfigPermits = (Type) => {
    if (Type.Permits[PermitIndexs['EDITAR_TYPES_ASSETS']]
        || Type.Permits[PermitIndexs['EDITAR_STORAGELOCATIONS']]
        || Type.Permits[PermitIndexs['EDITAR_STATUS_ASSETS']]
        || Type.Permits[PermitIndexs['EDITAR_TYPES_DE_USO']]
        || Type.Permits[PermitIndexs['EDITAR_SECTORS']]
        || Type.Permits[PermitIndexs['EDITAR_TYPES_DE_USER']]
        || Type.Permits[PermitIndexs['EDITAR_PERMICOES']]

    )
        return true
    else
        return false
}

export const GetUsersPermits = (Type) => {
    if (Type.Permits[PermitIndexs['ADICIONAR_USERS']]
        || Type.Permits[PermitIndexs['EDITAR_USERS']]
        || Type.Permits[PermitIndexs['EXCLUIR_USERS']]      
        || Type.Permits[PermitIndexs['VISUALIZAR_USERS']]
    )
        return true
    else
        return false
}

export const GetAssetsPermits = (Type) => {
    if (Type.Permits[PermitIndexs['ADICIONAR_ASSETS']]
        || Type.Permits[PermitIndexs['EDITAR_ASSETS']]
        || Type.Permits[PermitIndexs['EXCLUIR_ASSETS']]
        || Type.Permits[PermitIndexs['RETIRAR_ASSETS']]
        || Type.Permits[PermitIndexs['VISUALIZAR_ASSETS']]
    )
        return true
    else
        return false
}



export const GetUsersPermits2 = () => {



    return false
}