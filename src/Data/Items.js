import { v4 } from 'uuid';
import {
    FIREBASE_AddAtivo,
    FIREBASE_AddLocalArmazenamento,
    FIREBASE_AddSetor,
    FIREBASE_AddStatusAtivo,
    FIREBASE_AddTipoAtivo,
    FIREBASE_AddTipoUso,
    FIREBASE_AddTipoUsuario,
    FIREBASE_AddUsuario,
} from '../Config/firebase/metodos';
import moment from 'moment';

//COMANDOS LOCALSTORAGE
const Update = false
const Reset = false
const Nothing = true
 
//COMANDOS FIREBASE
const ADD_FIREBASE = false




//////////// ================================== DEFAULT ITENS ======================== ////////

const DefaultPermits = [false, true, true, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false]
const DefaultAdminPermis = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]


export const DefaultUserType = {
    LastEditedAt: moment().valueOf(),
    CreatedAt: moment().valueOf(),
    docID: '',
    id: '',
    Value: '',
    CustomFields: []
}
export const DefaultSetor = {
    LastEditedAt: moment().valueOf(),
    CreatedAt: moment().valueOf(),
    docID: '',
    id: '',
    Value: '',
    CustomFields: []
}
export const DefaultLocal = {
    LastEditedAt: moment().valueOf(),
    CreatedAt: moment().valueOf(),
    docID: '',
    id: '',
    Value: '',
    CustomFields: []
}
export const DefaultItemType = {
    LastEditedAt: moment().valueOf(),
    CreatedAt: moment().valueOf(),
    docID: '',
    id: '',
    Value: '',
    CustomFields: []
}
export const DefaultAtivosType = {
    LastEditedAt: moment().valueOf(),
    CreatedAt: moment().valueOf(),
    docID: '',
    id: '',
    Value: '',
    CustomFields: []
}


export const DefaultCustomField = {
    LastEditedAt: moment().valueOf(),
    CreatedAt: moment().valueOf(),
    id: v4(),
    Value: '',
}


export const DefaultAtivoStatus = {
    LastEditedAt: moment().valueOf(),
    CreatedAt: moment().valueOf(),
    docID: '',
    id: '',
    Value: '',
    CanTake: true,
    CustomFields: []
}


export const DefaultTipoDeUso = {
    LastEditedAt: moment().valueOf(),
    CreatedAt: moment().valueOf(),
    docID: '',
    id: '',
    Value: '',
    CustomFields: []
}




export const DefaultAtivo = {
    PhotoUrl : '',
    LastEditedAt: moment().valueOf(),
    CreatedBy: '',
    CreatedAt: moment().valueOf(),
    Price: 0,
    ResidualPrice: 0,
    Description: '', 
    Barcode: '',
    SerialNumber: '',
    Manufacturer: '',
    ManufacturingDate: 0,
    Model: '',
    Purchase: {
        WasPurchase: false,
        PurchaseDate: 0,
        Purchase: ''
    },
    docID: '',
    id: v4(),
    Item: '',
    QtdUsersUsing: 0,
    QtdInUse: 0,
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
    CustomFieldsValues:[]
}


export const DefaultRecord = {
    LastEditedAt: moment().valueOf(),
    CreatedAt: moment().valueOf(),
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
    AtivoDeleted: false,
    CustomFieldsValues:[]
}


// DEFAULT USER 
export const DefaultUser =
{
    PhotoUrl : '',
    LastEditedAt: moment().valueOf(),
    CreatedBy: '',
    CreatedAt: moment().valueOf(),
    LastLoginAt: 0,
    docID: '',
    id: '',
    Phone: '',
    Barcode: '',
    SecondaryPhone: '',
    Address: '',
    UserDocumentNumber: '',
    Preference: {
        Theme: '',
        Language: '',
        FontFamily: ''
    },
    DateOfBirth: 0,
    Estate: { name: '' },
    City: { name: '' },
    Country: { name: '' },
    AccessToken: '',
    Name: '',
    LastName: '',
    Email: '',
    DateJoinedCompany: 0,
    Type: {
        docID: '', id: ''
    },
    Sector: {
        docID: '', id: ''
    },
    Deleted: false,
    Wage: 0,
    SocialMedia: {
        Facebook: '',
        Instagram: '',
        Twitter: '',
        LinkedIn: '',
        TikTok: '',
        GitHub: ''
    },
    CustomFieldsValues:[]

}


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

