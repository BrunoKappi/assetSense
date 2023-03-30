import { v4 as uuid, v4 } from 'uuid';


const Update = false
const Reset = false

//================== DEFAULTS PARA INICIAR ATIVOS ====================//
const DefaultAtivoType = { Id: '5c292f1a-1fc1-400b-b44c-ca0fa68458ad' }
const DefaultAtivoType2 = { Id: '9bff9e15-f30d-4287-891b-565389906a35' }
//LOCAIS
const DefaultStorageLocation = { Id: 'b21e3ca1-985a-4958-9d16-9ff68579c576' }
const DefaultStorageLocation1 = { Id: '59ca3189-70cb-451c-a597-4320e0bf158f' }
const DefaultStorageLocation2 = { Id: '24d50296-fb80-473a-9eaa-f2745341b148' }
//STATUS
const DefautltAtivoStatus1 = { Id: '693ae26e-399e-4a2f-a646-d6315fb9a516' }
const DefautltAtivoStatus2 = { Id: '144febcf-6a34-4c60-9166-1751ff5e8e6b' }
//USOS
const DefaultTipoUso = { Id: 'd0e718ac-9cdc-4d7a-ba00-711d68d2c108' }
const DefaultTipoUso2 = { Id: 'a481167c-76f4-4412-a8ca-2e7c2569533b' }
//================== DEFAULTS PARA INICIAR ATIVOS ====================// 

export const Items = [
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CONVERSOR USB SERIAL', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO PANEL VIEW PLUS 1000', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 2, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: '1747-NET-UIC', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'ROCKWELL SERIAL SLC-500/MICROLOGIX/CONTROLLOGIX', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'ROCKWELL SERIAL PLC-5', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation }, Item: 'SIEMENS LOGO!', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO MICROLOGIX DIN', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso2 } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'SIEMENS S7-200 RS-232 - PPI', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO S5 RS-232 - TTY', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus2 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'SIEMENS SINAMICS', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation }, Item: 'SIEMENS S7-200/300 RS-232 - PPI/MPI', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'PC Adapter', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'FONTE PC ADAPTER', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'PC CABLE SIMOCODE', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation }, Item: 'CONFIF PROSOFT', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus2 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO ALTUS AL-1342', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO ALTUS AL-1342', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO PANEL VIEW 500/600', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus2 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'SIEMENS S7-200 RS-232 - PPI', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'SIEMENS S7-200/300 RS-232 - PPI/MPI', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus2 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO PICCOLO', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO TCI S5-USB', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso2 } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CONVERSOR USB - RS485', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CONVERSOR UBS SERIAL TECNATRON', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CONVERSOR UBS SERIAL TECNATRON', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso2 } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation2 }, Item: 'CONVERSOR USB SERIAL ICP COM', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO OP7/17/27', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO RS-232 IHM HT 60', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO KLOCKNER MOELLER', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso2 } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'Cabo HDMI', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'Adaptador VGA-DP', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'Patch Cord', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int01', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int02', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso2 } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int03', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int04', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation2 }, Item: 'HD Externo SA_HdE_Int05', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus2 }, Usage: { ...DefaultTipoUso2 } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int06', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int07', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation2 }, Item: 'HD Externo SA_HdE_Int08', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus2 }, Usage: { ...DefaultTipoUso2 } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int09', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int10', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso2 } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int11', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation2 }, Item: 'HD Externo SA_HdE_Int12', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int13', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'Régua extensão', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { Deleted: false, Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation2 }, Item: 'Case HD externo 3.0', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
]


if (!localStorage.getItem('AssetSenseAtivos') || Update && !Reset) {
    localStorage.setItem('AssetSenseAtivos', JSON.stringify(Items))
} else if (Reset) {
    localStorage.setItem('AssetSenseAtivos', JSON.stringify([]))
}




