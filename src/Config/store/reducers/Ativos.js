

const Ativos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_SETOR':
            return state.concat(action.NovoSetor)
        case 'ADD_ATIVO':
            return state.concat(action.NovoAtivo)
        case 'CLEAR_ALL':
            return []
        case 'DELETE_ATIVO':
            return state.filter(ativo => {
                return ativo.Id !== action.AtivoToDelete.Id
            })
        case 'SET_ATIVOS':
            return action.Ativos
        default:
            return state
    }
}


export default Ativos
