

export const AddRequestStatus = (NewStatus = {}) => {

    return ({
        type: 'ADD_REQUEST_STATUS',
        NewStatus
    })
}


export const SetRequestStatus = (RequestStatus) => {

    return ({
        type: 'SET_REQUEST_STATUS',
        RequestStatus
    })
}


