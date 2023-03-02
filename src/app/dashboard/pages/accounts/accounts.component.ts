import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/shared/models/account.model';
import { AccountService } from 'src/app/shared/services/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  accounts: Account[] = [];

  constructor(
    private accountService: AccountService
  ) {
  }

  ngOnInit() {
    this.accountService.getAccounts().subscribe({
      next: (accounts: Account[]) => this.accounts = accounts,
      error: (err) => {
        if (err.status !== 404) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'A occurrido un error al cargar las cuentas'
          })
        }

      }
    })
  }

}
