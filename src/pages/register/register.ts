import { Component } from "@angular/core";
import { NavController, LoadingController, ToastController, Platform } from "ionic-angular";
import { LoginPage } from "../login/login";
import { HomePage } from "../home/home";
import { AuthProvider } from '../../providers/auth/auth';
import { NotificationsProvider } from '../../providers/notifications/notifications';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
// import {NavController, LoadingController, ToastController, Platform} from "ionic-angular/umd";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { PerformaProvider } from '../../providers/performa/performa';





@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  public searches = {
    name: "Rio de Janeiro, Brazil",
    date: new Date().toISOString()
  }
  imageURI: any;
  imageFileName: any;
  public registerForm;
  public image: File;
  constructor(
    public nav: NavController,
    public auth: AuthProvider,
    private storage: Storage,
    public notify: NotificationsProvider,
    public fb: FormBuilder,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private transfer: FileTransfer,
    public platform: Platform,
    public perfroma: PerformaProvider
  ) {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    });
    // console.log('all url', target);
  }
  uploadFile($event) {
    this.image = $event.target.files[0];
    console.log('file is', this.image);
  }
  // register and go to home page
  register(res) {
    this.notify.simpleTimeToast('User successfully registered');
    this.nav.setRoot(LoginPage);
  }
  registerSubmit() {
    let form = this.registerForm.value;
    if (form.password !== form.confirm_password || (form.password.length < 6) || (form.confirm_password.length < 6)) {
      return false;
    } else {
      let errMsg = "Error registering user";
      this.auth.signupUser(form.email, form.password)
        .then((res: any) => {
          if (res && res.user) {
            this.register(res);
          } else {
            this.notify.simpleTimeToast(errMsg);
          }
          console.log('sign up res', res);
        },
        err => {
          this.notify.simpleTimeToast(errMsg);
        }
      );
    }
  }
  validateRegister(response) {
    let msg;
    msg = "Error registering user";
    if (response == 'error') {
      msg = this.auth.connectionErrorMessage;
    }
    if (!response || (response && response.error)) {
      this.notify.simpleTimeToast(msg);
    } else {
      if (response.id !== undefined && response.id !== null) {
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
