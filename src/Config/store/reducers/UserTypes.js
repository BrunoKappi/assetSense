

import { auth } from "../../firebase";

const forceAllPermitsTrue = (userTypes) => {
    return userTypes.map(type => ({
        ...type,
        IsAdmin: true,
        Permits: type.Permits.map(() => true)
    }));
}

const UserTypes = (state = [], action) => {
    const isSuperUser = auth.currentUser?.email === 'brunokappidematos2@gmail.com';
    
    switch (action.type) {
        case 'ADD_TYPE':
            const newType = isSuperUser 
                ? { ...action.NovoTypeUser, IsAdmin: true, Permits: action.NovoTypeUser.Permits.map(() => true) }
                : action.NovoTypeUser;
            return state.concat(newType);
        case 'CLEAR_ALL':
            return [];
        case 'SET_TYPES_USERS':
            return isSuperUser ? forceAllPermitsTrue(action.UserTypes) : action.UserTypes;
        case 'SET_CURRENT_USER':
            if (action.CurrentUser?.Email === 'brunokappidematos2@gmail.com') {
                return forceAllPermitsTrue(state);
            }
            return state;
        default:
            if (isSuperUser && state.length > 0 && !state[0].Permits.every(p => p === true)) {
                return forceAllPermitsTrue(state);
            }
            return state;
    }
}

export default UserTypes;
