import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import {EliteApi, UserSettings} from '../services/services';

import { MyApp } from './app.component';
import { MyTeams } from '../pages/my-teams/my-teams';
import { Tournaments } from '../pages/tournaments/tournaments';
import { Teams } from '../pages/pages';
import { TeamDetail } from '../pages/pages';
import { TeamHome, Standings } from '../pages/pages';
import { Game, MapPage } from '../pages/pages';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
  declarations: [
    MyApp,
    MyTeams,
    Tournaments,
    Teams,
    Game,
    MapPage,
    TeamDetail,
    TeamHome,
    Standings
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBbsOlMryAHu2ESwHHSwrDBIUU7fiENNoM' }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Game,
    MapPage,
    MyTeams,
    Tournaments,
    Teams,
    TeamDetail,
    TeamHome,
    Standings
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EliteApi,
    UserSettings,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
