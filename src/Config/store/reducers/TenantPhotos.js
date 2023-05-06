import { DefaultTenantPhotos } from "../../../GlobalVars"


const TenantPhotos = (state = DefaultTenantPhotos, action) => {
    switch (action.type) {
        case 'CLEAR_TENANT_PHOTOS':
            return {
                ...DefaultTenantPhotos,
            }
        case 'SET_TENANT_PHOTOS':
            return action.TenantPhotos
        default:
            return state
    }
}

export default TenantPhotos
