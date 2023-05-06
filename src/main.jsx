import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import store from './Config/store/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications-component/dist/theme.css';


var pathname = window.location.pathname;

// Definindo a variável global
window.Tenant = 'Serrano';


window.addEventListener('popstate', () => {
  console.log("URL", window.location.pathname)
});

//console.log("Pathname: " + pathname);


const root = createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Provider store={store}>
      <App To={pathname} />
    </Provider>
  </Router>
);