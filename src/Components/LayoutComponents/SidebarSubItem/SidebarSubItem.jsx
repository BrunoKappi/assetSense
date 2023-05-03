import React from 'react';
import './SidebarSubItem.css'

const SidebarSubItem = ({ children, Active, onClick, className = ''  }) => {
    return (
        <div className={`SidebarSubItem ${className} ${Active ? 'ActiveSidebarSubItem' : ''}`} onClick={onClick}>
            {children}
        </div>
    );
}; 

export default SidebarSubItem;  