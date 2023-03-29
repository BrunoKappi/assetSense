import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './Config/store/store';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications-component/dist/theme.css'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
  <Router>
    <Provider store={store}>
    
        <App /> 
  
    </Provider>

  </Router> 
);

 