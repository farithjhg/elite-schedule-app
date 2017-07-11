import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { EliteApi } from '../../services/services';

declare var window: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  map: any = {};

  constructor(public navParams: NavParams, public eliteApi: EliteApi) {

  }

  ionViewDidLoad(){
    let games = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTourney();
    let location = tourneyData.locations[games.locationId];

    this.map = {
      lat: location.latitude,
      lng: location.longitude,
      zoom: 12,
      markerLabel: games.location 
    };

  }

  getDirections() { 
    window.location = `geo:${this.map.lat},${this.map.lng};u=35`; 
  }

}
