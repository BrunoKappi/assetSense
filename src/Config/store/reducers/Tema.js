

const Tema = (state = "", action) => {

    switch (action.type) {
        case 'SET_TEMA':           
            return action.Tema
        default:
            return state
    }
}

export default Tema
    