export const DefaultUserRole = {
    LastEditedAt: moment().valueOf(),
    CreatedAt: moment().valueOf(),
    docID: '',
    id: '',
    Role: '',
    IsAdmin: false,
    Permits: [...DefaultPermits]
}

//================== DEFAULTS PARA INICIAR USERS ====================//
//SETORES
const Integracao = { id: '0e13d17c-082e-400b-bf25-6ed0aaec5d57' }
const Projeto = { id: '9268f2f9-249f-433c-880a-7dcd0492a466' }
const RH = { id: 'ad01ba2f-aa9a-47a2-a771-1fee98ef54a5' }
const Admin = { id: 'ea05229e-658a-415a-bc23-62cebd0bbe96' }
//TIPOS 
const Funcionario = { id: '8c25a156-04b7-479f-874f-b16e63383cbd' }
const TipoAdmin = { id: '784c4def-b901-4883-b481-a4a6cf6dd070' }
//================== DEFAULTS PARA INICIAR USERS ====================//




//================== DEFAULTS PARA INICIAR ATIVOS ====================//
const DefaultAtivoType = { id: '5c292f1a-1fc1-400b-b44c-ca0fa68458ad' }
const DefaultAtivoType2 = { id: '9bff9e15-f30d-4287-891b-565389906a35' }
//LOCAIS
const DefaultStorageLocation = { id: 'b21e3ca1-985a-4958-9d16-9ff68579c576' }
const DefaultStorageLocation1 = { id: '59ca3189-70cb-451c-a597-4320e0bf158f' }
const DefaultStorageLocation2 = { id: '24d50296-fb80-473a-9eaa-f2745341b148' }
//STATUS
const DefautltAtivoStatus1 = { id: '693ae26e-399e-4a2f-a646-d6315fb9a516' }
const DefautltAtivoStatus2 = { id: '144febcf-6a34-4c60-9166-1751ff5e8e6b' }
//USOS 
const DefaultTipoUso = { id: 'd0e718ac-9cdc-4d7a-ba00-711d68d2c108' }
const DefaultTipoUso2 = { id: 'a481167c-76f4-4412-a8ca-2e7c2569533b' }
//================== DEFAULTS PARA INICIAR ATIVOS ====================//  






/////////////////// RESETS //////////////////////

export const UsersReset = [{ Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Administrador', LastName: 'Serrano', Email: 'admin@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...RH } }]

export const ItemTypesReset = [{ docID: '', id: '5c292f1a-1fc1-400b-b44c-ca0fa68458ad', Value: 'Cabo' }]

export const UserRolesReset = [{ docID: '', id: '784c4def-b901-4883-b481-a4a6cf6dd070', Value: 'Administrador', IsAdmin: true }]
export const TiposDeUsoReset = [{ docID: '', id: 'd0e718ac-9cdc-4d7a-ba00-711d68d2c108', Value: 'Uso contínuo' }]
export const AtivosStatusReset = [
    {
        LastEditedAt: moment().valueOf(),
        CreatedAt: moment().valueOf(),
        docID: '',
        id: '693ae26e-399e-4a2f-a646-d6315fb9a516',
        Value: 'Em Funcionamento',
        CanTake: true
    },
    {
        LastEditedAt: moment().valueOf(),
        CreatedAt: moment().valueOf(),
        docID: '',
        id: '144febcf-6a34-4c60-9166-1751ff5e8e6b',
        Value: 'Em Manutenção',
        CanTake: false
    }
]

export const LocaisDeArmazenamentoReset = [{ docID: '', id: 'b21e3ca1-985a-4958-9d16-9ff68579c576', Value: 'Armário' }]
export const SetoresReset = [{ docID: '', id: 'ad01ba2f-aa9a-47a2-a771-1fee98ef54a5', Value: 'Administrativo' }]


/////////////////// RESETS //////////////////////











