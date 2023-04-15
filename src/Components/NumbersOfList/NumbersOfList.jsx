import React from 'react'
import { v4 } from 'uuid'
import './NumbersOfList.css'

export default function NumbersOfList(props) {   

    return (
        <div className='NumbersOfListContainer'>
            {props.Values.map(Type => {
                return <div key={v4()} className='NumbersOfListItem'>
                    <span className='NumbersOfListQtd'>{Type.Qtd}</span>
                    <span className='NumbersOfListName'>{Type.Value}</span>
                </div>
            })}

        </div>
    )
}
  