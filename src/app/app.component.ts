import { Component, ViewChild } from '@angular/core';
import { LoadingController, Events, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyTeams, Tournaments,TeamHome } from '../pages/pages';
import { UserSettings, EliteApi } from '../services/services';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  myFavoriteTeams = [];
  rootPage: any = MyTeams;

  constructor(public platform: Platform,
            private events : Events, 
            private loadingController : LoadingController,
            private userSettings : UserSettings,
            private eliteApi : EliteApi,
            public statusBar: StatusBar, 
            public splashScreen: SplashScreen) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.refreshMyFavoriteTeams();
      this.events.subscribe('favorite::changed', () => {this.refreshMyFavoriteTeams()});
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goHome() {
    this.nav.push(MyTeams);
  }

  goToTournaments(){
    this.nav.push(Tournaments);
  }

  refreshMyFavoriteTeams(){
    this.myFavoriteTeams = this.userSettings.getAllFavorites();
  }

  goToTeam(fav){
    let loader = this.loadingController.create({
        content : 'Getting data...',
        dismissOnPageChange : true
    });
    loader.present();
    this.eliteApi.getTournamentData(fav.tournamentId).subscribe(l => this.nav.push(TeamHome, fav.team));
  }
}
