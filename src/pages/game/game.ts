import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../services/services';
import {TeamHome, MapPage} from '../pages';

declare var window: any;

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class Game {
  game : any;
  constructor(public navCtrl: NavController, private eliteApi : EliteApi,
             public navParams: NavParams) {
            this.game = this.navParams.data;
  }

  ionViewDidLoad() {
    this.game.gameTime = Date.parse(this.game.time);
  }

  teamTapped(teamId){
    let tourneyData = this.eliteApi.getCurrentTourney();
    let team = tourneyData.teams.find(t => t.id === teamId);
    this.navCtrl.push(TeamHome, team);
  }

  getDirections(){
    let tourneyData = this.eliteApi.getCurrentTourney();
    let location = tourneyData.locations[this.game.locationId];
    window.location = `geo:${location.latitude},${location.longitude};u=35;`;
  }

  goToMap(){
    this.navCtrl.push(MapPage, this.game);
  }

  isWinner(score1, score2){
    return Number(score1) > Number(score2);
  }  
}
