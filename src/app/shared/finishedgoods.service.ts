import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { APP_CONFIG, AppConfig } from '../app-config.module';

@Injectable()
export class FinishedGoodService {
    constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig) { }
    listfinishedgoods() {
      return this.http.get(`${this.config.apiEndpoint}/allfiles`)
          .map((response: Response) => {
              let finishedgoods = response.json();
              if (finishedgoods) {
                  // localStorage.setItem('currentUser', JSON.stringify(user));
              }
              return finishedgoods;
          });
    }

    getfinishedgoods(fileId: any) {
      return this.http.get(`${this.config.apiEndpoint}/getFile`,{params:{BarcodeSerial:fileId}})
          .map((response: Response) => {
              let finishedgoods = response.json();
              if (finishedgoods) {
                  // localStorage.setItem('currentUser', JSON.stringify(user));
              }
              return finishedgoods;
          });
    }

    updatefinishedgoods(fileId: any,locationId: any) {
      //return this.http.get(`${this.config.apiEndpoint}/insertFile?fileID=123&fileDescription=asd`)
      return this.http.get(`${this.config.apiEndpoint}/putaway`,{params:{BarcodeSerial:fileId, locationId:locationId}})
        .map((response: Response) => {
            let finshedgoodsrecordjson = response.json();
            if (finshedgoodsrecordjson) {
                // localStorage.setItem('currentUser', JSON.stringify(user));
            }
            console.log(finshedgoodsrecordjson);
            return finshedgoodsrecordjson;
        });
    } 
}