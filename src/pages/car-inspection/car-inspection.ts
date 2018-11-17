import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';

/**
 * Generated class for the CarInspectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-car-inspection',
  templateUrl: 'car-inspection.html',
})
export class CarInspectionPage {
  public carInspectionForm;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder) {
    this.carInspectionForm = this.fb.group({
      carNumber: ['', Validators.required],
      carType: ['', Validators.required],
      text: ['', Validators.required]
    });
  }

  doCarInspection() {
      console.log('doCarInspection ht');
      console.log(this.carInspectionForm.value)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarInspectionPage');
  }

}
