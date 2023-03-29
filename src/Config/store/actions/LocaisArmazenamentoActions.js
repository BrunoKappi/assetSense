

export const AddTipoAtivo = (NovoAtivo = {}) => {

    return ({
        type: 'ADD_TIPO_ATIVO',
        NovoAtivo
    })
}


export const editNotaAction = (docID, editedNota = {}) => {
    return ({
        type: 'EDIT_NOTA',
        docID,
        editedNota
    })
}

 

export const SetLocaisArmazenamento = (LocaisArmazenamento) => {
    
    return ({
        type: 'SET_LOCAIS_ARMAZENAMENTO',
        LocaisArmazenamento
    })
}


