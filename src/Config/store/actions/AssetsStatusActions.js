

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



export const SetStatusAtivos = (AtivosStatus) => {

    return ({
        type: 'SET_STATUS_ATIVOS',
        AtivosStatus
    })
}


