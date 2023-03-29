

const TiposUsuarios = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TIPO':
            return state.concat(action.NovoTipoUsuario)
        case 'CLEAR_ALL':
            return []
        case 'SET_TIPOS_USUARIOS':
            return action.TiposUsuarios
        default:
            return state
    }
}


export default TiposUsuarios
