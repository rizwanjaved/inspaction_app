import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { HomePage } from "../home/home";
import { PlayPage } from "../play/play";

/**
 * Generated class for the MatchesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-matches',
  templateUrl: 'matches.html',
})
export class MatchesPage {
  match;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController
  ) {
  this.match = "topGames";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MatchesPage');
  }
  Join() {
      const toast = this.toastCtrl.create({
        message: 'You Have Joined the Game',
        duration: 3000
      });
      toast.present();
      this.navCtrl.setRoot(PlayPage);
  }

}
