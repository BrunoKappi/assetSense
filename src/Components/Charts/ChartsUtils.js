import { GetFromStore } from "../../Functions/Middleware"

const IdsGetFunctions = {
    'StatusAtivos': () => GetFromStore('StatusAtivos'),
    'TiposUso': () => GetFromStore('TiposDeUso'),
    'Locais': () => GetFromStore('StorageLocations'),
    'TiposAtivos': () => GetFromStore('TiposAtivos'), 
    'Setores': () => GetFromStore('Setores'),
    'TiposUsuarios': () => GetFromStore('TiposUsuarios'),
}

const ItensGetFunctions = {
    'StatusAtivos': () => GetFromStore('Ativos'),
    'TiposUso': () => GetFromStore('Ativos'),
    'Locais': () => GetFromStore('Ativos'),
    'TiposAtivos': () => GetFromStore('Ativos'),
    'Setores': () => GetFromStore('Usuarios'),
    'TiposUsuarios': () => GetFromStore('Usuarios'),
}

const KeysGetFunctions = {
    'StatusAtivos': 'Status',
    'TiposUso': 'Usage',
    'Locais': 'StorageLocation',
    'TiposAtivos': 'Type',
    'Setores': 'Sector',
    'TiposUsuarios': 'Type',
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

    const TiposDeUsoAtivosLabels = ['Em Uso', 'Devolvidos']
    const TiposDeUsoAtivosQtd = [0, 0]

    const Records = [...GetFromStore('RecordsAtivos')]


    Records.map(Record => {
        if (Record.ReturnDate)
            TiposDeUsoAtivosQtd[1] = TiposDeUsoAtivosQtd[1] + 1
        else
            TiposDeUsoAtivosQtd[0] = TiposDeUsoAtivosQtd[0] + 1
    })



    const optionsCopy = {}
    optionsCopy.labels = [...TiposDeUsoAtivosLabels]
    optionsCopy.series = [...TiposDeUsoAtivosQtd]
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
    "TiposAtivos": GetSeriesAndLabels,
    "Setores": GetSeriesAndLabels,
    "TiposUsuarios": GetSeriesAndLabels,
    "Locais": GetSeriesAndLabels,
    "StatusAtivos": GetSeriesAndLabels,
    "TiposUso": GetSeriesAndLabels,
    "RecordsPendentesUso": GetRecordsPendentesUso_SeriesLabels,
    "Top5AtivosRetirados": GetTop5ItensRetirados_SeriesLabels,
    "Top5UsersRetirados": GetTop5UsuariosRetirados_SeriesLabels,
}; 