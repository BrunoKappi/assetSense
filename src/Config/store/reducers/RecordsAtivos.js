

const RecordsAtivos = (state = [], action) => {

    switch (action.type) {
        case 'CLEAR_ALL':
            return []
        case 'SET_RECORDS': 
            return action.Records
        case 'ADD_RECORD':           
            return state.concat(action.NovoRecord)
        case 'EDIT_RECORD':         
            return state.filter(Record => {
                return Record.id !== action.EditedRecord.id
            }).concat(action.EditedRecord)
        case 'DELETE_RECORD':
            return state.filter(Record => {
                return Record.id !== action.RecordToDelete.id
            })
        default:
            return state
    }
}


export default RecordsAtivos
