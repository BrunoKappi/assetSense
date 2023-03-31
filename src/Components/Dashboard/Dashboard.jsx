
import './Dashboard.css'
import React from "react";
import { connect } from 'react-redux'

const Dashboard = (props) => {





  return (

    <div className={props.Tema === 'Escuro' ? 'DashboardContainerEscuro DashboardContainer' : 'DashboardContainerClaro DashboardContainer'}>



    </div>


  )
}

const ConnectedDashboard = connect((state) => {
  return {
    Tema: state.Tema
  }
})(Dashboard)

export default ConnectedDashboard

