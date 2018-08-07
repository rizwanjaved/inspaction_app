import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { Http } from '@angular/http';
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { PerformaProvider } from '../performa/performa';
import { NotificationsProvider } from '../notifications/notifications';
import {HomePage} from "../../pages/home/home";
import firebase from 'firebase';
var providerGoogle = new firebase.auth.GoogleAuthProvider();
var providerFacebook = new firebase.auth.FacebookAuthProvider();
providerGoogle.addScope('https://www.googleapis.com/auth/contacts.readonly');



/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  // public remoteUrl = 'http://25d4e1ce.ngrok.io/';
  public remoteUrl = 'http://192.168.99.6:5985/';
  public connectionErrorMessage = "Aww! No Connection to the server, Please check internet connection";
  public authStatus; 
  public authIssue;
  public authData;
  public menuButton = "menu";
  constructor(
    public http: Http,  
    private storage: Storage, 
    public performa: PerformaProvider, 
    public notify:NotificationsProvider
  ) {
    console.log('Hello AuthProvider Provider');
  }
  // 
  login(data): Observable<any> {
    let apiURL = this.remoteUrl + '_session';
    return this.http.post(apiURL, {
      'name': data.email,
      'password': data.password
    })
      .map((res: any) => {
        console.log('provider login res', res);
        this.authData = JSON.stringify(res);
        let toReturn: any = res._body;
        return toReturn;
      })
      .catch((e: any) => {
        this.authIssue = JSON.stringify(e);
        console.log('provider login e', e);
        return Observable.of(e._body);
      })
  }
  //
  logout(): Observable<any> {
    let apiURL = this.remoteUrl + '_session';
    return this.http.delete(apiURL, {
    })
      .map((res: any) => {
        return res;
      })
      .catch((e: any) => {
        return Observable.of(e);
      })
  }
  //
  register(form, file) {
    let apiUrl = this.remoteUrl + '_users/org.couchdb.user:' + form.userName;
    let data:any = {
      "name": form.userName,
      'email': form.email,
      'password': form.password,
      "roles": [],
      "type": "user",
      'grade': form.grade,
      'retired_check': form.retiredCheck,
      'ex_person_check': form.exPersonCheck,
      'place_of_work': form.placeOfWork,
      'client_address': form.clientAddress,
      'date': form.date,
      'contact_no': form.contactNo,
      'user_type': 'doctor'
    }
    let heads:any = new Headers();
    heads.append('Content-Type', 'application/json');  
    return new Promise(resolve => {
      this.http.put(apiUrl,data,{headers: heads})
      .toPromise()
      .then((res: any) => {
        let toReturn: any = JSON.parse(res._body);
        if (toReturn.id !== undefined && toReturn.id !== null) {
          data.attached_user_id = toReturn.id;
          data.user_image = file ? true : false; 
          this.performa.registerDoctors(data,file).then((doc)=>{
            toReturn.attached_user = doc;
            console.log('register map ', toReturn);
            resolve(toReturn);
          });
        }
      })
      .catch((e: any) => {
        console.log('register error ', e);
        resolve(e._body);
        // return Observable.of(e._body);
      })
    }); 
  }
  checkAuth() {
    this.storage.get('user').then(data => {
      if (data || data.name !== null) {
        this.authStatus  = true;
        return true;
      } else {
        this.authStatus  = false;
        return false;
      }
    });
  }
  /******* firebase auth******/
  loginUser(data,google= false): Promise<any> {
    if(!google) {
      return firebase.auth().signInWithEmailAndPassword(data.email, data.password);
    }    
  }
  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }
  signupUser(email: any, password: any): Promise<any> {
    return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
    // .then( (newUser:any) => {
      //   console.log('user', newUser);
      //   firebase
      //   .database()
      //   .ref('/userProfile')
      //   .child(newUser.uid)
      //   .set({ email: email });
      // });
    }
    //social authentications 
    googleLogin():Promise<any>  {
      // return firebase.auth().signInWithPopup(providerGoogle).then(function(result:any) {
      //   // This gives you a Google Access Token. You can use it to access the Google API.
      //   var token = result.credential.accessToken;
      //   // The signed-in user info.
      //   var user = result.user;
      //   console.log('google is', result);
      //   return result;
      //   // ...
      // }).catch(function(error) {
      //   // Handle Errors here.
      //   var errorCode = error.code;
      //   var errorMessage = error.message;
      //   // The email of the user's account used.
      //   var email = error.email;
      //   // The firebase.auth.AuthCredential type that was used.
      //   var credential = error.credential;
      //   console.log('google error is', error);
      //   return error;
      // });
      firebase.auth().signInWithRedirect(providerGoogle);
      return firebase.auth().getRedirectResult().then(function(result:any) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
        return result;
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        return error;
      });
    }
    // facebook authentication
    facebookLogin():Promise<any>  {
      firebase.auth().signInWithRedirect(providerFacebook);
      return firebase.auth().getRedirectResult().then(function(result:any) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
        return result;
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        return error;
      });
    }
}
