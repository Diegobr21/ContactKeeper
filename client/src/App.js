import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React, {Fragment} from 'react';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Alerts from './components/layout/Alerts';
import setAuthToken from './utils/setAuthToken';

import ContactState from './context/Contact/ContactState';
import AuthState from './context/Auth/AuthState';
import AlertState from './context/Alert/AlertState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () => {
  return (
    <AuthState>
    <ContactState>
      <AlertState>
    <Router>
      <Fragment>
      <Navbar />
      <div className='container'>

        <Alerts></Alerts>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        </Routes>
      </div>

    </Fragment>
    </Router>
    </AlertState>
    </ContactState>
    </AuthState>
    
  );
}

export default App;
