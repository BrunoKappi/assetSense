

export const AddUserAction = (NovoUser = {}) => {

    return ({
        type: 'ADD_USER',
        NovoUser
    })
}

export const DeleteUserAction = (UserToDelete = {}) => {

    return ({
        type: 'DELETE_USER',
        UserToDelete
    })
}


export const EditUserAction = (EditedUser = {}) => {
    return ({
        type: 'EDIT_USER',
        EditedUser
    })
}


export const clearAllUsers = () => {
    return ({
        type: 'CLEAR_ALL'
    })
}

export const SetUsers = (Users) => {
    return ({
        type: 'SET_USERS',
        Users
    })
}


