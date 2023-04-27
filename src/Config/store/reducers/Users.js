import moment from "moment"


const Users = (state = [], action) => {

    switch (action.type) {
        case 'ADD_USER':
            return state.concat(action.NovoUser)
        case 'CLEAR_ALL':
            return []
        case 'SET_USERS':
            return action.Users
        case 'EDIT_USER':
            return state.filter(user => {
                return user.id !== action.EditedUser.id
            }).concat({ ...action.EditedUser, CreatedAt: moment().valueOf(), LastEditedAt: moment().valueOf() })
        case 'DELETE_USER':
            return state.filter(user => {
                return user.id !== action.UserToDelete.id
            })
        default:
            return state
    }
}


export default Users
