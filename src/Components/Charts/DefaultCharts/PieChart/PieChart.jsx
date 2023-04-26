import React from 'react'
import Chart from 'react-apexcharts'

export default function PieChart(props) {

    const ChartProps = {
        series: props.Series,
        options: {
            chart: {
                type: "pie", // TYPE DO GRÁFICO             
                fontFamily: 'var(--Fonte)',
                fontWeight: 400
            },
            title: {
                text: props.Title,
                style: {
                    color: "var(--Charts-Title-Color)", // COR DO TITULO
                    fontWeight: 400
                }
            },
            theme: {
                monochrome: {
                    enabled: true,
                    color: props.Mono // COR PARA O MONOCROME
                }
            },

            labels: props.Labels,
            legend: {
                show: false // MOSTRAR AS LEGENDAS
            },
            dataLabels: {
                style: {
                    fontSize: ".7rem", // TAMANHO DA FONTE DAS LABELS DAS FATIAS
                    colors: ['var(--Charts-Pie-Legend-Color)'],
                    fontWeight: 400
                },
                formatter: function (val, opt) {
                    return opt.w.globals.labels[opt.seriesIndex]
                }
            },

        }
    }



    return (
        <Chart options={ChartProps.options} series={ChartProps.series} type='pie' />
    )
} 
