import { Component, Input } from '@angular/core';
import { Account } from 'src/app/shared/models/account.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  @Input() account: Account = {
    id: '',
    balance: 0,
    typeAccount: '',
  };


}
