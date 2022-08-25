import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, } from 'rxjs';
import { User } from './user';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL: string = 'http://localhost:3000/api';
  private isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private currentUser: Subject<User> = new Subject<User>();

  constructor(private httpClient: HttpClient) {}

  public register(user: User): Observable<User> {
    return this.httpClient.post(`${this.API_URL}/user`, user);
  }

  public login(user: User) {
    return this.httpClient.post<any>(`${this.API_URL}/user/login`, user);
  }
  
  public getDecodedToken(accessToken: string): any{
    return jwt_decode(accessToken);
  }

  public logout(){
    localStorage.removeItem('ACCESS_TOKEN');
    this.isUserLoggedIn.next(false);
    this.currentUser = new Subject<User>();
  }

  public setCurrentUser(user: User){
    this.currentUser.next(user);
  }

  public getCurrentUser():Observable<User>{
    return this.currentUser.asObservable();
  }

  public setUserLoggedIn(value: boolean){
    this.isUserLoggedIn.next(value);
  }

  public getUserLoggedIn():Observable<boolean>{
    return this.isUserLoggedIn.asObservable();
  }

}
