import React from 'react';
import './TwoColumns.css'

const TwoColumns = ({ children }) => {
    return (
        <div className='TwoColumns'>
            {children}
        </div>
    );
};

export default TwoColumns;