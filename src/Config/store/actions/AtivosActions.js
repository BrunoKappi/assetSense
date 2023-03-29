

export const addNotaAction = (novaNota = {}) => {

    return ({
        type: 'ADD_NOTA',
        novaNota
    })
}


export const editNotaAction = (docID, editedNota = {}) => {
    return ({
        type: 'EDIT_NOTA',
        docID,
        editedNota
    })
}

export const AddAtivoAction = (NovoAtivo = {}) => {

    return ({
        type: 'ADD_ATIVO',
        NovoAtivo
    })
}

export const DeleteAtivoAction = (AtivoToDelete = {}) => {

    return ({
        type: 'DELETE_ATIVO',
        AtivoToDelete
    })
}


export const clearAllNotas = () => {
    return ({
        type: 'CLEAR_ALL'
    })
}

export const SetAtivos = (Ativos) => {
    return ({
        type: 'SET_ATIVOS',
        Ativos
    })
}


