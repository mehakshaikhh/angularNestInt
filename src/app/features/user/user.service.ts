import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { User } from 'src/app/core/auth/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL: string = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) { }

  public getUserProfile(email: string): Observable<User> {
    return this.httpClient.get(`${this.API_URL}/user/${email}`);
  }
}
