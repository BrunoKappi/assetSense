

const UserTypes = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TYPE':
            return state.concat(action.NovoTypeUser)
        case 'CLEAR_ALL':
            return []
        case 'SET_TYPES_USERS':
            return action.UserTypes
        default:
            return state
    }
}


export default UserTypes
