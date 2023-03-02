import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Account } from 'src/app/shared/models/account.model';
import { AccountService } from 'src/app/shared/services/account.service';
import Swal from 'sweetalert2';
import { NewAccountComponent } from '../../components/new-account/new-account.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  accounts: Account[] = [];

  constructor(
    private accountService: AccountService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountService.getAccounts().subscribe({
      next: (accounts: Account[]) => this.accounts = accounts,
      error: (err) => {
        if (err.status !== 404) {
          this.showSwalError('A ocurrido un error al crear la cuenta');
        }

      }
    })
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(NewAccountComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.accountService.createAccount(result).subscribe({
          next: () => this.loadAccounts(),
          error: () => this.showSwalError('A ocurrido un error al crear la cuenta')
        });
      }

    });
  }

  showSwalError(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message
    })
  }

}
