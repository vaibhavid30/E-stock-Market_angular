import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CompanyRegisterComponent } from './company-register/company-register.component';
import { AllCompaniesComponent } from './all-companies/all-companies.component';
import { BrowserModule } from '@angular/platform-browser';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ViewStockDetailsComponent } from './view-stock-details/view-stock-details.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    NavbarComponent,
    CompanyRegisterComponent,
    AllCompaniesComponent,
    PageNotFoundComponent,
    ViewStockDetailsComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
