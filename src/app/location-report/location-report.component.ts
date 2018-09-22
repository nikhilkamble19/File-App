import { Component, OnInit } from '@angular/core';
import { Customer } from '../shared/customer.model';
import { CustomerService } from '../shared/customer.service';
import { FinishedGood } from '../shared/finishedgoods.model';
import { LoaderService } from '../shared/loader.service';
import { FinishedGoodService } from '../shared/finishedgoods.service';
import { LocationService } from '../shared/location.service';
import { AlertService } from '../shared/alert.service';

@Component({
  selector: 'app-location-report',
  templateUrl: './location-report.component.html',
  styleUrls: ['./location-report.component.css']
})
export class LocationReportComponent implements OnInit {
	
	model: FinishedGood;
  // fetchLocation: Array<Object> = [];
  fetchFile: Array<Object> = [];
  locationListMap: Array<Object> = [];

  constructor(private finishedGoodService: FinishedGoodService,
  	private locationService: LocationService) {
  	this.model = new FinishedGood('','','');
  }

  ngOnInit() {
  	this.fetchMaterial();
  	this.getAllLocations();
  }

  fetchMaterial(){
  	this.finishedGoodService.listfinishedgoods().subscribe(
      data => { 
      this.fetchFile = data;
      //for(let i of data)
      //{
        console.log(this.fetchFile);
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

  getAllLocations(){
  	this.locationService.listlocations().subscribe(
  		data =>{
  			this.locationListMap = data;
  		},
  		error =>{
  			if (error.status === 401) {
  				
  			}
  		}
  	);
  }

}
