import { v4 } from 'uuid';
import moment from 'moment';
import { AddToFirebaseFunctions } from '../Functions/DatabaseMiddleware';
import { FIREBASE_Add } from '../Config/firebase/metodos2';


//COMANDOS LOCALSTORAGE
const Update = false
const Reset = false
const Nothing = true

//COMANDOS FIREBASE
const ADD_FIREBASE = false




//////////// ================================== DEFAULT ITENS ======================== ////////

const DefaultPermits = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
const DefaultAdminPermis = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]


export const DefaultUserType = {
    LastEditedAt: moment().valueOf(),
    CreatedAt: moment().valueOf(),
    docID: '',
    id: '',
    Value: '',
    CustomFields: []
}
export const DefaultSector = {
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

export const DefaultRequestType = {
    LastEditedAt: moment().valueOf(),
    CreatedAt: moment().valueOf(),
    docID: '',
    id: '',
    Value: '',
    CustomFields: []
}

export const DefaultRequestStatus = {
    LastEditedAt: moment().valueOf(),
    CreatedAt: moment().valueOf(),
    docID: '',
    id: '',
    Value: '',
    CustomFields: [],
    DefaultStatus: false,
    Color: '#2b5aa6'
}



export const DefaultAssetsType = {
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


export const DefaultAssetStatus = {
    LastEditedAt: moment().valueOf(),
    CreatedAt: moment().valueOf(),
    docID: '',
    id: '',
    Value: '',
    CanTake: true,
    CustomFields: []
}


export const DefaultTypeDeUso = {
    LastEditedAt: moment().valueOf(),
    CreatedAt: moment().valueOf(),
    docID: '',
    id: '',
    Value: '',
    CustomFields: []
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




export const DefaultAsset = {
    PhotoUrl: '',
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
    CustomFieldsValues: [],
    QtdPerUser: 1,
}


export const DefaultRecord = {
    LastEditedAt: moment().valueOf(),
    CreatedAt: moment().valueOf(),
    docID: '', id: '',
    Assetid: '',
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
    AssetDeleted: false,
    CustomFieldsValues: []
}


export const DefaultRequestMessage = {
    CreatedAt: moment().valueOf(),
    CreatedBy: '',
    Message: ''
}


export const DefaultRequest = {
    LastEditedAt: moment().valueOf(),
    LasEditedBy: '',
    CreatedAt: moment().valueOf(),
    CreatedBy: '',
    CreatedByEmail: '',
    AssetId: '',
    UserId: '',
    docID: '',
    id: '',
    Title: '',
    Desc: '',
    Sector: { id: '' },
    Type: { id: '' },
    Status: {
        id: ''
    },
    Messages: []
}


// DEFAULT USER 
export const DefaultUser =
{
    PhotoUrl: '',
    LastEditedAt: '',
    CreatedBy: '',
    CreatedAt: '',
    LastLoginAt: 0,
    docID: '',
    id: v4(),
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
    CustomFieldsValues: [],
    PhotoUrl: '',
    uid: '',
    Deleted: false,
    docID: '',
    Country: { ...DefaultCountry },
    Estate: { ...DefaultEstate },
    City: { ...DefaultCity },
    Phone: '',
    QtdAssets: 0,
    Status: {
        id: ''
    },
    Tenant: {
        id: import.meta.env.VITE_REACT_TENANT_ID,
        Name: import.meta.env.VITE_REACT_TENANT_NAME
    }
}




export const DefaultUserRole = {
    LastEditedAt: '',
    CreatedAt: '',
    docID: '',
    id: '',
    Role: '',
    IsAdmin: false,
    Permits: [...DefaultPermits]
}

//================== DEFAULTS PARA INICIAR USERS ====================//
//SECTORS
const Integracao = { id: '0e13d17c-082e-400b-bf25-6ed0aaec5d57' }
const Projeto = { id: '9268f2f9-249f-433c-880a-7dcd0492a466' }
const RH = { id: 'ad01ba2f-aa9a-47a2-a771-1fee98ef54a5' }
const Admin = { id: 'ea05229e-658a-415a-bc23-62cebd0bbe96' }
//TYPES 
const Funcionario = { id: '8c25a156-04b7-479f-874f-b16e63383cbd' }
const TypeAdmin = { id: '784c4def-b901-4883-b481-a4a6cf6dd070' }
//================== DEFAULTS PARA INICIAR USERS ====================//




//================== DEFAULTS PARA INICIAR ASSETS ====================//
const DefaultAssetType = { id: '5c292f1a-1fc1-400b-b44c-ca0fa68458ad' }
const DefaultAssetType2 = { id: '9bff9e15-f30d-4287-891b-565389906a35' }
//STORAGELOCATIONS
const DefaultStorageLocation = { id: 'b21e3ca1-985a-4958-9d16-9ff68579c576' }
const DefaultStorageLocation1 = { id: '59ca3189-70cb-451c-a597-4320e0bf158f' }
const DefaultStorageLocation2 = { id: '24d50296-fb80-473a-9eaa-f2745341b148' }
//STATUS
const DefautltAssetStatus1 = { id: '693ae26e-399e-4a2f-a646-d6315fb9a516' }
const DefautltAssetStatus2 = { id: '144febcf-6a34-4c60-9166-1751ff5e8e6b' }
//USOS 
const DefaultTypeUso = { id: 'd0e718ac-9cdc-4d7a-ba00-711d68d2c108' }
const DefaultTypeUso2 = { id: 'a481167c-76f4-4412-a8ca-2e7c2569533b' }
//================== DEFAULTS PARA INICIAR ASSETS ====================//  






/////////////////// RESETS //////////////////////

export const UsersReset = [{ Deleted: false, docID: '', id: v4(), Phone: '555199999999', Country: { ...DefaultCountry }, Estate: { ...DefaultEstate }, City: { ...DefaultCity }, Name: 'Administrador', LastName: 'Serrano', Email: 'admin@serranoautomacao.com.br', Type: { ...TypeAdmin }, Sector: { ...RH } }]

export const ItemTypesReset = [{ docID: '', id: '5c292f1a-1fc1-400b-b44c-ca0fa68458ad', Value: 'Cabo' }]

export const UserRolesReset = [{ docID: '', id: '784c4def-b901-4883-b481-a4a6cf6dd070', Value: 'Administrador', IsAdmin: true }]
export const UsageTypesReset = [{ docID: '', id: 'd0e718ac-9cdc-4d7a-ba00-711d68d2c108', Value: 'Uso contínuo' }]
export const AssetsStatusReset = [
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

export const StorageLocationsDeArmazenamentoReset = [{ docID: '', id: 'b21e3ca1-985a-4958-9d16-9ff68579c576', Value: 'Armário' }]
export const SectorsReset = [{ docID: '', id: 'ad01ba2f-aa9a-47a2-a771-1fee98ef54a5', Value: 'Administrasset' }]


/////////////////// RESETS //////////////////////











/////////// ASSETS ////////////////
export const Items = [
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CONVERSOR USB SERIAL', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO PANEL VIEW PLUS 1000', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: '1747-NET-UIC', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'ROCKWELL SERIAL SLC-500/MICROLOGIX/CONTROLLOGIX', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'ROCKWELL SERIAL PLC-5', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation }, Item: 'SIEMENS LOGO!', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO MICROLOGIX DIN', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso2 } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'SIEMENS S7-200 RS-232 - PPI', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO S5 RS-232 - TTY', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus2 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'SIEMENS SINAMICS', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation }, Item: 'SIEMENS S7-200/300 RS-232 - PPI/MPI', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'PC Adapter', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'FONTE PC ADAPTER', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'PC CABLE SIMOCODE', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation }, Item: 'CONFIF PROSOFT', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus2 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO ALTUS AL-1342', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO PANEL VIEW 500/600', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus2 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'SIEMENS S7-200 RS-232 - PPI', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'SIEMENS S7-200/300 RS-232 - PPI/MPI', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus2 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO PICCOLO', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO TCI S5-USB', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso2 } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CONVERSOR USB - RS485', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CONVERSOR UBS SERIAL TECNATRON', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CONVERSOR UBS SERIAL TECNATRON', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso2 } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation2 }, Item: 'CONVERSOR USB SERIAL ICP COM', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO OP7/17/27', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO RS-232 IHM HT 60', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO KLOCKNER MOELLER', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso2 } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'Cabo HDMI', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'Adaptador VGA-DP', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'Patch Cord', Type: { ...DefaultAssetType }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int01', Type: { ...DefaultAssetType2 }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int02', Type: { ...DefaultAssetType2 }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso2 } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int03', Type: { ...DefaultAssetType2 }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int04', Type: { ...DefaultAssetType2 }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation2 }, Item: 'HD Externo SA_HdE_Int05', Type: { ...DefaultAssetType2 }, Status: { ...DefautltAssetStatus2 }, Usage: { ...DefaultTypeUso2 } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int06', Type: { ...DefaultAssetType2 }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int07', Type: { ...DefaultAssetType2 }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation2 }, Item: 'HD Externo SA_HdE_Int08', Type: { ...DefaultAssetType2 }, Status: { ...DefautltAssetStatus2 }, Usage: { ...DefaultTypeUso2 } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int09', Type: { ...DefaultAssetType2 }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int10', Type: { ...DefaultAssetType2 }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso2 } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int11', Type: { ...DefaultAssetType2 }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation2 }, Item: 'HD Externo SA_HdE_Int12', Type: { ...DefaultAssetType2 }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int13', Type: { ...DefaultAssetType2 }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation1 }, Item: 'Régua extensão', Type: { ...DefaultAssetType2 }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
    { ...DefaultAsset, StorageLocation: { ...DefaultStorageLocation2 }, Item: 'Case HD externo 3.0', Type: { ...DefaultAssetType2 }, Status: { ...DefautltAssetStatus1 }, Usage: { ...DefaultTypeUso } },
]
















