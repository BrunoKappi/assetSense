

export const noOptionsMessage = ({ inputValue }) => {
    return inputValue ? 'Nenhuma opção encontrada para "' + inputValue + '"' : 'Nenhuma opção disponível';
};



export const AssetModalSelectcustomStyles = {

    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'var(--ComplementaryColor)' : 'white',
        color: state.isFocused ? 'var(--PrimaryColor)' : 'var(--SecondaryBackground)',
        ':hover': {
            backgroundColor: 'var(--ComplementaryColor)',
            color: 'var(--PrimaryColor)'
        }
    }),
    input: (provided) => ({
        ...provided,
        border: 'none',
        outline: 'none',
        color: 'var(--AssetModal-Color-Input)',
        ':placeholder': {
            color: 'var(--AssetModal-Color-Input)',
        }
    }),
    control: (provided, state) => ({
        ...provided,
        borderRadius: '.5rem',
        boxShadow: state.isFocused ? 'none' : 'none',
        border: state.isFocused ? '1px solid var(--PrimaryBackGroundFaded50)' : '1px solid var(--PrimaryBackGroundFaded50)',
        backgroundColor: 'var(--AssetModal-Background-Input)',
        color: 'var(--AssetModal-Color-Input)'
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'var(--AssetModal-Color-Input)'
    }),
};

