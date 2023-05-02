import Select, { components } from "react-select";
import { connect } from 'react-redux'
import './OrderBy.css'
import { CustomLabel, CustomPlaceholder, OrderByStyles, InputOption, noOptionsMessage } from "./OrderByUtils";
import { useState, useEffect } from "react";
import React from 'react';

const DefaultOptions = {
    "Records": { Value: 'Mais Recentes' },
    "Assets": { Value: 'Nome do Ativo' },
    "Users": { Value: 'Nome' },
    "Requests": { Value: 'Data de Solicitação' },
}

const RecordsOrderByOptions = [
    {
        label: <CustomLabel text="Ordenar por" />,
        options: [
            { Value: 'Mais Recentes' },
            { Value: 'Mais Antigos' },
            { Value: 'Tempo de Uso' },
            { Value: 'Status' },
        ],
    },
]

const AssetsOrderByOptions = [
    {
        label: <CustomLabel text="Ordenar por" />,
        options: [
            { Value: 'Nome do Ativo' },
            { Value: 'Nome do Usuário' },
            { Value: 'Local de Armazenamento' },
            { Value: 'Tipo' },
            { Value: 'Quantidade do Ativo' },
            { Value: 'Quantidade em Uso' },
            { Value: 'Data de Adição' },
            { Value: 'Última edição' },

        ],
    },
]


const UsersOrderByOptions = [
    {
        label: <CustomLabel text="Ordenar por" />,
        options: [
            { Value: 'Nome' },
            { Value: 'Setor' },
            { Value: 'Tipo' },
            { Value: 'Email' },
            { Value: 'Data de Adição' },
            { Value: 'Última edição' },
        ],
    },
]



const RequestsOrderByOptions = [
    {
        label: <CustomLabel text="Ordenar por" />,
        options: [
            { Value: 'Data de Solicitação' },
            { Value: 'Nome Solicitante' },
            { Value: 'Status da Solicitação' },
            { Value: 'Setor' },
            { Value: 'Tipo de Solicitação' },
            { Value: 'Email Solicitante' },
            { Value: 'Última edição' },
        ],
    },
]


//GET INITIAL VALUES FOR CHECK ALL
const GetInitialValues = (Module) => {
    switch (Module) {
        case 'Records':
            return RecordsOrderByOptions
        case 'Assets':
            return AssetsOrderByOptions
        case 'Users':
            return UsersOrderByOptions
        case 'Requests':
            return RequestsOrderByOptions
        default:
            break;
    }
}


//GET INITIAL VALUES FOR CHECK ALL
export const GetDefautlOption = (Module) => {
    return DefaultOptions[Module]

}

const OrderBy = (props) => {




    //OPTIONS STATE
    const Options = GetInitialValues(props.Module)
    const [SelectedOption, setSelectedOption] = useState(GetDefautlOption(props.Module))

    //HANDLE RESET FILTER PROP AND SEND ALL CHECKED
    useEffect(() => {
        if (props.Reset) {
            //setSelectedOption(GetDefautlOption(props.Module))
            props.OnChange(GetDefautlOption(props.Module))
        }
    }, [props.Reset])

    //ON CHANGE HANDLER FOR SELECT
    function onChange(SelectedOption) {
        props.OnChange(SelectedOption)
        //setSelectedOption(SelectedOption)
    }

    return (
        <div>
            <Select
                className={`OrderBy  ${props.Tema === 'Escuro' ? 'OrderByEscuro' : 'OrderByClaro'} `}
                defaultValue={GetDefautlOption(props.Module)}
                closeMenuOnSelect={true}
                hideSelectedOption={false}
                controlShouldRenderValue={false}
                getOptionLabel={(Options) => { return Options["Value"]; }}
                getOptionValue={(Options) => { return Options["Value"]; }}
                onChange={onChange}
                options={Options}
                components={{
                    Option: InputOption,
                    Placeholder: e => CustomPlaceholder('Ordenar'),
                    Menu: (props) => <components.Menu {...props} className="FilterSelect-Menu" />
                }}
                noOptionsMessage={noOptionsMessage}
                styles={OrderByStyles}
                hideClearAll={true}
                isClearable={false}
                isSearchable={false}
            //value={SelectedOption}
            />
        </div>
    );
}



const ConnectedOrderBy = connect((state) => {
    return {
        Tema: state.Tema,
    }
})(OrderBy)

export default ConnectedOrderBy











