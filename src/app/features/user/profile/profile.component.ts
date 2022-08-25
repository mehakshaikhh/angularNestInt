import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/core/auth/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public currentUser!: User;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    if(accessToken){
      const decodedAccessToken = this.authService.getDecodedToken(accessToken);
      this.userService.getUserProfile(decodedAccessToken.email)
      .pipe()
      .subscribe((user: User) => {
        this.currentUser = user;
        this.authService.setCurrentUser(user);
      })
    } else {
      this.authService.logout();
      this.router.navigateByUrl('login');
    }
    
  }

}
