import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-alert',
  templateUrl: './confirmation-alert.component.html',
  styleUrls: ['./confirmation-alert.component.scss']
})
export class ConfirmationAlertComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}
}
