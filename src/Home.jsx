import React from 'react'
import { Oval } from "react-loader-spinner";
import { Navigate } from "react-router-dom";
import Login from './Components/Login/Login'
import { connect } from "react-redux";


const LoadingContainer = () => {
  return <div className='LoadingContainer'>
    <Oval
      color="#2b5aa6"
      wrapperStyle={{}}
      wrapperClass="LoginSpinnerContainer"
      secondaryColor="#2b5aa6cc"
      strokeWidth={7}
      strokeWidthSecondary={7}
    />
  </div>
}

export function Home(props) {

  //console.log("Tenant HOME", Tenant)

  if (props.LoggedUser.CheckedLogin) {
    if (props.LoggedUser.Email) {
      if (props.Tenant) {
        return <Navigate to="Assets/Dash" />;
      } else {
        return <LoadingContainer />
      }
    } else {
      return <Login />;
    }
  } else {
    return <LoadingContainer />
  }
}


const ConnectedHome = connect((state) => {
  return {
    LoggedUser: state.LoggedUser,
    Tenant: state.Tenant
  };
})(Home);

export default ConnectedHome;