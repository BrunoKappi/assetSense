import { v4 } from 'uuid';
import { FIREBASE_AddAtivo, FIREBASE_AddLocalArmazenamento, FIREBASE_AddSetor, FIREBASE_AddStatusAtivo, FIREBASE_AddTipoAtivo, FIREBASE_AddTipoUso, FIREBASE_AddTipoUsuario, FIREBASE_AddUsuario, FIREBASE_GetSetores } from './Config/firebase/metodos';


const Update = false
const Reset = false

const ADD_FIREBASE = false

console.log("TESTE")

//================== DEFAULTS PARA INICIAR ATIVOS ====================//
const DefaultAtivoType = { docID: '', id: '5c292f1a-1fc1-400b-b44c-ca0fa68458ad' }
const DefaultAtivoType2 = { docID: '', id: '9bff9e15-f30d-4287-891b-565389906a35' }
//LOCAIS
const DefaultStorageLocation = { docID: '', id: 'b21e3ca1-985a-4958-9d16-9ff68579c576' }
const DefaultStorageLocation1 = { docID: '', id: '59ca3189-70cb-451c-a597-4320e0bf158f' }
const DefaultStorageLocation2 = { docID: '', id: '24d50296-fb80-473a-9eaa-f2745341b148' }
//STATUS
const DefautltAtivoStatus1 = { docID: '', id: '693ae26e-399e-4a2f-a646-d6315fb9a516' }
const DefautltAtivoStatus2 = { docID: '', id: '144febcf-6a34-4c60-9166-1751ff5e8e6b' }
//USOS 
const DefaultTipoUso = { docID: '', id: 'd0e718ac-9cdc-4d7a-ba00-711d68d2c108' }
const DefaultTipoUso2 = { docID: '', id: 'a481167c-76f4-4412-a8ca-2e7c2569533b' }
//================== DEFAULTS PARA INICIAR ATIVOS ====================//  

export const Items = [
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CONVERSOR USB SERIAL', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO PANEL VIEW PLUS 1000', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 2, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: '1747-NET-UIC', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'ROCKWELL SERIAL SLC-500/MICROLOGIX/CONTROLLOGIX', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'ROCKWELL SERIAL PLC-5', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation }, Item: 'SIEMENS LOGO!', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO MICROLOGIX DIN', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso2 } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'SIEMENS S7-200 RS-232 - PPI', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO S5 RS-232 - TTY', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus2 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'SIEMENS SINAMICS', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation }, Item: 'SIEMENS S7-200/300 RS-232 - PPI/MPI', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'PC Adapter', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'FONTE PC ADAPTER', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'PC CABLE SIMOCODE', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation }, Item: 'CONFIF PROSOFT', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus2 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO ALTUS AL-1342', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO ALTUS AL-1342', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO PANEL VIEW 500/600', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus2 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'SIEMENS S7-200 RS-232 - PPI', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'SIEMENS S7-200/300 RS-232 - PPI/MPI', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus2 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO PICCOLO', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO TCI S5-USB', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso2 } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CONVERSOR USB - RS485', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CONVERSOR UBS SERIAL TECNATRON', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CONVERSOR UBS SERIAL TECNATRON', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso2 } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation2 }, Item: 'CONVERSOR USB SERIAL ICP COM', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO OP7/17/27', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO RS-232 IHM HT 60', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO KLOCKNER MOELLER', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso2 } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'Cabo HDMI', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'Adaptador VGA-DP', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'Patch Cord', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int01', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int02', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso2 } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int03', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int04', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation2 }, Item: 'HD Externo SA_HdE_Int05', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus2 }, Usage: { ...DefaultTipoUso2 } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int06', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int07', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation2 }, Item: 'HD Externo SA_HdE_Int08', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus2 }, Usage: { ...DefaultTipoUso2 } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int09', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int10', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso2 } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int11', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation2 }, Item: 'HD Externo SA_HdE_Int12', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int13', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'Régua extensão', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation2 }, Item: 'Case HD externo 3.0', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
]


