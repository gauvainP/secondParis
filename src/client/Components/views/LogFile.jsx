import React, { Component } from 'react';


import '../../index';
import '../css/logFile.css';

export default class logFile extends Component {

  componentDidMount() {
    document.title = 'nouveauté';
  }

  render() {
 
    return (
      <div>
      <br/>
<h1>TODO :</h1>
<span> <ol>
  <li className="f"> - boucler ces informations avec un for pour simplicité </li>
  <li className="d"> - realiser la base de données pour entrer nos paris </li>
  <li className="m"> - creer une simple authentification au debut(eviter qu'on utilise mon app) </li>
  <li className="x"> - Page de statistique sur nos paris </li>
  <li className="m"> - belle page d'accueil </li>
  <li className="m"> - TODO darkmode lisible </li>
  <li className="f"> - faire un logo </li>
  <li className="x"> - resoudre le probleme d'affichage sur mobile</li>
  <li className="m"> - doublage de nom d'equipes impossible</li>
  <li className="f"> - regler warnings dans la console</li>
  <li className="m"> - beaux tableaux bootstrap</li>
  <li className="f"> - mettre tous/aucun gagnant pour paris simples </li>




  </ol> </span>

      
<hr/>
<h1>Nouveautés :</h1>
       <div> 24/10/2019: router mis en place + back-end configuré. le tableau combiné disponible avec les paris simples </div>
       <div> 25/10/2019: Nouvelle table de paris(simple+combinés). Afficher que les cases verte par exemple. Case rouge ou vertes. </div>
       <div> 29/10/2019: (simple+combinés) maintenant operationnels. valeurs de defaut (generer 2,3,4,clean)</div>
       <div> 30/10/2019: (systemes) maintenant operationnels. valeurs de defaut (generer 2,3,4,clean)</div>
       <div> 04/11/2019: (systemes+combiné/ systeme+simple) maintenant dispo. bugs correction sur table simple+coombine. Hide all negative totaux</div>

      </div>

    );
  }
}