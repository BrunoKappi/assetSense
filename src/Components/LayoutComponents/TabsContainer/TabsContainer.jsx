import React from 'react';
import './TabsContainer.css'

const TabsContainer = ({ children, onClick, className = '', Tema }) => {
    return (
        <div className={`TabsContainer ${className}  ${Tema === 'Escuro' ? 'TabsContainerEscuro' : 'TabsContainerClaro'} `} onClick={onClick}>
            {children}
        </div>
    );
};

export default TabsContainer;