if (!localStorage.getItem('AssetSenseAtivos') || Update && !Reset) {
    localStorage.setItem('AssetSenseAtivos', JSON.stringify(Items))
} else if (Reset) {
    localStorage.setItem('AssetSenseAtivos', JSON.stringify([]))
}


if (ADD_FIREBASE) {
    Items.forEach(Tipo => {
        FIREBASE_AddAtivo(Tipo).then((Document) => {
            console.log("Item Adicionado", Document)
        }).catch((erro) => {
            //COMENTADO  console.log("Erro", erro)
        })
    })
}


















//================== DEFAULTS PARA INICIAR USERS ====================//
//SETORES
const Integracao = { docID: '', id: '0e13d17c-082e-400b-bf25-6ed0aaec5d57' }
const Projeto = { docID: '', id: '9268f2f9-249f-433c-880a-7dcd0492a466' }
const RH = { docID: '', id: 'ad01ba2f-aa9a-47a2-a771-1fee98ef54a5' }
const Admin = { docID: '', id: 'ea05229e-658a-415a-bc23-62cebd0bbe96' }
//TIPOS 
const Funcionario = { docID: '', id: '8c25a156-04b7-479f-874f-b16e63383cbd' }
const TipoAdmin = { docID: '', id: '784c4def-b901-4883-b481-a4a6cf6dd070' }
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
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Betina', LastName: 'Goldani', Email: 'betinagoldani@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...Admin } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Bruno', LastName: 'Kappi', Email: 'brunokappi@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...Integracao } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Cristiano', LastName: 'Melo', Email: 'cristianomelo@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Projeto } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Demétrius', LastName: 'Figueiredo', Email: 'demetriusfigueiredo@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Douglas', LastName: 'Pinheiro', Email: 'douglaspinheiro@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Ezequiel', LastName: 'Silva', Email: 'ezequielsilva@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Filipe', LastName: 'Dias', Email: 'filipedias@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Gabriel', LastName: 'Pedroso', Email: 'gabrielpedroso@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Gabrielle', LastName: 'Pintanel', Email: 'gabriellepintanel@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Henrique', LastName: 'Steigleder', Email: 'henriquesteigleder@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Júlia', LastName: 'Kist', Email: 'juliakist@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Júlia', LastName: 'Koch', Email: 'juliakoch@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Julio', LastName: 'Serrano', Email: 'julioserrano@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...Admin } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Karen', LastName: 'Kist', Email: 'adm@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...RH } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Lucas', LastName: 'Ferreira', Email: 'lucasferreira@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Lucas', LastName: 'Reis', Email: 'lucasreis@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Lucian', LastName: 'Silva', Email: 'luciansilva@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Luis', LastName: 'Pires', Email: 'luispires@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Luiz', LastName: 'Krug', Email: 'luizgustavokrug@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Marceli', LastName: 'Santos', Email: 'marcelisantos@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Marcelo', LastName: 'Eichenberg', Email: 'marceloeichenberg@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...Integracao } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Marcelo', LastName: 'Silva', Email: 'marcelosilva@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Marcio', LastName: 'Wentz', Email: 'marciowentz@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Mariana', Email: 'marianacoronel@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Marina', LastName: 'Muller', Email: 'marinamuller@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Matheus', LastName: 'Brum', Email: 'matheusbrum@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Projeto } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Matheus', LastName: 'Pedroso', Email: 'matheuspedroso@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Projeto } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Michel', LastName: 'Fagundes', Email: 'michelfagundes@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Projeto } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Moisés', LastName: 'Beck', Email: 'moisesbeck@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Nathan', LastName: 'Lopes', Email: 'nathanlopes@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Projeto } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Octávio', LastName: 'Brandão', Email: 'octaviobrandao@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Patrick', LastName: 'Souza', Email: 'patricksouza@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Sergio', LastName: 'Dutra', Email: 'sergiodutra@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...Projeto } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Silvia', LastName: 'Scheid', Email: 'silviascheid@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Susana', LastName: 'Santana', Email: 'susanasantana@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Tales', LastName: 'Calliero', Email: 'talescalliero@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...Integracao } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Tiago', LastName: 'Silva', Email: 'tiagosilva@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Valéria', LastName: 'Rex', Email: 'valeriarex@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Vera', LastName: 'Lucia Santos', Email: 'verasantos@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Administrador', LastName: 'Serrano', Email: 'admin@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...RH } }
]

