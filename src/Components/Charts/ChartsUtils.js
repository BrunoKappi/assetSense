import { GetAtivosFromStore, GetLocaisArmazenamentoFromStore, GetRecordsFromFirebase, GetRecordsFromStore, GetSetoresFromStore, GetStatusAtivosFromFirebase, GetStatusAtivosFromStore, GetTiposAtivosFromStore, GetTiposDeUsoFromStore, GetUserTypesFromStore, GetUsersFromStore } from "../../Functions/Middleware"



export const GetUserTypes_SeriesLabels = () => {
    const TiposUsuariosIds = [...GetUserTypesFromStore().map(element => { return element.id })]
    const TiposUsuariosLabels = [...GetUserTypesFromStore().map(element => { return element.Value })]
    const TiposUsuariosQtd = [...GetUserTypesFromStore().map(element => { return { Qtd: 0, Label: '' } })]
    var TiposUsuariosQtdCopy = [...TiposUsuariosQtd]
    const Usuarios = GetUsersFromStore()
    TiposUsuariosIds.map((TipoID, IndexTipoUser) => {
        return Usuarios.map(User => {
            if (User.Type.id === TipoID) {
                TiposUsuariosQtdCopy[IndexTipoUser].Qtd = TiposUsuariosQtdCopy[IndexTipoUser].Qtd + 1
                TiposUsuariosQtdCopy[IndexTipoUser].Label = TiposUsuariosLabels[IndexTipoUser]
            }
            return ''
        })
    })

    
    TiposUsuariosQtdCopy.sort((a, b) => b.Qtd - a.Qtd).map((Item, Index) => {
        TiposUsuariosLabels[Index] = TiposUsuariosQtdCopy[Index].Label
        TiposUsuariosQtdCopy[Index] = TiposUsuariosQtdCopy[Index].Qtd
    })

    const optionsCopy = {}
    optionsCopy.labels = [...TiposUsuariosLabels]
    optionsCopy.series = [...TiposUsuariosQtdCopy]
    return optionsCopy
}

export const GetUserSetores_SeriesLabels = () => {
    const SetoresIds = [...GetSetoresFromStore().map(element => { return element.id })]
    const SetoresLabels = [...GetSetoresFromStore().map(element => { return element.Value })]
    const SetoresQtd = [...GetSetoresFromStore().map(element => { return { Qtd: 0, Label: '' } })]
    var SetoresQtdCopy = [...SetoresQtd]
    const Usuarios = GetUsersFromStore()
    SetoresIds.map((TipoID, IndexTipoUser) => {
        return Usuarios.map(User => {
            if (User.Sector.id === TipoID) {
                SetoresQtdCopy[IndexTipoUser].Qtd = SetoresQtdCopy[IndexTipoUser].Qtd + 1
                SetoresQtdCopy[IndexTipoUser].Label =  SetoresLabels[IndexTipoUser]
            }
            return ''
        })
    })

    SetoresQtdCopy.sort((a, b) => b.Qtd - a.Qtd).map((Item, Index) => {
        SetoresLabels[Index] = SetoresQtdCopy[Index].Label
        SetoresQtdCopy[Index] = SetoresQtdCopy[Index].Qtd
    })


    const optionsCopy = {}
    optionsCopy.labels = [...SetoresLabels]
    optionsCopy.series = [...SetoresQtdCopy]
    return optionsCopy
} 

export const GetTiposAtivos_SeriesLabels = () => {
    const TiposAtivosIds = [...GetTiposAtivosFromStore().map(element => { return element.id })]
    const TiposAtivosLabels = [...GetTiposAtivosFromStore().map(element => { return element.Value })]
    const TiposAtivosQtd = [...GetTiposAtivosFromStore().map(element => { return { Qtd: 0, Label: '' } })]
    var TiposAtivosQtdCopy = [...TiposAtivosQtd]
    const Ativos = GetAtivosFromStore()
    TiposAtivosIds.map((TipoID, index) => {
        return Ativos.map(Ativo => {
            if (Ativo.Type.id === TipoID) {
                TiposAtivosQtdCopy[index].Qtd = TiposAtivosQtdCopy[index].Qtd + 1
                TiposAtivosQtdCopy[index].Label = TiposAtivosLabels[index]
            }
            return ''
        })
    })
    const optionsCopy = {}

    TiposAtivosQtdCopy.sort((a, b) => b.Qtd - a.Qtd).map((Item, Index) => {
        TiposAtivosLabels[Index] = TiposAtivosQtdCopy[Index].Label
        TiposAtivosQtdCopy[Index] = TiposAtivosQtdCopy[Index].Qtd
    })

    optionsCopy.labels = [...TiposAtivosLabels]
    optionsCopy.series = [...TiposAtivosQtdCopy]
    return optionsCopy
}

