

export const DefaultLoggedUser = {
  Email: '',
  uid: '',
  SidebarActive: true,
  CurrentSidebarTab: "Login",
  Search: '',
  Name: '',
  Role: '',
  CheckedLogin: false,
  PhotoUrl: ''
};

export const UserModalSelectcustomStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'var(--ComplementaryColor)' : provided.backgroundColor,
    ':hover': {
      backgroundColor: 'var(--ComplementaryColor)',
      color: 'var(--PrimaryColor)'
    }
  }),
  input: (provided) => ({
    ...provided,
    border: 'none',
    outline: 'none'
  }),
  control: (provided, state) => ({
    ...provided,
    borderRadius: '.5rem',
    boxShadow: state.isFocused ? 'none' : 'none',
    border: state.isFocused ? '1px solid var(--PrimaryBackGroundFaded50)' : '1px solid var(--PrimaryBackGroundFaded50)'
  }),
};

export const DefaultTooltipStyles = {
  fontFamily: "var(--Fonte) !important;",
  color: 'red'
}


///////////// PERMIÇÔES ///////////

var Index = 0

export const PermitIndexs = {
  // ================ ASSETS ================== // 
  VIEW_ASSETS: Index++,
  RETIRAR_ASSETS: Index++,
  ADD_ASSETS: Index++,
  EDIT_ASSETS: Index++,
  DELETE_ASSETS: Index++,
  ____: Index++,
  ____: Index++,
  ____: Index++,
  ____: Index++,
  ____: Index++,
  // ================ USERS ================== // 
  VIEW_USERS: Index++,
  ADD_USERS: Index++,
  EDIT_USERS: Index++,
  DELETE_USERS: Index++,
  ____: Index++,
  ____: Index++,
  ____: Index++,
  ____: Index++,
  ____: Index++,
  ____: Index++,
  // ================ CONFIGURAÇÔES ================== // 
  EDIT_TYPES_ASSETS: Index++,
  EDIT_STORAGELOCATIONS: Index++,
  EDIT_STATUS_ASSETS: Index++,
  EDIT_TYPES_DE_USO: Index++,
  EDIT_SECTORS: Index++,
  EDIT_TYPES_DE_USER: Index++,
  EDIT_PERMICOES: Index++,
  ____: Index++,
  ____: Index++,
  ____: Index++,

}

export const PermitDesc = [
  // ================ ASSETS ================== // 
  'Visualizar Ativos',
  'Retirar Ativos',
  'Adicionar Ativos',
  'Editar Ativos',
  'Excluir Ativos',
  '',
  '',
  '',
  '',
  '',
  // ================ USERS ================== //
  'Visualizar Usuários',
  'Adicionar Usuários',
  'Editar Usuários',
  'Excluir Usuários',
  '',
  '',
  '',
  '',
  '',
  '',
  // ================ CONFIGURAÇÔES ================== //

  'Editar Tipos de Ativos',
  'Editar Locais de Armazenamento',
  'Editar Status de Ativos',
  'Editar Tipos de Uso',
  'Editar Setores',
  'Editar Tipos de Usuários',
  'Editar Permissões',
  '',
  '',
  '',
]


///////////// PERMIÇÔES ///////////












/////////////////// Masonry OBJECTS ///////////////


export const CamposMasoryBreakpoints = {
  default: 3,
  1250: 2,
  950: 1,
  700: 1
}

export const AssetsInStorageLocationsBreakpoints = {
  default: 3,
  1250: 2,
  950: 1
}

export const AssetsInTypesBreakpoints = {
  default: 4,
  1250: 3,
  950: 2,
  700: 1

}
export const ConfigBreakpoints = {
  default: 3,
  1250: 2,
  950: 1
}


export const UsersInSectorsBreakpoints = {
  default: 4,
  1250: 3,
  950: 2,
  700: 1
}

export const UsersInTypesBreakpoints = {
  default: 4,
  1250: 3,
  950: 2,
  700: 1
}
