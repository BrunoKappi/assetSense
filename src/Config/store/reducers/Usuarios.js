

const Usuarios = (state = [], action) => {

    switch (action.type) {
        case 'ADD_USUARIO':
            return state.concat(action.NovoUsuario)
        case 'CLEAR_ALL':
            return []
        case 'SET_USUARIOS':
            return action.Usuarios
        case 'EDIT_USUARIO':
            return state.filter(usuario => {
                return usuario.Id !== action.EditedUser.Id
            }).concat(action.EditedUser)
        case 'DELETE_USUARIO':
            return state.filter(usuario => {
                return usuario.Id !== action.UsuarioToDelete.Id
            })
        default:
            return state
    }
}


export default Usuarios
