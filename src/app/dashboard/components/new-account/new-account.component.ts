import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent {

  accountSaving: string = 'ahorro';
  accountCurrent: string = 'corriente';

  constructor(
    public dialogRef: MatDialogRef<NewAccountComponent>
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
