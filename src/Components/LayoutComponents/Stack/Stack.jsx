import React from 'react';
import './Stack.css'

const Stack = ({ children }) => {
    return (
        <div className='Stack'>
            {children}
        </div>
    );
};

export default Stack; 