import { combineReducers, createStore } from 'redux'
import LoggedUser from './reducers/LoggedUser'
import Setores from './reducers/Setores'
import TiposUsuarios from './reducers/TiposUsuarios'
import Usuarios from './reducers/Usuarios'
import TiposAtivos from './reducers/TiposAtivos'
import Ativos from './reducers/Ativos'
import StatusAtivos from './reducers/StatusAtivos'
import TiposDeUso from './reducers/TiposDeUso'
import RecordsAtivos from './reducers/RecordsAtivos'
import LocaisArmazenamento from './reducers/LocaisArmazenamento'
import { SetTiposUsuarios } from './actions/TiposUsuariosActions'
import { SetSetores } from './actions/SetoresActions'
import { SetUsuarios } from './actions/UsuariosActions'
import { SetTiposAtivos } from './actions/TiposAtivosActions'
import { SetAtivos } from './actions/AtivosActions'
import { SetLocaisArmazenamento } from './actions/LocaisArmazenamentoActions'
import { SetStatusAtivos } from './actions/AtivosStatusActions'
import { SetTiposDeUso } from './actions/TiposDeUsoActions'
import { GetAtivos, GetLocaisArmazenamento, GetRecords, GetSetores, GetStatusAtivos, GetTipos, GetTiposDeUso, GetUsers, GetUserTipos } from '../../Functions/Middleware'
import { SetRecords } from './actions/RecordsActions'



GetUserTipos().then((Tipos) => {
    store.dispatch(SetTiposUsuarios(Tipos))
})

GetSetores().then((Setores) => {
    store.dispatch(SetSetores(Setores))
})

GetUsers().then((Users) => {
    store.dispatch(SetUsuarios(Users))
})

GetTipos().then((TiposAtivos) => {
    store.dispatch(SetTiposAtivos(TiposAtivos))
})

GetAtivos().then((Ativos) => {
    store.dispatch(SetAtivos(Ativos))
})

GetLocaisArmazenamento().then((Locais) => {
    store.dispatch(SetLocaisArmazenamento(Locais))
})

GetStatusAtivos().then((StatusAtivos) => {
    store.dispatch(SetStatusAtivos(StatusAtivos))
})

GetTiposDeUso().then((Tipos) => { 
    store.dispatch(SetTiposDeUso(Tipos))
})

GetRecords().then((Records) => {
    console.log("PEGANDO RECORDS")
    store.dispatch(SetRecords(Records))
})

const store = createStore(
    combineReducers({
        LoggedUser,
        Setores,
        TiposUsuarios,
        Usuarios,
        TiposAtivos,
        Ativos,
        LocaisArmazenamento,
        StatusAtivos,
        TiposDeUso,
        RecordsAtivos
    }),
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => {
    localStorage.setItem("AssetSense", JSON.stringify(store.getState()))
    console.log("Store Changed", store.getState().RecordsAtivos)
})


export default store





