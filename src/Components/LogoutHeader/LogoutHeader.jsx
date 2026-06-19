import React from 'react'
import './LogoutHeader.css'
import { Link } from 'react-router-dom'


export default function LogoutHeader() {




    return (
        <div className="LoginHeader">
            <Link to={'/'}>
                <img alt="Logo" src="https://cdn.bkappi.com/ProjectsAssets/BkappiGeneral/bkappiIcon.ico">
                </img>
            </Link>
        </div>
    )
}
