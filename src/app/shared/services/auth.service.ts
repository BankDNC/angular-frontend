import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

import { environment } from './../../../environments/environment';
import { Login } from '../models/login.model';
import { tap } from 'rxjs/operators';
import { UserLogin } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/auth`;

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
          },
        })
      );
  }

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
