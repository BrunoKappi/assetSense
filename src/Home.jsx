import React from 'react'
import { Oval } from "react-loader-spinner";
import { Navigate } from "react-router-dom";
import Login from './Components/Login/Login'



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

export default function Home({ CheckedLogin, Email, To, Tenant }) {

  //console.log("Tenant HOME", Tenant)

  if (CheckedLogin) {
    if (Email) {
      if (Tenant) {
        return <Navigate to="/Serrano/Assets/Dash" />;
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
