

const AssetsStatus = (state = [], action) => {
    switch (action.type) {
        case 'ADD_STATUS_ASSET':
            return state.concat(action.NovoStatus)
        case 'CLEAR_ALL':
            return []
        case 'SET_STATUS_ASSETS':
            return action.AssetsStatus
        default:
            return state
    }
}


export default AssetsStatus
