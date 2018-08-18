import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
declare function playedGame(opt :string): any;


/**
 * Generated class for the PlayedGamesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-played-games',
  templateUrl: 'played-games.html',
})
export class PlayedGamesPage {
  public showList = true;
  toggle = true;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    if(playedGame !== undefined) {
      playedGame('start');
    }
    console.log('ionViewDidLoad PlayedGamesPage');
  }
  changeMoves() {
    this.toggle = !this.toggle;
    let pos;
    if(this.toggle) {
      pos = 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R';
    } else {
      pos = 'r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1';
    }
    playedGame(pos);
  }
  showDetails() {
    this.showList =false;
  }

}
