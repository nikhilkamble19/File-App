import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportComponent } from './report/report.component';
import { FgbarcodeComponent } from './fgbarcode/fgbarcode.component';
import { PicklistBarcodeComponent } from './picklist-barcode/picklist-barcode.component';
import { AddPartComponent } from './add-part/add-part.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { LocationReportComponent } from './location-report/location-report.component';
import { PutawayComponent } from './putaway/putaway.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/report', pathMatch: 'full' },
  { path: 'report', component: ReportComponent },
  { path: 'fgbarcode', component: FgbarcodeComponent },
  { path: 'picklist-barcode', component: PicklistBarcodeComponent },
  { path: 'add-part', component: AddPartComponent },
  { path: 'add-location', component: AddLocationComponent },
  { path: 'location-report', component: LocationReportComponent },
  { path: 'putaway', component: PutawayComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
