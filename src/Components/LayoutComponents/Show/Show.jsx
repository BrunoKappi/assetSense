import React from 'react';
import './Show.css'

const Show = ({ children, Show, Width = '' }) => {

    const ShowStyle = {        
        width: `${Width}`
    };


    return (
        <div className={` ${Show ? 'Show' : 'NotShow'}`} style={ShowStyle}>
            {children}
        </div>
    );
};

export default Show;