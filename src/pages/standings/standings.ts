import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import _ from 'lodash';
import { EliteApi } from '../../services/services';

@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class Standings {
  allStandings: any[];
  divisionFilter = 'division';
  standings: any[];
  team: any;

  constructor(public navCtrl: NavController, 
          public navParams: NavParams, 
          public eliteApi: EliteApi) {
  }

  ionViewDidLoad() {
    this.team = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTourney();
    this.standings = tourneyData.standings;

    // this.allStandings =
    //   _.chain(this.standings)
    //     .groupBy('division')
    //     .toPairs()
    //     .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
    //     .value();

    console.log('standings:', this.standings); 
    // console.log('division Standings', this.allStandings);
  }

  getHeader(record, recordIndex, records){
    if (recordIndex === 0 || record.division !== records[recordIndex-1].division) {
      return record.division;
    }
    return null;  
  }

}
