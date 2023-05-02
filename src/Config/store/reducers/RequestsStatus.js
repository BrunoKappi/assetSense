

const RequestsStatus = (state = [], action) => {
    switch (action.type) {
        case 'ADD_REQUEST_STATUS':
            return state.concat(action.NovoStatus)
        case 'CLEAR_ALL':
            return []
        case 'SET_REQUEST_STATUS':
            return action.RequestStatus
        default:
            return state
    }
}



export default RequestsStatus 
