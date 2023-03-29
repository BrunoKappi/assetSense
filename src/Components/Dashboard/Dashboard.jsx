
import './Dashboard.css'

import React from "react";


export default function Dashboard() {





  return (

    <div className={localStorage.getItem('AssetSenseTema') === 'Escuro' ? 'DashboardContainerEscuro DashboardContainer' : 'DashboardContainerClaro DashboardContainer'}>



    </div>
 

  )
}
