

const LocaisArmazenamento = (state = [], action) => {
    switch (action.type) {
        case 'ADD_LOCAL_ARMAZENAMENTO':
            return state.concat(action.NovoLocal)
        case 'CLEAR_ALL':
            return []
        case 'SET_LOCAIS_ARMAZENAMENTO':
            return action.LocaisArmazenamento
        default:
            return state
    }
}

 
export default LocaisArmazenamento
