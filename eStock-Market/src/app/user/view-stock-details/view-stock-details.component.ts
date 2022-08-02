import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../service/company.service';
import { StockService } from '../service/stock.service';

@Component({
  selector: 'app-view-stock-details',
  templateUrl: './view-stock-details.component.html',
  styleUrls: ['./view-stock-details.component.css']
})
export class ViewStockDetailsComponent implements OnInit {
  companiesList: any;
  currentStockID: any;
  stockID: any;
  stockDetail = new FormGroup({
    companyID: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl('')
  });
  submitted = false;
  stockdetails: any = [];
  stockData: any;
  stockPresent: Boolean = false;
  arr: any = [];
  stockPriceArray: any = [];
  min:any;
  max:any;
  avg:any;
  constructor(private fb: FormBuilder, private _router: Router, private _companyService: CompanyService, private _stockService: StockService,) { }

  ngOnInit(): void {
     this.getCompanyList();
     this.stockDetail = this.fb.group(
      {
        companyID: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.stockDetail.controls;
  }

  getStockDetails(companyID: string,startDate:string,endDate:string) {
    // Get StockID from Stocks table by CompanyID
    this._stockService.getStockByCompanyID(companyID).subscribe(
      data => {
        if (data != null) {
          this.stockPresent = true;
          this.stockdetails = data;
          this.stockdetails = Array.of(this.stockdetails);
         this.stockdetails.forEach((element: { stockId: any; }) => {
          this.stockID = element.stockId;
         });
        //  After getting StockID from above getting History for Stock Price to get MIN ,MAX and Average of Stock Price
         this._stockService.getStockDetails(this.stockID, startDate, endDate).subscribe(
          data => {
            if (data != null) {
              this.stockData = data;
              this.stockData.forEach((element: { stockPrice: any; }) => {
                this.stockPriceArray.push(element.stockPrice) //Pushing Stock price forEach element from Stock Price history to new Array
              });
              // Calcuating MIN, MAX from new Array which has all the Stock Price History
              this.max = Math.max.apply(null, this.stockPriceArray);
              this.min = Math.min.apply(null, this.stockPriceArray);
              // Calling a function to calculate Average of Stock Price History
              this.AveragePrice(this.stockPriceArray);  
              }
              return this.stockData;
            
          },
          err => console.error(err)
        );
        } else{
          this.stockPresent = false;
        }
      },
      err => console.error(err)
    );
  }
  // Function to calculate Average of Stock Price History
  AveragePrice(array :any []){
    var sum = 0;
    array.forEach(element => {
      sum = sum + element
    });
    console.log("SUM -> " + sum);
    
    this.avg = sum/array.length
    console.log("AVG -> " + this.avg);
  }

  getStock(stockDetail : any) {
    this.submitted = true;
    if (this.stockDetail.invalid) {
      return;
    }
    this.getStockDetails(stockDetail.value.companyID,stockDetail.value.startDate, stockDetail.value.endDate)
    
  }
// get all companies to list in Drop down
  getCompanyList() {
    this._companyService.getCompanyList().subscribe((data) => {
      this.companiesList = data.reduce((companylist: any[], companiesList: any) => {
        if (companiesList != null) {
          companylist.push(companiesList);
          return companylist;
        } else return companylist;
      }, []);
    })
  }
}


