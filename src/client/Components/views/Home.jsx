import React, {Component} from 'react';
import axios from 'axios';


import '../../index';

export default class Home extends Component {
    constructor(props) {
        super(props)
        
        this.state = {


    }
  }

  componentDidMount() {
    document.title = 'Home';


    }
  
    
    render() {
      

        return (
        <div className="home"> 

       <h1> Bienvenue dans l'outil de pari ultime </h1>
          
        </div>
        );
    }
}