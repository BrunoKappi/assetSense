

import { UilArrowDown, UilArrowUp } from '@iconscout/react-unicons'

export const RetirarTabTitle = () => {
    return <div className='TabsTitle'>
        <UilArrowUp /> 
        <span>Retirada</span>
    </div>
}

export const DevolverTabTitle = () => {
    return <div className='TabsTitle'> 
        <UilArrowDown />
        <span>Devolução</span>
    </div>
}

