

export const AddRequestType = (NovoAsset = {}) => {

    return ({
        type: 'ADD_REQUEST_TYPE',
        NovoAsset
    })
}


export const SetRequestsTypes = (RequestsTypes) => {

    return ({
        type: 'SET_REQUEST_TYPES',
        RequestsTypes
    })
}


