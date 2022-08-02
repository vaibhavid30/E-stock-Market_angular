import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCompaniesComponent } from './all-companies/all-companies.component';
import { CompanyRegisterComponent } from './company-register/company-register.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ViewStockDetailsComponent } from './view-stock-details/view-stock-details.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'companyregister', component: CompanyRegisterComponent},
  {path: 'getallcompanies', component: AllCompaniesComponent},
  {path: 'getStockDetails', component: ViewStockDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
