import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TopPlayersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-top-players',
  templateUrl: 'top-players.html',
})
export class TopPlayersPage {
  public top;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.top="rattings";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TopPlayersPage');
  }

}
