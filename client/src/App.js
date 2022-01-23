import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React, {Fragment} from 'react';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';

import ContactState from './context/Contact/ContactState';
import AuthState from './context/Auth/AuthState';

const App = () => {
  return (
    <AuthState>
    <ContactState>
    <Router>
      <Fragment>
      <Navbar />
      <div className='container'>

        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        </Routes>
      </div>

    </Fragment>
    </Router>
    </ContactState>
    </AuthState>
    
  );
}

export default App;
