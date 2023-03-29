import { v4 as uuid, v4 } from 'uuid';

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

export const Items = [
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CONVERSOR USB SERIAL', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO PANEL VIEW PLUS 1000', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: '1747-NET-UIC', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'ROCKWELL SERIAL SLC-500/MICROLOGIX/CONTROLLOGIX', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'ROCKWELL SERIAL PLC-5', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation }, Item: 'SIEMENS LOGO!', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO MICROLOGIX DIN', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso2 } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'SIEMENS S7-200 RS-232 - PPI', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO S5 RS-232 - TTY', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus2 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'SIEMENS SINAMICS', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation }, Item: 'SIEMENS S7-200/300 RS-232 - PPI/MPI', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'PC Adapter', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'FONTE PC ADAPTER', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'PC CABLE SIMOCODE', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation }, Item: 'CONFIF PROSOFT', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus2 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO ALTUS AL-1342', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO ALTUS AL-1342', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO PANEL VIEW 500/600', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus2 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'SIEMENS S7-200 RS-232 - PPI', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'SIEMENS S7-200/300 RS-232 - PPI/MPI', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus2 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO PICCOLO', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO TCI S5-USB', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso2 } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CONVERSOR USB - RS485', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CONVERSOR UBS SERIAL TECNATRON', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CONVERSOR UBS SERIAL TECNATRON', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso2 } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation2 }, Item: 'CONVERSOR USB SERIAL ICP COM', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO OP7/17/27', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO RS-232 IHM HT 60', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'CABO KLOCKNER MOELLER', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso2 } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'Cabo HDMI', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'Adaptador VGA-DP', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'Patch Cord', Type: { ...DefaultAtivoType }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int01', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int02', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso2 } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int03', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int04', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation2 }, Item: 'HD Externo SA_HdE_Int05', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus2 }, Records: [], Usage: { ...DefaultTipoUso2 } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int06', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int07', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation2 }, Item: 'HD Externo SA_HdE_Int08', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus2 }, Records: [], Usage: { ...DefaultTipoUso2 } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int09', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int10', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso2 } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int11', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation2 }, Item: 'HD Externo SA_HdE_Int12', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'HD Externo SA_HdE_Int13', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation1 }, Item: 'Régua extensão', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
    { Id: uuid(), Qtd: 1, Brand: '', StorageLocation: { ...DefaultStorageLocation2 }, Item: 'Case HD externo 3.0', Type: { ...DefaultAtivoType2 }, Status: { ...DefautltAtivoStatus1 }, Records: [], Usage: { ...DefaultTipoUso } },
]



if (!localStorage.getItem('AssetSenseAtivos') || true ) {
    localStorage.setItem('AssetSenseAtivos', JSON.stringify(Items))
}
////localStorage.setItem('AssetSenseAtivos', JSON.stringify([])) // RESET 






export const ItemTypes = [
    { Id: '5c292f1a-1fc1-400b-b44c-ca0fa68458ad', Value: 'Cabo' },
    { Id: '9bff9e15-f30d-4287-891b-565389906a35', Value: 'Equipamento' }
]

if (!localStorage.getItem('AssetSenseTipos')) {
    localStorage.setItem('AssetSenseTipos', JSON.stringify(ItemTypes))
}
////localStorage.setItem('AssetSenseTipos', JSON.stringify(ItemTypes)) //RESET









export const Setores = [
    { Id: '0e13d17c-082e-400b-bf25-6ed0aaec5d57', Value: 'Integração' },
    { Id: '9268f2f9-249f-433c-880a-7dcd0492a466', Value: 'Projeto' },
    { Id: 'ad01ba2f-aa9a-47a2-a771-1fee98ef54a5', Value: 'Administrativo' },
    { Id: 'ea05229e-658a-415a-bc23-62cebd0bbe96', Value: 'RH' },
]

export const SetoresReset = [{ Id: 'ad01ba2f-aa9a-47a2-a771-1fee98ef54a5', Value: 'Administrativo' }]

if (!localStorage.getItem('AssetSenseSetores')) {
    localStorage.setItem('AssetSenseSetores', JSON.stringify(Setores))
}
////localStorage.setItem('AssetSenseSetores', JSON.stringify(SetoresReset)) //RESET





//LOCAIS
export const LocaisDeArmazenamento = [
    { Id: 'b21e3ca1-985a-4958-9d16-9ff68579c576', Value: 'Armário da Integração' },
    { Id: '59ca3189-70cb-451c-a597-4320e0bf158f', Value: 'Armário Administrativo' },
    { Id: '24d50296-fb80-473a-9eaa-f2745341b148', Value: 'Projeto' }
]

//LOCAIS
export const LocaisDeArmazenamentoReset = [{ Id: 'b21e3ca1-985a-4958-9d16-9ff68579c576', Value: 'Armário' }]

if (!localStorage.getItem('AssetSenseLocaisArmazenamento')) {
    localStorage.setItem('AssetSenseLocaisArmazenamento', JSON.stringify(LocaisDeArmazenamento))
}
////localStorage.setItem('AssetSenseLocaisArmazenamento', JSON.stringify(LocaisDeArmazenamentoReset)) //RESET






//STATUS
export const AtivosStatus = [
    { Id: '693ae26e-399e-4a2f-a646-d6315fb9a516', Value: 'Em Funcionamento', CanTake: true },
    { Id: '144febcf-6a34-4c60-9166-1751ff5e8e6b', Value: 'Em Manutenção', CanTake: false }
]

export const DefaultAtivoStatus = { Id: '', Value: '', CanTake: true }

export const AtivosStatusReset = [
    { Id: '693ae26e-399e-4a2f-a646-d6315fb9a516', Value: 'Disponível' },
    { Id: '144febcf-6a34-4c60-9166-1751ff5e8e6b', Value: 'Em uso' },
    { Id: v4(), Value: 'Em Manutenção' }
]
if (!localStorage.getItem('AssetSenseStatusAtivos')) {
    localStorage.setItem('AssetSenseStatusAtivos', JSON.stringify(AtivosStatus))
}

////localStorage.setItem('AssetSenseStatusAtivos', JSON.stringify(AtivosStatusReset)) //RESET




//USOS
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

//USOS
export const TiposDeUsoReset = [{ Id: 'd0e718ac-9cdc-4d7a-ba00-711d68d2c108', Value: 'Uso contínuo' }]


if (!localStorage.getItem('AssetSenseTiposDeUso')) {
    localStorage.setItem('AssetSenseTiposDeUso', JSON.stringify(TiposDeUso))
}
////localStorage.setItem('AssetSenseTiposDeUso', JSON.stringify(TiposDeUsoReset)) //RESET










export const DefaultUserType = { Id: '', Value: '' }
export const DefaultSetor = { Id: '', Value: '' }
export const DefaultLocal = { Id: '', Value: '' }
export const DefaultItemType = { Id: '', Value: '' }
export const DefaultAtivosType = { Id: '', Value: '' }


export const DefaultAtivo = {
    Id: uuid(),
    Item:'',
    Qtd:1,
    Brand:'',
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
    Id:'',
    Date: '',
    User: {
        Name: '',
        Email: ''
    },
    RetrieveDate: '',
    Status: ''
}




