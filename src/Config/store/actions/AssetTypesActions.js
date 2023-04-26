

export const AddTypeAsset = (NovoAsset = {}) => {

    return ({
        type: 'ADD_TYPE_ASSET',
        NovoAsset
    })
}


export const editNotaAction = (docID, editedNota = {}) => {
    return ({
        type: 'EDIT_NOTA',
        docID,
        editedNota
    })
}



export const SetAssetTypess = (AssetTypess) => {
    
    return ({
        type: 'SET_TYPES_ASSETS',
        AssetTypess
    })
}