//================== DEFAULTS PARA INICIAR USERS ====================//
//SETORES
const Integracao = { Id: '0e13d17c-082e-400b-bf25-6ed0aaec5d57' }
const Projeto = { Id: '9268f2f9-249f-433c-880a-7dcd0492a466' }
const RH = { Id: 'ad01ba2f-aa9a-47a2-a771-1fee98ef54a5' }
const Admin = { Id: 'ea05229e-658a-415a-bc23-62cebd0bbe96' }
//TIPOS 
const Funcionario = { Id: '8c25a156-04b7-479f-874f-b16e63383cbd' }
const TipoAdmin = { Id: '784c4def-b901-4883-b481-a4a6cf6dd070' }
// ESTADO CIDADE PAIS
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
//================== DEFAULTS PARA INICIAR USERS ====================//

export const Users = [
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Betina', LastName: 'Goldani', Email: 'betinagoldani@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...Admin } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Bruno', LastName: 'Kappi', Email: 'brunokappi@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...Integracao } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Cristiano', LastName: 'Melo', Email: 'cristianomelo@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Projeto } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Demétrius', LastName: 'Figueiredo', Email: 'demetriusfigueiredo@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Douglas', LastName: 'Pinheiro', Email: 'douglaspinheiro@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Ezequiel', LastName: 'Silva', Email: 'ezequielsilva@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Filipe', LastName: 'Dias', Email: 'filipedias@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Gabriel', LastName: 'Pedroso', Email: 'gabrielpedroso@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Gabrielle', LastName: 'Pintanel', Email: 'gabriellepintanel@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Henrique', LastName: 'Steigleder', Email: 'henriquesteigleder@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Júlia', LastName: 'Kist', Email: 'juliakist@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Júlia', LastName: 'Koch', Email: 'juliakoch@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Julio', LastName: 'Serrano', Email: 'julioserrano@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...Admin } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Karen', LastName: 'Kist', Email: 'adm@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...RH } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Lucas', LastName: 'Ferreira', Email: 'lucasferreira@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Lucas', LastName: 'Reis', Email: 'lucasreis@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Lucian', LastName: 'Silva', Email: 'luciansilva@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Luis', LastName: 'Pires', Email: 'luispires@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Luiz', LastName: 'Krug', Email: 'luizgustavokrug@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Marceli', LastName: 'Santos', Email: 'marcelisantos@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Marcelo', LastName: 'Eichenberg', Email: 'marceloeichenberg@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...Integracao } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Marcelo', LastName: 'Silva', Email: 'marcelosilva@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Marcio', LastName: 'Wentz', Email: 'marciowentz@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Mariana', Email: 'marianacoronel@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Marina', LastName: 'Muller', Email: 'marinamuller@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Matheus', LastName: 'Brum', Email: 'matheusbrum@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Projeto } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Matheus', LastName: 'Pedroso', Email: 'matheuspedroso@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Projeto } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Michel', LastName: 'Fagundes', Email: 'michelfagundes@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Projeto } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Moisés', LastName: 'Beck', Email: 'moisesbeck@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Nathan', LastName: 'Lopes', Email: 'nathanlopes@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Projeto } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Octávio', LastName: 'Brandão', Email: 'octaviobrandao@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Patrick', LastName: 'Souza', Email: 'patricksouza@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Sergio', LastName: 'Dutra', Email: 'sergiodutra@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...Projeto } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Silvia', LastName: 'Scheid', Email: 'silviascheid@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Susana', LastName: 'Santana', Email: 'susanasantana@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Tales', LastName: 'Calliero', Email: 'talescalliero@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...Integracao } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Tiago', LastName: 'Silva', Email: 'tiagosilva@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Valéria', LastName: 'Rex', Email: 'valeriarex@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Vera', LastName: 'Lucia Santos', Email: 'verasantos@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Administrador', LastName: 'Serrano', Email: 'admin@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...RH } }
]

export const UsersReset = [{ Deleted: false, Id: uuid(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Administrador', LastName: 'Serrano', Email: 'admin@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...RH } }]


if (!localStorage.getItem('AssetSenseUsers') || Update && !Reset) {
    localStorage.setItem('AssetSenseUsers', JSON.stringify(Users))
} else if (Reset) {
    localStorage.setItem('AssetSenseUsers', JSON.stringify(UsersReset)) //RESET
}