export const UsersReset = [{ Deleted: false, docID: '', id: v4(), Phone: '5551991918181', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, AccessToken: '1234', Name: 'Administrador', LastName: 'Serrano', Email: 'admin@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...RH } }]


if (!localStorage.getItem('AssetSenseUsers') || Update && !Reset) {
    localStorage.setItem('AssetSenseUsers', JSON.stringify(Users))
} else if (Reset) {
    localStorage.setItem('AssetSenseUsers', JSON.stringify(UsersReset)) //RESET
}


if (ADD_FIREBASE) {
    Users.forEach(Tipo => {
        FIREBASE_AddUsuario(Tipo).then((Document) => {
            console.log("Usuario adicionado", Document)
        }).catch((erro) => {
            //COMENTADO  console.log("Erro", erro)
        })
    })
}














/// ==================== TIPOS DE ATIVOS =================== ///
export const ItemTypes = [
    { docID: '', id: '5c292f1a-1fc1-400b-b44c-ca0fa68458ad', Value: 'Cabo' },
    { docID: '', id: '9bff9e15-f30d-4287-891b-565389906a35', Value: 'Equipamento' }
]

export const ItemTypesReset = [{ docID: '', id: '5c292f1a-1fc1-400b-b44c-ca0fa68458ad', Value: 'Cabo' }]

if (!localStorage.getItem('AssetSenseTipos') || Update && !Reset) {
    localStorage.setItem('AssetSenseTipos', JSON.stringify(ItemTypes))
} else if (Reset) {
    localStorage.setItem('AssetSenseTipos', JSON.stringify(ItemTypesReset)) //RESET
}


if (ADD_FIREBASE) {

    ItemTypes.forEach(Tipo => {
        FIREBASE_AddTipoAtivo(Tipo).then((Document) => {
            //COMENTADO  console.log("Tipo Adicionado", Document)
        }).catch((erro) => {
            //COMENTADO  console.log("Erro", erro)
        })
    })

}












/// ==================== SETORES  =================== ///
export const Setores = [
    { docID: '', id: '0e13d17c-082e-400b-bf25-6ed0aaec5d57', Value: 'Integração' },
    { docID: '', id: '9268f2f9-249f-433c-880a-7dcd0492a466', Value: 'Projeto' },
    { docID: '', id: 'ad01ba2f-aa9a-47a2-a771-1fee98ef54a5', Value: 'Administrativo' },
    { docID: '', id: 'ea05229e-658a-415a-bc23-62cebd0bbe96', Value: 'RH' },
]

export const SetoresReset = [{ docID: '', id: 'ad01ba2f-aa9a-47a2-a771-1fee98ef54a5', Value: 'Administrativo' }]

if (!localStorage.getItem('AssetSenseSetores') || Update && !Reset) {
    localStorage.setItem('AssetSenseSetores', JSON.stringify(Setores))
} else if (Reset) {
    localStorage.setItem('AssetSenseSetores', JSON.stringify(SetoresReset)) //RESET
}


if (ADD_FIREBASE) {
    Setores.forEach(async (Setor, INdex) => {
        await FIREBASE_AddSetor(Setor).then((Document) => {
            console.log("Setor Adicionado", Document)
        }).catch((erro) => {
            //COMENTADO  console.log("Erro", erro)
        })
    })
}


const logItemsWithDelay = async () => {
    for (const item of Setores) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(item);
    }
};

logItemsWithDelay();



/// ==================== LOCAIS DE ARMZANEMAMENTO =================== ///
export const LocaisDeArmazenamento = [
    { docID: '', id: 'b21e3ca1-985a-4958-9d16-9ff68579c576', Value: 'Armário da Integração' },
    { docID: '', id: '59ca3189-70cb-451c-a597-4320e0bf158f', Value: 'Armário Administrativo' },
    { docID: '', id: '24d50296-fb80-473a-9eaa-f2745341b148', Value: 'Projeto' }
]


export const LocaisDeArmazenamentoReset = [{ docID: '', id: 'b21e3ca1-985a-4958-9d16-9ff68579c576', Value: 'Armário' }]

if (!localStorage.getItem('AssetSenseLocaisArmazenamento') || Update && !Reset) {
    localStorage.setItem('AssetSenseLocaisArmazenamento', JSON.stringify(LocaisDeArmazenamento))
} else if (Reset) {
    localStorage.setItem('AssetSenseLocaisArmazenamento', JSON.stringify(LocaisDeArmazenamentoReset)) //RESET
}


if (ADD_FIREBASE) {

    LocaisDeArmazenamento.forEach(Tipo => {
        FIREBASE_AddLocalArmazenamento(Tipo).then((Document) => {
            //COMENTADO  console.log("Tipo Adicionado", Document)
        }).catch((erro) => {
            //COMENTADO  console.log("Erro", erro)
        })
    })

}















/// ==================== STATUS DE ATIVOS =================== ///
export const AtivosStatus = [
    { docID: '', id: '693ae26e-399e-4a2f-a646-d6315fb9a516', Value: 'Em Funcionamento', CanTake: true },
    { docID: '', id: '144febcf-6a34-4c60-9166-1751ff5e8e6b', Value: 'Em Manutenção', CanTake: false }
]

export const DefaultAtivoStatus = { docID: '', id: '', Value: '', CanTake: true }

export const AtivosStatusReset = [
    { docID: '', id: '693ae26e-399e-4a2f-a646-d6315fb9a516', Value: 'Em Funcionamento', CanTake: true },
    { docID: '', id: '144febcf-6a34-4c60-9166-1751ff5e8e6b', Value: 'Em Manutenção', CanTake: false }
]
if (!localStorage.getItem('AssetSenseStatusAtivos') || Update && !Reset) {
    localStorage.setItem('AssetSenseStatusAtivos', JSON.stringify(AtivosStatus))
} else if (Reset) {
    localStorage.setItem('AssetSenseStatusAtivos', JSON.stringify(AtivosStatusReset)) //RESET
}


if (ADD_FIREBASE) {

    AtivosStatus.forEach(Tipo => {
        FIREBASE_AddStatusAtivo(Tipo).then((Document) => {
            //COMENTADO  console.log("Tipo Adicionado", Document)
        }).catch((erro) => {
            //COMENTADO  console.log("Erro", erro)
        })
    })
}












/// ==================== TIPOS DE USOS  =================== ///
export const TiposDeUso = [
    { docID: '', id: 'd0e718ac-9cdc-4d7a-ba00-711d68d2c108', Value: 'Uso contínuo' },
    { docID: '', id: 'a481167c-76f4-4412-a8ca-2e7c2569533b', Value: 'Uso momentâneo' },
    { docID: '', id: v4(), Value: 'Uso compartilhado' },
    { docID: '', id: v4(), Value: 'Uso pessoal' },
    { docID: '', id: v4(), Value: 'Uso limitado' },
    { docID: '', id: v4(), Value: 'Uso temporário' },
    { docID: '', id: v4(), Value: 'Uso remoto' },
    { docID: '', id: v4(), Value: 'Uso de treinamento' },
    { docID: '', id: v4(), Value: 'Uso de manutenção' },
    { docID: '', id: v4(), Value: 'Uso especializado' }
]

export const TiposDeUsoReset = [{ docID: '', id: 'd0e718ac-9cdc-4d7a-ba00-711d68d2c108', Value: 'Uso contínuo' }]


if (!localStorage.getItem('AssetSenseTiposDeUso') || Update && !Reset) {
    localStorage.setItem('AssetSenseTiposDeUso', JSON.stringify(TiposDeUso))
} else if (Reset) {
    localStorage.setItem('AssetSenseTiposDeUso', JSON.stringify(TiposDeUsoReset)) //RESET
}


if (ADD_FIREBASE) {
    TiposDeUso.forEach(Tipo => {
        FIREBASE_AddTipoUso(Tipo).then((Document) => {
            //COMENTADO  console.log("Tipo Adicionado", Document)
        }).catch((erro) => {
            //COMENTADO  console.log("Erro", erro)
        })
    })

}







/// ==================== TIPOS DE USUARIOS  =================== ///
const DefaultPermits = [false, true, true, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false]
const AdminPermis = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]


