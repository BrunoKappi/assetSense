import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import Forget from './Components/Forget/Forget';
import NotFound from './Components/NotFound/NotFound';
import Layout from './Components/Layout/Layout'
import Home from './Home';
import Ativos from './Components/Ativos/Ativos'
import Users from './Components/Users/Users'
import Profile from './Components/Profile/Profile'
import Config from './Components/Config/Config'
import Dashboard from './Components/Dashboard/Dashboard';
import { ReactNotifications } from 'react-notifications-component'
import { GetTema } from './Functions/Middleware';
 

const App = (props) => {
   

  GetTema() 

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
        <Route path="/" element={<Home CheckedLogin={props.LoggedUser.CheckedLogin} Email={props.LoggedUser.Email} />} />
        <Route path="/Forget" element={<Forget />} />
        <Route path="/App" element={<RequireAuth> <Layout /> </RequireAuth>}>
          <Route path="/App/Dash" element={<RequireAuth> <Dashboard /> </RequireAuth>} />
          <Route path="/App/Ativos" element={<RequireAuth> <Ativos /> </RequireAuth>} />
          <Route path="/App/Profile" element={<RequireAuth> <Profile /> </RequireAuth>} />
          <Route path="/App/Config" element={<RequireAuth> <Config /> </RequireAuth>} />
          <Route path="/App/Users" element={<RequireAuth> <Users /> </RequireAuth>} />
          <Route path="*" element={<RequireAuth> <NotFound /> </RequireAuth>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div> 
  );
}
 
const ConnectedApp = connect((state) => {
  return {
    LoggedUser: state.LoggedUser
  };
})(App);

export default ConnectedApp;
