import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Pari_simple from '../TablesPari/Pari_simple';
import Pari_combine from '../TablesPari/Pari_combine';
import Simple_combine from '../TablesPari/Simple_combine';
import Systeme_combine from '../TablesPari/Systeme_combine';
import Systeme_simple from '../TablesPari/Systeme_simple';
import Systeme_simple_combine from '../TablesPari/Systeme_simple_combine';

import Systeme from '../TablesPari/Systeme';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Button, Switch } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';


import '../../index';



export default class Calculator extends Component {
  constructor(props) {
    super(props)

    this.state = {
      nbParis: 0,
      mise: 5,
      systeme: 2,
      xs: 4,
      hideNegatifs :false,
      teams: {
        index: [],
        names: [],
        cote: []
      }
    }
  }

  componentDidMount() {
    document.title = 'Calculateur';
  }

  systemeChoice() {

    var nbParis = this.state.nbParis;
    var systeme = this.state.systeme;
    var hideNegatifs = this.state.hideNegatifs;
    if (nbParis >= 3) {
      return (
        <div>
          <TextField
            id="systeme"
            value={systeme}
            label="systeme"
            style={{ width: 100 }}
            type="number"
            placeholder={"/ " + nbParis}
            onChange={(event) => {

              this.setState({ systeme: event.target.value });
            }
            } margin="normal"
            InputProps={{ inputProps: { min: 2, max: nbParis - 1 } }}

          />
  <FormControlLabel control={<Switch
                    //checked={isOnlyPositive}
                    onChange={() => this.setState({ hideNegatifs: !hideNegatifs })}
                    value={hideNegatifs}
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />}
                    label="Cacher tous les gains negatifs" />
        </div>
      )
    }

  }

  genererValeurDefaut(nb) {
    var json = {};
    if (nb === 2) {
      json = {
        index: [0, 1],
        names: ["equipe 1", "equipe 2"],
        cote: [1.5, 2.1]
      }
    } else if (nb === 3) {
      json = {
        index: [0, 1, 2],
        names: ["equipe 1", "equipe 2", "equipe 3"],
        cote: [1.9, 1.6, 1.8]
      }
    } else if (nb === 4) {
      json = {
        index: [0, 1, 2, 3],
        names: ["team 1", "team 2", "team 3", "team 4"],
        cote: [1.3, 2.1, 1.7, 2.4]
      }
    }
    else {
      json = {
        index: [],
        names: [],
        cote: []
      }
    }

    this.setState({ teams: json, nbParis: nb });
  }



  findIfIndexExistInArray(newTeams, id) {
    for (var i = 0; i < newTeams.index.length; i++) {
      if (newTeams.index[i] == id) {
        return true;
      }
    }
    return false;
  }


  handleChange = (e) => {
    e.persist();
    var newTeams = this.state.teams;
    var value = e.target.value;

    var id = parseInt(e.target.id);
    var cote = parseInt(e.target.name);


    if (!isNaN(cote)) {
      if (this.findIfIndexExistInArray(newTeams, cote)) {

        newTeams.cote[cote] = value;

      } else {
        newTeams.index.push(cote);
        newTeams.cote.push(cote);
        newTeams.names.push("");
      }
      this.setState({ teams: newTeams });
    }

    else if (!isNaN(id)) { // on entre un nom dequipe
      if (this.findIfIndexExistInArray(newTeams, id)) {
        //i don't remove element empty, i have to check if value empty
        // if(value ===""){ 
        //   for( var i = 0; i < newTeams.index.length; i++){ 

        //       newTeams.index.splice(i, 1); 

        //  }        }else{
        newTeams.index[id] = id;
        newTeams.names[id] = value;
        // }
      } else {
        newTeams.index.push(id);
        newTeams.names.push(value);
      }
      this.setState({ teams: newTeams });


    }
    else {
      if (value > 12) {
        this.setState({ nbParis: 12 });
      } else if (value < 0) {
        this.setState({ nbParis: 0 });
      } else {
        this.setState({ nbParis: value });
      }
    }

    //  console.log(newTeams);
  }


