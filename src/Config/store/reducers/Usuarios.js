

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
                return usuario.id !== action.EditedUser.id
            }).concat({ ...action.EditedUser, CreatedAt: moment().valueOf(), LastEditedAt: moment().valueOf() })
        case 'DELETE_USUARIO':
            return state.filter(usuario => {
                return usuario.id !== action.UsuarioToDelete.id
            })
        default:
            return state
    }
}


export default Usuarios
