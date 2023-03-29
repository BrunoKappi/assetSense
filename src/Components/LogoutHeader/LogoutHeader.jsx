import React from 'react'
import './LogoutHeader.css'
import AssetSense from '../../Images/AssetSenseIconWhite.png'
import { Link } from 'react-router-dom'


export default function LogoutHeader() {
    return (
        <div className="LoginHeader">
            <Link to={'/'}>
                <img alt="Logo" src={AssetSense}>
                </img>
            </Link>
        </div>
    )
}
