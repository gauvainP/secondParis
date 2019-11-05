import React, { Component } from 'react';

import '../../index';

export default class Pari_simple extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nbParis: props.nbParis,
            mise: props.mise,
            teams: props.teams,
            couples: []
        }
    }

    componentDidMount() {
    }

    calculGain(tab, teams, mise) {

        var gain = mise;
        for (var j = 0; j < tab.length; j++) {
            gain = gain * teams.cote[tab[j]];

        }
        return gain;
    }

    calculTotal(tab, teams, mise, nbParis) {
        var gain = 0;
        for (var j = 0; j < tab.length; j++) {
            gain += teams.cote[tab[j]] * mise;

        }
        gain -= (nbParis * mise);
        return gain;
    }


    render() {
        const teams = this.props.teams;
        var nbParis = this.props.nbParis;
        var mise = this.props.mise;
        var tousWin = 0;
        for (var i = 0; i < teams.cote.length; i++) {
            tousWin = tousWin * teams.cote[i];
        }
        var n = 0;
        if (teams.index.length > 0) n = mise;
        for (var i = 0; i < teams.index.length; i++) {
            n *= teams.cote[i];
        }


        return (
            <div className="home">

                <table border="1">
                    <caption>Paris Combinés</caption>
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
                            <th>Total : {(mise)}</th>
                        </tr>
                        <tr>
                            <th>Aucun</th>
                            <th>0</th>
                            <th style={{backgroundColor: "red"}} >-{(mise)}</th>
                        </tr>

                        <tr>
                            <th>Tous</th>
                            <th>{n.toFixed(2)}</th>
                            <th style=  { true ? {backgroundColor: 'green' }:{ backgroundColor: 'red' }} >{(n - (mise)).toFixed(2)}</th>


                        </tr>


                    </tbody>
                </table>

            </div>
        );
    }
}