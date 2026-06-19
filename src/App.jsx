import React, { useEffect } from 'react';
import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { env } from './Config/env';
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
import { DefaultUser } from './Config/store/reducers/CurrentUser';



const App = ({ LoggedUser }) => {

  useEffect(() => {
    const PhotoNames = [...Object.keys(DefaultTenantPhotos)]
    const TenantPhotos = { ...DefaultTenantPhotos }
    PhotoNames.forEach((PhotoName) => {
      TenantPhotos[PhotoName] = "https://cdn.bkappi.com/ProjectsAssets/BkappiGeneral/bkappiIcon.ico"
    })
    store.dispatch(setTenantPhotosAction(TenantPhotos))
  }, []);

  useEffect(() => {
    if (LoggedUser.Email) {
      console.log("LoggedUser.Email is present:", LoggedUser.Email);
      FIREBASE_GetUserByEmail("Users", LoggedUser.Email).then((Response) => {
        console.log("FIREBASE_GetUserByEmail response:", Response);
        if (Response && Response.length > 0) {
          const User = { ...Response[0] }
          const Theme = User?.Preference?.Theme || 'LightTheme'
          const Tenant = User?.Tenant?.Name || ''
          SetCurrentUserOnStore({ ...User, uid: LoggedUser.uid, CheckedLogin: true })
          SetTema(Theme)
          FillStore()
          SetTenant(Tenant)
        } else {
          console.warn("No document found in Firestore for email:", LoggedUser.Email);
          const FallbackUser = {
            ...DefaultUser,
            Name: "Usuário",
            LastName: "Temporário",
            Email: LoggedUser.Email,
            uid: LoggedUser.uid,
            Preference: {
              Theme: 'LightTheme',
              Language: 'pt-BR',
              FontFamily: 'Inter'
            },
            CheckedLogin: true
          }
          SetCurrentUserOnStore(FallbackUser)
          SetTema('LightTheme')
          FillStore()
          SetTenant(env.VITE_REACT_TENANT_NAME || 'SerranoTeste')
        }
      }).catch((err) => {
        console.error("Error loading user info from Firestore:", err);
      })
    } else {
      console.log("LoggedUser.Email is not present yet.");
    }
  }, [LoggedUser.Email, LoggedUser.uid]);

  const RequireAuth = ({ children }) => LoggedUser.Email ? children : <Navigate to="/" />



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
