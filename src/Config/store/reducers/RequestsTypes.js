
 
const RequestsTypes = (state = [], action) => {
    switch (action.type) {
        case 'ADD_REQUEST_TYPE':
            return state.concat(action.NovoType)
        case 'CLEAR_ALL':
            return []
        case 'SET_REQUEST_TYPES':
            return action.RequestsTypes
        default:
            return state
    }
}


export default RequestsTypes
