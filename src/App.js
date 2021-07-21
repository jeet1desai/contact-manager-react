import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import AddUser from './components/AddUser';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import EditUser from './components/EditUser';
import ViewUser from './components/ViewUser';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/contact' component={Contact}/>
          <Route exact path='/user/add' component={AddUser}/>
          <Route exact path='/user/edit/:id' component={EditUser}/>
          <Route exact path='/user/:id' component={ViewUser}/>
          {/* invalid url redirect NotFound Page */}
          {/* <Route component={NotFound}/> */}
          {/* invalid url redirect Home Page */}
          {/* <Redirect to="/" /> */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
