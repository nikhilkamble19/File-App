import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { APP_CONFIG, AppConfig } from '../app-config.module';

import '../../assets/resources/js/BrowserPrint-1.0.4.min.js';
declare var BrowserPrint :any;

@Injectable()
export class UtilityService {
  constructor(@Inject(APP_CONFIG) private config: AppConfig) { }

  JSONtoArray(json_object: JSON) {
      var arr = [];
      for(var i in json_object){
         arr.push(i);
         arr.push(json_object[i]);
      }

      return arr;
  }

  private getZebraPrinterStringToPrint(file_json: JSON) {
    var barcodeTemplate = `^XA

^CFA,30
^FO50,50^FDFile ID^FS
^FO340,50^FD:^FS
^FO360,50^FDfileId^FS

^FX File description
^FB400,2,,
^FO50,100^FDFile Description^FS
^FO340,100^FD:^FS
^FB380,3,,
^FO360,100^FDfileDescription^FS

^FO50,200^FDSerial Number^FS
^FO340,200^FD:^FS
^FO360,200^FDserialnumber^FS

^FX Third section with barcode.
^FX ^BY5,2,120
^FO220,220
^BY200,200^FT300,400^BXN,9,200,0,0,0,~
^FDXXXXXXXXXXXXX^FS

^XZ`;


    var barcodeVal: string = null;
    if (file_json != null) {
      var barcodeVal = barcodeTemplate.replace("SerialNumber", file_json["BarcodeSerial"]);
      // if (file_json["created"] != null) {
      //   var dateString = file_json["created"];
      //   //var dateFormat = new Date(dateString).toDateString();
      //   //barcodeVal = barcodeVal.replace("RecordDate", dateFormat);
      // }

      var barcodeStr:string = "";
      if (file_json["BarcodeSerial"] != undefined) {
        barcodeStr = file_json["BarcodeSerial"];
      }
      barcodeVal = barcodeVal.replace("XXXXXXXXXXXXX", barcodeStr);

      var serialnumberStr:string = "";
      if (file_json["BarcodeSerial"] != undefined) {
        serialnumberStr = file_json["BarcodeSerial"];
      }
      barcodeVal = barcodeVal.replace("serialnumber", serialnumberStr);

      var fileIdStr:string = "";
      if (file_json["FileId"] != undefined) {
        fileIdStr = file_json["FileId"];
      }
      barcodeVal = barcodeVal.replace("fileId", fileIdStr);

      var fileDescriptionStr:string = "";
      if (file_json["FileDescription"] != undefined) {
        fileDescriptionStr = file_json["FileDescription"];
      }
      barcodeVal = barcodeVal.replace("fileDescription", fileDescriptionStr);

      console.log("in getZebraPrinterStringToPrint ");


}
    this.printIt(barcodeVal);

    
  }

  private printIt(barcodeVal: string) {
  console.log("In PrintIt");
    BrowserPrint.getDefaultDevice('printer', function(printer) {
      console.log("Printer status: ", printer, printer.connection);
      if((typeof printer != "undefined") && (printer.connection == null))
      {
        console.log("No Printer Found");
        // give option to choose printer
      }
      else {
        console.log(printer.name); // This alert does not pop - why???
        console.log("\nLABEL PRINT START \n");
        if (barcodeVal != null) {
          printer.send(barcodeVal);
        }
        console.log("\nLABEL PRINT END \n");
      }
    },
    function(error_response) {
      // This alert doesn't pop either
      console.log("An error occured while attempting to connect to your Zebra Printer. " +
        "You may not have Zebra Browser Print installed, or it may not be running. " +
        "Install Zebra Browser Print, or start the Zebra Browser Print Service, and try again.");
    });
  }

  printOnZebraPrinterWithParams(file_json: JSON) {
    var barcodeVal = this.getZebraPrinterStringToPrint(file_json);

    if (barcodeVal == null) {
      return;
    }

   // this.printIt(barcodeVal);
  }

  printOnZebraPrinter(part_json: JSON) {
    //this.printOnZebraPrinterWithParams(part_json: JSON);
  }
}