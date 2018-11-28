import { Component } from "@angular/core";
import { NavController, AlertController, ToastController, MenuController } from "ionic-angular";
import { HomePage } from "../home/home";
import { RegisterPage } from "../register/register";
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { NotificationsProvider } from '../../providers/notifications/notifications';
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
    public fb: FormBuilder,
    public menu: MenuController,
    public toastCtrl: ToastController,
    public auth: AuthProvider,
    private storage: Storage,
    public notify: NotificationsProvider,
  ) {
    this.menu.swipeEnable(false);
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  submitLogin() {
    this.notify.presentLoader();
    this.auth.login(this.loginForm.value)
      .subscribe(res => {
        if (res && res.type && res.type == 'error') {
          this.Validate('error');
        } else {
          let response: any = res ? JSON.parse(res) : 'error';
          this.Validate(response);
        }
      },
        err => {
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
    this.notify.dismissLoader();
    if (!response || response === 'error' || response.success == false || (response && response.error)) {
      this.notify.simpleTimeToast(msg);
    } else {
      this.login(response);
    }
  }
  tempLogin() {
    let form = this.loginForm.value;
    console.log('form value',form);
    if(form.email == 'inspector') 
    {
      this.storage.set('userType', 'inspector');
      this.nav.setRoot(HomePage);
    } else if(form.email == 'user') {
      this.storage.set('userType', 'user');
      this.nav.setRoot(HomePage);
    } else {
      let msg = "Name or password is incorrect";
      this.notify.simpleTimeToast(msg);
    }
    
  }

  login(data) {
    this.storage.set('userData', data.user);
    this.storage.set('userType', data.user_role);
    this.storage.set('userCar', data.user_car);
    this.storage.set('accessToken', data.access_token);
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
