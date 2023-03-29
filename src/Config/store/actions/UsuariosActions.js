

export const AddUsuarioAction = (NovoUsuario = {}) => {

    return ({
        type: 'ADD_USUARIO',
        NovoUsuario
    })
}

export const DeleteUsuarioAction = (UsuarioToDelete = {}) => {

    return ({
        type: 'DELETE_USUARIO',
        UsuarioToDelete
    })
}


export const EditUsuarioAction = (EditedUser = {}) => {
    return ({
        type: 'EDIT_USUARIO',
        EditedUser
    })
}


export const clearAllUsuarios = () => {
    return ({
        type: 'CLEAR_ALL'
    })
}

export const SetUsuarios = (Usuarios) => {
    return ({
        type: 'SET_USUARIOS',
        Usuarios
    })
}


