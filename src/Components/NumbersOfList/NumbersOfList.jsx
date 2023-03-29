import React from 'react'
import './NumbersOfList.css'

export default function NumbersOfList(props) {

    //console.log("VALUES",props.Values)

    return (
        <div className='NumbersOfListContainer'>
            {props.Values.map(Type => {
                return <div className='NumbersOfListItem'>
                    <span className='NumbersOfListQtd'>{Type.Qtd}</span>
                    <span className='NumbersOfListName'>{Type.Value}</span>
                </div>
            })}

        </div>
    )
}
