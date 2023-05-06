

export const clearTenantPhotosAction = () => {
    return ({
        type: 'CLEAR_TENANT_PHOTOS'
    })
}

export const setTenantPhotosAction = (TenantPhotos) => {
    return ({
        type: 'SET_TENANT_PHOTOS',
        TenantPhotos
    })
}


