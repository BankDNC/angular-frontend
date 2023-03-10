import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {  Observable } from 'rxjs';
import { TokenService } from '../shared/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isTokenValid = this.tokenService.isValidToken();
    if (!isTokenValid) {
      this.router.navigate(['/login']);
      this.tokenService.removeToken();
      return false;
    }
    return true;
  }

}
