import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../service/company.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.css']
})
export class CompanyRegisterComponent implements OnInit {

  registerCompany: FormGroup = new FormGroup({
    companyName: new FormControl(''),
    companyCEO: new FormControl(''),
    companyTurnOver: new FormControl(''),
    companyWebsite: new FormControl(''),
    companyStockExchange: new FormControl('')
  });
  submitted = false;

  constructor(private fb: FormBuilder, private _router: Router, private _companyservice: CompanyService, private toasterService: ToastrService) { }

  ngOnInit(): void {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.registerCompany = this.fb.group(
      {
        companyName: ['', Validators.required],
        companyCEO: ['', Validators.required],
        companyTurnOver: ['', [Validators.required, Validators.min(100000000)]],
        companyWebsite: ['', [Validators.required, Validators.pattern(reg)]],
        companyStockExchange: ['', Validators.required]
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerCompany.controls;
  }

  companyRegister(registerCompany: FormGroup) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerCompany.invalid) {
      return;
    }
    this._companyservice.registerCompany(registerCompany.value)
      .subscribe(data => {
        this.toasterService.success("Company Registered Successfully !!")
        this._router.navigate(['/user/getallcompanies'])
      },
        HttpErrorResponse => {
          if (HttpErrorResponse.status == 401)
            console.log("INVALID !!!");
        }
      );

  }
}
