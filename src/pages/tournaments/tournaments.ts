import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import {Teams} from '../pages';
import {EliteApi} from '../../services/services';

@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class Tournaments {
  tournaments : any;
  constructor(public navCtrl: NavController, private loadingController : LoadingController,
            public navParams: NavParams, private eliteApi: EliteApi) {
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content : "Getting Tournaments..."
    });

    loader.present().then(() => {
      this.eliteApi.getTournaments().then(data => this.tournaments = data);
      loader.dismiss();
    });
    
  }

  itemTapped($event, tourney){
    this.navCtrl.push(Teams, tourney);
  }

}
