
import './Dashboard.css'
import React, { useState } from "react";
import { connect } from 'react-redux'
import PieChart from '../Charts/DefaultCharts/PieChart/PieChart';
import BarChart from '../Charts/DefaultCharts/BarChart/BarChart';
import { GetFunctions } from '../Charts/ChartsUtils';
import { CirclePicker } from "react-color";
import Dropdown from 'react-bootstrap/Dropdown';
import Loading from '../LoadingForTabs/Loading';
import TabsContainer from '../LayoutComponents/TabsContainer/TabsContainer';
import TabButton from '../LayoutComponents/TabButton/TabButton';
import Show from '../LayoutComponents/Show/Show';

const Dashboard = (props) => {

  //SETORES
  const GetSetoresData = GetFunctions["Setores"]
  const SetoresLabels = GetSetoresData('Setores').labels
  const SetoresSeries = GetSetoresData('Setores').series

  //TiposUsuaios
  const GetTiposUsuaiosData = GetFunctions["TiposUsuarios"]
  const TiposUsuaiosLabels = GetTiposUsuaiosData('TiposUsuarios').labels
  const TiposUsuaiosSeries = GetTiposUsuaiosData('TiposUsuarios').series

  //TiposAtivos
  const GetTiposAtivosData = GetFunctions["TiposAtivos"]
  const TiposAtivosLabels = GetTiposAtivosData('TiposAtivos').labels
  const TiposAtivosSeries = GetTiposAtivosData('TiposAtivos').series

  //Locais de Armazenamento
  const GetAtivosLocaisData = GetFunctions["Locais"]
  const AtivosLocaisLabels = GetAtivosLocaisData('Locais').labels
  const AtivosLocaisSeries = GetAtivosLocaisData('Locais').series

  //Status de Ativos
  const GetAtivosStatusData = GetFunctions["StatusAtivos"]
  const AtivosStatusLabels = GetAtivosStatusData('StatusAtivos').labels
  const AtivosStatusSeries = GetAtivosStatusData('StatusAtivos').series

  //TiposUso
  const GetTiposUsoData = GetFunctions["TiposUso"]
  const TiposUsoLabels = GetTiposUsoData('TiposUso').labels
  const TiposUsoSeries = GetTiposUsoData('TiposUso').series

  //TiposUso
  const GetRecordsPendentesEmUsoData = GetFunctions["RecordsPendentesUso"]
  const RecordsPendentesEmUsoLabels = GetRecordsPendentesEmUsoData().labels
  const RecordsPendentesEmUsoSeries = GetRecordsPendentesEmUsoData().series

  //TOP 5 ATIVOS RETIRADO
  const GetTop5AtivosRetiradosEmUsoData = GetFunctions["Top5AtivosRetirados"]
  const Top5AtivosRetiradosEmUsoLabels = GetTop5AtivosRetiradosEmUsoData().labels
  const Top5AtivosRetiradosEmUsoSeries = GetTop5AtivosRetiradosEmUsoData().series

  //TOP 5 USERS RETIRADO
  const GetTop5UsersRetiradosEmUsoData = GetFunctions["Top5UsersRetirados"]
  const Top5UsersRetiradosEmUsoLabels = GetTop5UsersRetiradosEmUsoData().labels
  const Top5UsersRetiradosEmUsoSeries = GetTop5UsersRetiradosEmUsoData().series


  //STATES
  const [Color, setColor] = useState('#2b5aa6')
  const [key, setKey] = useState('DashAtivos');

  //SET KEY OF TAB
  const SetKeyConfig = (Key) => {
    setKey(Key)
  }

  //CHANGE COLOR OF GRAPHS
  const handleChangeColor = (color) => {
    setColor(color.hex)
    setChartContainerBorder(color.hex)
  }



  return (

    <div className={props.Tema === 'Escuro' ? 'DashboardContainerEscuro DashboardContainer' : 'DashboardContainerClaro DashboardContainer'}>


      <Show Show={
        !props.Tema ||
        props.Ativos.length === 0 ||
        props.Setores.length === 0 ||
        props.Usuarios.length === 0 ||
        props.StorageLocations.length === 0 ||
        props.TiposUsuarios.length === 0 ||
        props.TiposDeUso.length === 0 ||
        props.TiposAtivos.length === 0
      }>
        <Loading />
      </Show>


      {
        props.Tema &&
        props.Ativos &&
        props.Setores &&
        props.Usuarios &&
        props.StorageLocations &&
        props.TiposUsuarios &&
        props.TiposDeUso &&
        props.TiposAtivos &&
        <>

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



          <TabsContainer Tema={props.Tema}>
            <TabButton ButtonName="DashAtivos" Key={key} onClick={(k) => SetKeyConfig('DashAtivos')} />
            <TabButton ButtonName="DahUsuarios" Key={key} onClick={(k) => SetKeyConfig('DahUsuarios')} />
            <TabButton ButtonName="DashTipos" Key={key} onClick={(k) => SetKeyConfig('DashTipos')} />
          </TabsContainer>


          {key === 'DashAtivos' &&

            <div className='DashBoard-Charts-Container'>

              <div className='ChartCointer'>
                <BarChart Mono={Color} Title="Ativos por Tipo" Series={TiposAtivosSeries} Labels={TiposAtivosLabels} />
              </div>

              <div className='ChartCointer'>
                <BarChart Mono={Color} Title="Ativos por Local de Armazenamento" Series={AtivosLocaisSeries} Labels={AtivosLocaisLabels} />
              </div>

              <div className='ChartCointer'>
                <BarChart Mono={Color} Title="Ativos por Status" Series={AtivosStatusSeries} Labels={AtivosStatusLabels} />
              </div>

              <div className='ChartCointer'>
                <BarChart Mono={Color} Title="Ativos por Tipo de Uso" Series={TiposUsoSeries} Labels={TiposUsoLabels} />
              </div>

              <div className='ChartCointer'>
                <PieChart Mono={Color} Title="Ativos por Tipo" Series={TiposAtivosSeries} Labels={TiposAtivosLabels} />
              </div>

              <div className='ChartCointer'>
                <PieChart Mono={Color} Title="Ativos por Local de Armazenamento" Series={AtivosLocaisSeries} Labels={AtivosLocaisLabels} />
              </div>

              <div className='ChartCointer'>
                <PieChart Mono={Color} Title="Ativos por Status" Series={AtivosStatusSeries} Labels={AtivosStatusLabels} />
              </div>

              <div className='ChartCointer'>
                <PieChart Mono={Color} Title="Ativos por Tipo de Uso" Series={TiposUsoSeries} Labels={TiposUsoLabels} />
              </div>

            </div>

          }


          {key === 'DahUsuarios' &&
            <div className='DashBoard-Charts-Container'>

              <div className='ChartCointer'>
                <BarChart Mono={Color} Title="Usuários por Setor" Series={SetoresSeries} Labels={SetoresLabels} />
              </div>

              <div className='ChartCointer'>
                <BarChart Mono={Color} Title="Usuários por Tipo" Series={TiposUsuaiosSeries} Labels={TiposUsuaiosLabels} />
              </div>

              <div className='ChartCointer'>
                <PieChart Mono={Color} Title="Usuários por Setor" Series={SetoresSeries} Labels={SetoresLabels} />
              </div>


              <div className='ChartCointer'>
                <PieChart Mono={Color} Title="Usuários por Tipo" Series={TiposUsuaiosSeries} Labels={TiposUsuaiosLabels} />
              </div>



            </div>
          }

          {key === 'DashTipos' &&
            <>
              <div className='DashBoard-Charts-Container'>

                <div className='ChartCointer'>
                  <BarChart Mono={Color} Title="Registros de Retiradas de Ativos" Series={RecordsPendentesEmUsoSeries} Labels={RecordsPendentesEmUsoLabels} />
                </div>

                <div className='ChartCointer'>
                  <BarChart Mono={Color} Title="Top 5 Ativos retirados" Series={Top5AtivosRetiradosEmUsoSeries} Labels={Top5AtivosRetiradosEmUsoLabels} />
                </div>

                <div className='ChartCointer'>
                  <BarChart Mono={Color} Title="Top 5 Retiradas por Usuário" Series={Top5UsersRetiradosEmUsoSeries} Labels={Top5UsersRetiradosEmUsoLabels} />
                </div>


                <div className='ChartCointer'>
                  <PieChart Mono={Color} Title="Registros de Retiradas de Ativos" Series={RecordsPendentesEmUsoSeries} Labels={RecordsPendentesEmUsoLabels} />
                </div>

                <div className='ChartCointer'>
                  <PieChart Mono={Color} Title="Top 5 Ativos retirados" Series={Top5AtivosRetiradosEmUsoSeries} Labels={Top5AtivosRetiradosEmUsoLabels} />
                </div>

                <div className='ChartCointer'>
                  <PieChart Mono={Color} Title="Top 5 Retiradas por Usuário" Series={Top5UsersRetiradosEmUsoSeries} Labels={Top5UsersRetiradosEmUsoLabels} />
                </div>


              </div>

            </>

          }


        </>
      }


    </div >
  )
}

const ConnectedDashboard = connect((state) => {
  return {
    Tema: state.Tema,
    Ativos: state.Ativos,
    Setores: state.Setores,
    Usuarios: state.Usuarios,
    RecordsAtivos: state.RecordsAtivos,
    TiposUsuarios: state.TiposUsuarios,
    StorageLocations: state.StorageLocations,
    TiposDeUso: state.TiposDeUso,
    TiposAtivos: state.TiposAtivos,
  }
})(Dashboard)

export default ConnectedDashboard



