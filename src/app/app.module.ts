import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import {EliteApi} from '../services/services';

import { MyApp } from './app.component';
import { MyTeams } from '../pages/my-teams/my-teams';
import { Tournaments } from '../pages/tournaments/tournaments';
import { Teams } from '../pages/pages';
import { TeamDetail } from '../pages/pages';
import { TeamHome, Standings } from '../pages/pages';
import { Game } from '../pages/pages';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    MyTeams,
    Tournaments,
    Teams,
    Game,
    TeamDetail,
    TeamHome,
    Standings
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Game,
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
