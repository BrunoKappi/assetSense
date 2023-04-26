import moment from "moment"

const Ativos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_SECTOR':
            return state.concat(action.NovoSector)
        case 'ADD_ATIVO':
            return state.concat(action.NovoAtivo)
        case 'CLEAR_ALL':
            return []
        case 'EDIT_ATIVO':
            return state.filter(ativo => {
                return ativo.id !== action.EditedAtivo.id
            }).concat({ ...action.EditedAtivo, CreatedAt: moment().valueOf(), LastEditedAt: moment().valueOf() })
        case 'DELETE_ATIVO':
            return state.filter(ativo => {
                return ativo.id !== action.AtivoToDelete.id
            })
        case 'SET_ATIVOS':
            return action.Ativos
        default:
            return state
    }
}


export default Ativos
