import { MdFilterList } from 'react-icons/md';
import { useState } from "react";
import Select, { components } from "react-select";
import { UilLabel, UilBox, UilPuzzlePiece, UilPlay } from '@iconscout/react-unicons'
import './OrderBy.css'
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'


export const noOptionsMessage = ({ inputValue }) => {
    return inputValue ? 'Nenhuma opção encontrada para "' + inputValue + '"' : <span>Nenhuma opção disponível</span>;
};

export const OrderByStyles = {
    groupHeading: (provided) => ({
        ...provided,
        padding: '4px 8px',
        whiteSpace: 'nowrap',
        marginRight: '2rem'
    }),
    menu: (provided) => ({
        ...provided,
        width: 'auto', // define a largura do menu como auto para se ajustar ao tamanho das opções
        position: 'absolute', // define a posição do menu como absoluta para ser posicionado abaixo do control
        left: '-4rem',
        backgroundColor: 'var(--OrderBy-Menu-Background)',
        border: '1px solid var(--OrderBy-Menu-Border)'
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'var(--ComplementaryColor)' : provided.backgroundColor,
        width: '100%', // define a largura das opções
        color: state.isFocused ? 'var(--PrimaryColor)' : provided.color,
        ':hover': {
            backgroundColor: 'var(--ComplementaryColor)',
            color: 'var(--PrimaryColor)'
        },
        whiteSpace: 'nowrap',
        marginRight: '2rem'
    }),
    input: (provided) => ({
        ...provided,
        border: 'none',
        outline: 'none',
        color: 'var(--OrderBy-Color-Input)',
        ':placeholder': {
            color: 'var(--OrderBy-Color-Input)',
        }
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        display: 'none',
    }),
    control: (provided, state) => ({
        ...provided,
        borderRadius: '.5rem',
        boxShadow: state.isFocused ? 'none' : 'none',
        border: 'none',
        backgroundColor: 'var(--OrderBy-Background-Input)',
        color: 'var(--OrderBy-Color-Input)',
        width: 'auto',
        flexGrowth: '0'
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'var(--OrderBy-Color-Input)'
    }),
    //////////////////
    multiValue: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'var(--ComplementaryColor)' : 'var(--PrimaryBackGroundFaded50)',
        borderRadius: '1rem',
        margin: '0.2rem',
    }),
    multiValueLabel: (provided, state) => ({
        ...provided,
        color: 'var(--PrimaryColor)',
    }),
    multiValueRemove: (provided, state) => ({
        ...provided,
        color: 'var(--PrimaryColor)',
        ':hover': {
            backgroundColor: 'var(--ComplementaryColor)',
            color: 'var(--PrimaryColor)',
        },
        borderRadius: '1rem',
    }),

};




export const CustomPlaceholder = (e) => (
    <div className='OrderBy-CustomPlaceholder'>
        <span> {e} </span>
        <MdFilterList />
    </div>
);


const CustomLabelIconsMap = {
    'Setores': <UilPuzzlePiece />,
    'TiposUsuarios': <UilLabel />,
    'TiposAtivos': <UilLabel />,
    'LocaisArmazenamento': <UilBox />,
    'StatusAtivos': <UilLabel />,
    'TiposDeUso': <UilPlay />,
}


export const CustomLabel = (props) => {
    return (
        <div className='OrderBy-CustomLabel'>
            {CustomLabelIconsMap[props.List]}
            <span>{props.text}</span>
        </div>
    );
};






export const InputOption = ({ getStyles, Icon, isDisabled, isFocused, isSelected, children, innerProps, ...rest }) => {
    const [isActive, setIsActive] = useState(false);
    const onMouseDown = () => setIsActive(true);
    const onMouseUp = () => setIsActive(false);
    const onMouseLeave = () => setIsActive(false);

    // STYLE 
    let bg = "transparent";
    if (isFocused) bg = "#eee"; //QUANDO MOUSE ESTÁ EM CIMA DA LINHA
    if (isActive) bg = "#B2D4FF"; //QUANDO É CLICADO, SOMENTE

    const style = {
        alignItems: "center",
        backgroundColor: bg,
        color: "inherit",
        display: "flex "
    };

    // PROPS
    const props = { ...innerProps, onMouseDown, onMouseUp, onMouseLeave, style };

    return (
        <components.Option
            {...rest}
            isDisabled={isDisabled}
            isFocused={isFocused}
            isSelected={isSelected}
            getStyles={getStyles}
            innerProps={props}
            className="OrderBy-CustomOption"
        >
            {isSelected ? <ImCheckboxChecked className='OrderBy-CustomOptionIcon' /> : <ImCheckboxUnchecked className='OrderBy-CustomOptionIcon' />}
            <span className='OrderBy-CustomOptionText'>
                {children}
            </span>
        </components.Option>
    );
};
