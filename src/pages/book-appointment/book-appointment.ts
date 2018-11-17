import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';

/**
 * Generated class for the BookAppointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-book-appointment',
  templateUrl: 'book-appointment.html',
})
export class BookAppointmentPage {
  public bookAppointmentForm;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder) {
    this.bookAppointmentForm = this.fb.group({
      name: ['', Validators.required],
      carNumber: ['', Validators.required],
      type: ['', Validators.required],
      text: ['', Validators.required]
    });
  }

  doBookAppointment() {
    console.log('doBookAppointment hit');
    console.log(this.bookAppointmentForm.value);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookAppointmentPage');
  }

}
