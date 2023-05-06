

const Tenant = (state = "", action) => {

    switch (action.type) {
        case 'SET_TENANT':
            return action.Tenant 
        default:
            return state
    }
}

export default Tenant
