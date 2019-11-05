import React from 'react';
import { slide as Menu } from 'react-burger-menu';


export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>

      <a className="menu-item" href="/calculator">
        outil de calcul
      </a>

      <a className="menu-item" href="/mesParis">
        Mes paris
      </a>

      <a className="menu-item" href="/logs">
        Nouveautés
      </a>
    </Menu>
  );
};