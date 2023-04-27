

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



export const SetAssetTypes = (AssetTypes) => {
    
    return ({
        type: 'SET_TYPES_ASSETS',
        AssetTypes
    })
}


