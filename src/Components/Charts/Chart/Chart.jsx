import React from 'react'
import { GetFunctions } from '../ChartsUtils'
import PieChart from '../DefaultCharts/PieChart/PieChart'
import BarChart from '../DefaultCharts/BarChart/BarChart'

export default function Chart(props) {

    const Get = GetFunctions[props.Chart]

    //const [Values, setValues] = useState()
    const Values = Get()
    //const [Series, setSeries] = useState([])
    //const [Labels, setLabels] = useState([])

    const Series = Values.series
    const Labels = Values.labels

    return (
        <>
            {props.ChartType === 'Pie' && <PieChart Series={Series} Labels={Labels} />}
            {props.ChartType === 'Bar' && <BarChart Series={Series} Labels={Labels} />}
        </>


    )
}
