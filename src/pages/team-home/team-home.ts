import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {TeamDetail, Standings} from '../pages';
@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html',
})
export class TeamHome {
  team : any;
  teamDetailTab = TeamDetail;
  standingsTab = Standings;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.team = this.navParams.data;
  }

  ionViewDidLoad() {
    
  }

  goHome(){
    this.navCtrl.popToRoot();
  }
}
