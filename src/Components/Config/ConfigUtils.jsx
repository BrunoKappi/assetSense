

import { UilListUl, UilSitemap, UilShieldCheck } from '@iconscout/react-unicons'

export const AtivosTabTitle = () => {
  return <div className='TabsTitle'>
    <UilListUl />
    <span>Ativos</span>
  </div>
}

export const SetoresEUsuáriosTabTitle = () => {
  return <div className='TabsTitle'>
    <UilSitemap />
    <span>Setores e Usuários</span>
  </div>
}

export const PermicoesTabTitle = () => {
  return <div className='TabsTitle'>
    <UilShieldCheck />
    <span>Permissões</span>
  </div>
}