import React, { Component } from 'react';

import '../../index';
import { Button, Switch } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { red } from '@material-ui/core/colors';

export default class Systeme_simple_combine extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nbParis: props.nbParis,
            mise: props.mise,
            teams: props.teams,
            couples: [],
            isOnlyPositive: false,

        }
    }
    componentDidMount() {

    }
    isArrayInArray(nums) {
        let output = []
        let dfs = function (nums, tmp, start, depth) {
            if (depth === 0) {
                output.push([...tmp])
                return
            }
            for (let i = start; i < nums.length; i++) {
                tmp.push(nums[i])
                depth -= 1
                dfs(nums, tmp, i + 1, depth)
                depth++
                tmp.pop()
            }
        }
        // For each of the source numbers, we perform a depth-first 
        // search with backtracking to build the subset.
        for (let i = 1; i <= nums.length - 1; i++) {
            dfs(nums, [], 0, i)
        }

        return output
    }

    calculGain(tab, teams, mise, systemeChoice) {
if(tab.length< systemeChoice){

    var gain = 1;
    for (var j = 0; j < tab.length; j++) {

        gain = gain * teams.cote[tab[j]];

    }
    gain = gain * mise;

    return gain
}else{
        var gain = 1;
        for (var j = 0; j < tab.length; j++) {

            gain = gain * teams.cote[tab[j]];

        }


        var gainSimple = 0;
        for (var j = 0; j < tab.length; j++) {
            gainSimple += teams.cote[tab[j]] * mise;

        }
        gain = gain * mise;
        var resultat = gain+gainSimple;
        return resultat;
    }
}
    calculGainTotal(teams, mise, nbParis) {
        var tabIncr = [];
        var gain = 0;
        for (var i = 0; i < teams.index.length; i++) {
         gain =0
            for (var j = 0; j < teams.index.length; j++) {

                if(j<=i){
                    gain=gain;
                }else{
                    gain+= teams.cote[teams.index[i]] * teams.cote[teams.index[j]]

                }
               
              

            }

            gain = gain*mise;

            tabIncr.push(gain);
        }
        var gainSimple = 0;
        for (var j = 0; j < teams.index.length; j++) {
            gainSimple += teams.cote[teams.index[j]] * mise;

        }

var gainIncr=0;
for (var j = 0; j < tabIncr.length; j++) {
    gainIncr += tabIncr[j];

}

var gainCombine = 0;
for (var j = 0; j < teams.index.length; j++) {
    gainCombine += teams.cote[teams.index[j]] * mise;
}
//gainCombine -= (nbParis * mise);

var resultat = gainSimple + gainIncr + gainCombine;
        return resultat;

    }
    calculTotal(tab, teams, mise, nbParis) {
      var totalSysteme = this.calculGain(tab, teams, mise);

        var gainSimple = 0;
        for (var j = 0; j < tab.length; j++) {
            gainSimple += teams.cote[tab[j]] * mise;

        }
        gainSimple -= (nbParis * (mise/2));

        var resultat = gainSimple + totalSysteme;
        return resultat;
    }


    colorCase(number) {
        var bool = false;
        if (number >= 0) {
            bool = true;
        } else {
            bool = false;
        }
        return bool;
    }

    showOnlyPositive(gain, isOnlyPositive) {
        var bool = false;
        var hideAll = this.props.hide;
        if (isOnlyPositive && gain < 0) {

            bool = true;
        } else if (hideAll && gain < 0) {
            bool = true;
        }
        else {
            bool = false;

        }
        return bool;
    }

    render() {
        const { isOnlyPositive } = this.state;
        const { teams, mise, systemeChoice } = this.props;
        const nbParis= eval(this.props.nbParis *2) + eval(1) ;

        var n;
        if (teams.index.length > 0) n = mise;
        for (var i = 0; i < teams.index.length; i++) {
            n *= teams.cote[i];
        }

        var coup = this.isArrayInArray(teams.index, systemeChoice);
     
        return (
            <div className="home">

                <FormControlLabel control={<Switch
                    //checked={isOnlyPositive}
                    onChange={() => this.setState({ isOnlyPositive: !isOnlyPositive })}
                    value={isOnlyPositive}
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />}
                    label="Show >= 0" />


                <table border="1">
                    <caption>Systeme {systemeChoice}/ {(nbParis-1) /2}+ Simple+Combine</caption>
                    <thead>
                        <tr>
                            <th>Vainqueur(s)</th>
                            <th>Gains</th>
                            <th>Total</th>
                        </tr>


                    </thead>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>nombre de paris : {nbParis}</th>
                            <th>Total : {(nbParis * mise)}</th>
                        </tr>

                        <tr>
                            <th>Aucun</th>
                            <th>0</th>
                            <th style={{backgroundColor:"red"}}>-{(nbParis * mise)}</th>
                        </tr>

                        {
                            coup.map((generalArray, index) => (

                                // <div style={this.showOnlyPositive(this.calculGain(generalArray, teams, mise), isOnlyPositive) ? { display: 'none' } : { display: 'block' }}>
                                <tr key={index} style={this.showOnlyPositive((this.calculGain(generalArray, teams, mise, systemeChoice) - (nbParis*mise) ), isOnlyPositive) ? { display: 'none' } : console.log()} >
                                    <td >
                                        {generalArray.map((faqq, indexx) => (

                                            <td key={indexx}>
                                                {teams.names[faqq]}
                                            </td>
                                        ))}
                                    </td>

                                    <td>

                                        {this.calculGain(generalArray, teams, mise, systemeChoice).toFixed(2)}
                                    </td>

                                    <td style={this.colorCase((this.calculGain(generalArray, teams, mise).toFixed(2) - (nbParis*mise)).toFixed(2) ) ? { backgroundColor: 'green' } : { backgroundColor: 'red' }} >
                                    {(this.calculGain(generalArray, teams, mise, systemeChoice) - (nbParis*mise) ).toFixed(2)} </td>


                                </tr>
                                // </div>
                            ))}

                        <tr>
                            <td> Tous</td>
                            <td> {parseFloat(this.calculGainTotal(teams, mise, nbParis)).toFixed(2)} </td>
                            <td style={{ backgroundColor: "green" }}>
                                {parseFloat((this.calculGainTotal(teams, mise, nbParis)) - parseFloat((nbParis * mise))).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        );
    }
}