/// ==================== TIPOS DE ATIVOS =================== ///
export const ItemTypes = [
    { Id: '5c292f1a-1fc1-400b-b44c-ca0fa68458ad', Value: 'Cabo' },
    { Id: '9bff9e15-f30d-4287-891b-565389906a35', Value: 'Equipamento' }
]

export const ItemTypesReset = [{ Id: '5c292f1a-1fc1-400b-b44c-ca0fa68458ad', Value: 'Cabo' }]

if (!localStorage.getItem('AssetSenseTipos') || Update && !Reset) {
    localStorage.setItem('AssetSenseTipos', JSON.stringify(ItemTypes))
} else if (Reset) {
    localStorage.setItem('AssetSenseTipos', JSON.stringify(ItemTypesReset)) //RESET
}








/// ==================== SETORES  =================== ///
export const Setores = [
    { Id: '0e13d17c-082e-400b-bf25-6ed0aaec5d57', Value: 'Integração' },
    { Id: '9268f2f9-249f-433c-880a-7dcd0492a466', Value: 'Projeto' },
    { Id: 'ad01ba2f-aa9a-47a2-a771-1fee98ef54a5', Value: 'Administrativo' },
    { Id: 'ea05229e-658a-415a-bc23-62cebd0bbe96', Value: 'RH' },
]

export const SetoresReset = [{ Id: 'ad01ba2f-aa9a-47a2-a771-1fee98ef54a5', Value: 'Administrativo' }]

if (!localStorage.getItem('AssetSenseSetores') || Update && !Reset) {
    localStorage.setItem('AssetSenseSetores', JSON.stringify(Setores))
} else if (Reset) {
    localStorage.setItem('AssetSenseSetores', JSON.stringify(SetoresReset)) //RESET
}






/// ==================== LOCAIS DE ARMZANEMAMENTO =================== ///
export const LocaisDeArmazenamento = [
    { Id: 'b21e3ca1-985a-4958-9d16-9ff68579c576', Value: 'Armário da Integração' },
    { Id: '59ca3189-70cb-451c-a597-4320e0bf158f', Value: 'Armário Administrativo' },
    { Id: '24d50296-fb80-473a-9eaa-f2745341b148', Value: 'Projeto' }
]


export const LocaisDeArmazenamentoReset = [{ Id: 'b21e3ca1-985a-4958-9d16-9ff68579c576', Value: 'Armário' }]

if (!localStorage.getItem('AssetSenseLocaisArmazenamento') || Update && !Reset) {
    localStorage.setItem('AssetSenseLocaisArmazenamento', JSON.stringify(LocaisDeArmazenamento))
} else if (Reset) {
    localStorage.setItem('AssetSenseLocaisArmazenamento', JSON.stringify(LocaisDeArmazenamentoReset)) //RESET
}








/// ==================== STATUS DE ATIVOS =================== ///
export const AtivosStatus = [
    { Id: '693ae26e-399e-4a2f-a646-d6315fb9a516', Value: 'Em Funcionamento', CanTake: true },
    { Id: '144febcf-6a34-4c60-9166-1751ff5e8e6b', Value: 'Em Manutenção', CanTake: false }
]

export const DefaultAtivoStatus = { Id: '', Value: '', CanTake: true }

export const AtivosStatusReset = [
    { Id: '693ae26e-399e-4a2f-a646-d6315fb9a516', Value: 'Em Funcionamento', CanTake: true },
    { Id: '144febcf-6a34-4c60-9166-1751ff5e8e6b', Value: 'Em Manutenção', CanTake: false }
]
if (!localStorage.getItem('AssetSenseStatusAtivos') || Update && !Reset) {
    localStorage.setItem('AssetSenseStatusAtivos', JSON.stringify(AtivosStatus))
} else if (Reset) {
    localStorage.setItem('AssetSenseStatusAtivos', JSON.stringify(AtivosStatusReset)) //RESET
}





