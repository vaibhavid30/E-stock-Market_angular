import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });
  name :any;
  constructor(private fb: FormBuilder, private _router: Router, private _userservice: UserService, private toasterService: ToastrService) {}

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
  }

  onLogin(login: FormGroup) {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this._userservice.authenticate(login.value.email, login.value.password)
      .subscribe(data => {
        if (data != null) {
          sessionStorage['id'] = data.id,
          this.name = data.name;
        this.toasterService.success("Welcome to e-Stock Market !! " + this.name)
            this._router.navigate(['/user/welcome']);
        }
      },
        HttpErrorResponse => {
          if (HttpErrorResponse.status == 500)
            this.toasterService.error("INVALID ID AND PASSWORD")
        }
      );
  }
}
