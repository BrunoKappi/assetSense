import React, { useEffect, useState } from 'react';
import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import Forget from './Components/Forget/Forget';
import NotFound from './Components/NotFound/NotFound';
import Layout from './Components/Layout/Layout'
import Home from './Home';
import Assets from './Components/Assets/Assets'
import Users from './Components/Users/Users'
import Profile from './Components/Profile/Profile'
import Config from './Components/Config/Config'
import Dashboard from './Components/Dashboard/Dashboard';
import Records from './Components/Records/Records'
import Requests from './Components/Requests/Requests'
import { ReactNotifications } from 'react-notifications-component'

const App = (props) => {


  fetch('https://us-central1-assetsense.cloudfunctions.net/GetData?collection=Setores')
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });



  const RequireAuth = ({ children }) => {
    if (props.LoggedUser.Email) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  };


  return (
    <div className="App">
      <ReactNotifications />
      <Routes>
        <Route path="/" element={<Home CheckedLogin={props.LoggedUser.CheckedLogin} Email={props.LoggedUser.Email} To={props.To} Tenant={props.Tenant} />} />
        <Route path="/Serrano" element={<Home CheckedLogin={props.LoggedUser.CheckedLogin} Email={props.LoggedUser.Email} To={props.To} Tenant={props.Tenant} />} />
        <Route path="/Forget" element={<Forget />} />
        <Route path="/Serrano/Assets" element={<RequireAuth> <Layout /> </RequireAuth>}>
          <Route path="/Serrano/Assets/Dash" element={<RequireAuth> <Dashboard /> </RequireAuth>} />
          <Route path="/Serrano/Assets/Assets" element={<RequireAuth> <Assets /> </RequireAuth>} />
          <Route path="/Serrano/Assets/Profile" element={<RequireAuth> <Profile /> </RequireAuth>} />
          <Route path="/Serrano/Assets/Config" element={<RequireAuth> <Config /> </RequireAuth>} />
          <Route path="/Serrano/Assets/Users" element={<RequireAuth> <Users /> </RequireAuth>} />
          <Route path="/Serrano/Assets/Records" element={<RequireAuth> <Records /> </RequireAuth>} />
          <Route path="/Serrano/Assets/Requests" element={<RequireAuth> <Requests /> </RequireAuth>} />
          <Route path="*" element={<RequireAuth> <NotFound /> </RequireAuth>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

const ConnectedApp = connect((state) => {
  return {
    LoggedUser: state.LoggedUser,
    Tenant: state.Tenant
  };
})(App);

export default ConnectedApp;
