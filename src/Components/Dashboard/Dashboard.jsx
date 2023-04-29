
import './Dashboard.css'
import React, {  useState } from "react";
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

  //ASSET TYPES
  const GetAssetTypesData = GetFunctions["AssetTypes"]
  const AssetTypesLabels = GetAssetTypesData('AssetTypes').labels
  const AssetTypesSeries = GetAssetTypesData('AssetTypes').series

  //SECTORS
  const GetSectorsData = GetFunctions["Sectors"]
  const SectorsLabels = GetSectorsData('Sectors').labels
  const SectorsSeries = GetSectorsData('Sectors').series

  //TypesUsuaios
  const GetTypesUsuaiosData = GetFunctions["UserTypes"]
  const TypesUsuaiosLabels = GetTypesUsuaiosData('UserTypes').labels
  const TypesUsuaiosSeries = GetTypesUsuaiosData('UserTypes').series

  //Locais de Armazenamento
  const GetAssetsStorageLocationsData = GetFunctions["StorageLocations"]
  const AssetsStorageLocationsLabels = GetAssetsStorageLocationsData('StorageLocations').labels
  const AssetsStorageLocationsSeries = GetAssetsStorageLocationsData('StorageLocations').series

  //Status de Ativos
  const GetAssetsStatusData = GetFunctions["AssetsStatus"]
  const AssetsStatusLabels = GetAssetsStatusData('AssetsStatus').labels
  const AssetsStatusSeries = GetAssetsStatusData('AssetsStatus').series

  //UsageTypes
  const GetUsageTypesData = GetFunctions["UsageTypes"]
  const UsageTypesLabels = GetUsageTypesData('UsageTypes').labels
  const UsageTypesSeries = GetUsageTypesData('UsageTypes').series

  //UsageTypes
  const GetRecordsPendentesEmUsoData = GetFunctions["RecordsPendentesUso"]
  const RecordsPendentesEmUsoLabels = GetRecordsPendentesEmUsoData().labels
  const RecordsPendentesEmUsoSeries = GetRecordsPendentesEmUsoData().series

  //TOP 5 ATIVOS RETIRADO
  const GetTop5AssetsRetiradosEmUsoData = GetFunctions["Top5AssetsRetirados"]
  const Top5AssetsRetiradosEmUsoLabels = GetTop5AssetsRetiradosEmUsoData().labels
  const Top5AssetsRetiradosEmUsoSeries = GetTop5AssetsRetiradosEmUsoData().series

  //TOP 5 USERS RETIRADO
  const GetTop5UsersRetiradosEmUsoData = GetFunctions["Top5UsersRetirados"]
  const Top5UsersRetiradosEmUsoLabels = GetTop5UsersRetiradosEmUsoData().labels
  const Top5UsersRetiradosEmUsoSeries = GetTop5UsersRetiradosEmUsoData().series


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



  return (

    <div className={props.Tema === 'Escuro' ? 'DashboardContainerEscuro DashboardContainer' : 'DashboardContainerClaro DashboardContainer'}>


      <Show Show={
        !props.Tema ||
        props.Assets.length === 0 ||
        props.Sectors.length === 0 ||
        props.Users.length === 0 ||
        props.StorageLocations.length === 0 ||
        props.UserTypes.length === 0 ||
        props.UsageTypes.length === 0 ||
        props.AssetTypes.length === 0
      }>
        <Loading />
      </Show>


      {
        props.Tema &&
        props.Assets &&
        props.Sectors &&
        props.Users &&
        props.StorageLocations &&
        props.UserTypes &&
        props.UsageTypes &&
        props.AssetTypes &&
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



          <TabsContainer Direction="row" Tema ={props.Tema}>
            <TabButton ButtonName="DashAssets" Key={key} onClick={(k) => SetKeyConfig('DashAssets')} />
            <TabButton ButtonName="DahUsers" Key={key} onClick={(k) => SetKeyConfig('DahUsers')} />
            <TabButton ButtonName="DashTypes" Key={key} onClick={(k) => SetKeyConfig('DashTypes')} />
          </TabsContainer>


          {key === 'DashAssets' &&

            <div className='DashBoard-Charts-Container'>

              <div className='ChartCointer'>
                <BarChart Mono={Color} Title="Ativos por Tipo" Series={AssetTypesSeries} Labels={AssetTypesLabels} />
              </div>

              <div className='ChartCointer'>
                <BarChart Mono={Color} Title="Ativos por Local de Armazenamento" Series={AssetsStorageLocationsSeries} Labels={AssetsStorageLocationsLabels} />
              </div>

              <div className='ChartCointer'>
                <BarChart Mono={Color} Title="Ativos por Status" Series={AssetsStatusSeries} Labels={AssetsStatusLabels} />
              </div>

              <div className='ChartCointer'>
                <BarChart Mono={Color} Title="Ativos por Tipo de Uso" Series={UsageTypesSeries} Labels={UsageTypesLabels} />
              </div>

              <div className='ChartCointer'>
                <PieChart Mono={Color} Title="Ativos por Tipo" Series={AssetTypesSeries} Labels={AssetTypesLabels} />
              </div>

              <div className='ChartCointer'>
                <PieChart Mono={Color} Title="Ativos por Local de Armazenamento" Series={AssetsStorageLocationsSeries} Labels={AssetsStorageLocationsLabels} />
              </div>

              <div className='ChartCointer'>
                <PieChart Mono={Color} Title="Ativos por Status" Series={AssetsStatusSeries} Labels={AssetsStatusLabels} />
              </div>

              <div className='ChartCointer'>
                <PieChart Mono={Color} Title="Ativos por Tipo de Uso" Series={UsageTypesSeries} Labels={UsageTypesLabels} />
              </div>

            </div>

          }


          {key === 'DahUsers' &&
            <div className='DashBoard-Charts-Container'>

              <div className='ChartCointer'>
                <BarChart Mono={Color} Title="Usuários por Setor" Series={SectorsSeries} Labels={SectorsLabels} />
              </div>

              <div className='ChartCointer'>
                <BarChart Mono={Color} Title="Usuários por Tipo" Series={TypesUsuaiosSeries} Labels={TypesUsuaiosLabels} />
              </div>

              <div className='ChartCointer'>
                <PieChart Mono={Color} Title="Usuários por Setor" Series={SectorsSeries} Labels={SectorsLabels} />
              </div>


              <div className='ChartCointer'>
                <PieChart Mono={Color} Title="Usuários por Tipo" Series={TypesUsuaiosSeries} Labels={TypesUsuaiosLabels} />
              </div>



            </div>
          }

          {key === 'DashTypes' &&
            <>
              <div className='DashBoard-Charts-Container'>

                <div className='ChartCointer'>
                  <BarChart Mono={Color} Title="Registros de Retiradas de Ativos" Series={RecordsPendentesEmUsoSeries} Labels={RecordsPendentesEmUsoLabels} />
                </div>

                <div className='ChartCointer'>
                  <BarChart Mono={Color} Title="Top 5 Ativos retirados" Series={Top5AssetsRetiradosEmUsoSeries} Labels={Top5AssetsRetiradosEmUsoLabels} />
                </div>

                <div className='ChartCointer'>
                  <BarChart Mono={Color} Title="Top 5 Retiradas por Usuário" Series={Top5UsersRetiradosEmUsoSeries} Labels={Top5UsersRetiradosEmUsoLabels} />
                </div>


                <div className='ChartCointer'>
                  <PieChart Mono={Color} Title="Registros de Retiradas de Ativos" Series={RecordsPendentesEmUsoSeries} Labels={RecordsPendentesEmUsoLabels} />
                </div>

                <div className='ChartCointer'>
                  <PieChart Mono={Color} Title="Top 5 Ativos retirados" Series={Top5AssetsRetiradosEmUsoSeries} Labels={Top5AssetsRetiradosEmUsoLabels} />
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
    Assets: state.Assets,
    Sectors: state.Sectors,
    Users: state.Users,
    RecordsAssets: state.RecordsAssets,
    UserTypes: state.UserTypes,
    StorageLocations: state.StorageLocations,
    UsageTypes: state.UsageTypes,
    AssetTypes: state.AssetTypes,
  }
})(Dashboard)

export default ConnectedDashboard



