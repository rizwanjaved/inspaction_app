import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { NotificationsProvider } from '../notifications/notifications';
import {HomePage} from "../../pages/home/home";
import firebase from 'firebase';
var providerGoogle = new firebase.auth.GoogleAuthProvider();
var providerFacebook = new firebase.auth.FacebookAuthProvider();
providerGoogle.addScope('https://www.googleapis.com/auth/contacts.readonly');
// providerFacebook.addScope('user_birthday');




/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  // public remoteUrl = 'http://25d4e1ce.ngrok.io/';
  public remoteUrl = 'http://192.168.99.6:5985/';
  public localUrl = 'http://localhost:8000/api/'
  public connectionErrorMessage = "Aww! No Connection to the server, Please check internet connection";
  public authStatus; 
  public authIssue;
  public authData;
  public menuButton = "menu";
  constructor(
    public http: Http,  
    private storage: Storage, 
    public notify:NotificationsProvider
  ) {
    console.log('Hello AuthProvider Provider');
  }
  // 
  /******* firebase auth******/
  loginUser(data,google= false): Promise<any> {
    if(!google) {
      return firebase.auth().signInWithEmailAndPassword(data.email, data.password);
    }    
  }
  // 
  login(data): Observable<any> {
    let apiURL = this.localUrl+'login/';
    var headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(apiURL,{
      'email': data.email,
      'password': data.password
    }, options)
      .map((res: any) => {
        this.authData = JSON.stringify(res);
        let toReturn: any = res._body;
        console.log('provider login res', toReturn);
        return toReturn;
      })
      .catch((e: any) => {
        this.authIssue = JSON.stringify(e);
        console.log('provider login e', e);
        return Observable.of(e._body);
      })
  }
  // 
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
      return firebase.auth().signInWithRedirect(providerGoogle).then(function(result:any) {
        return firebase.auth().getRedirectResult().then(function(result:any) {
          if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // ...
          }
          // The signed-in user info.
          var user = result.user;
          console.log('user auth', user);
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
          console.log('user auth error', error);
  
          return error;
        });
      });
    }
    // facebook authentication
    facebookLogin():Promise<any>  {
      // firebase.auth().signInWithRedirect(providerFacebook);
      // return firebase.auth().getRedirectResult().
      return firebase.auth().signInWithRedirect(providerFacebook).then(function(result:any) {
        return firebase.auth().getRedirectResult().then(function(result:any) {   
          if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // ...
          }
          // The signed-in user info.
          var user = result.user;
          console.log('fb auth result', result);
          return result;
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          console.log('fb auth error', error);          
          return error;
        });
      });
    }
}
