

const RecordsAtivos = (state = [], action) => {

    switch (action.type) {
        case 'CLEAR_ALL':
            return []
        case 'SET_RECORDS': 
            return action.Records
        case 'ADD_RECORD':
            console.log("No Reducer Addicionando", state)
            return state.concat(action.NovoRecord)
        case 'EDIT_RECORD':
            console.log("No Reducer Editando", state)
            return state.filter(Record => {
                return Record.Id !== action.EditedRecord.Id
            }).concat(action.EditedRecord)
        case 'DELETE_RECORD':
            return state.filter(Record => {
                return Record.Id !== action.RecordToDelete.Id
            })
        default:
            return state
    }
}


export default RecordsAtivos
