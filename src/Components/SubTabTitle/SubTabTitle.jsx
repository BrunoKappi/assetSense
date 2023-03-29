import React from 'react'
import './SubTabTitle.css'

export default function SubTabTitle({Text}) {
    return (
        <div className='SubTabTitle'>
            <div className='SubTabTitleIcon'></div>
            <span className='SubTabTitleText'>{Text}</span>
        </div>
    )
}