export const GetAtivosLocais_SeriesLabels = () => {
    const AtivosLocaisIds = [...GetLocaisArmazenamentoFromStore().map(element => { return element.id })]
    const AtivosLocaisLabels = [...GetLocaisArmazenamentoFromStore().map(element => { return element.Value })]
    const AtivosLocaisQtd = [...GetLocaisArmazenamentoFromStore().map(element => { return { Qtd: 0, Label: '' } })]
    var AtivosLocaisQtdCopy = [...AtivosLocaisQtd]
    const Ativos = GetAtivosFromStore()
    AtivosLocaisIds.map((TipoID, index) => {
        return Ativos.map(Ativo => {
            if (Ativo.StorageLocation.id === TipoID) {
                AtivosLocaisQtdCopy[index].Qtd = AtivosLocaisQtdCopy[index].Qtd + 1
                AtivosLocaisQtdCopy[index].Label = AtivosLocaisLabels[index]
            }
            return ''
        })
    })

    AtivosLocaisQtdCopy.sort((a, b) => b.Qtd - a.Qtd).map((Item, Index) => {
        AtivosLocaisLabels[Index] = AtivosLocaisQtdCopy[Index].Label
        AtivosLocaisQtdCopy[Index] = AtivosLocaisQtdCopy[Index].Qtd
    })

    const optionsCopy = {}
    optionsCopy.labels = [...AtivosLocaisLabels]
    optionsCopy.series = [...AtivosLocaisQtdCopy]
    return optionsCopy
}

export const GetAtivosStatus_SeriesLabels = () => {
    const AtivosStatusIds = [...GetStatusAtivosFromStore().map(element => { return element.id })]
    const AtivosStatusLabels = [...GetStatusAtivosFromStore().map(element => { return element.Value })]
    const AtivosStatusQtd = [...GetStatusAtivosFromStore().map(element => { return { Qtd: 0, Label: '' } })]
    var AtivosStatusQtdCopy = [...AtivosStatusQtd]
    const Ativos = GetAtivosFromStore()
    AtivosStatusIds.map((TipoID, index) => {
        return Ativos.map(Ativo => {
            if (Ativo.Status.id === TipoID) {
                AtivosStatusQtdCopy[index].Qtd = AtivosStatusQtdCopy[index].Qtd + 1
                AtivosStatusQtdCopy[index].Label = AtivosStatusLabels[index]
            }
            return ''
        })
    })

    AtivosStatusQtdCopy.sort((a, b) => b.Qtd - a.Qtd).map((Item, Index) => {
        AtivosStatusLabels[Index] = AtivosStatusQtdCopy[Index].Label
        AtivosStatusQtdCopy[Index] = AtivosStatusQtdCopy[Index].Qtd
    })
    const optionsCopy = {}
    optionsCopy.labels = [...AtivosStatusLabels]
    optionsCopy.series = [...AtivosStatusQtdCopy]
    return optionsCopy
}

export const GetTiposDeUsoAtivos_SeriesLabels = () => {
    const TiposDeUsoAtivosIds = [...GetTiposDeUsoFromStore().map(element => { return element.id })]
    const TiposDeUsoAtivosLabels = [...GetTiposDeUsoFromStore().map(element => { return element.Value })]
    const TiposDeUsoAtivosQtd = [...GetTiposDeUsoFromStore().map(element => { return { Qtd: 0, Label: '' } })]
    var TiposDeUsoAtivosQtdCopy = [...TiposDeUsoAtivosQtd]
    const Ativos = GetAtivosFromStore()
    TiposDeUsoAtivosIds.map((TipoID, index) => {
        return Ativos.map(Ativo => {
            if (Ativo.Usage.id === TipoID) {
                TiposDeUsoAtivosQtdCopy[index].Qtd = TiposDeUsoAtivosQtdCopy[index].Qtd + 1
                TiposDeUsoAtivosQtdCopy[index].Label = TiposDeUsoAtivosLabels[index]
            }
            return ''
        })
    }) 


    TiposDeUsoAtivosQtdCopy.sort((a, b) => b.Qtd - a.Qtd).map((Item, Index) => {
        TiposDeUsoAtivosLabels[Index] = TiposDeUsoAtivosQtdCopy[Index].Label
        TiposDeUsoAtivosQtdCopy[Index] = TiposDeUsoAtivosQtdCopy[Index].Qtd
    })


    const optionsCopy = {}

    optionsCopy.labels = [...TiposDeUsoAtivosLabels]
    optionsCopy.series = [...TiposDeUsoAtivosQtdCopy]
    return optionsCopy
}

export const GetRecordsPendentesUso_SeriesLabels = () => {

    const TiposDeUsoAtivosLabels = ['Em Uso', 'Devolvidos']
    const TiposDeUsoAtivosQtd = [0, 0]

    const Records = [...GetRecordsFromStore()]


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

    const Records = GetRecordsFromStore()
    const Ativos = GetAtivosFromStore()

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

    const Records = GetRecordsFromStore()
    const Users = GetUsersFromStore()

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
    //COMENTADO  console.log(optionsCopy)
    return optionsCopy



}





export const GetFunctions = {
    "TiposAtivos": GetTiposAtivos_SeriesLabels,
    "Setores": GetUserSetores_SeriesLabels,
    "TiposUsuarios": GetUserTypes_SeriesLabels,
    "Locais": GetAtivosLocais_SeriesLabels,
    "StatusAtivos": GetAtivosStatus_SeriesLabels,
    "TiposUso": GetTiposDeUsoAtivos_SeriesLabels,
    "RecordsPendentesUso": GetRecordsPendentesUso_SeriesLabels,
    "Top5AtivosRetirados": GetTop5ItensRetirados_SeriesLabels,
    "Top5UsersRetirados": GetTop5UsuariosRetirados_SeriesLabels,
};