/////////// ATIVOS ////////////////
export const Items = [
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CONVERSOR USB SERIAL', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO PANEL VIEW PLUS 1000', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 2, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: '1747-NET-UIC', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'ROCKWELL SERIAL SLC-500/MICROLOGIX/CONTROLLOGIX', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'ROCKWELL SERIAL PLC-5', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation }, Item: 'SIEMENS LOGO!', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO MICROLOGIX DIN', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso2 } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'SIEMENS S7-200 RS-232 - PPI', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO S5 RS-232 - TTY', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus2 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'SIEMENS SINAMICS', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation }, Item: 'SIEMENS S7-200/300 RS-232 - PPI/MPI', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'PC Adapter', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'FONTE PC ADAPTER', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'PC CABLE SIMOCODE', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation }, Item: 'CONFIF PROSOFT', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus2 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO ALTUS AL-1342', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO PANEL VIEW 500/600', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus2 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'SIEMENS S7-200 RS-232 - PPI', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'SIEMENS S7-200/300 RS-232 - PPI/MPI', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus2 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO PICCOLO', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO TCI S5-USB', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso2 } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CONVERSOR USB - RS485', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CONVERSOR UBS SERIAL TECNATRON', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CONVERSOR UBS SERIAL TECNATRON', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso2 } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation2 }, Item: 'CONVERSOR USB SERIAL ICP COM', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO OP7/17/27', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO RS-232 IHM HT 60', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO KLOCKNER MOELLER', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso2 } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'Cabo HDMI', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'Adaptador VGA-DP', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'Patch Cord', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int01', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int02', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso2 } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int03', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int04', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation2 }, Item: 'HD Externo SA_HdE_Int05', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus2 }, Usage: { ...DefaultTipoUso2 } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int06', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int07', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation2 }, Item: 'HD Externo SA_HdE_Int08', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus2 }, Usage: { ...DefaultTipoUso2 } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int09', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int10', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso2 } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int11', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation2 }, Item: 'HD Externo SA_HdE_Int12', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int13', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'Régua extensão', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
    { ...DefaultAtivo, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', QtdPerUser: 1, Deleted: false, docID: '', id: v4(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation2 }, Item: 'Case HD externo 3.0', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Usage: { ...DefaultTipoUso } },
]
















export const Users = [
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Betina', LastName: 'Goldani', Email: 'betinagoldani@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...Admin } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Bruno', LastName: 'Kappi', Email: 'brunokappi@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...Integracao } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Cristiano', LastName: 'Melo', Email: 'cristianomelo@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Projeto } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Demétrius', LastName: 'Figueiredo', Email: 'demetriusfigueiredo@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Douglas', LastName: 'Pinheiro', Email: 'douglaspinheiro@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...Integracao } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Ezequiel', LastName: 'Silva', Email: 'ezequielsilva@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Filipe', LastName: 'Dias', Email: 'filipedias@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Gabriel', LastName: 'Pedroso', Email: 'gabrielpedroso@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Gabrielle', LastName: 'Pintanel', Email: 'gabriellepintanel@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Henrique', LastName: 'Steigleder', Email: 'henriquesteigleder@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Júlia', LastName: 'Kist', Email: 'juliakist@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Júlia', LastName: 'Koch', Email: 'juliakoch@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Julio', LastName: 'Serrano', Email: 'julioserrano@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...Admin } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Karen', LastName: 'Kist', Email: 'adm@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...RH } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Lucas', LastName: 'Ferreira', Email: 'lucasferreira@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Lucas', LastName: 'Reis', Email: 'lucasreis@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Lucian', LastName: 'Silva', Email: 'luciansilva@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Luis', LastName: 'Pires', Email: 'luispires@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Luiz', LastName: 'Krug', Email: 'luizgustavokrug@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Marceli', LastName: 'Santos', Email: 'marcelisantos@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Marcelo', LastName: 'Eichenberg', Email: 'marceloeichenberg@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...Integracao } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Marcelo', LastName: 'Silva', Email: 'marcelosilva@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Marcio', LastName: 'Wentz', Email: 'marciowentz@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Mariana', Email: 'marianacoronel@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Marina', LastName: 'Muller', Email: 'marinamuller@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Matheus', LastName: 'Brum', Email: 'matheusbrum@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Projeto } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Matheus', LastName: 'Pedroso', Email: 'matheuspedroso@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Projeto } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Michel', LastName: 'Fagundes', Email: 'michelfagundes@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Projeto } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Moisés', LastName: 'Beck', Email: 'moisesbeck@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Nathan', LastName: 'Lopes', Email: 'nathanlopes@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Projeto } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Octávio', LastName: 'Brandão', Email: 'octaviobrandao@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Patrick', LastName: 'Souza', Email: 'patricksouza@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Sergio', LastName: 'Dutra', Email: 'sergiodutra@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...Projeto } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Silvia', LastName: 'Scheid', Email: 'silviascheid@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Susana', LastName: 'Santana', Email: 'susanasantana@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Tales', LastName: 'Calliero', Email: 'talescalliero@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...Integracao } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Tiago', LastName: 'Silva', Email: 'tiagosilva@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Valéria', LastName: 'Rex', Email: 'valeriarex@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Vera', LastName: 'Lucia Santos', Email: 'verasantos@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, LastEditedAt: moment().valueOf(), CreatedAt: moment().valueOf(), PhotoUrl: '', uid: '', Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Administrador', LastName: 'Serrano', Email: 'admin@serranoautomacao.com.br', Type: { ...TipoAdmin }, Sector: { ...RH } }
]





