  render() {
    const { nbParis, teams, mise, systeme, hideNegatifs } = this.state;

    if (nbParis !== "") {
      var teamFields = Array.from(Array(parseInt(nbParis)).keys())

    } else {
      var teamFields = [];

    }
var xs = this.state.xs;
    return (
      <div>
        <br />
        <Grid xs={12}>
          <h1> Outil de calcul   </h1>
        
         <h3>Tables par ligne : <Button onClick={()=> { this.setState({ xs: 3 }) }} >4</Button> <Button onClick={()=> { this.setState({ xs: 4 }) }} >3</Button> </h3> 
         <br/>
          <div className="AllButton">
            <Button onClick={() => { this.genererValeurDefaut(2) }} > generer 2</Button>
            <Button onClick={() => { this.genererValeurDefaut(3) }} > generer 3</Button>
            <Button onClick={() => { this.genererValeurDefaut(4) }} > generer 4</Button>
            <Button onClick={() => { this.genererValeurDefaut(0) }} > Clean</Button>

          </div>

          <TextField
            id="numberOfParis"
            value={nbParis}
            label="Nombre de paris"
            type="number"
            onChange={this.handleChange.bind(this)}
            margin="normal"

          />
          <TextField
            id="miseParPari"
            value={mise}
            label="Mise par pari"
            type="number"
            onChange={(event) => {

              this.setState({ mise: event.target.value });
            }
            }
            margin="normal"
          />


          <div>
            {this.systemeChoice()}
          </div>
        </Grid>
        <Grid>

          <div className="floatLeft">
            {
              teamFields.map((faq, index) => (
                <div className="floatLeft2" key={index}>
                  <TextField
                    id={index.toString()}
                    label={"Equipe " + (index + 1).toString()}
                    type="text"
                    onChange={this.handleChange.bind(this)}
                    margin="normal"
                    value={teams.names[index]}

                  />
                  <TextField
                    name={index.toString()}
                    label={"Cote "}
                    type="number"
                    onChange={this.handleChange.bind(this)}
                    margin="normal"
                    value={teams.cote[index]}

                  />



                </div>
              ))
            }
          </div>

        </Grid>
<br/>
       


<Grid>
  
</Grid>
        <Grid container xs={12} justify="flex-start"
  alignItems="flex-start"   spacing={1} style={{ float: "left", display: "flex" }} >
       
          <Grid container item xs={xs} >
            <Paper className="paper" >
              <Pari_combine nbParis={nbParis} teams={teams} mise={mise} />
            </Paper>

          </Grid>
          <Grid container item xs={xs} >
            <Paper className="paper" >
              <Pari_simple nbParis={nbParis} teams={teams} mise={mise} hide={hideNegatifs}  />
            </Paper>
          </Grid>
          <Grid container item xs={xs} >
            <Paper className="paper" >
              <Simple_combine nbParis={nbParis} teams={teams} mise={mise}  hide={hideNegatifs}/>
            </Paper>
          </Grid>
          <Grid container item xs={xs} >
            <Paper className="paper" >
              <Systeme nbParis={nbParis} systemeChoice={systeme} teams={teams} mise={mise}  hide={hideNegatifs} />
            </Paper>
          </Grid>
          <Grid container item xs={xs} >
            <Paper className="paper" >
              <Systeme_combine nbParis={nbParis} systemeChoice={systeme} teams={teams} mise={mise}  hide={hideNegatifs} />
            </Paper>
          </Grid>
          <Grid container item xs={xs} >
            <Paper className="paper" >
              <Systeme_simple nbParis={nbParis} systemeChoice={systeme} teams={teams} mise={mise}  hide={hideNegatifs} />
            </Paper>
          </Grid>
          <Grid container item xs={xs} >
            <Paper className="paper" >
              <Systeme_simple_combine nbParis={nbParis} systemeChoice={systeme} teams={teams} mise={mise}  hide={hideNegatifs} />
            </Paper>
          </Grid>
        </Grid>


      </div>

    );
  }
}