import React from 'react'
import { Route, Routes } from "react-router-dom"
import './Layout.css'
import Navbar from '../NavBar/NavBar'
import Sidebar from '../Sidebar/Sidebar'
import Assets from '../AssetList/Assets/Assets'
import Users from '../Users/Users'
import Profile from '../Profile/Profile'
import Config from '../Config/Config'
import Dashboard from '../Dashboard/Dashboard';
import Records from '../Records/Records'
import Requests from '../Requests/Requests'
import NotFound from '../NotFound/NotFound'

const Layout = () => {
    return (
        <div className='LayoutContainer'>
            <Navbar />
            <div className='LayoutContent'>
                <Sidebar />

                <Routes>
                    <Route path="/Dash" element={<Dashboard />} />
                    <Route path="/Assets" element={<Assets />} />
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="/Config" element={<Config />} />
                    <Route path="/Users" element={<Users />} />
                    <Route path="/Records" element={<Records />} />
                    <Route path="/Requests" element={<Requests />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>




            </div>
        </div >
    )
}

export default Layout 