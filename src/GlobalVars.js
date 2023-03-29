

export const DefaultLoggedUser = {
  Email: '',
  uid: '',
  SidebarActive: true,
  CurrentSidebarTab: "Login",
  Search: '',
  Name: '',
  Role: '',
  CheckedLogin: false
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










export const Filteroptions = [
  { value: "Mais recentes", label: "Mais Recentes" },
  { value: "Mais antigos", label: "Mais antigos" },
  { value: "Status", label: "Status" },
  { value: "Descrição", label: "Descrição" },
];
export const FilterStatusoptions = [
  { value: "Todos", label: "Todos" },
  { value: "Aberto", label: "Aberto" },
  { value: "Em Andamento", label: "Em andamento" },
  { value: "Concluído", label: "Concluído" },
];





///////////// PERMIÇÔES ///////////

var Index = 0



export const PermitIndexs = {
  // ================ ATIVOS ================== // 
  ATIVOS: Index++,
  VISUALIZAR_ATIVOS: Index++,
  RETIRAR_ATIVOS: Index++,
  ADICIONAR_ATIVOS: Index++,
  EDITAR_ATIVOS: Index++,
  EXCLUIR_ATIVOS: Index++,
  // ================ ATIVOS ================== //
  // ================ USUARIOS ================== //
  USUARIOS: Index++,
  VISUALIZAR_USUARIOS: Index++,
  ADICIONAR_USUARIOS: Index++,
  EDITAR_USUARIOS: Index++,
  EXCLUIR_USUARIOS: Index++,
  // ================ USUARIOS ================== //

  // ================ CONFIGURAÇÔES ================== //
  CONFIGURACOES: Index++,
  //TIPOS DE ATIVOS 
  EDITAR_TIPOS_ATIVOS: Index++,
  //LOCAIS  
  EDITAR_LOCAIS: Index++,
  //STATUS DE ATIVOS 
  EDITAR_STATUS_ATIVOS: Index++,
  //TIPOS DE USO  
  EDITAR_TIPOS_DE_USO: Index++,
  //SETORES
  EDITAR_SETORES: Index++,
  //TIPOS DE USUARIO  
  EDITAR_TIPOS_DE_USUARIO: Index++,
  //PERMISSOES
  EDITAR_PERMICOES: Index++,
  // ================ CONFIGURAÇÔES ================== //
}

export const PermitDesc = [
  // ================ ATIVOS ================== // 
  'Ativos',
  'Visualizar Ativos',
  'Retirar Ativos',
  'Adicionar Ativos',
  'Editar Ativos',
  'Excluir Ativos',
  // ================ USUARIOS ================== //
  'Usuários',
  'Visualizar Usuários',
  'Adicionar Usuários',
  'Editar Usuários',
  'Excluir Usuários',
  // ================ CONFIGURAÇÔES ================== //
  'Configurações',
  'Editar Tipos de Ativos',
  'Editar Locais de Armazenamento',
  'Editar Status de Ativos',
  'Editar Tipos de Uso',
  'Editar Setores',
  'Editar Tipos de Usuários',
  'Editar Permissões',
]