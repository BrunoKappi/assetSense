import React, { useEffect, useState } from 'react'
import { GetFunctions } from '../ChartsUtils'
import PieChart from '../DefaultCharts/PieChart/PieChart'
import BarChart from '../DefaultCharts/BarChart/BarChart'

export default function Chart(props) {



    const Get = GetFunctions[props.Chart]

    const [Values, setValues] = useState()
    const [Series, setSeries] = useState([])
    const [Labels, setLabels] = useState([])


    useEffect(() => {
        setValues(Get())
    }, [])


    useEffect(() => {
        if (Values) {
           //COMENTADO  console.log(Values)
            setSeries(Values.series)
            setLabels(Values.labels)
        }
    }, [Values])



    useEffect(() => {
       //COMENTADO  console.log(Labels)
    }, [Series])




    return (
        <>
            {props.ChartType === 'Pie' && <PieChart Series={Series} Labels={Labels} />}
            {props.ChartType === 'Bar' && <BarChart Series={Series} Labels={Labels} />}
        </>


    )
}
