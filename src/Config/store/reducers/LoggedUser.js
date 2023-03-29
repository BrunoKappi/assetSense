import { DefaultLoggedUser } from "../../../GlobalVars"


const LoggedUser = (state = DefaultLoggedUser, action) => {
    switch (action.type) {
        case 'CLEAR_LOGGED':
            return {
                ...state,
                ...DefaultLoggedUser,
                Email: '',
                uid: ''
            }
        case 'TOGGLE_SIDEBAR':
            return {
                ...state,
                SidebarActive: !state.SidebarActive
            }
        case 'SET_SIDEBAR_TAB':
            return {
                ...state,
                CurrentSidebarTab: action.tab
            }

        case 'SET_SEARCH':
            return {
                ...state,
                Search: action.search
            }
        case 'CLAER_SEARCH':
            return {
                ...state,
                Search: ''
            }
        case 'CHECK_LOGIN':
            return {
                ...state,
                CheckedLogin: true
            }
        case 'SET_LOGGED':
            return action.user
        default:
            return state
    }
}

export default LoggedUser