export const UserRoles = [
    { docID: '', id: '8c25a156-04b7-479f-874f-b16e63383cbd', Value: 'Funcionário', IsAdmin: false, Permits: DefaultPermits },
    { docID: '', id: '0e296e6a-345f-47ff-91f1-34cd6c1f20e3', Value: 'Cliente', IsAdmin: false, Permits: DefaultPermits },
    { docID: '', id: '784c4def-b901-4883-b481-a4a6cf6dd070', Value: 'Administrador', IsAdmin: true, Permits: AdminPermis },
    { docID: '', id: '0624b310-4d7a-4423-a342-0cc272c39d80', Value: 'Gerente', IsAdmin: true, Permits: AdminPermis }
]

export const UserRolesReset = [{ docID: '', id: '784c4def-b901-4883-b481-a4a6cf6dd070', Value: 'Administrador', IsAdmin: true }]
export const DefaultUserRole = { docID: '', id: '', Role: '', IsAdmin: false, Permits: [...DefaultPermits] }

if (!localStorage.getItem('AssetSenseUsersTypes') || Update && !Reset) {
    localStorage.setItem('AssetSenseUsersTypes', JSON.stringify(UserRoles))
} else if (Reset) {
    localStorage.setItem('AssetSenseUsersTypes', JSON.stringify(UserRoles)) //RESET
}



