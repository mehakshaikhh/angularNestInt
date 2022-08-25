import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

import { CustomValidator } from '../customValidator';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup(
    {
      email: new FormControl('',[Validators.required, Validators.email]),
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('',[Validators.required]),
    },
      CustomValidator.MatchPassword('password', 'confirmPassword'),
    );    
  }

  public onSubmit():void{
    const { confirmPassword, ...registerUserPayload } = this.registerForm.value;
    
    if(this.registerForm.valid) {
      this.authService.register(registerUserPayload)
        .subscribe((user: User) => {
          this.registerForm.reset();
          this.toastr.success('Proceed and login', 'Registered Successfuly')
          this.router.navigateByUrl('login');
        })
    }
    else {
      this.toastr.error('Please give valid inputs', 'Invalid entries')
    }
  }

}
