

const Requests = (state = [], action) => {

    switch (action.type) {
        case 'CLEAR_ALL':
            return []
        case 'SET_REQUESTS':
            return action.Requests
        case 'ADD_REQUEST':
            return state.concat(action.NovoRequest)
        case 'EDIT_REQUEST':
            return state.filter(Request => {
                return Request.id !== action.EditedRequest.id
            }).concat(action.EditedRequest)
        case 'DELETE_REQUEST':
            return state.filter(Request => {
                return Request.id !== action.RequestToDelete.id
            })
        default:
            return state
    }
}


export default Requests