if (ADD_FIREBASE) {

    UserRoles.forEach(Tipo => {
        FIREBASE_AddTipoUsuario(Tipo).then((Document) => {
            //COMENTADO  console.log("Tipo Adicionado", Document)
        }).catch((erro) => {
            //COMENTADO  console.log("Erro", erro)
        })
    })


}








/// ==================== REGISTROS DE RETIRADA E DEVOLUÇÃO =================== ///
export const Records = []



if (!localStorage.getItem('AssetSenseRecords') || Update && !Reset) {
    localStorage.setItem('AssetSenseRecords', JSON.stringify(Records))
} else if (Reset) {
    localStorage.setItem('AssetSenseRecords', JSON.stringify(Records)) //RESET
}







//////////// ================================== DEFAULT ITENS ======================== ////////


export const DefaultUserType = { docID: '', id: '', Value: '' }
export const DefaultSetor = { docID: '', id: '', Value: '' }
export const DefaultLocal = { docID: '', id: '', Value: '' }
export const DefaultItemType = { docID: '', id: '', Value: '' }
export const DefaultAtivosType = { docID: '', id: '', Value: '' }


export const DefaultAtivo = {
    docID: '',
    id: v4(),
    Item: '',
    Qtd: 1,
    Brand: '',
    StorageLocation: {
        id: ''
    },
    Type: {
        id: ''
    },
    Status: {
        id: ''
    },
    Usage: {
        id: ''
    },
    Deleted: false,

}






export const DefaultRecord = {
    docID: '', id: '',
    Ativoid: '',
    TakeDate: '',
    Obs: '',
    ReturnObs: '',
    Duration: 0,
    TakenBy: {
        docID: '', id: ''
    },
    TakenFor: {
        docID: '', id: ''
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
    docID: '',
    id: '',
    Phone: '',
    Estate: { name: '' },
    City: { name: '' },
    Country: { name: '' },
    AccessToken: '',
    Name: '',
    LastName: '',
    Email: '',
    Type: {
        docID: '', id: ''
    },
    Sector: {
        docID: '', id: ''
    },
    Deleted: false,

}