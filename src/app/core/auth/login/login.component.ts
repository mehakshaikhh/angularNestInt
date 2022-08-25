import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse } from '../accessToken';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.loginForm =new FormGroup({
      email: new FormControl('',[Validators.required,  Validators.email]),
      password: new FormControl('',[Validators.required]),
    });
  
  }

  public onSubmit():void{
    if(this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
        .subscribe((loginResponse: LoginResponse) => {
          if(loginResponse.accessToken){
            localStorage.setItem('ACCESS_TOKEN',loginResponse.accessToken);
            this.authService.setUserLoggedIn(true);
            this.router.navigateByUrl('profile');
          }
          this.loginForm.reset();
        })
    }
    else {
      this.toastr.error('Please give valid inputs', 'Invalid entries')
    }
  }
}
