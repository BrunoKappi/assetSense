
import './Dashboard.css'
import React, { useState } from "react";
import { connect } from 'react-redux'
import PieChart from '../Charts/DefaultCharts/PieChart/PieChart';
import BarChart from '../Charts/DefaultCharts/BarChart/BarChart';
import { GetFunctions } from '../Charts/ChartsUtils';
import { CirclePicker } from "react-color";
import Dropdown from 'react-bootstrap/Dropdown';
import TabsContainer from '../LayoutComponents/TabsContainer/TabsContainer';
import TabButton from '../LayoutComponents/TabButton/TabButton';
import { v4 } from 'uuid';


const Dashboard = (props) => {


  //STATES
  const [Color, setColor] = useState('#2b5aa6')
  const [key, setKey] = useState('DashAssets');

  //SET KEY OF TAB
  const SetKeyConfig = (Key) => {
    setKey(Key)
  }

  //CHANGE COLOR OF GRAPHS
  const handleChangeColor = (color) => {
    setColor(color.hex)
    setChartContainerBorder(color.hex)
  }

  const ChartsData = [
    {
      Key: 'DashAssets',
      Title: 'Ativos por Tipo',
      Type: 'Bar',
      Module: 'AssetTypes'
    },
    {
      Key: 'DashAssets',
      Title: 'Ativos por Local de Armazenamento',
      Type: 'Bar',
      Module: 'StorageLocations'
    },
    {
      Key: 'DashAssets',
      Title: 'Ativos por Status',
      Type: 'Bar',
      Module: 'AssetsStatus'
    },
    {
      Key: 'DashAssets',
      Title: 'Ativos por Tipo de Uso',
      Type: 'Bar',
      Module: 'UsageTypes'
    },
    {
      Key: 'DashAssets',
      Title: 'Ativos por Tipo',
      Type: 'Pie',
      Module: 'AssetTypes'
    },
    {
      Key: 'DashAssets',
      Title: 'Ativos por Local de Armazenamento',
      Type: 'Pie',
      Module: 'StorageLocations'
    },
    {
      Key: 'DashAssets',
      Title: 'Ativos por Status',
      Type: 'Pie',
      Module: 'AssetsStatus'
    },
    {
      Key: 'DashAssets',
      Title: 'Ativos por Tipo de Uso',
      Type: 'Pie',
      Module: 'UsageTypes'
    },




    {
      Key: 'DashUsers',
      Title: 'Usuários por Setor',
      Type: 'Bar',
      Module: 'Sectors'
    },
    {
      Key: 'DashUsers',
      Title: 'Usuários por Tipo',
      Type: 'Bar',
      Module: 'UserTypes'
    },
    {
      Key: 'DashUsers',
      Title: 'Usuários por Setor',
      Type: 'Pie',
      Module: 'Sectors'
    },
    {
      Key: 'DashUsers',
      Title: 'Usuários por Tipo',
      Type: 'Pie',
      Module: 'UserTypes'
    },




    {
      Key: 'DashTypes',
      Title: 'Registros de Retiradas de Ativos',
      Type: 'Bar',
      Module: 'RecordsPendentesUso'
    },
    {
      Key: 'DashTypes',
      Title: 'Top 5 Ativos retirados',
      Type: 'Bar',
      Module: 'Top5AssetsRetirados'
    },
    {
      Key: 'DashTypes',
      Title: 'Top 5 Retiradas por Usuário',
      Type: 'Bar',
      Module: 'Top5UsersRetirados'
    },
    {
      Key: 'DashTypes',
      Title: 'Registros de Retiradas de Ativos',
      Type: 'Pie',
      Module: 'RecordsPendentesUso'
    },
    {
      Key: 'DashTypes',
      Title: 'Top 5 Ativos retirados',
      Type: 'Pie',
      Module: 'Top5AssetsRetirados'
    },
    {
      Key: 'DashTypes',
      Title: 'Top 5 Retiradas por Usuário',
      Type: 'Pie',
      Module: 'Top5UsersRetirados'
    },




  ]

  return (

    <div className={props.Tema === 'Dark' ? 'DashboardContainerDark DashboardContainer' : 'DashboardContainerLightTheme DashboardContainer'}>


      <div className='ColorPickerButton'>
        <Dropdown autoClose="inside">
          <Dropdown.Toggle variant="success" id="ColorPickerMenuToggle">
            Mudar cor
          </Dropdown.Toggle>
          <Dropdown.Menu id='ColorPickerMenu'>
            <Dropdown.Item id='ColorPickerItem'>
              <CirclePicker onChange={handleChangeColor} />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <TabsContainer Direction="row" Tema={props.Tema}>
        <TabButton ButtonName="DashAssets" Key={key} onClick={(k) => SetKeyConfig('DashAssets')} />
        <TabButton ButtonName="DashUsers" Key={key} onClick={(k) => SetKeyConfig('DashUsers')} />
        <TabButton ButtonName="DashTypes" Key={key} onClick={(k) => SetKeyConfig('DashTypes')} />
      </TabsContainer>

      <div className='DashBoard-Charts-Container'>
        {ChartsData.map(Chart => {

          if (key !== Chart.Key) return

          const ChartLabels = GetFunctions[Chart.Module](Chart.Module).labels
          const ChartSeries = GetFunctions[Chart.Module](Chart.Module).series

          return <div key={v4()} className='ChartCointer'>
            {Chart.Type === 'Bar' ?
              <BarChart key={v4()}
                Mono={Color}
                Title={Chart.Title}
                Series={ChartSeries}
                Labels={ChartLabels}
              /> :
              <PieChart key={v4()}
                Mono={Color}
                Title={Chart.Title}
                Series={ChartSeries}
                Labels={ChartLabels}
              />
            }
          </div>

        })}

      </div>

    </div >
  )
}

const ConnectedDashboard = connect((state) => {
  return {
    Tema: state.Tema,
    Assets: state.Assets,
    Sectors: state.Sectors,
    Users: state.Users,
    RecordsAssets: state.RecordsAssets,
    UserTypes: state.UserTypes,
    StorageLocations: state.StorageLocations,
    UsageTypes: state.UsageTypes,
    AssetTypes: state.AssetTypes,
    CurrentUser: state.CurrentUser
  }
})(Dashboard)

export default ConnectedDashboard



