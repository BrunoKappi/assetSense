

const TiposAtivos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TIPO_ATIVO':
            return state.concat(action.NovoAtivo)
        case 'CLEAR_ALL':
            return []
        case 'SET_TIPOS_ATIVOS':
            return action.TiposAtivos
        default:
            return state
    }
}


export default TiposAtivos
