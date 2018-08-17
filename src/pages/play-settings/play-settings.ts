import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlayPage } from "../play/play";


/**
 * Generated class for the PlaySettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-play-settings',
  templateUrl: 'play-settings.html',
})
export class PlaySettingsPage {

  constructor(public nav: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaySettingsPage');
  }
  gotToPages() {
    this.nav.setRoot(PlayPage);
  }

}
