import React from 'react';
import './FormInput.css'
import { connect } from 'react-redux'

const FormTextarea = ({ children, className = '', type = "text", Tema, onChange, value, placeholder, disabled, onClick, min, ref }) => {
    return (
        <textarea
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
        </textarea>
    );
};

const ConnectedFormTextarea = connect((state) => {
    return {
        Tema: state.Tema
    }
})(FormTextarea)

export default ConnectedFormTextarea