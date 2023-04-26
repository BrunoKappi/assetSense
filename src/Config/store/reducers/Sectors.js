

const Sectors = (state = [], action) => {
    switch (action.type) {
        case 'ADD_SECTOR':
            return state.concat(action.NovoSector)
        case 'CLEAR_ALL':
            return []
        case 'SET_SECTORS':
            return action.Sectors
        default:
            return state
    }
}


export default Sectors
