import React, { Component } from 'react';
import '../../index';
import SwitchDark from '../DarkMode/Switch';
import '../DarkMode/index.css';
//`import '../../App.css';
import SideBar from './Sidebar';

export default class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
          
        }
    }

    componentDidMount() {
     
    }

    render() {
      

        return (
            <header className="header">
   <SideBar/>
   <br/>
              <SwitchDark style="marginLeft : 500%;" />

          
            </header>
        );
    }
}
