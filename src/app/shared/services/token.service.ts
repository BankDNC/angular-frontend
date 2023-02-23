import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  saveToken(token: string) {
    sessionStorage.setItem('token', token);
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
}