/// ==================== TIPOS DE USOS  =================== ///
export const TiposDeUso = [
    { Id: 'd0e718ac-9cdc-4d7a-ba00-711d68d2c108', Value: 'Uso contínuo' },
    { Id: 'a481167c-76f4-4412-a8ca-2e7c2569533b', Value: 'Uso momentâneo' },
    { Id: uuid(), Value: 'Uso compartilhado' },
    { Id: uuid(), Value: 'Uso pessoal' },
    { Id: uuid(), Value: 'Uso limitado' },
    { Id: uuid(), Value: 'Uso temporário' },
    { Id: uuid(), Value: 'Uso remoto' },
    { Id: uuid(), Value: 'Uso de treinamento' },
    { Id: uuid(), Value: 'Uso de manutenção' },
    { Id: uuid(), Value: 'Uso especializado' }
]

export const TiposDeUsoReset = [{ Id: 'd0e718ac-9cdc-4d7a-ba00-711d68d2c108', Value: 'Uso contínuo' }]


if (!localStorage.getItem('AssetSenseTiposDeUso') || Update && !Reset) {
    localStorage.setItem('AssetSenseTiposDeUso', JSON.stringify(TiposDeUso))
} else if (Reset) {
    localStorage.setItem('AssetSenseTiposDeUso', JSON.stringify(TiposDeUsoReset)) //RESET
}











/// ==================== TIPOS DE USUARIOS  =================== ///
const DefaultPermits = [false, true, true, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false]
const AdminPermis = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]


export const UserRoles = [
    { Id: '8c25a156-04b7-479f-874f-b16e63383cbd', Value: 'Funcionário', IsAdmin: false, Permits: DefaultPermits },
    { Id: '0e296e6a-345f-47ff-91f1-34cd6c1f20e3', Value: 'Cliente', IsAdmin: false, Permits: DefaultPermits },
    { Id: '784c4def-b901-4883-b481-a4a6cf6dd070', Value: 'Administrador', IsAdmin: true, Permits: AdminPermis },
    { Id: '0624b310-4d7a-4423-a342-0cc272c39d80', Value: 'Gerente', IsAdmin: true, Permits: AdminPermis }
]

export const UserRolesReset = [{ Id: '784c4def-b901-4883-b481-a4a6cf6dd070', Value: 'Administrador', IsAdmin: true }]
export const DefaultUserRole = { Id: '', Role: '', IsAdmin: false, Permits: [...DefaultPermits] }

if (!localStorage.getItem('AssetSenseUsersTypes') || Update && !Reset) {
    localStorage.setItem('AssetSenseUsersTypes', JSON.stringify(UserRoles))
} else if (Reset) {
    localStorage.setItem('AssetSenseUsersTypes', JSON.stringify(UserRoles)) //RESET
}







/// ==================== REGISTROS DE RETIRADA E DEVOLUÇÃO =================== ///
export const Records = []



if (!localStorage.getItem('AssetSenseRecords') || Update && !Reset) {
    localStorage.setItem('AssetSenseRecords', JSON.stringify(Records))
} else if (Reset) {
    localStorage.setItem('AssetSenseRecords', JSON.stringify(Records)) //RESET
}







//////////// ================================== DEFAULT ITENS ======================== ////////


export const DefaultUserType = { Id: '', Value: '' }
export const DefaultSetor = { Id: '', Value: '' }
export const DefaultLocal = { Id: '', Value: '' }
export const DefaultItemType = { Id: '', Value: '' }
export const DefaultAtivosType = { Id: '', Value: '' }


export const DefaultAtivo = {
    Id: uuid(),
    Item: '',
    Qtd: 1,
    Brand: '',
    StorageLocation: {
        Id: ''
    },
    Type: {
        Id: ''
    },
    Status: {
        Id: ''
    },
    Usage: {
        Id: ''
    },

}



export const DefaultRecord = {
    Id: '',
    AtivoId: '',
    TakeDate: '',
    Obs: '',
    ReturnObs: '',
    Duration: 0,
    TakenBy: {
        Id: ''
    },
    TakenFor: {
        Id: ''
    },
    Returned: false,
    ReturnDate: '',
    TakenForDeleted: false,
    TakenByDeleted: false,
    AtivoDeleted: false
}


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