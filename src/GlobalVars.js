

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
  // ================ ATIVOS ================== // 
  VISUALIZAR_ATIVOS: Index++,
  RETIRAR_ATIVOS: Index++,
  ADICIONAR_ATIVOS: Index++,
  EDITAR_ATIVOS: Index++,
  EXCLUIR_ATIVOS: Index++,
  ____: Index++,
  ____: Index++,
  ____: Index++,
  ____: Index++,
  ____: Index++,
  // ================ USUARIOS ================== // 
  VISUALIZAR_USUARIOS: Index++,
  ADICIONAR_USUARIOS: Index++,
  EDITAR_USUARIOS: Index++,
  EXCLUIR_USUARIOS: Index++,
  ____: Index++,
  ____: Index++,
  ____: Index++,
  ____: Index++,
  ____: Index++,
  ____: Index++,
  // ================ CONFIGURAÇÔES ================== // 
  EDITAR_TIPOS_ATIVOS: Index++,
  EDITAR_LOCAIS: Index++,
  EDITAR_STATUS_ATIVOS: Index++,
  EDITAR_TIPOS_DE_USO: Index++,
  EDITAR_SECTORS: Index++,
  EDITAR_TIPOS_DE_USUARIO: Index++,
  EDITAR_PERMICOES: Index++,
  ____: Index++,
  ____: Index++,
  ____: Index++,

}

export const PermitDesc = [
  // ================ ATIVOS ================== // 
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
  // ================ USUARIOS ================== //
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

export const AtivosInLocaisBreakpoints = {
  default: 3,
  1250: 2,
  950: 1
}

export const AtivosInTypesBreakpoints = {
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
