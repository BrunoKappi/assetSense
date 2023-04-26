import { NotificationAlerta, NotificationErro, NotificationSucesso } from '../../NotificationUtils';


export const GetNotificationErrorMessageDelete = (Module) => {
    switch (Module) {
        case "TiposAtivos":
            NotificationErro('Erro | Exclusão', 'Não é possível excluir este Tipo de Ativo pois existem ativos associados a este tipo')
            break;
        case "TiposUso":
            NotificationErro('Erro | Exclusão', 'Não é possível excluir este Tipo de Uso pois existem ativos associados a este tipo')
            break;
        case "Sectors":
            NotificationErro('Erro | Exclusão', 'Não é possível excluir este Setor pois existem Usuários associados a ele')
            break;
        case "TiposUsuarios":
            NotificationErro('Erro | Exclusão', 'Não é possível excluir este Tipo pois existem Usuários associados a ele')
            break;
        case "Locais":
            NotificationErro('Erro | Exclusão', 'Não é possível excluir este Local pois existem Ativos associados a ele')
            break;
        case "StatusAtivos":
            NotificationErro('Erro | Exclusão', 'Não é possível excluir este Satus pois existem Ativos associados a ele')
            break;
        default:
            NotificationErro('Erro | Exclusão', 'Não é possível excluir este item pois existem outros itens associados a ele')
    }
}


export const GetNotificationSuccessMessageAdd = (Module) => {
    switch (Module) {
        case "TiposAtivos":
            NotificationSucesso('Tipo de Ativo', "Tipo de Ativo adicionado com sucesso!")
            break;
        case "TiposUso":
            NotificationSucesso('Tipo de Uso', "Tipo de Uso adicionado com sucesso!")
            break;
        case "Sectors":
            NotificationSucesso('Setor', "Setor adicionado com sucesso!")
            break;
        case "TiposUsuarios":
            NotificationSucesso('Tipo de Usuário', "Tipo de Usuário adicionado com sucesso!")
            break;
        case "Locais":
            NotificationSucesso('Local de Armazenamento', "Local de Armazenamento adicionado com sucesso!")
            break;
        case "StatusAtivos":
            NotificationSucesso('Status de Ativos', "Status adicionado com sucesso!")
            break;
        default:
            NotificationSucesso('Adição', 'Item adicionado com sucesso!')
    }
}

export const GetNotificationSuccessMessageChangeName = (Module) => {
    switch (Module) {
        case "TiposAtivos":
            NotificationSucesso('Tipo de Ativo', "Tipo de Ativo Alterado com sucesso!")
            break;
        case "TiposUso":
            NotificationSucesso('Tipo de Uso', "Tipo de Usp Alterado com sucesso!") 
            break;
        case "Sectors":
            NotificationSucesso('Setor', "Setor Alterado com sucesso!")
            break;
        case "TiposUsuarios":
            NotificationSucesso('Tipo de Usuário', "Tipo de Usuário Alterado com sucesso!")
            break;
        case "Locais":
            NotificationSucesso('Local de Armazenamento', "Local de Armazenamento Alterado com sucesso!")
            break;
        case "StatusAtivos":
            NotificationSucesso('Status de Ativo', "Status Alterado com sucesso!")
            break;
        default:
            NotificationSucesso('Adição', 'Item Alterado com sucesso!')
    }
}


export const GetNotificationSuccessMessageDelete = (Module) => {
    switch (Module) {
        case "TiposAtivos":
            NotificationSucesso('Tipo de Ativo', "Tipo de Ativo deletado com sucesso!")
            break;
        case "TiposUso":
            NotificationSucesso('Tipo de Uso', "Tipo de Uso deletado com sucesso!")
            break;
        case "Sectors":
            NotificationSucesso('Setor', "Setor deletado com sucesso!")
            break;
        case "TiposUsuarios":
            NotificationSucesso('Tipo de Usuário', "Tipo de Usuário deletado com sucesso!")
            break;
        case "Locais":
            NotificationSucesso('Local de Armazenamento', "Local de Armazenamento deletado com sucesso!")
            break;
        case "StatusAtivos":
            NotificationSucesso('Status de Ativo', "Status deletado com sucesso!")
            break;
        default:
            NotificationSucesso('Adição', 'Item deletado com sucesso!')
    }
}

export const GetNotificationExistsMessageAdd = (Module) => {
    switch (Module) {
        case "TiposAtivos":
            NotificationAlerta('Tipo de Ativo', "Este Tipo de Ativo já existe")
            break;
        case "TiposUso":
            NotificationAlerta('Tipo de Uso', "Este Tipo de Uso já existe")
            break;
        case "Sectors":
            NotificationAlerta('Setor', "Este Setor já existe")
            break;
        case "TiposUsuarios":
            NotificationAlerta('Tipo de Usuário', "Este Tipo de Usuário já existe")
            break;
        case "Locais":
            NotificationAlerta('Local de Armazenamento', "Este local item já existe")
            break;
        case "StatusAtivos":
            NotificationAlerta('Status de Ativo', "Este Status item já existe")
            break;
        default:
            NotificationAlerta('Adição', "Este item já existe")
    }
}





