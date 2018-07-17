import { Injectable, ComponentFactoryResolver } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';
import PouchDB from 'pouchdb';
import PouchDBfind from 'pouchdb-find';
// import PouchDB from 'pouchdb-core'
// import PouchHttp from 'pouchdb-adapter-http';

import {Http,Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the PerformaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PerformaProvider {
  public remoteUrl = 'http://192.168.99.6:5985/';
  data: any;
  menus: any;
  db: any;
  remote: any;
  auth_db :any;
  user_status :any;
  session :any;
  selectedPatient :any;
  constructor(public http: Http) {
    this.db = new PouchDB('performa');
    PouchDB.plugin(PouchDBfind);
    this.auth_db = new PouchDB('http://192.168.99.6:5984/_users');
    // sync of localstorage db with remote 
    this.remote = 'http://192.168.99.6:5985/performa';
    let options = {
        live: true,
        retry: true,
        continuous: true
    };
    this.db.sync(this.remote, options);
  }
  /******* patients section *******/
  registerPatients(form) {
    console.log('submitted form data', form);
    return new Promise(resolve => {
      this.db.post(form).then(function (res) {
        console.log('sss', res);
        resolve(res);
      }).catch(function (err) {
        resolve(err);
      })
    });
  }
  getAllPatients() {
    return new Promise(resolve => {
      this.db.find({
        selector: {"user_type" : "patient", "record_type":'user'},
        // fields: ['_id', 'title','parent_id','is_enabled','is_parent'],
        include_docs: true
        }).then(function (res) {
          console.log('patients', res);
          resolve(res);
        }).catch(function (err) {
          resolve(err);
        })
    });
  }


}
