import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import _ from 'lodash';

@Injectable()
export class UserSettings {

    constructor(private events : Events) { }

    favoriteTeam(team, tournamentId, tournamentName){
        let item = { team : team, tournamentId : tournamentId, tournamentName : tournamentName };
        localStorage.setItem(team.id , JSON.stringify(item));
        this.events.publish('favorite::changed');
    }

    unFavoriteTeam(team){
        localStorage.removeItem(team.id);
        this.events.publish('favorite::changed');
    }

    isFavoriteTeam(teamId){
        return (localStorage.getItem(teamId) ? true : false);
    }

    getAllFavorites(){
        let items = [];
        _.forIn(window.localStorage, (v, k) => {
            items.push(JSON.parse(v));
        });
        return items.length ? items : null ;
    }
}