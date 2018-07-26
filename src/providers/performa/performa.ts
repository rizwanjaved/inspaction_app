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
  getImage() {
    this.db.getAttachment('001', 'att_1.txt', function(err, blob_buffer) {
      if (err) {
         return console.log(err);
      } else {
         console.log('blob', blob_buffer);
         var url = URL.createObjectURL(blob_buffer);
         var img = document.createElement('img');
         img.src = url;
         console.log('imgggggggg', img);
         document.body.appendChild(img);
        }
      });
  }
  /******* patients section *******/
  registerPatients(form, file) {
    let _db = this.db;
    console.log('submitted form data', form);
    return new Promise(resolve => {
      this.db.post(form).then(function (res) {
        console.log('after register', res);
        if(file) {
          console.log('after register file', file);
          _db.putAttachment(res.id, 'image_1', res.rev, file, 'image/png', function(err, res) { 
            if (err) { 
               console.log(err); 
            } else { 
               console.log(res+"Attachment added successfully");
            } 
          });
        }
        resolve(res);
      }).catch(function (err) {
        resolve(err);
      })
    });
  }
  getAttachment(id, name) {
    return new Promise(resolve => {
    this.db.getAttachment(id, name, function(err, blob_buffer) {
      if (err) {
        resolve(err);
      } else {
        console.log('blob_buffer',blob_buffer);
        var url = URL.createObjectURL(blob_buffer);
         var img = document.createElement('img');
         img.src = url;
         resolve(url);
      }
    });
  });
  }
  savePatientAttachments(file) {
    console.log('putting');
    // this.db.putAttachment('fb4ba826-2313-4b29-914a-779efe820077', 'test.png', file, 'image/png').then(function () {
    //   console.log('attachemt is', this.db.get('fb4ba826-2313-4b29-914a-779efe820077', {attachments: true}));
    // }).then(function (doc) {
    //   console.log('my doc', doc);
    // });
    this.db.putAttachment('001', 'att_2.txt', '1-77eb3b37f90e6eb4f53d6a9ba83d43ab', file, 'text/plain', function(err, res) { 
      if (err) { 
         console.log(err); 
      } else { 
         console.log(res+"Attachment added successfully");
      } 
    });
  }
  getAllPatients() {
    return new Promise(resolve => {
      this.db.find({
        selector: {"user_type" : "patient", "record_type":'user'},
        // fields: ['_id', 'title','parent_id','is_enabled','is_parent'],
        include_docs: true,
        attachments: true
        }).then(function (res) {
          // console.log('patients', res);
          resolve(res);
        }).catch(function (err) {
          resolve(err);
        })
    });
  }
  removePatients(p) {
    // console.log('removing ', p);
    let _db = this.db;
    return new Promise(resolve => {
      _db.get(p._id).then(function (pd) {
        resolve (_db.remove(pd));
      }).catch(err =>{
        resolve (err);
      })
    });
  }
  /******* end patients section *******/

  



}
