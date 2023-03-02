import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UserToken } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private token: string | null = sessionStorage.getItem('token');

  constructor() {
    this.token = sessionStorage.getItem('token');
    if (this.token) {
      this.userToken.next(this.decriptTokenToUser(this.token));
    }
  }

  private userToken = new BehaviorSubject<UserToken | null>(null);

  userToken$ = this.userToken.asObservable();

  saveToken(token: string) {
    this.token = token;
    sessionStorage.setItem('token', token);
    this.userToken.next(this.decriptTokenToUser(token));
  }

  getToken() {
    return this.token;
  }

  removeToken() {
    this.token = null;
    sessionStorage.removeItem('token');
  }

  isValidToken(): boolean {
    if (this.token) {
      const tokenExpirationDate = new Date(JSON.parse(atob(this.token.split('.')[1])).exp * 1000);
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
