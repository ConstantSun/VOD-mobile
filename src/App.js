import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar';
import {BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom'
import Home from './Home';
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import { useState } from 'react';

function App() {
  const title = "welcome hang"
  const [access_tk_gb, setAccess_tk_gb] = useState("init")

  return (
    <Router>
      <div className="App">
        {/* <div>{access_tk_gb}</div> */}
        <NavBar/>
        <div className="content">
          <Routes>
            <Route exact path='/' element={<Home access_gb={access_tk_gb} setAcc_gb={setAccess_tk_gb}/>} />
            <Route exact path='/create' element={<Create access_tk_gb={access_tk_gb}/>} />    
            <Route exact path='/blog/:id' element={<BlogDetails access_tk_gb={access_tk_gb}/>} />
            <Route exact path='*' element={<NotFound/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
