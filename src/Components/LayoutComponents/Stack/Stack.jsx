import React from 'react';
import './Stack.css'

const Stack = ({ children, Gap = 0, className = '' }) => {
    const stackStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: `${Gap}`
    };

    return (
        <div className={`Stack ${className}`} style={stackStyle}>
            {children}
        </div>
    );
};

export default Stack;






