import React from 'react';
import './FormInput.css'
import { connect } from 'react-redux'

const FormInput = ({ children, className = '', type = "text", Tema, onChange, value, placeholder, disabled, onClick, min, ref }) => {
    return (
        <input
            className={`FormInput ${Tema === 'Dark' ? "FormInputDark" : 'FormInputLightTheme'}  ${className} `}
            onClick={onClick}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            min={min}
            ref={ref}
        >
            {children}
        </input>
    );
};

const ConnectedFormInput = connect((state) => {
    return {
        Tema: state.Tema
    }
})(FormInput)

export default ConnectedFormInput