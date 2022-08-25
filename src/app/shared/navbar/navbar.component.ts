import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/core/auth/user';
import { UserService } from 'src/app/features/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private currentPath: string ='';
  public isUserLoggedIn!: boolean;
  public currentUser!: User;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
  ){    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentPath = event.url
      }
    });
  }

  public ngOnInit(): void {    
    this.authService.getUserLoggedIn().subscribe(
      (value: boolean) => this.isUserLoggedIn = value
    )

    this.authService.getCurrentUser().subscribe(
      (user: User) => this.currentUser = user
    )
    
    if(!this.isUserLoggedIn){
      const accessToken = localStorage.getItem('ACCESS_TOKEN');

      if(accessToken){
        const decodedAccessToken = this.authService.getDecodedToken(accessToken);
        this.userService.getUserProfile(decodedAccessToken.email)
        .pipe()
        .subscribe((user: User) => {
          this.isUserLoggedIn = true;
          this.currentUser = user
        })
      } 
    }
  }

  public getNavLink(): string {    
    return this.currentPath === '/register' ? "Login" : "Register"
  }
  
  public getRoute(linkClicked: string): string {    
    return linkClicked === 'Login'? "/login" : "/register"
  }

  public logout(){
    this.isUserLoggedIn = false;
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
}