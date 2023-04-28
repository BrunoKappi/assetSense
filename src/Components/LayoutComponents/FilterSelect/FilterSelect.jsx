import Select from "react-select";
import { connect } from 'react-redux'
import './FilterSelect.css'
import { CustomLabel, CustomPlaceholder, FilterSelectStyles, InputOption, MenuList, noOptionsMessage } from "./FilterSelectUtils";
import { useState, useEffect, useRef } from "react";

const FilterSelect = (props) => {

    //ASSETS OPTIONS
    const AssetsFilterOptions = [
        {
            label: <CustomLabel List='StorageLocations' text='Locais de Armazenamento' />,
            options: props.StorageLocations.map((type) => ({ ...type, list: 'StorageLocations' })),
        },
        {
            label: <CustomLabel List='AssetsStatus' text='Status de Ativos' />,
            options: props.AssetsStatus.map((type) => ({ ...type, list: 'AssetsStatus' })),
        },
        {
            label: <CustomLabel List='AssetTypes' text='Tipos de  Ativos' />,
            options: props.AssetTypes.map((type) => ({ ...type, list: 'AssetTypes' })),
        },
        {
            label: <CustomLabel List='UsageTypes' text='Tipos de  Uso' />,
            options: props.UsageTypes.map((type) => ({ ...type, list: 'UsageTypes' })),
        },
    ]

    //USER OPTIONS
    const UserFilterOptions = [
        {
            label: <CustomLabel List='Sectors' text="Filtro de Setores" />,
            options: props.Sectors.map((sector) => ({ ...sector, list: 'Sectors' })),
        },
        {
            label: <CustomLabel List='UserTypes' text='Filtro de Tipo de Usuários' />,
            options: props.UserTypes.map((type) => ({ ...type, list: 'UserTypes' })),
        },
    ]

    //GET INITIAL VALUES FOR CHECK ALL
    const GetInitialValues = () => {
        switch (props.Module) {
            case 'FilterUsers':
                return UserFilterOptions
            case 'FilterAssets':
                return AssetsFilterOptions
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
    const allOptions = GetInitialValues().flatMap((option) => option.options)
    const selectRef = useRef(null);

    useEffect(() => {
        props.OnChange(GetInitialValuesChecked())
    }, [])


    //RESET FILTERS ALL CHECKED
    const ResetFilters = () => {
        selectRef.current.setValue(allOptions);
        //setSelectedOptions(allOptions)
        props.OnChange(GetInitialValuesChecked())
    }


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
        //console.log(selectedByList)
        //setSelectedOptions(selectedOptions)
    }

    const handleClearSelection = () => {
        selectRef.current.clearValue();
    };

    return (
        <div>
            <Select
                className={`FilterSelect  ${props.Tema === 'Escuro' ? 'FilterSelectEscuro' : 'FilterSelectClaro'} `}
                defaultValue={allOptions}
                isMulti
                ref={selectRef}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                controlShouldRenderValue={false}
                getOptionLabel={(options) => { return options["Value"]; }}
                getOptionValue={(options) => { return options["id"]; }}
                onChange={onChange}
                options={options}
                components={{
                    Placeholder: e => CustomPlaceholder('Filtros'),
                    MenuList: props => (
                        <MenuList {...props} CheckAll={ResetFilters} UncheckAll={handleClearSelection} className="FilterSelect-Menu" />
                    ),
                    Option: props => (
                        <InputOption {...props} />
                    )
                }}
                noOptionsMessage={noOptionsMessage}
                styles={FilterSelectStyles}
                hideClearAll={true}
                isClearable={false}
                isSearchable={false}
            //value={SelectedOptions}
            />
        </div>
    );
}



const ConnectedFilterSelect = connect((state) => {
    return {
        Tema: state.Tema,
        Sectors: state.Sectors,
        UserTypes: state.UserTypes,
        AssetTypes: state.AssetTypes,
        StorageLocations: state.StorageLocations,
        AssetsStatus: state.AssetsStatus,
        UsageTypes: state.UsageTypes,
    }
})(FilterSelect)

export default ConnectedFilterSelect







