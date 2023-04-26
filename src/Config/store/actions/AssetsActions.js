

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

export const AddAssetAction = (NovoAsset = {}) => {

    return ({
        type: 'ADD_ASSET',
        NovoAsset
    })
}


export const EditAssetAction = (EditedAsset = {}) => {

    return ({
        type: 'EDIT_ASSET',
        EditedAsset
    })
}

export const DeleteAssetAction = (AssetToDelete = {}) => {

    return ({
        type: 'DELETE_ASSET',
        AssetToDelete
    })
}


export const clearAllNotas = () => {
    return ({
        type: 'CLEAR_ALL'
    })
}

export const SetAssets = (Assets) => {
    return ({
        type: 'SET_ASSETS',
        Assets
    })
}


