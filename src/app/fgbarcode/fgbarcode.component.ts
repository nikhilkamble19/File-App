import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Part } from '../shared/part.model';
import { PartService } from '../shared/part.service';
import { FinishedGood } from '../shared/finishedgoods.model';
import { LoaderService } from '../shared/loader.service';
import { AlertService } from '../shared/alert.service';
import { FinishedGoodService } from '../shared/finishedgoods.service';
import { UtilityService } from '../shared/utility.service';
import { FinishedGoodRecord } from '../shared/fgrecord.model';
import { FinishedGoodRecordService } from '../shared/fgrecord.service';

@Component({
  selector: 'app-fgbarcode',
  templateUrl: './fgbarcode.component.html',
  styleUrls: ['./fgbarcode.component.css']
})
export class FgbarcodeComponent implements OnInit {
  
  model: FinishedGoodRecord;
  //partList: JSON;

  constructor(private partService: PartService,
  private loaderService: LoaderService,
  private FinishedGoodService: FinishedGoodService,
  private FinishedGoodRecordService: FinishedGoodRecordService,
  private utilityService: UtilityService,
  private alertService: AlertService) { 
  this.model = new FinishedGoodRecord('','');
  }

  ngOnInit() {
  }
  onSubmit(){
  var file_json = {
      "fileName": this.model.fileName,
      "description": this.model.description,
    };
    //part_json["quantity"] = this.model.quantity;
    //console.log(quantity);
    this.savePart(file_json);

    //this.utilityService.printOnZebraPrinterWithParams();
  }

  savePart(file_json: any){
    console.log(file_json);
    this.FinishedGoodRecordService.addfinishedgoodsrecord(this.model.fileName,this.model.description).subscribe(
      data => {
        console.log(data);
        if (data.length == 0) {
          return;
        }
        // console.log(data.length);
        var mat:JSON = data;
        // debugger;
         this.alertService.success("New File Added");
        this.printIt(mat);
        this.model.fileName ="";
        this.model.description="";
      },
      error => {
        console.log(JSON.stringify(error))
        this.loaderService.display(false);
        if (error.status === 401) {
          
        } else {
          var errMessage = JSON.parse(error["_body"]).message;
          
        }
      },
      () => {
        this.loaderService.display(false);
      }
    );
  }

  private printIt(mat:JSON){
    this.utilityService.printOnZebraPrinterWithParams(mat);
  }
}
