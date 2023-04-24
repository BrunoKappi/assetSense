

const Ativos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_SETOR':
            return state.concat(action.NovoSetor)
        case 'ADD_ATIVO':
            return state.concat(action.NovoAtivo)
        case 'CLEAR_ALL':
            return []
        case 'EDIT_ATIVO':
            return state.filter(ativo => {
                return ativo.id !== action.EditedAtivo.id
            }).concat(action.EditedAtivo)
        case 'DELETE_ATIVO':
            return state.filter(ativo => {
                return ativo.id !== action.AtivoToDelete.id
            })
        case 'SET_ATIVOS':
            return action.Ativos
        default:
            return state
    }
}


export default Ativos
