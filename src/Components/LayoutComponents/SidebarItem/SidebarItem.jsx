import React from 'react';
import './SidebarItem.css'

const SidebarItem = ({ children, Active, onClick, className = '' }) => {
    return (
        <div className={`SidebarItem ${className} ${Active ? 'ActiveSidebarItem' : ''}`} onClick={onClick}>
            {children}
        </div>
    );
};

export default SidebarItem;