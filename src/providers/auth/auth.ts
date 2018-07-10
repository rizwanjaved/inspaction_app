import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  public remoteUrl = 'http://192.168.99.6:5985/'
  constructor(public http: Http) {
    console.log('Hello AuthProvider Provider');
  }
  // 
  login(data): Observable<any> {
    let apiURL = this.remoteUrl + '_session';
    return this.http.post(apiURL,{
      'name' :data.email,
      'password' : data.password
    })
    .map((res:any) => {
      let toReturn:any =  res._body;
      return toReturn; 
    })
    .catch((e:any) => { 
      return Observable.of(e._body); 
    })
  }
  //
  logout(): Observable<any> {
    let apiURL = this.remoteUrl + '_session';
    return this.http.delete(apiURL,{
    })
    .map((res:any) => {
      return res; 
    })
    .catch((e:any) => { 
      return Observable.of(e); 
    })
  }
  
}
