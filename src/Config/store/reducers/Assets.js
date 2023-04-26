import moment from "moment"

const Assets = (state = [], action) => {
    switch (action.type) {
        case 'ADD_SECTOR':
            return state.concat(action.NovoSector)
        case 'ADD_ASSET':
            return state.concat(action.NovoAsset)
        case 'CLEAR_ALL':
            return []
        case 'EDIT_ASSET':
            return state.filter(asset => {
                return asset.id !== action.EditedAsset.id
            }).concat({ ...action.EditedAsset, CreatedAt: moment().valueOf(), LastEditedAt: moment().valueOf() })
        case 'DELETE_ASSET':
            return state.filter(asset => {
                return asset.id !== action.AssetToDelete.id
            })
        case 'SET_ASSETS':
            return action.Assets
        default:
            return state
    }
}


export default Assets
