import React, {Component} from 'react';
import {  Route, Switch } from "react-router-dom";

import Home from "./Components/views/Home";
import Calculator from './Components/views/Calculator';
import logFile from './Components/views/LogFile';

import './App.css';
import './Components/DarkMode/index.css';


class App extends Component {
  render() {
    return (
      <div>
      

       
    
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/calculator" component={Calculator} />
          <Route path="/logs" component={logFile} />

        </Switch>
      </div>
    );
  }
}

export default App;