/// ==================== TIPOS DE ATIVOS =================== ///
export const ItemTypes = [
    {
        ...DefaultAtivosType,
        docID: '',
        id: '5c292f1a-1fc1-400b-b44c-ca0fa68458ad',
        Value: 'Cabo'
    },
    {
        ...DefaultAtivosType,
        docID: '',
        id: '9bff9e15-f30d-4287-891b-565389906a35',
        Value: 'Equipamento'
    }
]
/// ==================== TIPOS DE ATIVOS =================== ///















/// ==================== SETORES  =================== ///
export const Setores = [
    {
        ...DefaultSetor,
        docID: '',
        id: '0e13d17c-082e-400b-bf25-6ed0aaec5d57',
        Value: 'Integração'
    },
    {
        ...DefaultSetor,
        docID: '',
        id: '9268f2f9-249f-433c-880a-7dcd0492a466',
        Value: 'Projeto'
    },
    {
        ...DefaultSetor,
        docID: '',
        id: 'ad01ba2f-aa9a-47a2-a771-1fee98ef54a5',
        Value: 'Administrativo'
    },
    {
        ...DefaultSetor,
        docID: '',
        id: 'ea05229e-658a-415a-bc23-62cebd0bbe96',
        Value: 'RH'
    },
]

/// ==================== SETORES  =================== ///








/// ==================== LOCAIS DE ARMZANEMAMENTO =================== ///
export const LocaisDeArmazenamento = [
    {
        ...DefaultLocal,
        docID: '',
        id: 'b21e3ca1-985a-4958-9d16-9ff68579c576',
        Value: 'Armário da Integração'
    }
    ,
    {
        ...DefaultLocal,
        docID: '',
        id: '59ca3189-70cb-451c-a597-4320e0bf158f',
        Value: 'Armário Administrativo'
    }
    ,
    {
        ...DefaultLocal,
        docID: '',
        id: '24d50296-fb80-473a-9eaa-f2745341b148',
        Value: 'Projeto'
    }
]
/// ==================== LOCAIS DE ARMZANEMAMENTO =================== ///






















/// ==================== STATUS DE ATIVOS =================== ///
export const AtivosStatus = [
    {
        ...DefaultAtivoStatus,
        docID: '',
        id: '693ae26e-399e-4a2f-a646-d6315fb9a516',
        Value: 'Em Funcionamento',
        CanTake: true
    }
    ,
    {
        ...DefaultAtivoStatus,
        docID: '',
        id: '144febcf-6a34-4c60-9166-1751ff5e8e6b',
        Value: 'Em Manutenção',
        CanTake: false
    }
]


















