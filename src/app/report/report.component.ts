import { Component, OnInit } from '@angular/core';
import { Customer } from '../shared/customer.model';
import { CustomerService } from '../shared/customer.service';
import { FinishedGood } from '../shared/finishedgoods.model';
import { LoaderService } from '../shared/loader.service';
import { FinishedGoodService } from '../shared/finishedgoods.service';
import { LocationService } from '../shared/location.service';
import { AlertService } from '../shared/alert.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  model: FinishedGood;
  fetchLocation: Array<Object> = [];
  fetchFile: Array<Object> = [];

  constructor(private finishedGoodService: FinishedGoodService, private locationService: LocationService) { 
  this.model = new FinishedGood('','','');
  
  }

  ngOnInit() {
  }

  onChangePartNumber(scanbarcode) {
    this.finishedGoodService.getfinishedgoods(this.model.scanbarcode).subscribe(
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

    this.locationService.getlocations(this.fetchFile["LocationId"]).subscribe(
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


    this.model.scanbarcode = '';
  }

}
