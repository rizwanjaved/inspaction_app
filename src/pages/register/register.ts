import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";
import {AuthProvider} from '../../providers/auth/auth';
import {NotificationsProvider} from '../../providers/notifications/notifications';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  public registerForm;
  constructor(
    public nav: NavController,
    public auth :AuthProvider,
    private storage: Storage,
    public notify : NotificationsProvider,
    public fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      fullName :  ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  // register and go to home page
  register() {
    console.log('zzz', this.registerForm.value);
    // this.nav.setRootHomePage);
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}
