

export const noOptionsMessage = ({ inputValue }) => {
    return inputValue ? 'Nenhuma opção encontrada para "' + inputValue + '"' : 'Nenhuma opção disponível';
};

export const AtivoModalSelectcustomStyles = {
 
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
        color: 'var(--AtivoModal-Color-Input)',
        ':placeholder': {
            color: 'var(--AtivoModal-Color-Input)',
        }
    }),
    control: (provided, state) => ({
        ...provided,
        borderRadius: '.5rem',
        boxShadow: state.isFocused ? 'none' : 'none',
        border: state.isFocused ? '1px solid var(--PrimaryBackGroundFaded50)' : '1px solid var(--PrimaryBackGroundFaded50)',
        backgroundColor: 'var(--AtivoModal-Background-Input)',
        color: 'var(--AtivoModal-Color-Input)'
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'var(--AtivoModal-Color-Input)'
    }),
};

