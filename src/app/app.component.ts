import { Component, ViewChild } from '@angular/core'; 
import { CSVRecord } from './CSVRecord';
import { ngxCsv } from 'ngx-csv/ngx-csv';



@Component({  

  selector: 'app-root',  
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.css']  
})  
  
export class AppComponent {  
  title = 'Angular7AppReadCSV'; 
  public records: any[] = [];  
  @ViewChild('csvReader') csvReader: any; 
  
  InventoryIdlist=["123","234","456","789"];
  Yearlist=["2015", "2016", "2017", "2018", "2019", "2020" ,"2021", "2022"];
  
  uploadListener($event: any): void {  
  
    let text = [];  
    let files = $event.srcElement.files;  
  
    if (this.isValidCSVFile(files[0])) {  
  
      let input = $event.target;  
      let reader = new FileReader(); 
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        let csvData = reader.result;  
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
  
        let headersRow = this.getHeaderArray(csvRecordsArray);  
  
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);  
      };  
      reader.onerror = function () {  
        console.log('error is occured while reading file!');  
      };  
  
    } else {  
      alert("Please import valid .csv file.");  
      this.fileReset();  
    }  
  }  
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];  
  
    for (let i = 1; i < csvRecordsArray.length; i++) {  
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
      if (curruntRecord.length == headerLength) {  
        let csvRecord:CSVRecord = new CSVRecord();  
        // csvRecord.id = curruntRecord[0].trim();  
        csvRecord.firstName = curruntRecord[1].trim();  
        csvRecord.lastName = curruntRecord[2].trim();  
        // csvRecord.age = curruntRecord[3].trim();  
        // csvRecord.position = curruntRecord[4].trim();  
        // csvRecord.mobile = curruntRecord[5].trim();  
        csvArr.push(csvRecord);  
      }  
    }  
    return csvArr;  
  }  
  isValidCSVFile(file: any) {  
    return file.name.endsWith(".csv");  
  }  
  
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }
  fileReset() {  
    this.csvReader.nativeElement.value = "";  
    this.records = [];  
  }  

  fileDownload(){
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      useBom: true,
      noDownload: false,
      headers: ["Firstname","LastName"]
    };
   
    new ngxCsv(this.records, "Report", options);
  }
}   