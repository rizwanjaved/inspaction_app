import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PlayPage } from "../play/play";

/**
 * Generated class for the LevelsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-levels',
  templateUrl: 'levels.html',
})
export class LevelsPage {

  constructor(public nav: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LevelsPage');
  }
  gotToPages() {
    this.nav.setRoot(PlayPage);
  }

}
