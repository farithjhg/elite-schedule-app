import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { TeamHome } from '../pages'
import {EliteApi} from '../../services/services'
import _ from 'lodash';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class Teams {
  private allTeams : any;
  private allTeamDivisions : any;
  teams = [];
  selectedTournament : any;

  constructor(public navCtrl: NavController, private loadingController : LoadingController, 
            public navParams: NavParams, private eliteApi : EliteApi) {
     this.selectedTournament = this.navParams.data;
  }

  ionViewDidLoad() {
    this.selectedTournament = this.navParams.data;

    let loader = this.loadingController.create({
      content: 'Getting data...'
    });

     loader.present().then(() => {
      this.eliteApi.getTournamentData(this.selectedTournament.id).subscribe(data => {
        this.allTeams = data.teams;
        this.allTeamDivisions =
              _.chain(data.teams)
              .groupBy('division')
              .toPairs()
              .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
              .value();

          this.teams = this.allTeamDivisions;
          console.log('division teams', this.teams); 
          loader.dismiss();
      });
     });

  }

  itemTapped($event, team) {
    this.navCtrl.push(TeamHome, team);
  }

}
