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
  public searches = {
    name: "Rio de Janeiro, Brazil",
    date: new Date().toISOString()
  }
  public grades = [
    "Consultants", "Professor", "Associate", "SR Registrar", "House Officer", "Reception"
  ];
  public registerForm;
  file: File;
  changeListener($event) : void {
    this.file = $event.target.files[0];
    // console.log('file is ', this.file);
  }
  constructor(
    public nav: NavController,
    public auth :AuthProvider,
    private storage: Storage,
    public notify : NotificationsProvider,
    public fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      userName :  ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password : ['', Validators.required],
      grade: ['', Validators.required],
      retiredCheck :['', Validators.required],
      exPersonCheck :['', Validators.required],
      placeOfWork :['', Validators.required],
      companyLogo :[''],
      clientAddress :['', Validators.required],
      date :['', Validators.required],
      contactNo :['', Validators.required],
    });
  }



  // register and go to home page
  register(res) {
    console.log('zzz', res);
    this.nav.setRoot(LoginPage);
  }
  registerSubmit() {
    let form = this.registerForm.value;
    if(form.password !== form.confirm_password) {
      return false;
    } else {
      this.auth.register(this.registerForm.value)
      .subscribe(res=>{
        this.validateRegister(JSON.parse(res));
        console.log('sub data', res);
      },
      err => {
        this.validateRegister(err);
      }
      );
    }
  }
  validateRegister(response) {
    let msg = "Oops! Unable to register user";
    console.log('res', response);
    if(!response || (response && response.error)){
      this.notify.simpleTimeToast(msg);
    } else {
      if(response.id !== undefined && response.id !== null) {
        this.register(response);
      } else {
        this.notify.simpleTimeToast(msg);
      }
    } 
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}
