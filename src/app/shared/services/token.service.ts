import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UserToken } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      this.userToken.next(this.decriptTokenToUser(storedToken));
    }
  }

  private userToken = new BehaviorSubject<UserToken | null>(null);

  userToken$ = this.userToken.asObservable();

  saveToken(token: string) {
    sessionStorage.setItem('token', token);
    this.userToken.next(this.decriptTokenToUser(token));
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  removeToken() {
    sessionStorage.removeItem('token');
  }

  isValidToken(): boolean {
    const token = sessionStorage.getItem('token');
    if (token) {
      const tokenExpirationDate = new Date(JSON.parse(atob(token.split('.')[1])).exp * 1000);
      const now = new Date();
      return now < tokenExpirationDate;
    }
    return false;
  }

  decriptTokenToUser(token: string) {
    const userToken = {} as UserToken;
    const tokenDecoded = JSON.parse(atob(token.split('.')[1]));
    userToken.id = tokenDecoded.id;
    userToken.name = tokenDecoded.name;
    userToken.lastName = tokenDecoded.lastName;
    userToken.email = tokenDecoded.email;
    userToken.iat = tokenDecoded.iat;
    userToken.exp = tokenDecoded.exp;
    return userToken;
  }
}
