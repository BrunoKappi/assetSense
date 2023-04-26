import { GetFromStore } from "../../Functions/Middleware"

const IdsGetFunctions = {
    'AssetsStatus': () => GetFromStore('AssetsStatus'),
    'UsageTypes': () => GetFromStore('UsageTypes'),
    'Locais': () => GetFromStore('StorageLocations'),
    'AssetTypess': () => GetFromStore('AssetTypess'), 
    'Sectors': () => GetFromStore('Sectors'),
    'UserTypes': () => GetFromStore('UserTypes'),
}

const ItensGetFunctions = {
    'AssetsStatus': () => GetFromStore('Ativos'),
    'UsageTypes': () => GetFromStore('Ativos'),
    'Locais': () => GetFromStore('Ativos'),
    'AssetTypess': () => GetFromStore('Ativos'),
    'Sectors': () => GetFromStore('Usuarios'),
    'UserTypes': () => GetFromStore('Usuarios'),
}

const KeysGetFunctions = {
    'AssetsStatus': 'Status',
    'UsageTypes': 'Usage',
    'Locais': 'StorageLocation',
    'AssetTypess': 'Type',
    'Sectors': 'Sector',
    'UserTypes': 'Type',
}


export const GetSeriesAndLabels = (Tipo) => {

    const GetIds = IdsGetFunctions[Tipo]
    const GetItens = ItensGetFunctions[Tipo]

    const Ids = [...GetIds().map(element => { return element.id })]
    const Labels = [...GetIds().map(element => { return element.Value })]
    const Qtds = [...GetIds().map(element => { return { Qtd: 0, Label: '' } })]
    var QtdsCopy = [...Qtds]
    const Itens = GetItens()
    Ids.map((ID, Index) => {
        return Itens.map(Item => {
            if (Item[KeysGetFunctions[Tipo]].id === ID) {
                QtdsCopy[Index].Qtd = QtdsCopy[Index].Qtd + 1
                QtdsCopy[Index].Label = Labels[Index]
            }
            return ''
        })
    })

    QtdsCopy = QtdsCopy.filter(I => I.Qtd > 0)

    QtdsCopy.sort((a, b) => b.Qtd - a.Qtd).map((Item, Index) => {
        Labels[Index] = QtdsCopy[Index].Label
        QtdsCopy[Index] = QtdsCopy[Index].Qtd
    })
    const optionsCopy = {}
    optionsCopy.labels = [...Labels]
    optionsCopy.series = [...QtdsCopy]
    return optionsCopy
}

export const GetRecordsPendentesUso_SeriesLabels = () => {

    const UsageTypesAtivosLabels = ['Em Uso', 'Devolvidos']
    const UsageTypesAtivosQtd = [0, 0]

    const Records = [...GetFromStore('RecordsAtivos')]


    Records.map(Record => {
        if (Record.ReturnDate)
            UsageTypesAtivosQtd[1] = UsageTypesAtivosQtd[1] + 1
        else
            UsageTypesAtivosQtd[0] = UsageTypesAtivosQtd[0] + 1
    })



    const optionsCopy = {}
    optionsCopy.labels = [...UsageTypesAtivosLabels]
    optionsCopy.series = [...UsageTypesAtivosQtd]
    return optionsCopy
}

export const GetTop5ItensRetirados_SeriesLabels = () => {

    const Records = GetFromStore('RecordsAtivos')
    const Ativos = GetFromStore('Ativos')

    const AtivosIds = Records.map(Record => { return Record.AtivoId })

    const AtivosRetirados = []

    Ativos.map(Ativo => {
        if (AtivosIds.some(AtivoId => AtivoId === Ativo.id)) {
            const Qtd = Records.filter(Record => Record.AtivoId === Ativo.id).length
            AtivosRetirados.push({ Item: Ativo.Item, Qtd: Qtd })
        } else
            return
    })





    const optionsCopy = {}
    optionsCopy.labels = AtivosRetirados.sort((a, b) => b.Qtd - a.Qtd).slice(0, 5).map(Ativo => { return Ativo.Item })
    optionsCopy.series = AtivosRetirados.sort((a, b) => b.Qtd - a.Qtd).slice(0, 5).map(Ativo => { return Ativo.Qtd })

    return optionsCopy


}


export const GetTop5UsuariosRetirados_SeriesLabels = () => {

    const Records = GetFromStore('RecordsAtivos')
    const Users = GetFromStore('Usuarios')

    const UsersIds = Records.map(Record => { return Record.TakenFor.id })

    const UsersRetirados = []

    Users.map(User => {
        if (UsersIds.some(UserId => UserId === User.id)) {
            const Qtd = Records.filter(Record => Record.TakenFor.id === User.id).length
            UsersRetirados.push({ Nome: User.Name + ' ' + (User.LastName ? User.LastName : ''), Qtd: Qtd })
        } else
            return
    })
    const optionsCopy = {}
    optionsCopy.labels = UsersRetirados.sort((a, b) => b.Qtd - a.Qtd).slice(0, 5).map(Ativo => { return Ativo.Nome })
    optionsCopy.series = UsersRetirados.sort((a, b) => b.Qtd - a.Qtd).slice(0, 5).map(Ativo => { return Ativo.Qtd })

    return optionsCopy



}



export const GetFunctions = {
    "AssetTypess": GetSeriesAndLabels,
    "Sectors": GetSeriesAndLabels,
    "UserTypes": GetSeriesAndLabels,
    "Locais": GetSeriesAndLabels,
    "AssetsStatus": GetSeriesAndLabels,
    "UsageTypes": GetSeriesAndLabels,
    "RecordsPendentesUso": GetRecordsPendentesUso_SeriesLabels,
    "Top5AtivosRetirados": GetTop5ItensRetirados_SeriesLabels,
    "Top5UsersRetirados": GetTop5UsuariosRetirados_SeriesLabels,
}; 