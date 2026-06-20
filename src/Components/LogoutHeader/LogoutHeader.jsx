import React from 'react'
import './LogoutHeader.css'
import { Link } from 'react-router-dom'


export default function LogoutHeader() {




    return (
        <div className="LoginHeader">
            <Link to={'/'} style={{ display: "flex", alignItems: "center", textDecoration: "none", gap: "0.8rem" }}>
                <img alt="Logo" src="https://cdn.bkappi.com/ProjectsAssets/BkappiGeneral/bkappiIcon.ico" style={{ width: "25px", height: "25px", borderRadius: "5px" }}>
                </img>
                <span style={{ color: "white", fontWeight: "600", fontSize: "1.2rem" }}>AssetSense</span>
            </Link>
        </div>
    )
}
