import { uuidv4 as uuid } from "@firebase/util"

const Integracao = { Id: '0e13d17c-082e-400b-bf25-6ed0aaec5d57' }
const Projeto = { Id: '9268f2f9-249f-433c-880a-7dcd0492a466' }
const RH = { Id: 'ad01ba2f-aa9a-47a2-a771-1fee98ef54a5' }
const Admin = { Id: 'ea05229e-658a-415a-bc23-62cebd0bbe96' }


const Funcionario = { Id: '8c25a156-04b7-479f-874f-b16e63383cbd' }
const TipoAdmin = { Id: '784c4def-b901-4883-b481-a4a6cf6dd070' }



const DefaultCountry = {
    currency: "BRL",
    flag: "🇧🇷",
    isoCode: "BR",
    latitude: "-10.00000000",
    longitude: "-55.00000000",
    name: "Brazil",
    phonecode: "55"
}

const DefaultEstate = {
    countryCode: "BR",
    isoCode: "RS",
    latitude: "-30.03463160",
    longitude: "-51.21769860",
    name: "Rio Grande do Sul",
}
const DefaultCity = {
    countryCode: "BR",
    latitude: "-30.03283000",
    longitude: "-51.23019000",
    name: "Porto Alegre",
    stateCode: "RS",
}


export const Users = [
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Betina', LastName: 'Goldani', Email: 'betinagoldani@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...Admin } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Bruno', LastName: 'Kappi', Email: 'brunokappi@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...Integracao } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Cristiano', LastName: 'Melo', Email: 'cristianomelo@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Projeto } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Demétrius', LastName: 'Figueiredo', Email: 'demetriusfigueiredo@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Douglas', LastName: 'Pinheiro', Email: 'douglaspinheiro@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Ezequiel', LastName: 'Silva', Email: 'ezequielsilva@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Filipe', LastName: 'Dias', Email: 'filipedias@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Gabriel', LastName: 'Pedroso', Email: 'gabrielpedroso@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Gabrielle', LastName: 'Pintanel', Email: 'gabriellepintanel@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Henrique', LastName: 'Steigleder', Email: 'henriquesteigleder@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Júlia', LastName: 'Kist', Email: 'juliakist@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Júlia', LastName: 'Koch', Email: 'juliakoch@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Julio', LastName: 'Serrano', Email: 'julioserrano@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...Admin } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Karen', LastName: 'Kist', Email: 'adm@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...RH } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Lucas', LastName: 'Ferreira', Email: 'lucasferreira@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Lucas', LastName: 'Reis', Email: 'lucasreis@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Lucian', LastName: 'Silva', Email: 'luciansilva@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Luis', LastName: 'Pires', Email: 'luispires@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Luiz', LastName: 'Krug', Email: 'luizgustavokrug@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Marceli', LastName: 'Santos', Email: 'marcelisantos@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Marcelo', LastName: 'Eichenberg', Email: 'marceloeichenberg@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...Integracao } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Marcelo', LastName: 'Silva', Email: 'marcelosilva@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Marcio', LastName: 'Wentz', Email: 'marciowentz@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Mariana', Email: 'marianacoronel@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Marina', LastName: 'Muller', Email: 'marinamuller@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Matheus', LastName: 'Brum', Email: 'matheusbrum@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Projeto } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Matheus', LastName: 'Pedroso', Email: 'matheuspedroso@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Projeto } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Michel', LastName: 'Fagundes', Email: 'michelfagundes@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Projeto } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Moisés', LastName: 'Beck', Email: 'moisesbeck@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Nathan', LastName: 'Lopes', Email: 'nathanlopes@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Projeto } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Octávio', LastName: 'Brandão', Email: 'octaviobrandao@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Patrick', LastName: 'Souza', Email: 'patricksouza@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Sergio', LastName: 'Dutra', Email: 'sergiodutra@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...Projeto } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Silvia', LastName: 'Scheid', Email: 'silviascheid@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Susana', LastName: 'Santana', Email: 'susanasantana@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Tales', LastName: 'Calliero', Email: 'talescalliero@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...Integracao } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Tiago', LastName: 'Silva', Email: 'tiagosilva@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Valéria', LastName: 'Rex', Email: 'valeriarex@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Vera', LastName: 'Lucia Santos', Email: 'verasantos@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Administrador', LastName: 'Serrano', Email: 'admin@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...RH } }
]


export const UsersReset = [{ Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Administrador', LastName: 'Serrano', Email: 'admin@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...RH } }]


if (!localStorage.getItem('AssetSenseUsers')) {
    localStorage.setItem('AssetSenseUsers', JSON.stringify(Users))
}
////localStorage.setItem('AssetSenseUsers', JSON.stringify(UsersReset)) //RESET






const DefaultPermits = [false, true, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false]
const AdminPermis = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]


export const UserRoles = [
    { Id: '8c25a156-04b7-479f-874f-b16e63383cbd', Value: 'Funcionário', IsAdmin: false, Permits: DefaultPermits },
    { Id: '0e296e6a-345f-47ff-91f1-34cd6c1f20e3', Value: 'Cliente', IsAdmin: false, Permits: DefaultPermits },
    { Id: '784c4def-b901-4883-b481-a4a6cf6dd070', Value: 'Administrador', IsAdmin: true, Permits: AdminPermis },
    { Id: '0624b310-4d7a-4423-a342-0cc272c39d80', Value: 'Gerente', IsAdmin: true, Permits: AdminPermis }
]

export const UserRolesReset = [{ Id: '784c4def-b901-4883-b481-a4a6cf6dd070', Value: 'Administrador', IsAdmin: true }]


export const DefaultUserRole = { Id: '', Role: '', IsAdmin: false, Permits: [...DefaultPermits] }

if (!localStorage.getItem('AssetSenseUsersTypes')) {
    localStorage.setItem('AssetSenseUsersTypes', JSON.stringify(UserRoles))
}
////localStorage.setItem('AssetSenseUsersTypes', JSON.stringify(UserRolesReset)) //RESET








//////////// ================================== DEFAULT ITENS ======================== ////////


// DEFAULT USER 
export const DefaultUser =
{
    Id: '',
    Phone: '',
    Estate: { name: '' },
    City: { name: '' },
    Country: { name: '' },
    AccessToken: '',
    Name: '',
    LastName: '',
    Email: '',
    Type: {
        Id: ''
    },
    Sector: {
        Id: ''
    },

}