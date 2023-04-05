import React from 'react';
import './FormGroup.css'

const FormGroup = ({ children }) => {
    return (
        <div className='FormGroup'>
            {children}
        </div>
    );
};

export default FormGroup;