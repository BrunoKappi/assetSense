import React from 'react';
import './Show.css'

const Show = ({ children, Show, Width = '', className = '' }) => {

    const ShowStyle = {
        width: `${Width}`
    };


    return (
        <div className={` ${className}  ${Show ? 'Show' : 'NotShow'}`} style={ShowStyle}>
            {children}
        </div>
    );
};

export default Show;