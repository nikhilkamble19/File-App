import { Component, OnInit } from '@angular/core';
import { Part } from '../shared/part.model';
import { PartService } from '../shared/part.service';
import { LoaderService } from '../shared/loader.service';
import { PickListService } from '../shared/picklist.service';
import { PickList } from '../shared/picklist.model';
import { FinishedGood } from '../shared/finishedgoods.model';
import { FinishedGoodService } from '../shared/finishedgoods.service';
import { AlertService } from '../shared/alert.service';

@Component({
  selector: 'app-picklist-barcode',
  templateUrl: './picklist-barcode.component.html',
  styleUrls: ['./picklist-barcode.component.css']
})
export class PicklistBarcodeComponent implements OnInit {

  model: FinishedGood;
  partsMap: Array<Object> = [];
  aggregated: JSON;
  singlepart: JSON;
  picklistData: JSON;
  

  constructor(private partService: PartService,
  private loaderService: LoaderService,
  private picklistService: PickListService,
  private finishedGoodService: FinishedGoodService,
  private alertService: AlertService) {
    this.model = new FinishedGood('','','');
  }

  ngOnInit() {
    this.fetchPartLists();

  }

  onSubmit() {
    
    console.log(this.picklistData);
    this.fetchPart(this.model.fileName["_id"]);
    console.log(this.aggregated);
    
  }

  fetchPartLists() {
    this.partService.listParts().subscribe(
      data => {
      this.partsMap = data;
      console.log(this.partsMap);
      },
      error => {
        if (error.status === 401) {
          //this.router.navigate(['']);
        }
        console.log(JSON.stringify(error))
      }
    );
  }

  fetchPart(part_Id){
    this.finishedGoodService.getfinishedgoods(part_Id).subscribe(
        data => { 
          console.log(data);
          this.aggregated = data;
          this.aggregated = data.filter(item => { return (item["location_id"] != null); } )
          console.log(this.aggregated);
          
          console.log(this.singlepart);
          this.alertService.success("Part Found");
        },
        error => {
          this.alertService.error("Part not created");
        }
      );
      console.log(this.picklistData);
      console.log(this.aggregated);
      
    }

  onChangePartNumber(selectedPart){
  }
}
