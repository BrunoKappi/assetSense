import { GetFromStore } from "../../Functions/StoreMiddleware"

const IdsGetFunctions = {
    'AssetsStatus': () => GetFromStore('AssetsStatus'),
    'UsageTypes': () => GetFromStore('UsageTypes'),
    'StorageLocations': () => GetFromStore('StorageLocations'),
    'AssetTypes': () => GetFromStore('AssetTypes'),
    'Sectors': () => GetFromStore('Sectors'),
    'UserTypes': () => GetFromStore('UserTypes'),
}

const ItensGetFunctions = {
    'AssetsStatus': () => GetFromStore('Assets'),
    'UsageTypes': () => GetFromStore('Assets'),
    'StorageLocations': () => GetFromStore('Assets'),
    'AssetTypes': () => GetFromStore('Assets'),
    'Sectors': () => GetFromStore('Users'),
    'UserTypes': () => GetFromStore('Users'),
}

const KeysGetFunctions = {
    'AssetsStatus': 'Status',
    'UsageTypes': 'Usage',
    'StorageLocations': 'StorageLocation',
    'AssetTypes': 'Type',
    'Sectors': 'Sector',
    'UserTypes': 'Type',
}


export const GetSeriesAndLabels = (Type) => {

    const GetIds = IdsGetFunctions[Type]
    const GetItens = ItensGetFunctions[Type]

    const Ids = [...GetIds().map(element => { return element.id })]
    const Labels = [...GetIds().map(element => { return element.Value })]
    const Qtds = [...GetIds().map(element => { return { Qtd: 0, Label: '' } })]
    var QtdsCopy = [...Qtds]
    const Itens = GetItens()
    Ids.map((ID, Index) => {
        return Itens.map(Item => {
            if (Item[KeysGetFunctions[Type]].id === ID) {
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

    const UsageTypesAssetsLabels = ['Em Uso', 'Devolvidos']
    const UsageTypesAssetsQtd = [0, 0]

    const Records = [...GetFromStore('RecordsAssets')]


    Records.map(Record => {
        if (Record.ReturnDate)
            UsageTypesAssetsQtd[1] = UsageTypesAssetsQtd[1] + 1
        else
            UsageTypesAssetsQtd[0] = UsageTypesAssetsQtd[0] + 1
    })



    const optionsCopy = {}
    optionsCopy.labels = [...UsageTypesAssetsLabels]
    optionsCopy.series = [...UsageTypesAssetsQtd]
    return optionsCopy
}

export const GetTop5ItensRetirados_SeriesLabels = () => {

    const Records = GetFromStore('RecordsAssets')
    const Assets = GetFromStore('Assets')

    const AssetsIds = Records.map(Record => { return Record.AtivoId })


    const AssetsRetirados = []

    Assets.map(Asset => {
        if (AssetsIds.some(AssetId => AssetId === Asset.id)) {
            const Qtd = Records.filter(Record => Record.AtivoId === Asset.id).length
            AssetsRetirados.push({ Item: Asset.Item, Qtd: Qtd })
        } else
            return
    })





    const optionsCopy = {}
    optionsCopy.labels = AssetsRetirados.sort((a, b) => b.Qtd - a.Qtd).slice(0, 5).map(Asset => { return Asset.Item })
    optionsCopy.series = AssetsRetirados.sort((a, b) => b.Qtd - a.Qtd).slice(0, 5).map(Asset => { return Asset.Qtd })

    return optionsCopy


}


export const GetTop5UsersRetirados_SeriesLabels = () => {

    const Records = GetFromStore('RecordsAssets')
    const Users = GetFromStore('Users')

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
    optionsCopy.labels = UsersRetirados.sort((a, b) => b.Qtd - a.Qtd).slice(0, 5).map(Asset => { return Asset.Nome })
    optionsCopy.series = UsersRetirados.sort((a, b) => b.Qtd - a.Qtd).slice(0, 5).map(Asset => { return Asset.Qtd })

    return optionsCopy



}



export const GetFunctions = {
    "AssetTypes": GetSeriesAndLabels,
    "Sectors": GetSeriesAndLabels,
    "UserTypes": GetSeriesAndLabels,
    "StorageLocations": GetSeriesAndLabels,
    "AssetsStatus": GetSeriesAndLabels,
    "UsageTypes": GetSeriesAndLabels,
    "RecordsPendentesUso": GetRecordsPendentesUso_SeriesLabels,
    "Top5AssetsRetirados": GetTop5ItensRetirados_SeriesLabels,
    "Top5UsersRetirados": GetTop5UsersRetirados_SeriesLabels,
}; 