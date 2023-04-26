

const StorageLocations = (state = [], action) => {
    switch (action.type) {
        case 'ADD_LOCAL_ARMAZENAMENTO':
            return state.concat(action.NovoLocal)
        case 'CLEAR_ALL':
            return []
        case 'SET_STORAGELOCATIONS_ARMAZENAMENTO':
            return action.StorageLocations
        default:
            return state
    }
}

 
export default StorageLocations
