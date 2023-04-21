import Select from "react-select";
import { connect } from 'react-redux'
import './OrderBy.css'
import { CustomLabel, CustomPlaceholder, OrderByStyles, InputOption, noOptionsMessage } from "./OrderByUtils";
import { useState, useEffect } from "react";



const RecordsOrderByOptions = [
    {
        label: <CustomLabel text="Order por" />,
        options: [
            { Value: 'Mais Recentes' },
            { Value: 'Mais Antigos' },
            { Value: 'Tempo de Uso' },
            { Value: 'Status' },
        ],
    },
]


const DefaultOption = { Value: 'Mais Recentes' }


//GET INITIAL VALUES FOR CHECK ALL
const GetInitialValues = (Module) => {
    switch (Module) {
        case 'Records':
            return RecordsOrderByOptions
        default:
            break;
    }
}


//GET INITIAL VALUES FOR CHECK ALL
export const GetDefautlOption = (Module) => {
    switch (Module) {
        case 'Records':
            return DefaultOption
        default:
            break;
    }

}

const OrderBy = (props) => {




    //OPTIONS STATE
    const Options = GetInitialValues(props.Module)
    const [SelectedOption, setSelectedOption] = useState(GetDefautlOption(props.Module))

    //HANDLE RESET FILTER PROP AND SEND ALL CHECKED
    useEffect(() => {
        if (props.Reset) {
            setSelectedOption(GetDefautlOption(props.Module))
            props.OnChange(GetDefautlOption(props.Module))
        }
    }, [props.Reset])

    //ON CHANGE HANDLER FOR SELECT
    function onChange(SelectedOption) {      
        props.OnChange(SelectedOption)
        setSelectedOption(SelectedOption)
    }

    return (
        <div>
            <Select
                className={`OrderBy  ${props.Tema === 'Escuro' ? 'OrderByEscuro' : 'OrderByClaro'} `}
                defaultValue={GetDefautlOption(props.Module)}
                closeMenuOnSelect={false}
                hideSelectedOption={false}
                controlShouldRenderValue={false}
                getOptionLabel={(Options) => { return Options["Value"]; }}
                getOptionValue={(Options) => { return Options["Value"]; }}
                onChange={onChange}
                options={Options}
                components={{
                    Option: InputOption,
                    Placeholder: e => CustomPlaceholder('Ordenar')
                }}
                noOptionsMessage={noOptionsMessage}
                styles={OrderByStyles}
                hideClearAll={true}
                isClearable={false}
                isSearchable={false}
                value={SelectedOption}
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











