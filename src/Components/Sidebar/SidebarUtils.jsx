
import { SetSidebarTagOnStore } from '../../Functions/StoreMiddleware';
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
    if (Type.Permits[PermitIndexs['EDIT_TYPES_ASSETS']]
        || Type.Permits[PermitIndexs['EDIT_STORAGELOCATIONS']]
        || Type.Permits[PermitIndexs['EDIT_STATUS_ASSETS']]
        || Type.Permits[PermitIndexs['EDIT_TYPES_DE_USO']]
        || Type.Permits[PermitIndexs['EDIT_SECTORS']]
        || Type.Permits[PermitIndexs['EDIT_TYPES_DE_USER']]
        || Type.Permits[PermitIndexs['EDIT_PERMICOES']]

    )
        return true
    else
        return false
}

export const GetUsersPermits = (Type) => {
    if (Type.Permits[PermitIndexs['ADD_USERS']]
        || Type.Permits[PermitIndexs['EDIT_USERS']]
        || Type.Permits[PermitIndexs['DELETE_USERS']]      
        || Type.Permits[PermitIndexs['VIEW_USERS']]
    )
        return true
    else
        return false
}

export const GetAssetsPermits = (Type) => {
    if (Type.Permits[PermitIndexs['ADD_ASSETS']]
        || Type.Permits[PermitIndexs['EDIT_ASSETS']]
        || Type.Permits[PermitIndexs['DELETE_ASSETS']]
        || Type.Permits[PermitIndexs['RETIRAR_ASSETS']]
        || Type.Permits[PermitIndexs['VIEW_ASSETS']]
    )
        return true
    else
        return false
}



export const GetUsersPermits2 = () => {



    return false
}