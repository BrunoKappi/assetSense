
import { UilListUl,UilLabel,UilBox  } from '@iconscout/react-unicons'

export const ArmazenamentoTabTitle = () => {
  return <div className='TabsTitle'>
    <UilBox />
    <span>Armazenamento</span>
  </div>
} 

export const TiposTabTitle = () => {
  return <div className='TabsTitle'>
    <UilLabel />
    <span>Tipos</span>
  </div>
}
export const TodosTabTitle = () => {
  return <div className='TabsTitle'>
    <UilListUl />                   
    <span>Todos</span>
  </div>
}
 



