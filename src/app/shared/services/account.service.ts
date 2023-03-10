import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Account } from 'src/app/shared/models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = `${environment.API_URL}/account`;

  constructor(
    private http: HttpClient
  ) { }

  // retorna una lista de Account
  getAccounts() {
    return this.http.get<Account[]>(`${this.apiUrl}`);
  }

  createAccount(account: string){
    return this.http.post(`${this.apiUrl}/create/${account}`,{});
  }
}
