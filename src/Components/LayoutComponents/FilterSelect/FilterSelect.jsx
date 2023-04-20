import Select from "react-select";
import { connect } from 'react-redux'
import './FilterSelect.css'
import { CustomLabel, CustomPlaceholder, FilterSelectStyles, InputOption, noOptionsMessage } from "./FilterSelectUtils";
import { useState,useEffect } from "react";


const FilterSelect = (props) => { 

    //ATIVOS OPTIONS
    const AtivosFilterOptions = [
        {
            label: <CustomLabel List='LocaisArmazenamento' text='Locais de Armazenamento' />,
            options: props.LocaisArmazenamento.map((tipo) => ({ ...tipo, list: 'LocaisArmazenamento' })),
        },
        {
            label: <CustomLabel List='StatusAtivos' text='Status de Ativos' />,
            options: props.StatusAtivos.map((tipo) => ({ ...tipo, list: 'StatusAtivos' })),
        },
        {
            label: <CustomLabel List='TiposAtivos' text='Tipos de Ativos' />,
            options: props.TiposAtivos.map((tipo) => ({ ...tipo, list: 'TiposAtivos' })),
        },
        {
            label: <CustomLabel List='TiposDeUso' text='Tipos de Uso' />,
            options: props.TiposDeUso.map((tipo) => ({ ...tipo, list: 'TiposDeUso' })),
        },
    ]

    //USER OPTIONS
    const UserFilterOptions = [
        {
            label: <CustomLabel List='Setores' text="Filtro de Setores" />,
            options: props.Setores.map((setor) => ({ ...setor, list: 'Setores' })),
        },
        {
            label: <CustomLabel List='TiposUsuarios' text='Filtro de Tipo de Usuarios' />,
            options: props.TiposUsuarios.map((tipo) => ({ ...tipo, list: 'TiposUsuarios' })),
        },
    ]

    //GET INITIAL VALUES FOR CHECK ALL
    const GetInitialValues = () => {
        switch (props.Module) {
            case 'FilterUsers':
                return UserFilterOptions
            case 'FilterAtivos':
                return AtivosFilterOptions
            default:
                break;
        }
    }

    //GET INITIAL VALUES FOR CHECK ALL
    const GetInitialValuesChecked = () => {
        var selectedOptions = allOptions
        const selectedByList = {}
        selectedOptions.forEach((option) => {
            if (!selectedByList[option.list]) {
                selectedByList[option.list] = [];
            }
            selectedByList[option.list].push(option);
        })
        return selectedByList
    }

    //OPTIONS STATE
    const options = GetInitialValues()
    const [SelectedOptions, setSelectedOptions] = useState(GetInitialValues().flatMap((option) => option.options))
    const allOptions = GetInitialValues().flatMap((option) => option.options)

    //RESET FILTERS ALL CHECKED
    const ResetFilters = () => {
        setSelectedOptions(allOptions)
    }

    //HANDLE RESET FILTER PROP AND SEND ALL CHECKED
    useEffect(() => {
        if (props.Reset) {
            ResetFilters()
            props.OnChange(GetInitialValuesChecked())
        }
    }, [props.Reset])

    //ON CHANGE HANDLER FOR SELECT
    function onChange(selectedOptions) {
        const selectedByList = {};
        selectedOptions.forEach((option) => {
            if (!selectedByList[option.list]) {
                selectedByList[option.list] = [];
            }
            selectedByList[option.list].push(option);
        });

        props.OnChange(selectedByList)
        setSelectedOptions(selectedOptions)
    }

    return (
        <div>
            <Select
                className={`FilterSelect  ${props.Tema === 'Escuro' ? 'FilterSelectEscuro' : 'FilterSelectClaro'} `}
                defaultValue={allOptions}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                controlShouldRenderValue={false}
                getOptionLabel={(options) => { return options["Value"]; }}
                getOptionValue={(options) => { return options["id"]; }}
                onChange={onChange}
                options={options}
                components={{
                    Option: InputOption,
                    Placeholder: e => CustomPlaceholder('Filtros')
                }}
                noOptionsMessage={noOptionsMessage}
                styles={FilterSelectStyles}
                hideClearAll={true}
                isClearable={false}
                isSearchable={false}
                value={SelectedOptions}
            />
        </div>
    );
}



const ConnectedFilterSelect = connect((state) => {
    return {
        Tema: state.Tema,
        Setores: state.Setores,
        TiposUsuarios: state.TiposUsuarios,
        TiposAtivos: state.TiposAtivos,
        LocaisArmazenamento: state.LocaisArmazenamento,
        StatusAtivos: state.StatusAtivos,
        TiposDeUso: state.TiposDeUso,
    }
})(FilterSelect)

export default ConnectedFilterSelect















/////////////

const AtivosOrderByOptions = [
    {
        label: <CustomLabel text="Order por" />,
        options: [
            { list: 'OrdenarUser', id: 'Nome', Value: 'Nome' },
            { list: 'OrdenarUser', id: 'Quantidade Disponível', Value: 'Quantidade Disponível' },
            { list: 'OrdenarUser', id: 'Quantidade em Uso', Value: 'Quantidade em Uso' },
        ],
    },


]
const UserOrderByOptions = [
    {
        label: <CustomLabel text="Order por" />,
        options: [
            { list: 'OrdenarUser', id: 'Nome', Value: 'Nome' },
            { list: 'OrdenarUser', id: 'Setor', Value: 'Setor' },
            { list: 'OrdenarUser', id: 'Tipo', Value: 'Tipo' },
        ],
    },
]