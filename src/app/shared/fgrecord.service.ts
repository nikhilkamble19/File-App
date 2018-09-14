import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { APP_CONFIG, AppConfig } from '../app-config.module';

@Injectable()
export class FinishedGoodRecordService {
    constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig) { }

    addfinishedgoodsrecord(filename: any,description: any) {
      //return this.http.get(`${this.config.apiEndpoint}/insertFile?fileID=123&fileDescription=asd`)
      return this.http.get(`${this.config.apiEndpoint}/insertFile`,{params:{fileID:filename, fileDescription:description}})
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