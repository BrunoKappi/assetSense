

const UsageTypes = (state = [], action) => {
    switch (action.type) {
        case 'ADD_STATUS_ASSET':
            return state.concat(action.NovoStatus)
        case 'CLEAR_ALL':
            return []
        case 'SET_TYPES_USO':
            return action.UsageTypes
        default:
            return state
    }
}


export default UsageTypes
