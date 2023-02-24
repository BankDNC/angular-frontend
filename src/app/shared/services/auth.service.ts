import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

import { environment } from './../../../environments/environment';
import { Login } from '../models/login.model';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { UserLogin } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/auth`;
  //private user = new BehaviorSubject<UserLogin | null>(null);

  //user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email: string, password: string) {
    return this.http.post<Login>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap({
          next: (response: any) => {
            this.tokenService.saveToken(response.token)
            //this.decriptTokenToUser(response.token);
          },
        })
      );
  }

  /*decriptTokenToUser(token: string) {
    if (token) {
      const user = JSON.parse(atob(token.split('.')[1])) as User;
      this.user.next(user);
    }
  }*/

  register(user: UserLogin) {
    return this.http.post(`${this.apiUrl}/register`, user)
      .pipe(
        tap({
          next: (response: any) => {
            this.tokenService.saveToken(response.token)
            //this.decriptTokenToUser(response.token);
          }
        })
      );
  }
}