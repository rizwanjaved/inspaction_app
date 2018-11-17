import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';

/**
 * Generated class for the CheckBookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-check-booking',
  templateUrl: 'check-booking.html',
})
export class CheckBookingPage {
  public checkBookingForm;
  public bookingDetailsForm;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder,
    ) {
    this.checkBookingForm = this.fb.group({
      carNumber: ['', Validators.required],
      carType: ['', Validators.required]
    });
    this.bookingDetailsForm = this.fb.group({
      text: ['', Validators.required]
    });
  }

  checkBooking() {
    console.log('check booking');
    console.log('form data', this.checkBookingForm.value);
  }

  submitBookingDetails() {
    console.log('booking details');
    console.log('form data', this.bookingDetailsForm.value);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckBookingPage');
  }

}
