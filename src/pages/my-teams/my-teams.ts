import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import {Tournaments} from '../pages';
import { EliteApi, UserSettings } from '../../services/services';
import {TeamHome} from '../pages';

@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html',
})
export class MyTeams {
favorites = [];

  constructor(public navCtrl: NavController, private loadingController : LoadingController,
             public navParams: NavParams, private eliteApi : EliteApi, private userSettings : UserSettings) {
  }

  ionViewDidLoad() {
   
  }

  ionViewDidEnter(){
    this.favorites = this.userSettings.getAllFavorites();
  }


  favoriteTapped($event, favorite){
        let loader = this.loadingController.create({
            content: 'Getting data...',
            dismissOnPageChange: true
        });
        loader.present();
        this.eliteApi.getTournamentData(favorite.tournamentId)
            .subscribe(t => this.navCtrl.push(TeamHome, favorite.team));
  }
  

  goToTournaments(){
    this.navCtrl.push(Tournaments);
  }
}
