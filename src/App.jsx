import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import Forget from './Components/Forget/Forget';
import NotFound from './Components/NotFound/NotFound';
import Layout from './Components/Layout/Layout'
import Home from './Home';
import { ReactNotifications } from 'react-notifications-component'
import { DefaultTenantPhotos } from './GlobalVars';
import { GetUserUrlImage } from './Functions/StorageMiddleware';
import store, { FillStore } from './Config/store/store';
import { setTenantPhotosAction } from './Config/store/actions/TenantPhotosActions';
import { SetCurrentUserOnStore, SetTema, SetTenant } from './Functions/StoreMiddleware';
import { FIREBASE_GetUserByEmail } from './Config/firebase/metodos2';
import { useEffect } from 'react';


const App = ({ LoggedUser }) => {

  const PhotoNames = [...Object.keys(DefaultTenantPhotos)]
  const TenantPhotos = { ...DefaultTenantPhotos }
  const Promisses = []

  PhotoNames.forEach((PhotoName) => {
    const promise = GetUserUrlImage(`${import.meta.env.VITE_REACT_TENANT_NAME}/Assets/${PhotoName}`)
    Promisses.push(promise)
  })

  Promise.all(Promisses).then((urls) => {
    urls.forEach((url, index) => TenantPhotos[PhotoNames[index]] = url)
    store.dispatch(setTenantPhotosAction(TenantPhotos))
  })

  const RequireAuth = ({ children }) => LoggedUser.Email ? children : <Navigate to="/" />


  useEffect(() => {
    if (LoggedUser.Email) {
      FIREBASE_GetUserByEmail("Users", LoggedUser.Email).then((Response) => {
        const User = { ...Response[0] }
        const Theme = User?.Preference?.Theme || 'LightTheme'
        const Tenant = User?.Tenant?.Name || ''
        SetCurrentUserOnStore({ ...User, uid: LoggedUser.uid, CheckedLogin: true })
        SetTema(Theme)
        FillStore()
        SetTenant(Tenant)
      })
    }
  }, [LoggedUser])



  return (
    <div className="App">
      <ReactNotifications />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/Forget"
          element={<Forget />}
        />
        <Route
          path="/Assets/*"
          element={<RequireAuth> <Layout /> </RequireAuth>}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
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
