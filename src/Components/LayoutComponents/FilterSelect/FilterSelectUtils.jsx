import { MdFilterList } from 'react-icons/md';
import { useState } from "react";
import Select, { components } from "react-select";
import { UilLabel, UilBox, UilPuzzlePiece, UilPlay } from '@iconscout/react-unicons'
import './FilterSelect.css'
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'


export const noOptionsMessage = ({ inputValue }) => {
    return inputValue ? 'Nenhuma opção encontrada para "' + inputValue + '"' : <span>Nenhuma opção disponível</span>;
};

export const FilterSelectStyles = {
    groupHeading: (provided) => ({
        ...provided,
        padding: '4px 8px',
        whiteSpace: 'nowrap',
        marginRight: '2rem'
    }),
    menu: (provided) => ({
        ...provided,
        width: 'auto',
        position: 'absolute',
        left: '-8rem',
        backgroundColor: 'var(--FilterSelect-Menu-Background)',
        border: '1px solid var(--FilterSelect-Menu-Border)'
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
        color: 'var(--FilterSelect-Color-Input)',
        ':placeholder': {
            color: 'var(--FilterSelect-Color-Input)',
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
        backgroundColor: 'var(--FilterSelect-Background-Input)',
        color: 'var(--FilterSelect-Color-Input)',
        width: 'auto',
        flexGrowth: '0'
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'var(--FilterSelect-Color-Input)'
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
    <div className='FilterSelect-CustomPlaceholder'>
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
        <div className='FilterSelect-CustomLabel'>
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
            className="FilterSelect-CustomOption"
        >
            {isSelected ? <ImCheckboxChecked className='FilterSelect-CustomOptionIcon' /> : <ImCheckboxUnchecked className='FilterSelect-CustomOptionIcon' />}
            <span className='FilterSelect-CustomOptionText'>
                {children}
            </span>
        </components.Option>
    );
};


export const MenuList = ({ children, CheckAll, UncheckAll, ...props }) => {
    return (
        <components.MenuList {...props}>
            <div className='FilterSelect-MenuList-Header'>
                <button className='FilterSelect-MenuList-CheckAll' onClick={CheckAll}>
                    Marcar todas
                </button>
                <button className='FilterSelect-MenuList-UncheckAll' onClick={UncheckAll}>
                    Desmarcar todas
                </button>
            </div>
            {children}
        </components.MenuList>
    );
};
