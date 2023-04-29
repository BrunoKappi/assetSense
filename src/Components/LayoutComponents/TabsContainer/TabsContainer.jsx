import React from 'react';
import './TabsContainer.css'

const TabsContainer = ({ children, onClick, className = '', Tema, Direction }) => {
    return (
        <div
            style={{ flexDirection: Direction }}
            className={`TabsContainer ${className}  ${Tema === 'Escuro' ? 'TabsContainerEscuro' : 'TabsContainerClaro'} `} onClick={onClick} >
            {children}
        </div >
    );
};

export default TabsContainer;


