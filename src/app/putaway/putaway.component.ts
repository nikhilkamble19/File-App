import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FinishedGood } from '../shared/finishedgoods.model';
import { LoaderService } from '../shared/loader.service';
import { FinishedGoodService } from '../shared/finishedgoods.service';
import { LocationService } from '../shared/location.service';
import { AlertService } from '../shared/alert.service';



@Component({
  selector: 'app-putaway',
  templateUrl: './putaway.component.html',
  styleUrls: ['./putaway.component.css']
})
export class PutawayComponent implements OnInit {
  

  model: FinishedGood;
  fetchLocation: Array<Object> = [];
  fetchfinishgoods: Array<Object> = [];
  storeArray: Array<Object> = [];
  incrementvariable: any = 0;
  locationBarcode: any;
  locationId: any;
  locationName: any;
  finishedgoodsId: any;

  constructor(private finishedGoodService: FinishedGoodService,
  private locationService: LocationService,
  private loaderService: LoaderService,
  private alertService: AlertService) { 
  this.model = new FinishedGood('','','');
  
  }

  ngOnInit() {
  this.fetchLocationLists();
  this.fetchFinishGoodsLists();
  }

  fetchLocationLists() {
    this.locationService.listlocations().subscribe(
      data => { 
      this.fetchLocation = data;
      //for(let i of data)
      //{
        console.log(this.fetchLocation);
      //}
      },
      error => {
        if (error.status === 401) {
          //this.router.navigate(['']);
        }
        console.log(JSON.stringify(error))
      }
    );
  }
  
  fetchFinishGoodsLists() {
    this.finishedGoodService.listfinishedgoods().subscribe(
      data => { 
        this.fetchfinishgoods = data;
        console.log(this.fetchfinishgoods);
      },
      error => {
        console.log(error);
      }   
    );
  }
          
  onChangePartNumber(scanbarcode) {
    this.loaderService.display(true);
    // console.log("in on change");
    for(let i of this.fetchLocation){
      // console.log(i["LocationId"]);
      if(this.model.scanbarcode == i["LocationId"]){
        // console.log("Is True");
        this.locationBarcode = i["LocationId"];
        this.locationId = i["LocationId"];
        this.locationName = i["LocationName"]
        // console.log(this.locationId);
        break;
      }
    }
    
    for(let n of this.fetchfinishgoods){
      if(this.model.scanbarcode == n["BarcodeSerial"]){
        this.finishedgoodsId = n["BarcodeSerial"];
        this.finishedGoodService.updatefinishedgoods(this.finishedgoodsId, this.locationId,this.locationName).subscribe(
          data => { 
            console.log(data);
            this.alertService.success("File Location Updated");
          },
          error => {
            this.alertService.error("File Locations Not Updated");
          }
        );
      }
    }

    this.model.scanbarcode = '';
  }
}