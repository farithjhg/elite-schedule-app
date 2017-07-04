import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../services/services';
import {TeamHome} from '../pages';


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
    
  }

  teamTapped(teamId){
    let tourneyData = this.eliteApi.getCurrentTourney();
    let team = tourneyData.teams.find(t => t.id === teamId);
    this.navCtrl.push(TeamHome, team);
  }
}
