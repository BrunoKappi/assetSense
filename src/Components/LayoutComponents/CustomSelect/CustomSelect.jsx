import React from 'react';
import './CustomSelect.css'
import { connect } from 'react-redux'
import Select from "react-select";


export const noOptionsMessage = ({ inputValue }) => {
    return inputValue ? 'Nenhuma opção encontrada para "' + inputValue + '"' : 'Nenhuma opção disponível';
};

export const CustomSelectStyles = {

    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'var(--ComplementaryColor)' : provided.backgroundColor,
        color: state.isFocused ? 'var(--PrimaryColor)' : provided.color,
        ':hover': {
            backgroundColor: 'var(--ComplementaryColor)',
            color: 'var(--PrimaryColor)'
        }
    }),
    input: (provided) => ({
        ...provided,
        border: 'none',
        outline: 'none',
        color: 'var(--CustomSelect-Color-Input)',
        ':placeholder': {
            color: 'var(--CustomSelect-Color-Input)',
        }
    }),
    control: (provided, state) => ({
        ...provided,
        borderRadius: '.5rem',
        boxShadow: state.isFocused ? 'none' : 'none',
        border: state.isFocused ? '1px solid var(--PrimaryBackGroundFaded50)' : '1px solid var(--PrimaryBackGroundFaded50)',
        backgroundColor: 'var(--CustomSelect-Background-Input)',
        color: 'var(--CustomSelect-Color-Input)'
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'var(--CustomSelect-Color-Input)'
    }),
};

const CustomSelect = (props) => {
    return (
        <Select
            {...props}
            inputProps={{ autoComplete: 'off' }}
            className={`CustomSelect  ${props.Tema === 'Dark' ? 'CustomSelectDark' : 'CustomSelectLightTheme'} `}
            noOptionsMessage={noOptionsMessage}
            styles={CustomSelectStyles}
        />
    );
};



const ConnectedCustomSelect = connect((state) => {
    return {
        Tema: state.Tema
    }
})(CustomSelect)

export default ConnectedCustomSelect


