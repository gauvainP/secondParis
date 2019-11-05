import React, { Component } from 'react';

import '../../index';
import { Button, Switch } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class Systeme extends Component {
    constructor(props) {
        super(props);
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
    isArrayInArray(nums, systemeChoice) {
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
        for (let i = systemeChoice; i <= nums.length - 1; i++) {
            dfs(nums, [], 0, i)
        }

        return output
    }

    calculGain(tab, teams, mise) {

        var gain = 1;
        for (var j = 0; j < tab.length; j++) {

            gain = gain * teams.cote[tab[j]];

        }
        gain = gain * mise;
        return gain;
    }
    calculGainTotal(teams, mise, nbParis) {
        var tabIncr = [];
        var gain = 0;
        for (var i = 0; i < teams.index.length; i++) {
            gain = 0
            for (var j = 0; j < teams.index.length; j++) {

                if (j <= i) {
                    gain = gain;
                } else {
                    gain += teams.cote[teams.index[i]] * teams.cote[teams.index[j]]

                }



            }

            gain = gain * mise;

            tabIncr.push(gain);
        }

        var gainCombine = 0;
        for (var j = 0; j < tabIncr.length; j++) {
            gainCombine += tabIncr[j];

        }
        return gainCombine;

    }
    calculTotal(tab, teams, mise, nbParis) {
        var gain = 0;
        for (var j = 0; j < tab.length; j++) {
            gain = gain * teams.cote[tab[j]];
        }
        gain = gain * mise;
        gain -= (nbParis * mise);
        return gain;
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
        } else if (hideAll && gain < 0 ) {
            bool = true;
        }
        else {
            bool = false;

        }
        return bool;
    }

    render() {
        const { isOnlyPositive } = this.state;
        const { teams, nbParis, mise, systemeChoice } = this.props;
const hide = this.state.hide;
console.log(hide);
        var n = 0;
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
                    <caption>Systeme {systemeChoice}/ {nbParis}</caption>
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
                            <th>moins que {systemeChoice} paris :</th>
                            <th>0</th>
                            <th style={{ backgroundColor: "red" }} >-{(nbParis * mise)}</th>
                        </tr>

                        {
                            coup.map((generalArray, index) => (

                                // <div style={this.showOnlyPositive(this.calculGain(generalArray, teams, mise), isOnlyPositive) ? { display: 'none' } : { display: 'block' }}>
                                <tr key={index}  style={this.showOnlyPositive( (this.calculGain(generalArray, teams, mise) - (nbParis * mise)).toFixed(2), isOnlyPositive) ? { display: 'none' } : console.log()} >
                                    <td >
                                        {generalArray.map((faqq, indexx) => (

                                            <td key={indexx}>
                                                {teams.names[faqq]}
                                            </td>
                                        ))}
                                    </td>

                                    <td>

                                        {this.calculGain(generalArray, teams, mise).toFixed(2)}
                                    </td>

                                    <td style={this.colorCase((this.calculGain(generalArray, teams, mise).toFixed(2) - (nbParis * mise)).toFixed(2)) ? { backgroundColor: 'green' } : { backgroundColor: 'red' }} >
                                        {(this.calculGain(generalArray, teams, mise).toFixed(2) - (nbParis * mise)).toFixed(2)}  </td>
                                </tr>
                                // </div>
                            ))}

                        <tr>
                            <td> Tous</td>
                            <td> {parseFloat(this.calculGainTotal(teams, mise, nbParis)).toFixed(2)} </td>
                            <td style={{ backgroundColor: "green" }}>
                                {parseFloat((eval(this.calculGainTotal(teams, mise, nbParis))) - parseFloat(eval((nbParis * mise)))).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        );
    }
}