/// ==================== TIPOS DE USOS  =================== ///
export const TiposDeUso = [
    {
        ...DefaultTipoDeUso,
        docID: '',
        id: 'd0e718ac-9cdc-4d7a-ba00-711d68d2c108',
        Value: 'Uso contínuo'
    },
    {
        ...DefaultTipoDeUso,
        docID: '',
        id: 'a481167c-76f4-4412-a8ca-2e7c2569533b',
        Value: 'Uso momentâneo'
    },
    {
        ...DefaultTipoDeUso,
        docID: '',
        id: v4(),
        Value: 'Uso compartilhado'
    },
    {
        ...DefaultTipoDeUso,
        docID: '',
        id: v4(),
        Value: 'Uso pessoal'
    },
    {
        ...DefaultTipoDeUso,
        docID: '',
        id: v4(),
        Value: 'Uso limitado'
    },
    {
        ...DefaultTipoDeUso,
        docID: '',
        id: v4(),
        Value: 'Uso temporário'
    },
    {
        ...DefaultTipoDeUso,
        docID: '',
        id: v4(),
        Value: 'Uso remoto'
    },
    {
        ...DefaultTipoDeUso,
        docID: '',
        id: v4(),
        Value: 'Uso de treinamento'
    },
    {
        ...DefaultTipoDeUso,
        docID: '',
        id: v4(),
        Value: 'Uso de manutenção'
    },
    {
        ...DefaultTipoDeUso,
        docID: '',
        id: v4(),
        Value: 'Uso especializado'
    }
]












/// ==================== TIPOS DE USUARIOS  =================== ///



export const UserRoles = [
    {
        ...DefaultUserType,
        docID: '',
        id: '8c25a156-04b7-479f-874f-b16e63383cbd',
        Value: 'Colaborador',
        IsAdmin: false,
        Permits: DefaultPermits
    },
    {
        ...DefaultUserType,
        docID: '',
        id: '0e296e6a-345f-47ff-91f1-34cd6c1f20e3',
        Value: 'Cliente',
        IsAdmin: false,
        Permits: DefaultPermits
    },
    {
        ...DefaultUserType,
        docID: '',
        id: '784c4def-b901-4883-b481-a4a6cf6dd070',
        Value: 'Administrador',
        IsAdmin: true,
        Permits: DefaultAdminPermis
    },
    {
        ...DefaultUserType,
        docID: '',
        id: '0624b310-4d7a-4423-a342-0cc272c39d80',
        Value: 'Gerente',
        IsAdmin: true,
        Permits: DefaultAdminPermis
    }
]














/// ==================== REGISTROS DE RETIRADA E DEVOLUÇÃO =================== ///
export const Records = []






















/////////////////// ADD FIREBASE ///////////////////////////



//TIPO SDE USUARIOS
if (ADD_FIREBASE) {
    UserRoles.forEach(Tipo => {
        FIREBASE_AddTipoUsuario(Tipo).then((Document) => {
            console.log("Tipo Usuario Adicionado", Document)
        }).catch((erro) => {
            console.log("Erro", erro)
        })
    })
}

//ATIVOS
if (ADD_FIREBASE) {
    Items.forEach(Tipo => {
        FIREBASE_AddAtivo(Tipo).then((Document) => {
            console.log("Item Adicionado", Document)
        }).catch((erro) => {
            console.log("Erro", erro)
        })
    })
}

// USUARIOS
if (ADD_FIREBASE) {
    Users.forEach(Tipo => {
        FIREBASE_AddUsuario(Tipo).then((Document) => {
            console.log("Usuario adicionado", Document)
        }).catch((erro) => {
            console.log("Erro", erro)
        })
    })
}

//TIPOS DE ATIVOS
if (ADD_FIREBASE) {
    ItemTypes.forEach(Tipo => {
        FIREBASE_AddTipoAtivo(Tipo).then((Document) => {
            console.log("Tipo Adicionado", Document)
        }).catch((erro) => {
            console.log("Erro", erro)
        })
    })
}

//SETORES
if (ADD_FIREBASE) {
    Setores.forEach(Setor => {
        FIREBASE_AddSetor(Setor).then((Document) => {
            console.log("Setor Adicionado", Document)
        }).catch((erro) => {
            console.log("Erro", erro)
        })
    })
}

