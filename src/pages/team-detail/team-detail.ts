import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, ToastController } from 'ionic-angular';
import _ from 'lodash';
import moment from 'moment';
import { EliteApi } from '../../services/services';
import {Game} from '../pages';

@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetail {
  team: any = {};
  games : any[];
  teamStanding: any = {};
  private tourneyData : any; 
  allGames: any[];
  dateFilter: string;
  isFollowing = false;
  useDateFilter = false;

  constructor(public alertController: AlertController, public toastController : ToastController,
            public navCtrl: NavController, private eliteApi : EliteApi,
            public navParams: NavParams) {
  }

  ionViewDidLoad() {
     this.team = this.navParams.data;
     this.tourneyData = this.eliteApi.getCurrentTourney();
       this.games = _.chain(this.tourneyData.games)
                  .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
                  .map(g => {
                      let isTeam1 = (g.team1Id === this.team.id);
                      let opponentName = isTeam1 ? g.team2 : g.team1;
                      let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
                      return {
                          gameId: g.id,
                          opponent: opponentName,
                          time: Date.parse(g.time),
                          location: g.location,
                          locationUrl: g.locationUrl,
                          scoreDisplay: scoreDisplay,
                          homeAway: (isTeam1 ? "vs." : "at")
                      };
                  })
                  .value();
        this.allGames = this.games;
        this.teamStanding = _.find(this.tourneyData.standings, { 'teamId': this.team.id });
  }

  gameClicked($event, game){
    let sourceGame = this.tourneyData.games.find(g => g.id === game.gameId);
    this.navCtrl.parent.parent.push(Game, sourceGame);
  } 

  getScoreDisplay(isTeam1, team1Score, team2Score) {
        if (team1Score && team2Score) {
            var teamScore = (isTeam1 ? team1Score : team2Score);
            var opponentScore = (isTeam1 ? team2Score : team1Score);
            var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
            return winIndicator + teamScore + "-" + opponentScore;
        }
        else {
            return "";
        }
  }

  getScoreWorL(game){
    return game.scoreDisplay ? game.scoreDisplay[0] : '';
  } 

  getScoreDisplayBadgeClass(game){
    //return game.scoreDisplay.indexOf('W:') === 0 ? 'badge-primary' : 'badge-danger';
    return game.scoreDisplay.indexOf('W:') === 0 ? 'primary' : 'danger';
  } 
  dateChanged(){
    if (this.useDateFilter) {
      this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
    } else {
      this.games = this.allGames;
    } 
  }

  toggleFollow(){
    if (this.isFollowing) {
      let confirm = this.alertController.create({
        title: 'Unfollow?',
        message: 'Are you sure you want to unfollow?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.isFollowing = false;
              let toast = this.toastController.create({
                message: 'You have unfollowed this team.',
                duration: 2000,
                position: 'bottom'
              });
              toast.present();
              /*
              this.userSettings.unfavoriteTeam(this.team);

              
              */ 
            }
          },
          { text: 'No' }
        ]
      });
      confirm.present();
    } else {
      this.isFollowing = true;
      /*
      this.userSettings.favoriteTeam(
        this.team, 
        this.tourneyData.tournament.id, 
        this.tourneyData.tournament.name); 
        */
    }
  } 

  refreshAll(refresher){
    this.eliteApi.refreshCurrentTourney().subscribe(() => {
      refresher.complete();
      this.ionViewDidLoad();
    });
  }

}
