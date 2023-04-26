

const Setores = (state = [], action) => {
    switch (action.type) {
        case 'ADD_SETOR':
            return state.concat(action.NovoSetor)
        case 'CLEAR_ALL':
            return []
        case 'SET_SETORES':
            return action.Setores
        default:
            return state
    }
}


export default Setores
