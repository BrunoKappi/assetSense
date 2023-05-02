

export const AddRequestAction = (NovoRequest = {}) => {
    return ({
        type: 'ADD_REQUEST',
        NovoRequest
    })
}

export const DeleteRequestAction = (RequestToDelete = {}) => {

    return ({
        type: 'DELETE_REQUEST',
        RequestToDelete
    })
}


export const EditRequestAction = (EditedRequest = {}) => {
    return ({
        type: 'EDIT_REQUEST',
        EditedRequest
    })
}


export const clearAllRequests = () => {
    return ({
        type: 'CLEAR_ALL'
    })
}

export const SetRequests = (Requests) => {
    return ({
        type: 'SET_REQUESTS',
        Requests
    })
}


