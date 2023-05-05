import React from 'react';
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
import { GetTema } from './Functions/StoreMiddleware';
import { FIREBASE_Get } from './Config/firebase/metodos2';




const App = (props) => {

  /*
  const DatabaseTransfer = [
    { From: 'Setores', To: 'Departments' },
    { From: 'TiposUsuarios', To: 'UserTypes' },
    { From: 'TiposAtivo', To: 'AssetTypes' },
    { From: 'LocaisArmazenamento', To: 'StorageLocations' },
    { From: 'StatusAtivos', To: 'AssetStatus' },
    { From: 'TiposUso', To: 'UsageTypes' },
    { From: 'Usuarios', To: 'Users' },
    { From: 'Ativos', To: 'Assets' },
    { From: 'Records', To: 'AssetTransactions' },
    { From: 'Requests', To: 'Requests' },
    { From: 'RequestsStatus', To: 'RequestStatus' },
    { From: 'RequestsTypes', To: 'RequestTypes' },
  ]

  DatabaseTransfer.forEach((Collection) => {
    FIREBASE_Get(Collection.From).then((Lista) => {
      //console.log(Collection.From, Lista.length)
      return 
      Lista.forEach((Item) => {
        FIREBASE_Add(Collection.To, Item).then(() => {
          //console.log("ADDED")
        })
      })
    })
  })
  */











  /*
    const data = { name: 'John', age: 30 };
 
  fetch('http://localhost:8080/api/Type', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then((res) => res.json())
    .then((data) => {
      //console.log("REQUISICAO", data);
    })
    .catch((error) => {
      console.error("REQUISICAO", error);
    });

  */



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
        <Route path="/" element={<Home CheckedLogin={props.LoggedUser.CheckedLogin} Email={props.LoggedUser.Email} To={props.To} />} />
        <Route path="/Forget" element={<Forget />} />
        <Route path="/Assets" element={<RequireAuth> <Layout /> </RequireAuth>}>
          <Route path="/Assets/Dash" element={<RequireAuth> <Dashboard /> </RequireAuth>} />
          <Route path="/Assets/Assets" element={<RequireAuth> <Assets /> </RequireAuth>} />
          <Route path="/Assets/Profile" element={<RequireAuth> <Profile /> </RequireAuth>} />
          <Route path="/Assets/Config" element={<RequireAuth> <Config /> </RequireAuth>} />
          <Route path="/Assets/Users" element={<RequireAuth> <Users /> </RequireAuth>} />
          <Route path="/Assets/Records" element={<RequireAuth> <Records /> </RequireAuth>} />
          <Route path="/Assets/Requests" element={<RequireAuth> <Requests /> </RequireAuth>} />
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
