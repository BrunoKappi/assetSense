import React from 'react'
import { Oval } from 'react-loader-spinner'
import './Loading.css'

export default function Loading() {
    return (
        <div className='LoadingContainer'>
            <Oval
                color="#2b5aa6"
                wrapperStyle={{}}
                wrapperClass="LoginSpinnerContainer"
                secondaryColor="#2b5aa6cc"
                strokeWidth={7}
                strokeWidthSecondary={7}
            />
        </div>
    )
}
 