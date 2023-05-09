import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import Forget from './Components/Forget/Forget';
import NotFound from './Components/NotFound/NotFound';
import Layout from './Components/Layout/Layout'
import Home from './Home';
import Assets from './Components/AssetList/Assets/Assets'
import Users from './Components/Users/Users'
import Profile from './Components/Profile/Profile'
import Config from './Components/Config/Config'
import Dashboard from './Components/Dashboard/Dashboard';
import Records from './Components/Records/Records'
import Requests from './Components/Requests/Requests'
import { ReactNotifications } from 'react-notifications-component'
import { DefaultTenantPhotos } from './GlobalVars';
import { GetUserUrlImage } from './Functions/StorageMiddleware';
import store, { FillStore } from './Config/store/store';
import { setTenantPhotosAction } from './Config/store/actions/TenantPhotosActions';
import { GetInfoFromStore, SetCurrentUserOnStore, SetTema, SetTenant } from './Functions/StoreMiddleware';
import { FIREBASE_GetUserByEmail } from './Config/firebase/metodos2';
import { useEffect } from 'react';


const App = (props) => {


  const PhotoNames = [...Object.keys(DefaultTenantPhotos)]
  const TenantPhotos = { ...DefaultTenantPhotos }
  const promises = []

  PhotoNames.forEach((PhotoName) => {
    const promise = GetUserUrlImage(`${import.meta.env.VITE_REACT_TENANT_NAME}/Assets/${PhotoName}`)
    promises.push(promise)
  })

  Promise.all(promises).then((urls) => {
    urls.forEach((url, index) => {
      TenantPhotos[PhotoNames[index]] = url
    });
    store.dispatch(setTenantPhotosAction(TenantPhotos))
  }).catch((error) => {
    //console.error('Uma ou mais promessas falharam:', error)
  })

  const RequireAuth = ({ children }) => {
    if (props.LoggedUser.Email) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  };



  useEffect(() => {
    if (props.LoggedUser.Email) {
      //console.log("")
      FIREBASE_GetUserByEmail("Users", props.LoggedUser.Email).then((Response) => {
        const User = { ...Response[0] }
        const Theme = User?.Preference?.Theme || 'Claro'
        const Tenant = User?.Tenant?.Name || ''
        SetCurrentUserOnStore({ ...User, uid: props.LoggedUser.uid, CheckedLogin: true })
        SetTema(Theme)
        FillStore()
        SetTenant(Tenant)
      })
    }
  }, [props.LoggedUser])



  return (
    <div className="App">
      <ReactNotifications />
      <Routes>
        <Route path="/" element={<Home CheckedLogin={props.LoggedUser.CheckedLogin} Email={props.LoggedUser.Email} To={props.To} Tenant={props.Tenant} />} />
        <Route path="/Serrano" element={<Home CheckedLogin={props.LoggedUser.CheckedLogin} Email={props.LoggedUser.Email} To={props.To} Tenant={props.Tenant} />} />
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
    LoggedUser: state.LoggedUser,
    Tenant: state.Tenant
  };
})(App);

export default ConnectedApp;
