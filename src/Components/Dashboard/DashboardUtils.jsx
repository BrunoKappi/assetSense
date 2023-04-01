import { UilUsersAlt, UilSitemap, UilListUl } from '@iconscout/react-unicons'

export const UsuariosTabTitle = () => {
    return <div className='TabsTitle'>
        <UilSitemap />
        <span>Usuarios</span>
    </div>
}
 
export const RecordsTabTitle = () => {
    return <div className='TabsTitle'>
        <UilListUl />
        <span>Retiradas</span>
    </div>
}
export const AtivosTabTitle = () => {
    return <div className='TabsTitle'>
        <UilUsersAlt />
        <span>Ativos</span>
    </div>
}