export const Users = [
    { ...DefaultUser, Name: 'Betina', LastName: 'Goldani', Email: 'betinagoldani@serranoautomacao.com.br', Type: { ...TypeAdmin }, Sector: { ...Admin } },
    { ...DefaultUser, Name: 'Bruno', LastName: 'Kappi', Email: 'brunokappi@serranoautomacao.com.br', Type: { ...TypeAdmin }, Sector: { ...Integracao } },
    { ...DefaultUser, Name: 'Cristiano', LastName: 'Melo', Email: 'cristianomelo@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Projeto } },
    { ...DefaultUser, Name: 'Demétrius', LastName: 'Figueiredo', Email: 'demetriusfigueiredo@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, Name: 'Douglas', LastName: 'Pinheiro', Email: 'douglaspinheiro@serranoautomacao.com.br', Type: { ...TypeAdmin }, Sector: { ...Integracao } },
    { ...DefaultUser, Name: 'Ezequiel', LastName: 'Silva', Email: 'ezequielsilva@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, Name: 'Filipe', LastName: 'Dias', Email: 'filipedias@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, Name: 'Gabriel', LastName: 'Pedroso', Email: 'gabrielpedroso@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, Name: 'Gabrielle', LastName: 'Pintanel', Email: 'gabriellepintanel@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, Name: 'Henrique', LastName: 'Steigleder', Email: 'henriquesteigleder@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, Name: 'Júlia', LastName: 'Kist', Email: 'juliakist@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, Name: 'Júlia', LastName: 'Koch', Email: 'juliakoch@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, Name: 'Julio', LastName: 'Serrano', Email: 'julioserrano@serranoautomacao.com.br', Type: { ...TypeAdmin }, Sector: { ...Admin } },
    { ...DefaultUser, Name: 'Karen', LastName: 'Kist', Email: 'adm@serranoautomacao.com.br', Type: { ...TypeAdmin }, Sector: { ...RH } },
    { ...DefaultUser, Name: 'Lucas', LastName: 'Ferreira', Email: 'lucasferreira@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, Name: 'Lucas', LastName: 'Reis', Email: 'lucasreis@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, Name: 'Lucian', LastName: 'Silva', Email: 'luciansilva@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, Name: 'Luis', LastName: 'Pires', Email: 'luispires@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, Name: 'Luiz', LastName: 'Krug', Email: 'luizgustavokrug@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, Name: 'Marceli', LastName: 'Santos', Email: 'marcelisantos@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, Name: 'Marcelo', LastName: 'Eichenberg', Email: 'marceloeichenberg@serranoautomacao.com.br', Type: { ...TypeAdmin }, Sector: { ...Integracao } },
    { ...DefaultUser, Name: 'Marcelo', LastName: 'Silva', Email: 'marcelosilva@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, Name: 'Marcio', LastName: 'Wentz', Email: 'marciowentz@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, Name: 'Mariana', LastName: 'Coronel', Email: 'marianacoronel@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, Name: 'Marina', LastName: 'Muller', Email: 'marinamuller@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, Name: 'Matheus', LastName: 'Brum', Email: 'matheusbrum@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Projeto } },
    { ...DefaultUser, Name: 'Matheus', LastName: 'Pedroso', Email: 'matheuspedroso@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Projeto } },
    { ...DefaultUser, Name: 'Michel', LastName: 'Fagundes', Email: 'michelfagundes@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Projeto } },
    { ...DefaultUser, Name: 'Moisés', LastName: 'Beck', Email: 'moisesbeck@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, Name: 'Nathan', LastName: 'Lopes', Email: 'nathanlopes@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Projeto } },
    { ...DefaultUser, Name: 'Octávio', LastName: 'Brandão', Email: 'octaviobrandao@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, Name: 'Patrick', LastName: 'Souza', Email: 'patricksouza@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, Name: 'Sergio', LastName: 'Dutra', Email: 'sergiodutra@serranoautomacao.com.br', Type: { ...TypeAdmin }, Sector: { ...Projeto } },
    { ...DefaultUser, Name: 'Silvia', LastName: 'Scheid', Email: 'silviascheid@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, Name: 'Susana', LastName: 'Santana', Email: 'susanasantana@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, Name: 'Tales', LastName: 'Calliero', Email: 'talescalliero@serranoautomacao.com.br', Type: { ...TypeAdmin }, Sector: { ...Integracao } },
    { ...DefaultUser, Name: 'Tiago', LastName: 'Silva', Email: 'tiagosilva@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, Name: 'Valéria', LastName: 'Rex', Email: 'valeriarex@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, Name: 'Vera', LastName: 'Lucia Santos', Email: 'verasantos@serranoautomacao.com.br', Type: { ...Funcionario }, Sector: { ...Integracao } },
    { ...DefaultUser, Name: 'Administrador', LastName: 'Serrano', Email: 'admin@serranoautomacao.com.br', Type: { ...TypeAdmin }, Sector: { ...RH } },
    { ...DefaultUser, Name: 'Kátia', LastName: 'Santos', Email: 'katiasantos@serranoautomacao.com.br', Type: { ...TypeAdmin }, Sector: { ...RH } }
]





















/// ==================== TIPOS de ATIVOS =================== ///
export const ItemTypes = [
    {
        ...DefaultAssetsType,
        docID: '',
        id: '5c292f1a-1fc1-400b-b44c-ca0fa68458ad',
        Value: 'Cabo'
    },
    {
        ...DefaultAssetsType,
        docID: '',
        id: '9bff9e15-f30d-4287-891b-565389906a35',
        Value: 'Equipamento'
    }
]
/// ==================== TIPOS de ATIVOS =================== ///















/// ==================== SECTORS  =================== ///
export const Sectors = [
    {
        ...DefaultSector,
        docID: '',
        id: '0e13d17c-082e-400b-bf25-6ed0aaec5d57',
        Value: 'Integração'
    },
    {
        ...DefaultSector,
        docID: '',
        id: '9268f2f9-249f-433c-880a-7dcd0492a466',
        Value: 'Projeto'
    },
    {
        ...DefaultSector,
        docID: '',
        id: 'ad01ba2f-aa9a-47a2-a771-1fee98ef54a5',
        Value: 'Administrasset'
    },
    {
        ...DefaultSector,
        docID: '',
        id: 'ea05229e-658a-415a-bc23-62cebd0bbe96',
        Value: 'RH'
    },
]

/// ==================== SECTORS  =================== ///








/// ==================== LOCAIS DE ARMZANEMAMENTO =================== ///
export const StorageLocationsDeArmazenamento = [
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
        Value: 'Armário Administrasset'
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
export const AssetsStatus = [
    {
        ...DefaultAssetStatus,
        docID: '',
        id: '693ae26e-399e-4a2f-a646-d6315fb9a516',
        Value: 'Em Funcionamento',
        CanTake: true
    }
    ,
    {
        ...DefaultAssetStatus,
        docID: '',
        id: '144febcf-6a34-4c60-9166-1751ff5e8e6b',
        Value: 'Em Manutenção',
        CanTake: false
    }
]


















/// ==================== TIPOS de USOS  =================== ///
export const UsageTypes = [
    {
        ...DefaultTypeDeUso,
        docID: '',
        id: 'd0e718ac-9cdc-4d7a-ba00-711d68d2c108',
        Value: 'Uso contínuo'
    },
    {
        ...DefaultTypeDeUso,
        docID: '',
        id: 'a481167c-76f4-4412-a8ca-2e7c2569533b',
        Value: 'Uso momentâneo'
    },
    {
        ...DefaultTypeDeUso,
        docID: '',
        id: v4(),
        Value: 'Uso compartilhado'
    },
    {
        ...DefaultTypeDeUso,
        docID: '',
        id: v4(),
        Value: 'Uso pessoal'
    },
    {
        ...DefaultTypeDeUso,
        docID: '',
        id: v4(),
        Value: 'Uso limitado'
    },
    {
        ...DefaultTypeDeUso,
        docID: '',
        id: v4(),
        Value: 'Uso temporário'
    },
    {
        ...DefaultTypeDeUso,
        docID: '',
        id: v4(),
        Value: 'Uso remoto'
    },
    {
        ...DefaultTypeDeUso,
        docID: '',
        id: v4(),
        Value: 'Uso de treinamento'
    },
    {
        ...DefaultTypeDeUso,
        docID: '',
        id: v4(),
        Value: 'Uso de manutenção'
    },
    {
        ...DefaultTypeDeUso,
        docID: '',
        id: v4(),
        Value: 'Uso especializado'
    }
]












/// ==================== TIPOS de USERS  =================== ///



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







////////// REQUESTS TYPES
export const RequestTypes = [
    { ...DefaultRequestType, id: '0d2f4d4c-f4c4-4d1a-aa8a-6da0c2e3c6bf', Value: 'Solicitação de compra de ativo' },
    { ...DefaultRequestType, id: '7b57d1f9-3b68-4bde-a7fb-e34b1d84a1cc', Value: 'Solicitação de permissão' },
    { ...DefaultRequestType, id: 'f7b5f656-5e7c-4852-8e87-0e00efab4067', Value: 'Solicitação de manutenção de Ativo' },
    { ...DefaultRequestType, id: '1d53a127-35fa-41b3-81d3-5b5c7d55a1f5', Value: 'Solicitação de descarte de ativo' }
]


////////// REQUESTS STATUS
export const RequestStatus = [
    { ...DefaultRequestStatus, id: '891bcf56-d4c5-4f5c-b0ec-9d5b15f289f5', Value: 'Aberta' },
    { ...DefaultRequestStatus, id: '6a478a6d-784e-4f43-8e68-9449b9200a6f', Value: 'Em Andamento' },
    { ...DefaultRequestStatus, id: '8d2a69ab-4477-456d-ae89-8d328b95f9a7', Value: 'Aguardando Resposta do Solicitante' },
    { ...DefaultRequestStatus, id: 'd39d8da3-3f10-44a3-bd51-042c71d68f9d', Value: 'Fechada' },
    { ...DefaultRequestStatus, id: 'bfa247f8-87da-4d3e-918f-d80e51c8d8ea', Value: 'Cancelada' },
    { ...DefaultRequestStatus, id: 'cb69ee28-0b8f-4171-a141-7e60123b346d', Value: 'Concluída' },
]

















/////////////////// ADD FIREBASE ///////////////////////////



//TYPE SDE USUÁRIOS
if (ADD_FIREBASE) {
    UserRoles.forEach(Type => {
        AddToFirebaseFunctions["UserTypes"](Type).then((Document) => {
            //console.log("Type User Adicionado", Document)
        }).catch((erro) => {
            //console.log("Erro", erro)
        })
    })
}



//ASSETS
if (ADD_FIREBASE) {
    Items.forEach(Type => {
        AddToFirebaseFunctions["Asset"](Type).then((Document) => {
            //console.log("Item Adicionado", Document)
        }).catch((erro) => {
            //console.log("Erro", erro)
        })
    })
}

// USERS
if (ADD_FIREBASE) {
    Users.forEach(Type => {
        AddToFirebaseFunctions["User"](Type).then((Document) => {
            //console.log("User adicionado", Document)
        }).catch((erro) => {
            //console.log("Erro", erro)
        })
    })
}

//TIPOS de ATIVOS
if (ADD_FIREBASE) {
    ItemTypes.forEach(Type => {
        AddToFirebaseFunctions["AssetTypes"](Type).then((Document) => {
            //console.log("Type Adicionado", Document)
        }).catch((erro) => {
            //console.log("Erro", erro)
        })
    })
}


//SECTORS
if (ADD_FIREBASE) {
    Sectors.forEach(Sector => {
        AddToFirebaseFunctions["Sectors"](Sector).then((Document) => {
            //console.log("Sector Adicionado", Document)
        }).catch((erro) => {
            //console.log("Erro", erro)
        })
    })
}

//STORAGELOCATIONS 
if (ADD_FIREBASE) {
    StorageLocationsDeArmazenamento.forEach(Type => {
        AddToFirebaseFunctions["StorageLocations"](Type).then((Document) => {
            //console.log("Local Adicionado", Document)
        }).catch((erro) => {
            //console.log("Erro", erro)
        })
    })
}

//STATUS
if (ADD_FIREBASE) {
    AssetsStatus.forEach(Type => {
        AddToFirebaseFunctions["AssetsStatus"](Type).then((Document) => {
            //console.log("Status Adicionado", Document)
        }).catch((erro) => {
            //console.log("Erro", erro)
        })
    })
}

//TIPOS de USO
if (ADD_FIREBASE) {
    UsageTypes.forEach(Type => {
        AddToFirebaseFunctions["UsageTypes"](Type).then((Document) => {
            //console.log("Type Adicionado", Document)
        }).catch((erro) => {
            //console.log("Erro", erro)
        })
    })
}



//REQUESTS TYPES
if (ADD_FIREBASE) {
    RequestTypes.forEach(Type => {
        AddToFirebaseFunctions["RequestsTypes"](Type).then((Document) => {
            //console.log("Request Type Adicionado", Document)
        }).catch((erro) => {
            //console.log("Erro", erro)
        })
    })
}



//REQUESTS STATUS
if (ADD_FIREBASE) {
    RequestStatus.forEach(Type => {
        AddToFirebaseFunctions["RequestsStatus"](Type).then((Document) => {
            //console.log("Request Status Adicionado", Document)
        }).catch((erro) => {
            //console.log("Erro", erro)
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

//STATUS ASSETS
if ((!localStorage.getItem('AssetSenseAssetsStatus') || Update) && !Reset && !Nothing) {
    localStorage.setItem('AssetSenseAssetsStatus', JSON.stringify(AssetsStatus))
} else if (Reset) {
    localStorage.setItem('AssetSenseAssetsStatus', JSON.stringify(AssetsStatusReset)) //RESET
}


// TIPOS de USO
if ((!localStorage.getItem('AssetSenseUsageTypes') || Update) && !Reset && !Nothing) {
    localStorage.setItem('AssetSenseUsageTypes', JSON.stringify(UsageTypes))
} else if (Reset) {
    localStorage.setItem('AssetSenseUsageTypes', JSON.stringify(UsageTypesReset)) //RESET
}

// SECTORS
if ((!localStorage.getItem('AssetSenseSectors') || Update) && !Reset && !Nothing) {
    localStorage.setItem('AssetSenseSectors', JSON.stringify(Sectors))
} else if (Reset) {
    localStorage.setItem('AssetSenseSectors', JSON.stringify(SectorsReset)) //RESET
}

if ((!localStorage.getItem('AssetSenseUsers') || Update) && !Reset && !Nothing) {
    localStorage.setItem('AssetSenseUsers', JSON.stringify(Users))
} else if (Reset) {
    localStorage.setItem('AssetSenseUsers', JSON.stringify(UsersReset)) //RESET
}

//TIPOS de ATIVOS
if ((!localStorage.getItem('AssetSenseTypes') || Update) && !Reset && !Nothing) {
    localStorage.setItem('AssetSenseTypes', JSON.stringify(ItemTypes))
} else if (Reset) {
    localStorage.setItem('AssetSenseTypes', JSON.stringify(ItemTypesReset)) //RESET
}

//ASSETS
if ((!localStorage.getItem('AssetSenseAssets') || Update) && !Reset && !Nothing) {
    localStorage.setItem('AssetSenseAssets', JSON.stringify(Items))
} else if (Reset) {
    localStorage.setItem('AssetSenseAssets', JSON.stringify([]))
}

if ((!localStorage.getItem('AssetSenseStorageLocations') || Update) && !Reset && !Nothing) {
    localStorage.setItem('AssetSenseStorageLocations', JSON.stringify(StorageLocationsDeArmazenamento))
} else if (Reset) {
    localStorage.setItem('AssetSenseStorageLocations', JSON.stringify(StorageLocationsDeArmazenamentoReset)) //RESET
}