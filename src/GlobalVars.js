

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
  VISUALIZAR_ASSETS: Index++,
  RETIRAR_ASSETS: Index++,
  ADICIONAR_ASSETS: Index++,
  EDITAR_ASSETS: Index++,
  EXCLUIR_ASSETS: Index++,
  ____: Index++,
  ____: Index++,
  ____: Index++,
  ____: Index++,
  ____: Index++,
  // ================ USERS ================== // 
  VISUALIZAR_USERS: Index++,
  ADICIONAR_USERS: Index++,
  EDITAR_USERS: Index++,
  EXCLUIR_USERS: Index++,
  ____: Index++,
  ____: Index++,
  ____: Index++,
  ____: Index++,
  ____: Index++,
  ____: Index++,
  // ================ CONFIGURAÇÔES ================== // 
  EDITAR_TYPES_ASSETS: Index++,
  EDITAR_STORAGELOCATIONS: Index++,
  EDITAR_STATUS_ASSETS: Index++,
  EDITAR_TYPES_DE_USO: Index++,
  EDITAR_SECTORS: Index++,
  EDITAR_TYPES_DE_USER: Index++,
  EDITAR_PERMICOES: Index++,
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

  'Editar Tipos de  Ativos',
  'Editar Locais de Armazenamento',
  'Editar Status de Ativos',
  'Editar Tipos de  Uso',
  'Editar Setores',
  'Editar Tipos de  Usuários',
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
