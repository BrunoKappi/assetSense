import React from 'react'
import Chart from 'react-apexcharts'
import { GetUserTypesFromStore, GetUsersFromStore } from '../../../../Functions/Middleware'

export default function BarChart(props) {






    const ChartProps = {
        series: [
            {
                name: 'Quantidade',
                data: [...props.Series],

            },


        ],
        options: {
            plotOptions: {
                bar: {
                    borderRadius: 5,
                    borderRadiusApplication: 'end',
                    horizontal: false,
                }
            },
            colors: [props.Mono], // COR DE PREENCHIMENTO DA BARRA

            chart: {
                type: "pie", // define o tipo de gráfico como "pie"               
                width: "100%", // adiciona a propriedade de altura com valor 100%
                height: "700px", // adiciona a propriedade de altura com valor 100%
                fontFamily: 'Kanit, Sans-serif',
                toolbar: {
                    tools: {
                        download: false
                    }
                }

            },

            title: {
                text: props.Title,
                style: {
                    color: "var(--Charts-Title-Color)", // COR DO TITULO
                    fontWeight: 400
                }
            },

            labels: [...props.Labels],
            legend: {
                show: true
            },
            dataLabels: {
                style: {
                    fontSize: ".7rem",
                    colors: ['var(--Charts-Bars-Legend-Color)'],
                    fontFamily: 'Kanit, Sans-serif',
                    fontWeight: 400
                },
            },

            xaxis: {
                categories: [...props.Labels],
                position: 'bottom',
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },

                tooltip: {
                    enabled: true,
                },
                labels: {
                    show: true, // Mostrar as legendas do eixo X
                    style: {
                        colors: 'var(--Charts-BarColor-XAxis)', // define a cor da letra eixo X
                        fontSize: ".7rem", // TAMANHO DA FONTE DO EIXO X
                    },

                }
            },


            yaxis: {
                labels: {
                    show: false, // Mostrar as legendas do eixo y
                    style: {
                        colors: 'var(--Charts-BarColor-YAxis)', // define a cor da letra eixo X
                        fontSize: ".7rem", // TAMANHO DA FONTE DO EIXO Y
                    }
                }
            }


        }
    }



    return (
        <Chart options={ChartProps.options} series={ChartProps.series} type='bar' height={'100%'} download={false} />
    )
}
