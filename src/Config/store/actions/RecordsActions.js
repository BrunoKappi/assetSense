

export const AddRecordAction = (NovoRecord = {}) => {
    return ({
        type: 'ADD_RECORD',
        NovoRecord
    })
}

export const DeleteRecordAction = (RecordToDelete = {}) => {

    return ({
        type: 'DELETE_RECORD',
        RecordToDelete
    })
}


export const EditRecordAction = (EditedUser = {}) => {
    return ({
        type: 'EDIT_RECORD',
        EditedUser
    })
}


export const clearAllRecords = () => {
    return ({
        type: 'CLEAR_ALL'
    })
}

export const SetRecords = (Records) => {
    return ({
        type: 'SET_RECORDS',
        Records
    })
}