//LOCAIS 
if (ADD_FIREBASE) {
    LocaisDeArmazenamento.forEach(Tipo => {
        FIREBASE_AddLocalArmazenamento(Tipo).then((Document) => {
            console.log("Local Adicionado", Document)
        }).catch((erro) => {
            console.log("Erro", erro)
        })
    })
}

//STATUS
if (ADD_FIREBASE) {
    AtivosStatus.forEach(Tipo => {
        FIREBASE_AddStatusAtivo(Tipo).then((Document) => {
            console.log("Status Adicionado", Document)
        }).catch((erro) => {
            console.log("Erro", erro)
        })
    })
}

//TIPOS DE USO
if (ADD_FIREBASE) {
    TiposDeUso.forEach(Tipo => {
        FIREBASE_AddTipoUso(Tipo).then((Document) => {
            console.log("Tipo Adicionado", Document)
        }).catch((erro) => {
            console.log("Erro", erro)
        })
    })
}





/////////////////// ADD FIREBASE ///////////////////////////












///////////////////////////// LOCALSTORAGE /////////////////////


//RECORDS
if ((!localStorage.getItem('AssetSenseRecords') || Update) && !Reset && !Nothing) {
    localStorage.setItem('AssetSenseRecords', JSON.stringify(Records))
} else if (Reset) {
    localStorage.setItem('AssetSenseRecords', JSON.stringify(Records)) //RESET
}

//USER TYPES
if ((!localStorage.getItem('AssetSenseUsersTypes') || Update) && !Reset && !Nothing) {
    localStorage.setItem('AssetSenseUsersTypes', JSON.stringify(UserRoles))
} else if (Reset) {
    localStorage.setItem('AssetSenseUsersTypes', JSON.stringify(UserRoles)) //RESET
}

//STATUS ATIVOS
if ((!localStorage.getItem('AssetSenseStatusAtivos') || Update) && !Reset && !Nothing) {
    localStorage.setItem('AssetSenseStatusAtivos', JSON.stringify(AtivosStatus))
} else if (Reset) {
    localStorage.setItem('AssetSenseStatusAtivos', JSON.stringify(AtivosStatusReset)) //RESET
}


// TIPOS DE USO
if ((!localStorage.getItem('AssetSenseTiposDeUso') || Update) && !Reset && !Nothing) {
    localStorage.setItem('AssetSenseTiposDeUso', JSON.stringify(TiposDeUso))
} else if (Reset) {
    localStorage.setItem('AssetSenseTiposDeUso', JSON.stringify(TiposDeUsoReset)) //RESET
}

// SETORES
if ((!localStorage.getItem('AssetSenseSetores') || Update) && !Reset && !Nothing) {
    localStorage.setItem('AssetSenseSetores', JSON.stringify(Setores))
} else if (Reset) {
    localStorage.setItem('AssetSenseSetores', JSON.stringify(SetoresReset)) //RESET
}

if ((!localStorage.getItem('AssetSenseUsers') || Update) && !Reset && !Nothing) {
    localStorage.setItem('AssetSenseUsers', JSON.stringify(Users))
} else if (Reset) {
    localStorage.setItem('AssetSenseUsers', JSON.stringify(UsersReset)) //RESET
}

//TIPOS DE ATIVOS
if ((!localStorage.getItem('AssetSenseTipos') || Update) && !Reset && !Nothing) {
    localStorage.setItem('AssetSenseTipos', JSON.stringify(ItemTypes))
} else if (Reset) {
    localStorage.setItem('AssetSenseTipos', JSON.stringify(ItemTypesReset)) //RESET
}

//ATIVOS
if ((!localStorage.getItem('AssetSenseAtivos') || Update) && !Reset && !Nothing) {
    localStorage.setItem('AssetSenseAtivos', JSON.stringify(Items))
} else if (Reset) {
    localStorage.setItem('AssetSenseAtivos', JSON.stringify([]))
}

if ((!localStorage.getItem('AssetSenseLocaisArmazenamento') || Update) && !Reset && !Nothing) {
    localStorage.setItem('AssetSenseLocaisArmazenamento', JSON.stringify(LocaisDeArmazenamento))
} else if (Reset) {
    localStorage.setItem('AssetSenseLocaisArmazenamento', JSON.stringify(LocaisDeArmazenamentoReset)) //RESET
}