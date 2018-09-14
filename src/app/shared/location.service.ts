import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { APP_CONFIG, AppConfig } from '../app-config.module';

@Injectable()
export class LocationService {
    constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig) { }
    listlocations() {
      return this.http.get(`${this.config.apiEndpoint}/alllocation`)
          .map((response: Response) => {
              let locations = response.json();
              if (locations) {
                  // localStorage.setItem('currentUser', JSON.stringify(user));
              }
              return locations;
          });
    }

    getlocations(locationId:any) {
      return this.http.get(`${this.config.apiEndpoint}/location`,{params:{locationId: locationId}})
          .map((response: Response) => {
              let locations = response.json();
              if (locations) {
                  // localStorage.setItem('currentUser', JSON.stringify(user));
              }
              return locations;
          });
    }
}