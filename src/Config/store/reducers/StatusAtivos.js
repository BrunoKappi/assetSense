

const AtivosStatus = (state = [], action) => {
    switch (action.type) {
        case 'ADD_STATUS_ATIVO':
            return state.concat(action.NovoStatus)
        case 'CLEAR_ALL':
            return []
        case 'SET_STATUS_ATIVOS':
            return action.AtivosStatus
        default:
            return state
    }
}


export default AtivosStatus
