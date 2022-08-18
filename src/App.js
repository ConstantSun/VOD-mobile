import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Home';
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';

function App() {
  const title = "welcome hang"
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/create">
              <Create/>
            </Route>
            <Route path="/blog/:id">
              <BlogDetails/>
            </Route>
            <Route path="*">
              <NotFound/>
            </Route>           
          </Switch>
          
        </div>
      </div>
    </Router>
  );
}

export default App;
