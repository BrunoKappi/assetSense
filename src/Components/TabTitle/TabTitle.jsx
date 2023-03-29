import React from 'react'
import './TabTitle.css'

export default function TabTitle({Text}) {
    return (
        <div className='TabTitle'>
            <div className='TabTitleIcon'></div>
            <span className='TabTitleText'>{Text}</span>
        </div>
    )
}
