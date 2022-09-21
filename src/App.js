import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar';
import {BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom'
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import { useState } from 'react';

function App() {
  const title = "AnyCompany"
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <div className="content">
          <Routes>
            <Route exact path='/home' element={<Home/>} />
            <Route exact path='/logout' element={<Logout/>} />
            <Route exact path='/' element={<Login/>} />
            <Route exact path='/create' element={<Create/>} />    
            <Route exact path='/blog/:id' element={<BlogDetails />} />
            <Route exact path='*' element={<NotFound/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
