import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../service/company.service';
import { StockService } from '../service/stock.service';

@Component({
  selector: 'app-all-companies',
  templateUrl: './all-companies.component.html',
  styleUrls: ['./all-companies.component.css']
})
export class AllCompaniesComponent implements OnInit {

  companiesList: any;
  currentCompanyID: any;
  msg: any;
  errorMessage: any;
  companydetails: any = [];
  stockdetails: any = [];
  stockPresent: Boolean = false;
  updateStockPrice: FormGroup = new FormGroup({
    stockPrice: new FormControl('')
  });
  submitted = false;
  updatesubmitted = false;

  addStock: FormGroup = new FormGroup({
    stockName: new FormControl(''),
    stockPrice: new FormControl('')
  });
  constructor(private fb: FormBuilder, private _companyService: CompanyService, private _stockService: StockService, private _router: Router, private toasterService: ToastrService) { }

  ngOnInit(): void {
    this.getCompanyList();

    this.updateStockPrice = this.fb.group(
      {
        stockPrice: ['', Validators.required]
      });

    this.addStock = this.fb.group(
      {
        stockName: ['', Validators.required],
        stockPrice: ['', Validators.required]
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.updateStockPrice.controls;
  }

  get fc(): { [key: string]: AbstractControl } {
    return this.addStock.controls;
  }

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

  companyDetail(companyID: string) {
    this._companyService.getcompanyByCompanyID(companyID).subscribe(
      data => {
        this.getStockDetails(companyID);
        this.companydetails = data;
        this.companydetails = Array.of(this.companydetails);
      },
      err => console.error(err)
    );
  }

  deleteCompany(companyID: string) {
    this._companyService.deletecompanyByCompanyID(companyID).subscribe(
      data => {
        this.toasterService.error("Company Deleted successfully !!!");
        this.getCompanyList();

      },
      err => console.error(err)
    );
  }

  getStockDetails(companyID: string) {
    this._stockService.getStockByCompanyID(companyID).subscribe(
      data => {
        if (data != null) {
          this.stockPresent = true;
          this.stockdetails = data;
          this.stockdetails = Array.of(this.stockdetails);
        } else {
          this.stockPresent = false;
        }
      },
      err => console.error(err)
    );
  }

  updatePrice(stockId: string) {
    console.log(stockId, this.updateStockPrice.controls['stockPrice'].value)

    this.updatesubmitted = true;
    this._stockService.updateStockPrice(this.updateStockPrice.controls['stockPrice'].value, stockId)
      .subscribe(data => {
        if (data != null) {
          this.toasterService.success("Stock Price Updated Successfully !!");
        }
      },
        HttpErrorResponse => {
          if (HttpErrorResponse.status == 401)
            console.log("INVALID !!!");
        }
      );

  }

  addNewStock() {
    this.submitted = true;

    this.companydetails.forEach((element: { companyID: any; }) => {
      this.currentCompanyID = element.companyID;
    });

    this._stockService.addStock(this.addStock.controls['stockName'].value, this.addStock.controls['stockPrice'].value, this.currentCompanyID)
      .subscribe(data => {
        if (data != null) {
          this.toasterService.success("Stock Added Successfully !!")
          this.companyDetail(this.currentCompanyID);
        }
      },
        HttpErrorResponse => {
          if (HttpErrorResponse.status == 401)
            console.log("INVALID !!!");
        }
      );

  }
}
