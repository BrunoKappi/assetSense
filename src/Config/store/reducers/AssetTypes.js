

const AssetTypess = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TYPE_ASSET':
            return state.concat(action.NovoAsset)
        case 'CLEAR_ALL':
            return []
        case 'SET_TYPES_ASSETS':
            return action.AssetTypess
        default:
            return state
    }
}


export default AssetTypess
