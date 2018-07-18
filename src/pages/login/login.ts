import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {AuthProvider} from '../../providers/auth/auth';
import {NotificationsProvider} from '../../providers/notifications/notifications';
import { Storage } from '@ionic/storage';




@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public loginForm;
  constructor(
    public nav: NavController, 
    public forgotCtrl: AlertController, 
    public fb:FormBuilder, 
    public menu: MenuController, 
    public toastCtrl: ToastController,
    public auth :AuthProvider,
    private storage: Storage,
    public notify : NotificationsProvider
  ) {
    this.menu.swipeEnable(false);
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitLogin() {
    this.auth.login(this.loginForm.value)
      .subscribe(res =>{
        if(res.type && res.type== 'error') {
          this.Validate('error');
        } else {
          let response:any = res ? JSON.parse(res) : 'error';
          this.Validate(response);
        }
      },
      err =>{
       this.Validate(false);
      }
      );
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  Validate(response) {
    let msg;
    msg = "Name or password is incorrect";
    if(response == 'error') 
    {
      msg = this.auth.connectionErrorMessage;
    }
    if(!response || (response && response.error)){
      this.notify.simpleTimeToast(msg);
    } else {
      if(response.name !== undefined && response.name !== null) {
        this.login(response);
      } else {
        this.notify.simpleTimeToast(msg);
      }
    } 
  }

  login(user) {
    this.storage.set('user', user);
    this.nav.setRoot(HomePage);
  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
