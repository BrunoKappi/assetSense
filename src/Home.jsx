import React from 'react'
import { Oval } from "react-loader-spinner";
import { Navigate } from "react-router-dom";
import Login from './Components/Login/Login'

export default function Home({ CheckedLogin, Email, To }) {



  if (CheckedLogin) {
    if (Email) {
      return <Navigate to="/Assets/Dash" />;
    } else {
      return <Login />;
    }
  } else {
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
}
