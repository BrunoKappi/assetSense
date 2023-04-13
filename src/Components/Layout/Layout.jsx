import React from 'react'
import { Outlet } from "react-router-dom"
import './Layout.css'
import Navbar from '../NavBar/NavBar'
import Sidebar from '../Sidebar/Sidebar'

const Layout = () => {
    return (
        <div className='LayoutContainer'>
            <Navbar />
            <div className='LayoutContent'>
                <Sidebar />
                <Outlet />
            </div>
        </div >
    )
}

export default Layout 